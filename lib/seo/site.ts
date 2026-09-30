/**
 * Central SEO / site configuration.
 *
 * Everything that needs an absolute URL (canonicals, Open Graph, sitemap,
 * robots.txt) resolves through here so the production domain is defined once.
 */

import type { Metadata } from "next";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lovebite.live";

/** Production origin, never with a trailing slash. */
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const BRAND = "Lovebite";
export const SITE_NAME = "Lovebite";
export const SITE_DOMAIN = "lovebite.live";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return `${SITE_URL}/`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * "New Delhi" / "new delhi" -> "new-delhi"
 * Used for the readable /city/<slug> URLs.
 */
export function citySlug(city: string): string {
  return city
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * "new-delhi" -> "New Delhi"
 * Inverse of citySlug for names we only have as a URL segment.
 */
export function slugToCityName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Normalise a city string stored by a user for display, without inventing a
 * different name than the one they entered: "delhi" -> "Delhi", "DELHI" -> "Delhi".
 */
export function displayCityName(city: string): string {
  return city
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * "Delhi" + "Delhi" -> "Delhi".
 *
 * Several Indian states share a name with their capital, and the directory
 * stores the value in both `city` and `region`, so naive joining renders
 * "Delhi, Delhi" in titles and body copy. Used everywhere the pair is shown.
 */
export function cityRegionLabel(
  city: string,
  region: string | null | undefined
): string {
  const name = displayCityName(city);
  const area = region ? displayCityName(region) : "";
  if (!area) return name;
  return area.toLowerCase() === name.toLowerCase() ? name : `${name}, ${area}`;
}

/** Collapse whitespace and hard-truncate meta text on a word boundary. */
export function clampMeta(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim().replace(/[,;:\-–]$/, "")}…`;
}

/** Same slug collision guard used to de-duplicate city listings. */
export function normalizeKey(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * robots directives for pages that must never reach an index.
 *
 * Lives here (not in metadata.ts) so that client-only pages can apply it from a
 * layout without pulling the Prisma client into their module graph.
 */
export const NO_INDEX = {
  index: false,
  follow: false,
  nocache: true,
  googleBot: {
    index: false,
    follow: false,
    noimageindex: true,
    "max-image-preview": "none",
    "max-snippet": 0,
  },
} satisfies Metadata["robots"];