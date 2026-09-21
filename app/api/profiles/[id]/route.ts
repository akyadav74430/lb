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
        role: ((session.user as any).role as RoleType) || "REGISTERED_USER",
      }
    : null;

  const { id } = await params;
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      photos: { orderBy: { order: "asc" } },
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

  const userRole = (session.user as any).role || "REGISTERED_USER";
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
    include: { photos: true, user: { select: { id: true, name: true } } },
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

  const userRole = (session.user as any).role || "REGISTERED_USER";
  const isOwner = existing.userId === session.user.id;
  const isStaff = isStaffOrAdmin(userRole);

  if (!isOwner && !isStaff) {
    return NextResponse.json({ error: "Forbidden: You cannot delete this profile" }, { status: 403 });
  }

  await prisma.profile.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

