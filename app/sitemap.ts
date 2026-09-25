import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getAllProfiles } from "@/lib/profiles-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lovebite.com";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/advertise",
    "/blacklist",
    "/reviews",
    "/contact",
    "/privacy",
    "/terms",
    "/signin",
    "/signup",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Demo profile routes
  const demoProfiles: MetadataRoute.Sitemap = getAllProfiles().map((p) => ({
    url: `${baseUrl}/profile/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Database approved public profiles
  try {
    const dbProfiles = await prisma.profile.findMany({
      where: { status: "APPROVED", visibility: "PUBLIC" },
      select: { id: true, updatedAt: true },
      take: 1000,
    });

    const dbProfileRoutes: MetadataRoute.Sitemap = dbProfiles.map((p) => ({
      url: `${baseUrl}/profile/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    return [...staticRoutes, ...demoProfiles, ...dbProfileRoutes];
  } catch {
    return [...staticRoutes, ...demoProfiles];
  }
}
