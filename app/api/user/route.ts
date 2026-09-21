import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
});

// GET /api/user — return current user's name + email
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true },
  });
  return NextResponse.json(user);
}

// PUT /api/user — update name and/or email
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = updateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { name, email } = parsed.data;

  // Check email not taken by another user
  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.id !== session.user.id) {
      return NextResponse.json(
        { error: { email: ["Email already in use by another account"] } },
        { status: 409 }
      );
    }
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: { name, email },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json(updated);
}

// DELETE /api/user — Self-service account deletion (Data Minimization)
export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // Record audit log prior to cascade deletion
  try {
    await prisma.auditLog.create({
      data: {
        userId: null,
        action: "USER_SELF_DELETE",
        details: `User requested permanent account deletion: ${session.user.email} (ID: ${userId})`,
      },
    });
  } catch {
    // ignore
  }

  // Cascades to Profile, ProfilePhoto, and related records
  await prisma.user.delete({
    where: { id: userId },
  });

  return NextResponse.json({ success: true, message: "Your account and personal data have been permanently deleted." });
}

