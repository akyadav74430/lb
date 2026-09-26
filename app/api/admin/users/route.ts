import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || "";

  const where: Record<string, unknown> = {};

  if (role) {
    where.role = role;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isSuspended: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const userIds = users.map((u) => u.id);
  const profileCounts = await prisma.profile.groupBy({
    by: ["userId"],
    where: { userId: { in: userIds } },
    _count: { id: true },
  });

  const countMap = new Map(profileCounts.map((p) => [p.userId, p._count.id]));
  const usersWithCounts = users.map((u) => ({
    ...u,
    _count: { profile: countMap.get(u.id) || 0 },
  }));

  return NextResponse.json({ users: usersWithCounts });
}