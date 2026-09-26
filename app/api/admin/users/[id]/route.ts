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

  if (body.role && session.user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Only super admins can change roles" }, { status: 403 });
  }

  if (id === session.user.id && body.role && body.role !== session.user.role) {
    return NextResponse.json({ error: "Cannot change your own role" }, { status: 400 });
  }

  const allowedFields = ["role", "isSuspended", "name"];
  const data: Record<string, unknown> = {};

  for (const key of allowedFields) {
    if (body[key] !== undefined) data[key] = body[key];
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, isSuspended: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "ROLE_CHANGE",
        details: `Admin updated user ${id}: ${JSON.stringify(data)}`,
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}