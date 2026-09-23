import { PrismaClient } from "../lib/generated/prisma/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

async function main() {
  try {
    const userCount = await prisma.user.count();
    if (userCount > 0) {
      console.log(`[Database Sync] Database already initialized (${userCount} users found). Skipping seed.`);
      return;
    }

    const seedPath = path.join(__dirname, "seed-data.json");
    if (!fs.existsSync(seedPath)) {
      console.log("[Database Sync] No seed-data.json found. Skipping data sync.");
      return;
    }

    console.log("[Database Sync] New database detected. Synchronizing existing records from snapshot...");
    const raw = fs.readFileSync(seedPath, "utf-8");
    const data = JSON.parse(raw);

    // 1. Users
    if (Array.isArray(data.users)) {
      for (const u of data.users) {
        await prisma.user.upsert({
          where: { id: u.id },
          update: {},
          create: {
            id: u.id,
            name: u.name,
            email: u.email,
            passwordHash: u.passwordHash,
            role: u.role,
            isSuspended: Boolean(u.isSuspended),
            createdAt: new Date(u.createdAt),
            updatedAt: new Date(u.updatedAt || u.createdAt),
          },
        });
      }
      console.log(`[Database Sync] Restored ${data.users.length} users.`);
    }

    // 2. Profiles
    if (Array.isArray(data.profiles)) {
      for (const p of data.profiles) {
        await prisma.profile.upsert({
          where: { id: p.id },
          update: {},
          create: {
            id: p.id,
            userId: p.userId,
            status: p.status,
            visibility: p.visibility,
            moderationNotes: p.moderationNotes,
            rejectionReason: p.rejectionReason,
            ageConfirmed: Boolean(p.ageConfirmed),
            consentRecorded: Boolean(p.consentRecorded),
            consentTimestamp: p.consentTimestamp ? new Date(p.consentTimestamp) : null,
            consentVersion: p.consentVersion || "1.0",
            photoUrl: p.photoUrl,
            bio: p.bio,
            address: p.address,
            city: p.city,
            region: p.region,
            district: p.district,
            localArea: p.localArea,
            country: p.country || "India",
            favColor: p.favColor,
            phone: p.phone,
            whatsapp: p.whatsapp,
            hidePhoneFromPublic: Boolean(p.hidePhoneFromPublic),
            createdAt: new Date(p.createdAt),
            updatedAt: new Date(p.updatedAt || p.createdAt),
          },
        });
      }
      console.log(`[Database Sync] Restored ${data.profiles.length} companion profiles.`);
    }

    // 3. Profile Photos
    if (Array.isArray(data.photos)) {
      for (const ph of data.photos) {
        await prisma.profilePhoto.upsert({
          where: { id: ph.id },
          update: {},
          create: {
            id: ph.id,
            profileId: ph.profileId,
            url: ph.url,
            sha256Hash: ph.sha256Hash,
            order: ph.order ?? 0,
            isPrimary: Boolean(ph.isPrimary),
            status: ph.status || "APPROVED",
            createdAt: new Date(ph.createdAt),
          },
        });
      }
      console.log(`[Database Sync] Restored ${data.photos.length} profile photos.`);
    }

    // 4. Profile Rates
    if (Array.isArray(data.rates)) {
      for (const r of data.rates) {
        await prisma.profileRate.upsert({
          where: { id: r.id },
          update: {},
          create: {
            id: r.id,
            profileId: r.profileId,
            duration: r.duration,
            incall: Number(r.incall),
            outcall: Number(r.outcall),
            order: r.order ?? 0,
          },
        });
      }
    }

    // 5. Reports
    if (Array.isArray(data.reports)) {
      for (const rep of data.reports) {
        await prisma.report.upsert({
          where: { id: rep.id },
          update: {},
          create: {
            id: rep.id,
            profileId: rep.profileId,
            reporterId: rep.reporterId,
            category: rep.category,
            description: rep.description,
            status: rep.status || "PENDING",
            actionTaken: rep.actionTaken,
            ipAddress: rep.ipAddress,
            createdAt: new Date(rep.createdAt),
            updatedAt: new Date(rep.updatedAt || rep.createdAt),
          },
        });
      }
      console.log(`[Database Sync] Restored ${data.reports.length} moderation reports.`);
    }

    // 6. User Blocks
    if (Array.isArray(data.blocks)) {
      for (const b of data.blocks) {
        await prisma.userBlock.upsert({
          where: { id: b.id },
          update: {},
          create: {
            id: b.id,
            blockerId: b.blockerId,
            blockedId: b.blockedId,
            createdAt: new Date(b.createdAt),
          },
        });
      }
    }

    // 7. Moderation Actions
    if (Array.isArray(data.modActions)) {
      for (const ma of data.modActions) {
        await prisma.moderationAction.upsert({
          where: { id: ma.id },
          update: {},
          create: {
            id: ma.id,
            moderatorId: ma.moderatorId,
            targetType: ma.targetType,
            targetId: ma.targetId,
            action: ma.action,
            reason: ma.reason,
            createdAt: new Date(ma.createdAt),
          },
        });
      }
      console.log(`[Database Sync] Restored ${data.modActions.length} moderation actions.`);
    }

    // 8. Audit Logs
    if (Array.isArray(data.auditLogs)) {
      for (const al of data.auditLogs) {
        await prisma.auditLog.upsert({
          where: { id: al.id },
          update: {},
          create: {
            id: al.id,
            userId: al.userId,
            action: al.action,
            details: al.details,
            ipAddress: al.ipAddress,
            createdAt: new Date(al.createdAt),
          },
        });
      }
      console.log(`[Database Sync] Restored ${data.auditLogs.length} audit logs.`);
    }

    // 9. Contact Messages
    if (Array.isArray(data.messages)) {
      for (const cm of data.messages) {
        await prisma.contactMessage.upsert({
          where: { id: cm.id },
          update: {},
          create: {
            id: cm.id,
            name: cm.name,
            email: cm.email,
            message: cm.message,
            status: cm.status || "SENT",
            ipAddress: cm.ipAddress,
            createdAt: new Date(cm.createdAt),
          },
        });
      }
      console.log(`[Database Sync] Restored ${data.messages.length} contact messages.`);
    }

    console.log("[Database Sync] Initialization complete. All existing data safely preserved.");
  } catch (err) {
    console.error("[Database Sync] Synchronization warning:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
