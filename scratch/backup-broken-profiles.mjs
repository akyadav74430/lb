import "dotenv/config";
import { writeFileSync } from "node:fs";
import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

const IDS = [
  "cmuiro2rl0008lc0425f7ojrr", // divya  - bio "test", placeholder phone, junk rates
  "cmuje84jz0003l2042k4r91iw", // vaani  - copied "Gasti"/Chandigarh spam, 9-digit phone
  "cmuiq53270001kz04k7eo0817", // admin  - SUPER_ADMIN account listed as a Delhi escort
];

const backup = await prisma.profile.findMany({
  where: { id: { in: IDS } },
  include: { rates: true, user: { select: { name: true, email: true, role: true } } },
});

const stamp = new Date().toISOString();
writeFileSync(
  "scratch/profile-backup.json",
  JSON.stringify({ savedAt: stamp, profiles: backup }, null, 2)
);
console.log(`Backup written to scratch/profile-backup.json (${backup.length} profiles)\n`);

for (const p of backup) {
  console.log(
    `BACKED UP: name=${p.user?.name} email=${p.user?.email} role=${p.user?.role} bioLen=${(p.bio ?? "").length} rates=${p.rates.length} vis=${p.visibility}`
  );
}

await prisma.$disconnect();
