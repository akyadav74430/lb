import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  const p = await prisma.profile.findMany({
    where: { status: "APPROVED" },
    include: {
      user: { select: { id: true, name: true } },
      photos: { where: { status: "APPROVED" }, orderBy: { order: "asc" } },
    },
  });
  console.log("Found profiles:", p.length);
  console.log("Profiles:", JSON.stringify(p, null, 2));
}

main().finally(() => prisma.$disconnect());
