import { PrismaClient } from "../lib/generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Testing exact requested query from app/(main)/profile/edit/page.tsx...");

  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found in database");
    return;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      photos: {
        orderBy: {
          order: "asc",
        },
      },
      user: true,
    },
  });

  console.log("✓ Query succeeded without PrismaClientValidationError!");
  console.log("Found profile:", profile ? profile.id : "No profile for user yet");
  if (profile) {
    console.log("Profile user name:", profile.user.name);
    console.log("Photos count:", profile.photos.length);
    console.log("Photos data:", profile.photos);
  }
}

main()
  .catch((e) => {
    console.error("Query test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
