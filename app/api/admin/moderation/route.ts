import { NextResponse } from "next/server";
import { requireMinRole, Role } from "@/lib/rbac";
import { prisma } from "@/lib/db";
import { moderationActionSchema } from "@/lib/validation";
import { getClientIp } from "@/lib/security";

export const dynamic = "force-dynamic";

// GET /api/admin/moderation — Retrieve queues and moderation items
export async function GET(request: Request) {
  const { session, errorResponse } = await requireMinRole(Role.MODERATOR);
  if (errorResponse || !session) return errorResponse;

  const { searchParams } = new URL(request.url);
  const tab = searchParams.get("tab") || "all";

  const [
    pendingProfiles,
    allProfiles,
    reports,
    duplicatePhotos,
    moderationActions,
    auditLogs,
  ] = await Promise.all([
    // Pending review queue
    prisma.profile.findMany({
      where: { status: { in: ["SUBMITTED", "UNDER_REVIEW", "NEEDS_CHANGES"] } },
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        photos: { orderBy: { order: "asc" } },
        rates: { orderBy: { order: "asc" } },
        reports: { where: { status: "PENDING" } },
      },
    }),
    // All profiles for management
    tab === "profiles"
      ? prisma.profile.findMany({
          take: 50,
          orderBy: { updatedAt: "desc" },
          include: {
            user: { select: { id: true, name: true, email: true } },
            photos: { take: 1 },
          },
        })
      : Promise.resolve([]),
    // Reports queue
    prisma.report.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        profile: {
          select: {
            id: true,
            city: true,
            region: true,
            photoUrl: true,
            status: true,
            user: { select: { id: true, name: true, email: true } },
          },
        },
        reporter: { select: { id: true, name: true, email: true } },
      },
    }),
    // Photos with duplicate SHA-256 hashes
    prisma.profilePhoto.findMany({
      where: { sha256Hash: { not: null } },
      orderBy: { createdAt: "desc" },
      take: 60,
      include: {
        profile: {
          select: {
            id: true,
            city: true,
            user: { select: { name: true, email: true } },
          },
        },
      },
    }),
    // Recent moderation actions
    prisma.moderationAction.findMany({
      take: 25,
      orderBy: { createdAt: "desc" },
      include: {
        moderator: { select: { name: true, email: true, role: true } },
      },
    }),
    // Recent audit logs
    prisma.auditLog.findMany({
      take: 30,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    }),
  ]);

  // Group duplicate photo hashes
  const hashMap: Record<string, typeof duplicatePhotos> = {};
  duplicatePhotos.forEach((p) => {
    if (p.sha256Hash) {
      if (!hashMap[p.sha256Hash]) hashMap[p.sha256Hash] = [];
      hashMap[p.sha256Hash].push(p);
    }
  });

  const duplicateClusters = Object.entries(hashMap)
    .filter(([, list]) => list.length > 1)
    .map(([hash, list]) => ({
      hash,
      count: list.length,
      photos: list,
    }));

  return NextResponse.json({
    pendingProfiles,
    allProfiles,
    reports,
    duplicateClusters,
    moderationActions,
    auditLogs,
  });
}

// POST /api/admin/moderation — Execute moderation action
export async function POST(request: Request) {
  const { session, errorResponse } = await requireMinRole(Role.MODERATOR);
  if (errorResponse || !session) return errorResponse;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = moderationActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { targetType, targetId, action, reason } = parsed.data;
  const clientIp = getClientIp(request);

  if (action === "REJECT" && (!reason || reason.trim().length < 5)) {
    return NextResponse.json({ error: "Rejection requires an explicit reason (min 5 chars)" }, { status: 400 });
  }

  // 1. Process Profile Action
  if (targetType === "PROFILE") {
    const profile = await prisma.profile.findUnique({
      where: { id: targetId },
      include: { user: true },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    let nextStatus = profile.status;
    if (action === "APPROVE") nextStatus = "APPROVED";
    if (action === "REJECT") nextStatus = "REJECTED";
    if (action === "REQUEST_CHANGES") nextStatus = "NEEDS_CHANGES";
    if (action === "SUSPEND") nextStatus = "SUSPENDED";
    if (action === "UNPUBLISH") nextStatus = "DRAFT";
    if (action === "RESTORE") nextStatus = "APPROVED";

    await prisma.profile.update({
      where: { id: targetId },
      data: {
        status: nextStatus,
        rejectionReason: action === "REJECT" || action === "REQUEST_CHANGES" ? reason : null,
        moderationNotes: reason ? `[${action} by ${session.user.name}]: ${reason}` : undefined,
      },
    });
  }

  // 2. Process Report Action
  if (targetType === "REPORT") {
    const report = await prisma.report.findUnique({ where: { id: targetId } });
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    let reportStatus = "RESOLVED";
    if (action === "UNPUBLISH" || action === "REJECT") reportStatus = "DISMISSED";
    if (action === "REQUEST_CHANGES") reportStatus = "INVESTIGATING";

    await prisma.report.update({
      where: { id: targetId },
      data: {
        status: reportStatus,
        actionTaken: `${action}: ${reason || "No notes"} (by ${session.user.name})`,
      },
    });
  }

  // 3. Process Photo Action
  if (targetType === "PHOTO") {
    const photo = await prisma.profilePhoto.findUnique({ where: { id: targetId } });
    if (!photo) {
      return NextResponse.json({ error: "Photo not found" }, { status: 404 });
    }

    const photoStatus = action === "APPROVE" ? "APPROVED" : "REJECTED";
    await prisma.profilePhoto.update({
      where: { id: targetId },
      data: { status: photoStatus },
    });
  }

  // 4. Record ModerationAction entity
  await prisma.moderationAction.create({
    data: {
      moderatorId: session.user.id,
      targetType,
      targetId,
      action,
      reason: reason || null,
    },
  });

  // 5. Record AuditLog entry
  try {
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: `MOD_${targetType}_${action}`,
        details: `Action: ${action} on ${targetType} ${targetId}. Reason: ${reason || "N/A"}`,
        ipAddress: clientIp,
      },
    });
  } catch {
    // ignore
  }

  return NextResponse.json({ success: true, message: `Action ${action} executed successfully` });
}
