import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();

  const allowedFields = [
    "status",
    "visibility",
    "moderationNotes",
    "rejectionReason",
    "bio",
    "city",
    "region",
    "district",
    "localArea",
    "country",
    "phone",
    "whatsapp",
    "gender",
    "hidePhoneFromPublic",
    "favColor",
  ];
  const data: Record<string, unknown> = {};

  for (const key of allowedFields) {
    if (body[key] !== undefined) data[key] = body[key];
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const profile = await prisma.profile.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "PROFILE_APPROVE",
        details: `Admin updated profile ${id}: ${JSON.stringify(data)}`,
      },
    });

    return NextResponse.json({ profile });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await prisma.profile.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "USER_DELETE",
        details: `Superadmin deleted profile ${id}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete profile" }, { status: 500 });
  }
}