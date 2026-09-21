import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/block — Get list of blocked users
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const blocks = await prisma.userBlock.findMany({
    where: { blockerId: session.user.id },
    include: {
      blocked: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return NextResponse.json({ blocks });
}

// POST /api/block — Block a user
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { blockedId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { blockedId } = body;
  if (!blockedId || typeof blockedId !== "string") {
    return NextResponse.json({ error: "Target user ID is required" }, { status: 400 });
  }

  if (blockedId === session.user.id) {
    return NextResponse.json({ error: "You cannot block yourself" }, { status: 400 });
  }

  const targetUser = await prisma.user.findUnique({ where: { id: blockedId } });
  if (!targetUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.userBlock.upsert({
    where: {
      blockerId_blockedId: {
        blockerId: session.user.id,
        blockedId,
      },
    },
    update: {},
    create: {
      blockerId: session.user.id,
      blockedId,
    },
  });

  return NextResponse.json({ success: true, message: "User blocked successfully" });
}

// DELETE /api/block — Unblock a user
export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const blockedId = searchParams.get("blockedId");

  if (!blockedId) {
    return NextResponse.json({ error: "Blocked user ID required" }, { status: 400 });
  }

  await prisma.userBlock.deleteMany({
    where: {
      blockerId: session.user.id,
      blockedId,
    },
  });

  return NextResponse.json({ success: true, message: "User unblocked" });
}
