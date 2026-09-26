import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { profileSchema } from "@/lib/validation";
import { sanitizeProfileDTO } from "@/lib/security";
import { RoleType } from "@/lib/rbac";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 12;

// GET /api/profiles?region=&city=&color=&search=&page=
export async function GET(request: Request) {
  try {
    let sessionUser: { id: string; name?: string | null; email?: string | null; role: RoleType } | null = null;
    try {
      const session = await auth();
      if (session?.user?.id) {
        sessionUser = {
          id: session.user.id as string,
          name: session.user.name,
          email: session.user.email,
          role: ((session.user as { role?: string }).role as RoleType) || "REGISTERED_USER",
        };
      }
    } catch {
      sessionUser = null;
    }

    const { searchParams } = new URL(request.url);
    const region = searchParams.get("region") || "";
    const city = searchParams.get("city") || "";
    const color = searchParams.get("color") || "";
    const search = searchParams.get("search") || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const skip = (page - 1) * PAGE_SIZE;

    const where: Record<string, unknown> = {
      status: "APPROVED",
    };

    // Visibility constraints for public queries
    if (!sessionUser) {
      where.visibility = "PUBLIC";
    } else {
      where.visibility = { in: ["PUBLIC", "REGISTERED_USERS_ONLY"] };
    }

    if (region) where.region = region;
    if (city) where.city = { contains: city };
    if (color) where.favColor = color;
    if (search) {
      where.OR = [
        { user: { name: { contains: search } } },
        { city: { contains: search } },
        { bio: { contains: search } },
      ];
    }

    const [rawProfiles, total] = await Promise.all([
      prisma.profile.findMany({
        where,
        skip,
        take: PAGE_SIZE,
        orderBy: { updatedAt: "desc" },
        include: {
          user: { select: { id: true, name: true } },
          photos: {
            where: { status: "APPROVED" },
            orderBy: { order: "asc" },
          },
          rates: { orderBy: { order: "asc" } },
        },
      }),
      prisma.profile.count({ where }),
    ]);

    const sanitized = rawProfiles.map((p) => sanitizeProfileDTO(p, sessionUser)).filter(Boolean);

    return NextResponse.json({
      profiles: sanitized,
      pagination: { page, pageSize: PAGE_SIZE, total, totalPages: Math.ceil(total / PAGE_SIZE) },
    });
  } catch (err: unknown) {
    console.error("GET /api/profiles error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Failed to fetch profiles" }, { status: 500 });
  }
}

// POST /api/profiles — create or update own profile
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = parsed.data;
  const userRole = (session.user as { role?: string }).role || "REGISTERED_USER";
  const isPrivileged = userRole === "ADMIN" || userRole === "SUPER_ADMIN" || userRole === "MODERATOR";

  // Business rule: Check age confirmation and consent if photos are uploaded
  if (data.photos && data.photos.length > 0) {
    if (!data.ageConfirmed) {
      return NextResponse.json(
        { error: { ageConfirmed: ["You must confirm that you are at least 18 years old."] } },
        { status: 400 }
      );
    }
    if (!data.consentRecorded) {
      return NextResponse.json(
        { error: { consentRecorded: ["You must provide explicit consent for the uploaded photos."] } },
        { status: 400 }
      );
    }
  }

  // Duplicate photo detection: Check if any of the photo hashes match other profiles
  const photoHashes = data.photos
    ?.map((p) => p.sha256Hash)
    .filter((h): h is string => Boolean(h));

  let duplicateFlag = false;
  if (photoHashes && photoHashes.length > 0) {
    const existingDuplicates = await prisma.profilePhoto.findMany({
      where: {
        sha256Hash: { in: photoHashes },
        profile: { userId: { not: session.user.id } },
      },
      select: { id: true, profileId: true, sha256Hash: true },
    });

    if (existingDuplicates.length > 0) {
      duplicateFlag = true;
      // Record audit log for potential duplicate/stolen image signal
      try {
        await prisma.auditLog.create({
          data: {
            userId: session.user.id,
            action: "DUPLICATE_PHOTO_SIGNAL",
            details: `User uploaded ${existingDuplicates.length} photos matching existing records.`,
          },
        });
      } catch {
        // ignore
      }
    }
  }

  // Determine primary photoUrl
  const primaryPhoto = data.photos?.find((p) => p.isPrimary)?.url || data.photos?.[0]?.url || data.photoUrl || null;

  // Lifecycle status: Auto-approve for admins/mods, or set to APPROVED / UNDER_REVIEW
  const statusToSet = isPrivileged ? "APPROVED" : duplicateFlag ? "UNDER_REVIEW" : "APPROVED";

  const profileData = {
    bio: data.bio || null,
    address: data.address || null,
    city: data.city || null,
    region: data.region || null,
    district: data.district || null,
    localArea: data.localArea || null,
    country: data.country || "India",
    favColor: data.favColor || null,
    phone: data.phone || null,
    whatsapp: data.whatsapp || null,
    photoUrl: primaryPhoto,
    visibility: data.visibility || "PUBLIC",
    hidePhoneFromPublic: Boolean(data.hidePhoneFromPublic),
    ageConfirmed: Boolean(data.ageConfirmed),
    consentRecorded: Boolean(data.consentRecorded),
    consentTimestamp: data.consentRecorded ? new Date() : null,
    consentVersion: "1.0",
    status: statusToSet,
    gender: data.gender || null,
  };

  // Upsert profile
  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: profileData,
    create: { userId: session.user.id, ...profileData },
  });

  // Synchronize photos relation
  if (data.photos && Array.isArray(data.photos)) {
    // Delete existing photos not in the new list
    await prisma.profilePhoto.deleteMany({
      where: { profileId: profile.id },
    });

    // Re-insert ordered photos
    if (data.photos.length > 0) {
      await prisma.profilePhoto.createMany({
        data: data.photos.map((p, idx) => ({
          profileId: profile.id,
          url: p.url,
          sha256Hash: p.sha256Hash || null,
          order: idx,
          isPrimary: idx === 0 || p.isPrimary,
          status: "APPROVED",
        })),
      });
    }
  }

  // Synchronize rates relation
  if (data.rates && Array.isArray(data.rates)) {
    await prisma.profileRate.deleteMany({
      where: { profileId: profile.id },
    });

    if (data.rates.length > 0) {
      await prisma.profileRate.createMany({
        data: data.rates.map((r, idx: number) => ({
          profileId: profile.id,
          duration: r.duration,
          incall: typeof r.incall === "string" ? parseInt((r.incall as string).replace(/\D/g, "")) || 0 : r.incall || 0,
          outcall: typeof r.outcall === "string" ? parseInt((r.outcall as string).replace(/\D/g, "")) || 0 : r.outcall || 0,
          order: idx,
        })),
      });
    }
  }

  const updated = await prisma.profile.findUnique({
    where: { id: profile.id },
    include: { photos: { orderBy: { order: "asc" } }, rates: { orderBy: { order: "asc" } }, user: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json(updated, { status: 200 });
}

