import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import {
  listCitiesWithListings,
  listPublicProfiles,
  publicProfileWhere,
} from "@/lib/seo/profiles";
import { absoluteUrl } from "@/lib/seo/site";

/**
 * The sitemap queries the database, so it must not be baked at build time.
 * Without this, unpublishing or deleting a profile leaves its URL advertised in
 * sitemap.xml until the next deploy — which is how crawkers end up requesting
 * pages that 404. An hourly revalidate keeps the submitted URLs honest without
 * rebuilding.
 */
export const revalidate = 3600;

/** Epoch is our "unknown" sentinel for static-only cities: omit instead. */
function realDate(date: Date | null | undefined): Date | undefined {
  if (!date) return undefined;
  const time = date.getTime();
  if (!Number.isFinite(time) || time <= 0) return undefined;
  return date;
}

/**
 * Safely extract a valid absolute URL string for sitemap image:loc.
 * Returns undefined if the value is not a valid string URL.
 * Extremely defensive: validates input type, output type, and URL format.
 */
function getValidImageUrl(photoUrl: unknown): string | undefined {
  // Reject non-strings immediately (objects, null, undefined, numbers, etc.)
  if (typeof photoUrl !== "string") {
    if (process.env.NODE_ENV !== "production" && photoUrl != null) {
      console.warn("[sitemap] Invalid photoUrl type:", typeof photoUrl, photoUrl);
    }
    return undefined;
  }

  const trimmed = photoUrl.trim();
  if (!trimmed) return undefined;

  let absolute: string;
  try {
    absolute = absoluteUrl(trimmed);
  } catch {
    return undefined;
  }

  // Ensure absoluteUrl actually returned a string (defense against unexpected behavior)
  if (typeof absolute !== "string") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sitemap] absoluteUrl returned non-string:", typeof absolute, absolute);
    }
    return undefined;
  }

  // Validate it's a well-formed absolute URL with allowed scheme
  try {
    const parsed = new URL(absolute);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return undefined;
    }
    // Ensure hostname matches our canonical domain (defense against injection)
    if (!parsed.hostname.endsWith("lovebite.live")) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[sitemap] External image URL rejected:", absolute);
      }
      return undefined;
    }
    return absolute;
  } catch {
    return undefined;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // The directory itself changes as profiles are published.
  const now = new Date();

  const coreRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    // The head-term landing page. Kept separate from "/" so the two can target
    // different queries ("call girls" vs. the browsable directory) without
    // competing as duplicates.
    {
      url: absoluteUrl("/call-girls"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
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
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.4 },
    // The safety/verification FAQ is the most linkable asset the site has and the
    // page most likely to earn a position for long-tail safety queries, so it is
    // submitted alongside the trust pages it depends on.
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.6 },
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

  const profileRoutes: MetadataRoute.Sitemap = profiles.map((profile) => {
    const profileUrl = absoluteUrl(`/profile/${profile.id}`);
    const entry: MetadataRoute.Sitemap[number] = {
      url: profileUrl,
      lastModified: realDate(updatedAtById.get(profile.id)),
      changeFrequency: "weekly",
      priority: 0.7,
    };
    // Include the primary photo in the sitemap so Google Images can
    // associate the photo with the profile URL without crawling the page.
    const imageUrl = getValidImageUrl(profile.photoUrl);
    if (imageUrl) {
      // @ts-expect-error — Next.js sitemap type does not yet expose `images`
      // but Google Sitemaps spec supports it and Googlebot processes it.
      entry.images = [{ loc: imageUrl }];
    }
    return entry;
  });

  return [...coreRoutes, ...cityRoutes, ...profileRoutes, ...infoRoutes];
}