import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { profileSchema } from "@/lib/validation";
import { sanitizeProfileDTO } from "@/lib/security";
import { RoleType, isStaffOrAdmin } from "@/lib/rbac";

// GET /api/profiles/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  const sessionUser = session?.user
    ? {
        id: session.user.id as string,
        name: session.user.name,
        email: session.user.email,
        role: ((session.user as { role?: string }).role as RoleType) || "REGISTERED_USER",
      }
    : null;

  const { id } = await params;
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      photos: { orderBy: { order: "asc" } },
      rates: { orderBy: { order: "asc" } },
    },
  });

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const sanitized = sanitizeProfileDTO(profile, sessionUser);
  if (!sanitized) {
    return NextResponse.json({ error: "Profile not accessible" }, { status: 403 });
  }

  return NextResponse.json(sanitized);
}

// PUT /api/profiles/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.profile.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const userRole = (session.user as { role?: string }).role || "REGISTERED_USER";
  const isOwner = existing.userId === session.user.id;
  const isStaff = isStaffOrAdmin(userRole);

  if (!isOwner && !isStaff) {
    return NextResponse.json({ error: "Forbidden: You cannot modify this profile" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  // Synchronize rates relation if provided
  if (parsed.data.rates && Array.isArray(parsed.data.rates)) {
    await prisma.profileRate.deleteMany({
      where: { profileId: id },
    });

    if (parsed.data.rates.length > 0) {
      await prisma.profileRate.createMany({
        data: parsed.data.rates.map((r, idx: number) => ({
          profileId: id,
          duration: r.duration,
          incall: typeof r.incall === "string" ? parseInt((r.incall as string).replace(/\D/g, "")) || 0 : r.incall || 0,
          outcall: typeof r.outcall === "string" ? parseInt((r.outcall as string).replace(/\D/g, "")) || 0 : r.outcall || 0,
          order: idx,
        })),
      });
    }
  }

  const updated = await prisma.profile.update({
    where: { id },
    data: {
      bio: parsed.data.bio,
      address: parsed.data.address,
      city: parsed.data.city,
      region: parsed.data.region,
      district: parsed.data.district,
      localArea: parsed.data.localArea,
      country: parsed.data.country,
      favColor: parsed.data.favColor,
      phone: parsed.data.phone,
      whatsapp: parsed.data.whatsapp,
      photoUrl: parsed.data.photoUrl,
      visibility: parsed.data.visibility,
      hidePhoneFromPublic: parsed.data.hidePhoneFromPublic,
    },
    include: {
      photos: { orderBy: { order: "asc" } },
      rates: { orderBy: { order: "asc" } },
      user: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/profiles/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const existing = await prisma.profile.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  const userRole = (session.user as { role?: string }).role || "REGISTERED_USER";
  const isOwner = existing.userId === session.user.id;
  const isStaff = isStaffOrAdmin(userRole);

  if (!isOwner && !isStaff) {
    return NextResponse.json({ error: "Forbidden: You cannot delete this profile" }, { status: 403 });
  }

  await prisma.profile.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

