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
  const status = searchParams.get("status") || "";
  const visibility = searchParams.get("visibility") || "";

  const where: Record<string, unknown> = {};

  if (status) {
    where.status = status;
  }

  if (visibility) {
    where.visibility = visibility;
  }

  if (search) {
    where.OR = [
      { bio: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { region: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
      { whatsapp: { contains: search, mode: "insensitive" } },
      { user: { name: { contains: search, mode: "insensitive" } } },
      { user: { email: { contains: search, mode: "insensitive" } } },
    ];
  }

  const profiles = await prisma.profile.findMany({
    where,
    include: {
      user: {
        select: { id: true, name: true, email: true, role: true },
      },
      photos: {
        take: 1,
        orderBy: { order: "asc" },
        select: { url: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ profiles });
}