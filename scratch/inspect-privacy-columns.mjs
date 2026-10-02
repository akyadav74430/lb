import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

try {
  const cols = await prisma.$queryRawUnsafe(
    `SELECT table_name, column_name, data_type
     FROM information_schema.columns
     WHERE table_name IN ('Profile','User')
       AND column_name IN ('hidePhoneFromPublic','isSuspended','status','visibility','phone','whatsapp')
     ORDER BY table_name, column_name`
  );
  console.log("privacy columns:", JSON.stringify(cols, null, 2));

  const rows = await prisma.$queryRawUnsafe(
    `SELECT p."id", p."status", p."visibility", p."hidePhoneFromPublic",
            COALESCE(u."isSuspended", false) AS "isSuspended",
            (p."phone" IS NOT NULL) AS "hasPhone",
            (p."whatsapp" IS NOT NULL) AS "hasWhatsapp"
     FROM "Profile" p JOIN "User" u ON u."id" = p."userId"
     ORDER BY p."updatedAt" DESC LIMIT 10`
  );
  console.log("profiles:", JSON.stringify(rows, null, 2));
} catch (err) {
  console.error("QUERY_FAILED:", err.message.split("\n")[0]);
} finally {
  await prisma.$disconnect();
}
