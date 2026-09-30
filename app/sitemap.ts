import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import {
  listCitiesWithListings,
  listPublicProfiles,
  publicProfileWhere,
} from "@/lib/seo/profiles";
import { absoluteUrl } from "@/lib/seo/site";

/** Epoch is our "unknown" sentinel for static-only cities: omit instead. */
function realDate(date: Date | null | undefined): Date | undefined {
  if (!date) return undefined;
  const time = date.getTime();
  if (!Number.isFinite(time) || time <= 0) return undefined;
  return date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // The directory itself changes as profiles are published.
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    {
      url: absoluteUrl("/escorts"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Long-lived editorial/legal pages. `lastModified` is deliberately omitted:
  // these change rarely, and stamping `new Date()` on every crawl tells crawlers
  // the whole site changed on every request.
  const infoRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/advertise"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/reviews"), changeFrequency: "daily", priority: 0.5 },
    { url: absoluteUrl("/blacklist"), changeFrequency: "weekly", priority: 0.3 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/dmca"), changeFrequency: "yearly", priority: 0.3 },
  ];

  // City landing pages: only cities that currently have public listings, so the
  // sitemap can never advertise an empty or 404 page.
  const cities = await listCitiesWithListings();
  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: absoluteUrl(`/city/${city.slug}`),
    lastModified: realDate(city.lastModified),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Profile pages: same public filter the pages themselves use.
  const profiles = await listPublicProfiles();
  const updatedAtById = new Map<string, Date>();
  try {
    const rows = await prisma.profile.findMany({
      where: publicProfileWhere,
      select: { id: true, updatedAt: true },
    });
    for (const row of rows) updatedAtById.set(row.id, row.updatedAt);
  } catch {
    // Keep serving the sitemap; lastModified is optional.
  }

  const profileRoutes: MetadataRoute.Sitemap = profiles.map((profile) => ({
    url: absoluteUrl(`/profile/${profile.id}`),
    lastModified: realDate(updatedAtById.get(profile.id)),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...coreRoutes, ...cityRoutes, ...profileRoutes, ...infoRoutes];
}