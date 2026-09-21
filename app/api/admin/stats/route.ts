import { NextResponse } from "next/server";
import { requireMinRole, Role } from "@/lib/rbac";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const { session, errorResponse } = await requireMinRole(Role.MODERATOR);
  if (errorResponse) return errorResponse;

  const [
    totalUsers,
    totalProfiles,
    pendingProfiles,
    pendingReports,
    totalPhotos,
    recentUsers,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.profile.count(),
    prisma.profile.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
    prisma.report.count({ where: { status: "PENDING" } }),
    prisma.profilePhoto.count(),
    prisma.user.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isSuspended: true,
        createdAt: true,
        profile: { select: { id: true, city: true, region: true, status: true } },
      },
    }),
    prisma.auditLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }),
  ]);

  return NextResponse.json({
    stats: {
      totalUsers,
      totalProfiles,
      pendingProfiles,
      pendingReports,
      totalPhotos,
      completionRate: totalUsers > 0 ? Math.round((totalProfiles / totalUsers) * 100) : 0,
    },
    recentUsers,
    recentAuditLogs,
    callerRole: session?.user.role,
  });
}

