import { PrismaClient } from "../lib/generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding admin and moderation test data...");

  const adminHash = await bcrypt.hash("Admin@123456", 10);
  const userHash = await bcrypt.hash("User@123456", 10);

  // 1. Create or update SUPER_ADMIN
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@lovebite.com" },
    update: {
      role: "SUPER_ADMIN",
      name: "Lovebite Safety Director",
    },
    create: {
      name: "Lovebite Safety Director",
      email: "admin@lovebite.com",
      passwordHash: adminHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Super Admin seeded:", superAdmin.email, "Role:", superAdmin.role);

  // 2. Create or update a Moderator
  const moderator = await prisma.user.upsert({
    where: { email: "moderator@lovebite.com" },
    update: {
      role: "MODERATOR",
      name: "Kavita Mod",
    },
    create: {
      name: "Kavita Mod",
      email: "moderator@lovebite.com",
      passwordHash: adminHash,
      role: "MODERATOR",
    },
  });
  console.log("Moderator seeded:", moderator.email, "Role:", moderator.role);

  // 3. Create a test user with a profile in UNDER_REVIEW
  const reviewUser = await prisma.user.upsert({
    where: { email: "ananya.delhi@lovebite.com" },
    update: { name: "Ananya Sharma" },
    create: {
      name: "Ananya Sharma",
      email: "ananya.delhi@lovebite.com",
      passwordHash: userHash,
      role: "REGISTERED_USER",
    },
  });

  const reviewProfile = await prisma.profile.upsert({
    where: { userId: reviewUser.id },
    update: {
      status: "UNDER_REVIEW",
      city: "New Delhi",
      region: "Delhi",
      district: "South Delhi",
      localArea: "Hauz Khas",
      bio: "Sophisticated companion available for upscale dinner dates and cultural events in Delhi NCR.",
      ageConfirmed: true,
      consentRecorded: true,
      consentTimestamp: new Date(),
      photoUrl: "/profiles/ananya.jpg",
    },
    create: {
      userId: reviewUser.id,
      status: "UNDER_REVIEW",
      city: "New Delhi",
      region: "Delhi",
      district: "South Delhi",
      localArea: "Hauz Khas",
      bio: "Sophisticated companion available for upscale dinner dates and cultural events in Delhi NCR.",
      ageConfirmed: true,
      consentRecorded: true,
      consentTimestamp: new Date(),
      photoUrl: "/profiles/ananya.jpg",
    },
  });

  // Add photos for reviewProfile
  await prisma.profilePhoto.deleteMany({ where: { profileId: reviewProfile.id } });
  await prisma.profilePhoto.createMany({
    data: [
      {
        profileId: reviewProfile.id,
        url: "/profiles/ananya.jpg",
        sha256Hash: "d8e8fca2dc0f896fd7cb4cb0031ba24900e3e609756fbab6f2b84cf633a2fe21",
        order: 0,
        isPrimary: true,
        status: "APPROVED",
      },
      {
        profileId: reviewProfile.id,
        url: "/profiles/ananya-2.jpg",
        sha256Hash: "9a2f1b4c3e5d6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
        order: 1,
        isPrimary: false,
        status: "APPROVED",
      },
    ],
  });

  // 4. Create a sample safety report
  const existingReport = await prisma.report.findFirst({
    where: { profileId: reviewProfile.id },
  });

  if (!existingReport) {
    await prisma.report.create({
      data: {
        profileId: reviewProfile.id,
        reporterId: moderator.id,
        category: "STOLEN_PHOTOS",
        description: "Checking image copyright authenticity on social media platforms.",
        status: "PENDING",
      },
    });
    console.log("Sample report created for Ananya profile");
  }

  // 5. Create initial audit log entry
  await prisma.auditLog.create({
    data: {
      userId: superAdmin.id,
      action: "ADMIN_BOOTSTRAP",
      details: "Database initialized with secure RBAC and Trust & Safety moderation schemas.",
    },
  });

  console.log("Seed complete! Super Admin credentials: admin@lovebite.com / Admin@123456");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
