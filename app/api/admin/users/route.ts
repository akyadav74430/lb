import { NextResponse } from "next/server";
import { requireMinRole, Role } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { sanitizeUserDTO } from "@/lib/security";

export const dynamic = "force-dynamic";

// GET /api/admin/users — List users
export async function GET() {
  const { errorResponse } = await requireMinRole(Role.ADMIN);
  if (errorResponse) return errorResponse;

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isSuspended: true,
      createdAt: true,
      profile: {
        select: { id: true, city: true, region: true, status: true, visibility: true },
      },
      _count: { select: { reportsSent: true, blocksSent: true } },
    },
  });

  return NextResponse.json({ users });
}

// PATCH /api/admin/users — Update role or suspension status
export async function PATCH(request: Request) {
  const { session, errorResponse } = await requireMinRole(Role.ADMIN);
  if (errorResponse || !session) return errorResponse;

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { userId, role, isSuspended } = body;
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  // Prevent modifying own privileges
  if (userId === session.user.id && (role !== undefined || isSuspended !== undefined)) {
    return NextResponse.json({ error: "Cannot modify your own administrative role or status" }, { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updateData: any = {};

  if (role !== undefined) {
    if (!["REGISTERED_USER", "MODERATOR", "ADMIN", "SUPER_ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    // Only SUPER_ADMIN can create/modify ADMIN or SUPER_ADMIN
    if ((role === "ADMIN" || role === "SUPER_ADMIN" || targetUser.role === "ADMIN" || targetUser.role === "SUPER_ADMIN") && session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Only Super Admins can assign or modify Admin roles" }, { status: 403 });
    }
    updateData.role = role;
  }

  if (isSuspended !== undefined) {
    updateData.isSuspended = Boolean(isSuspended);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  // Record audit log
  try {
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: role ? "ROLE_CHANGE" : "ACCOUNT_SUSPEND_TOGGLE",
        details: `Updated user ${targetUser.email} (ID: ${userId}): ${JSON.stringify(updateData)}`,
      },
    });
  } catch {
    // ignore
  }

  return NextResponse.json({ user: sanitizeUserDTO(updatedUser) });
}

// DELETE /api/admin/users — Delete user
export async function DELETE(request: Request) {
  const { session, errorResponse } = await requireMinRole(Role.ADMIN);
  if (errorResponse || !session) return errorResponse;

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");
  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  if (userId === session.user.id) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Prevent deleting admins unless caller is SUPER_ADMIN
  if (targetUser.role === "ADMIN" || targetUser.role === "SUPER_ADMIN") {
    if (session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Only Super Admins can delete Admin accounts" }, { status: 403 });
    }
  }

  await prisma.user.delete({ where: { id: userId } });

  // Record audit log
  try {
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "USER_DELETE",
        details: `Deleted user account: ${targetUser.email} (ID: ${userId})`,
      },
    });
  } catch {
    // ignore
  }

  return NextResponse.json({ ok: true, message: "User deleted successfully" });
}

