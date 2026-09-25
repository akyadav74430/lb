import { PrismaClient } from "../lib/generated/prisma/index.js";

async function main() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "mysql://lovebite:lovebite_secure_pass_2026@localhost:3307/lovebite"
      }
    }
  });

  try {
    const userCount = await prisma.user.count();
    console.log("Successfully connected to MySQL on localhost:3307!");
    console.log("Total users found:", userCount);
    const users = await prisma.user.findMany({ select: { id: true, name: true, email: true } });
    console.log("Users:", users.map(u => ({ id: u.id, email: u.email })));
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
