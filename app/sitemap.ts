import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import {
  listCitiesWithListings,
  listLocalitiesWithListings,
  listPublicProfiles,
  publicProfileWhere,
} from "@/lib/seo/profiles";
import { absoluteUrl, citySlug } from "@/lib/seo/site";

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
  const cityRoutes: MetadataRoute.Sitemap = cities
    .filter((city) => city.count > 0)
    .map((city) => ({
      url: absoluteUrl(`/call-girls-in/${city.slug}`),
      lastModified: realDate(city.lastModified),
      changeFrequency: "daily",
      priority: 0.8,
    }));

  // Locality landing pages: only localities that currently have public listings.
  const localities = await listLocalitiesWithListings();
  const localityRoutes: MetadataRoute.Sitemap = localities
    .filter((loc) => loc.count > 0)
    .map((loc) => ({
      url: absoluteUrl(`/call-girls-in/${loc.citySlug}/${loc.slug}`),
      lastModified: realDate(loc.lastModified),
      changeFrequency: "daily",
      priority: 0.7,
    }));

  // Profile pages: same public filter the pages themselves use.
  const profiles = await listPublicProfiles();
  // State landing pages are only advertised when real public profiles back
  // them. Query-string filters remain UI variants and are not sitemap URLs.
  const stateSlugs = new Set(
    profiles
      .map((profile) => profile.state?.trim())
      .filter((state): state is string => Boolean(state))
      .map((state) => citySlug(state)),
  );
  const stateRoutes: MetadataRoute.Sitemap = [...stateSlugs].map((slug) => ({
    url: absoluteUrl(`/locations/${slug}`),
    changeFrequency: "daily",
    priority: 0.65,
  }));
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
    // DIAGNOSTIC: Log exact photoUrl structure for profile/1 in production
    if (process.env.NODE_ENV === "production" && profile.id === "1") {
      console.log("[sitemap-root-cause] profile/1 photoUrl:", {
        type: typeof profile.photoUrl,
        value: profile.photoUrl,
        constructor: profile.photoUrl?.constructor?.name,
        keys: profile.photoUrl && typeof profile.photoUrl === "object" ? Object.keys(profile.photoUrl) : null,
        profileKeys: Object.keys(profile),
      });
    }
    // Image sitemap entries removed to guarantee valid XML.
    // Primary goal: valid sitemap with all page <loc> entries.
    // Image entries are optional and were causing [object Object] errors.
    return entry;
  });

  // Combine all routes, deduplicate by URL
  const allRoutes = [
    ...coreRoutes,
    ...stateRoutes,
    ...cityRoutes,
    ...localityRoutes,
    ...profileRoutes,
    ...infoRoutes,
  ];
  const seen = new Set<string>();
  const uniqueRoutes = allRoutes.filter(route => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });

  return uniqueRoutes;
}
