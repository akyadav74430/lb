import { PrismaClient } from "@/lib/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient | undefined;

function createMockPrismaClient(): PrismaClient {
  // Return a mock client that returns empty arrays for all queries
  // This allows build to succeed without DATABASE_URL
  const mockClient = {
    profile: {
      findMany: async () => [],
      findUnique: async () => null,
      groupBy: async () => [],
      findFirst: async () => null,
      count: async () => 0,
      create: async () => ({}),
      update: async () => ({}),
      delete: async () => ({}),
    },
    user: {
      findUnique: async () => null,
      findMany: async () => [],
      create: async () => ({}),
      update: async () => ({}),
    },
    report: {
      create: async () => ({}),
    },
    auditLog: {
      create: async () => ({}),
    },
    $queryRaw: async () => [],
    $executeRaw: async () => 0,
    $disconnect: async () => {},
  } as unknown as PrismaClient;

  return mockClient;
}

function getPrismaClient(): PrismaClient {
  if (prismaInstance) return prismaInstance;
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (!process.env.DATABASE_URL) {
    // During build without DATABASE_URL, use a mock client that returns empty results
    // This allows build to succeed while using static fallback data
    console.warn('[Prisma] DATABASE_URL not set, using mock client for build');
    prismaInstance = createMockPrismaClient();
    return prismaInstance;
  }
  prismaInstance = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;
  return prismaInstance;
}

export const prisma = getPrismaClient();
