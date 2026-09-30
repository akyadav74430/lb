import type { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/db";
import {
  ESCORT_PROFILES,
  dbProfileToEscortProfile,
  type EscortProfile,
} from "@/lib/profiles-data";
import { citySlug, displayCityName, normalizeKey } from "@/lib/seo/site";

/**
 * The single definition of "this profile may appear in public pages".
 *
 * SECURITY.md defines the visibility tiers; a profile is publicly listable only
 * when it is APPROVED, PUBLIC, and its owner account is not suspended. Every
 * public surface (city pages, service pages, sitemap, profile metadata) funnels
 * through this filter so private/draft/suspended content can never be indexed.
 */
export const publicProfileWhere: Prisma.ProfileWhereInput = {
  status: "APPROVED",
  visibility: "PUBLIC",
  user: { isSuspended: false },
};

const publicProfileSelect = {
  id: true,
  bio: true,
  city: true,
  region: true,
  district: true,
  localArea: true,
  country: true,
  gender: true,
  photoUrl: true,
  phone: true,
  whatsapp: true,
  hidePhoneFromPublic: true,
  updatedAt: true,
  user: { select: { name: true } },
  photos: { where: { status: "APPROVED" }, orderBy: { order: "asc" } },
  rates: { orderBy: { order: "asc" } },
} satisfies Prisma.ProfileSelect;

export interface CityListing {
  /** URL segment used by /city/<slug>. */
  slug: string;
  /** Human readable city name derived from the real stored value. */
  name: string;
  region: string | null;
  /** Number of publicly listable profiles in this city. */
  count: number;
  lastModified: Date;
  /** Raw `city` column values that map to this slug. */
  storedCities: string[];
}

/** Static/demo profiles that ship with the site are real, public content. */
function staticPublicProfiles(): EscortProfile[] {
  return ESCORT_PROFILES.filter((p) => p.city && p.city.trim().length > 0);
}

async function safeDbProfiles(
  where: Prisma.ProfileWhereInput
): Promise<EscortProfile[]> {
  try {
    const rows = await prisma.profile.findMany({
      where,
      select: publicProfileSelect,
      orderBy: { updatedAt: "desc" },
    });
    return rows.map((row) => dbProfileToEscortProfile(row));
  } catch (err) {
    // A database outage must not take the static listings down with it.
    console.error("Public profile query failed:", err);
    return [];
  }
}

/**
 * Every publicly listable profile (database + bundled static profiles).
 * Used by the /escorts service page and for internal linking.
 */
export async function listPublicProfiles(): Promise<EscortProfile[]> {
  const fromDb = await safeDbProfiles(publicProfileWhere);
  const dbIds = new Set(fromDb.map((p) => p.id));
  const fromStatic = staticPublicProfiles().filter((p) => !dbIds.has(p.id));
  return [...fromStatic, ...fromDb];
}

/**
 * A single publicly listable profile, or null when the profile is missing,
 * private, unpublished, unapproved, or belongs to a suspended account.
 */
export async function getPublicProfileById(
  id: string
): Promise<EscortProfile | null> {
  const staticProfile = staticPublicProfiles().find((p) => p.id === id);
  if (staticProfile) return staticProfile;

  const [profile] = await safeDbProfiles({ ...publicProfileWhere, id });
  return profile ?? null;
}

/** True when the id belongs to a profile that must never be indexed. */
export async function isNonPublicProfile(id: string): Promise<boolean> {
  try {
    const existing = await prisma.profile.findUnique({
      where: { id },
      select: { status: true, visibility: true, user: { select: { isSuspended: true } } },
    });
    if (!existing) return false;
    return !(
      existing.status === "APPROVED" &&
      existing.visibility === "PUBLIC" &&
      existing.user.isSuspended === false
    );
  } catch {
    return false;
  }
}

async function dbCityGroups(): Promise<{
  city: string | null;
  region: string | null;
  count: number;
  lastModified: Date | null;
}[]> {
  try {
    const groups = await prisma.profile.groupBy({
      by: ["city", "region"],
      where: { ...publicProfileWhere, city: { not: null } },
      _count: { _all: true },
      _max: { updatedAt: true },
    });

    return groups.map((group) => ({
      city: group.city,
      region: group.region,
      count: group._count._all,
      lastModified: group._max.updatedAt,
    }));
  } catch (err) {
    console.error("City aggregation failed:", err);
    return [];
  }
}

let cityCache: { at: number; entries: CityListing[] } | null = null;
const CITY_CACHE_MS = 60_000;

/**
 * Cities that genuinely have at least one publicly listable profile.
 *
 * This is what keeps /city/* from becoming a set of empty doorway pages: a city
 * only becomes a landing page when real listings back it.
 */
export async function listCitiesWithListings(): Promise<CityListing[]> {
  if (cityCache && Date.now() - cityCache.at < CITY_CACHE_MS) {
    return cityCache.entries;
  }

  const bySlug = new Map<string, CityListing>();

  const groups = await dbCityGroups();
  for (const group of groups) {
    const stored = group.city;
    if (!stored || !stored.trim()) continue;
    const slug = citySlug(stored);
    if (!slug) continue;

    const existing = bySlug.get(slug);
    if (existing) {
      existing.count += group.count;
      if (!existing.storedCities.includes(stored)) existing.storedCities.push(stored);
      if (group.lastModified && group.lastModified > existing.lastModified) {
        existing.lastModified = group.lastModified;
      }
      continue;
    }

    bySlug.set(slug, {
      slug,
      name: displayCityName(stored),
      region: group.region,
      count: group.count,
      lastModified: group.lastModified ?? new Date(0),
      storedCities: [stored],
    });
  }

  for (const profile of staticPublicProfiles()) {
    const slug = citySlug(profile.city);
    if (!slug) continue;
    const existing = bySlug.get(slug);
    if (existing) {
      existing.count += 1;
      if (!existing.storedCities.includes(profile.city)) {
        existing.storedCities.push(profile.city);
      }
      continue;
    }
    bySlug.set(slug, {
      slug,
      name: displayCityName(profile.city),
      region: profile.state ?? null,
      count: 1,
      lastModified: new Date(0),
      storedCities: [profile.city],
    });
  }

  const entries = [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );

  cityCache = { at: Date.now(), entries };
  return entries;
}

/** Resolve a /city/<slug> URL to a city that has real listings. */
export async function getCityListing(
  slug: string
): Promise<CityListing | null> {
  const normalized = normalizeKey(citySlug(slug));
  const cities = await listCitiesWithListings();
  return cities.find((c) => c.slug === normalized) ?? null;
}

/** The publicly listable profiles backing one city landing page. */
export async function getProfilesForCity(
  city: CityListing
): Promise<EscortProfile[]> {
  const fromDb = await safeDbProfiles({
    ...publicProfileWhere,
    city: { in: city.storedCities },
  });

  const dbIds = new Set(fromDb.map((p) => p.id));
  const fromStatic = staticPublicProfiles().filter(
    (p) => citySlug(p.city) === city.slug && !dbIds.has(p.id)
  );

  return [...fromStatic, ...fromDb];
}

/**
 * Genuine, per-city facts used to write the landing page body copy.
 *
 * This deliberately reads Prisma directly instead of going through
 * `dbProfileToEscortProfile`, because that mapper substitutes site-wide
 * defaults (a standard price table, a fixed service list, a default language
 * pair) whenever a real value is missing. Summing those defaults would make
 * every city page claim the same invented facts, so only values a companion
 * actually published are aggregated here.
 */
export interface CityAggregates {
  /** Districts or local areas a listed companion actually gave. */
  areas: string[];
  /** Lowest published rate across the city's listings, in whole rupees. */
  rateMin: number | null;
  /** Highest published rate across the city's listings, in whole rupees. */
  rateMax: number | null;
  /** Listings that carry a real published rate. */
  profilesWithRates: number;
}

const EMPTY_AGGREGATES: CityAggregates = {
  areas: [],
  rateMin: null,
  rateMax: null,
  profilesWithRates: 0,
};

/**
 * Rupee amounts below this are treated as keying errors, not real prices.
 *
 * The listings table holds hand-entered figures, and short keys are common
 * enough that single-digit and two-digit values show up (2, 55, 222). Printing
 * a range built from those would be literally true and completely useless, so
 * they are discarded and logged. Real companion rates start well above this.
 */
const MIN_PLAUSIBLE_RATE = 1000;

export async function getCityAggregates(
  city: CityListing
): Promise<CityAggregates> {
  try {
    const rows = await prisma.profile.findMany({
      where: { ...publicProfileWhere, city: { in: city.storedCities } },
      select: {
        district: true,
        localArea: true,
        rates: { select: { incall: true, outcall: true } },
      },
    });

    const areas = new Set<string>();
    const amounts: number[] = [];
    const discarded: number[] = [];
    let profilesWithRates = 0;

    for (const row of rows) {
      for (const value of [row.district, row.localArea]) {
        const trimmed = value?.trim();
        // Guard against placeholder text that carries no location meaning.
        if (trimmed && trimmed.length > 1) areas.add(trimmed);
      }

      if (row.rates.length > 0) {
        profilesWithRates += 1;
        for (const rate of row.rates) {
          for (const amount of [rate.incall, rate.outcall]) {
            if (!Number.isFinite(amount) || amount <= 0) continue;
            if (amount < MIN_PLAUSIBLE_RATE) discarded.push(amount);
            else amounts.push(amount);
          }
        }
      }
    }

    if (discarded.length > 0) {
      console.warn(
        `[seo] ${discarded.length} implausible rate value(s) ignored for "${city.slug}": ` +
          `${[...new Set(discarded)].sort((a, b) => a - b).join(", ")}. ` +
          `Fix these in the listings table; they are below the ${MIN_PLAUSIBLE_RATE} floor.`
      );
    }

    return {
      areas: [...areas].sort((a, b) => a.localeCompare(b)),
      rateMin: amounts.length ? Math.min(...amounts) : null,
      rateMax: amounts.length ? Math.max(...amounts) : null,
      profilesWithRates,
    };
  } catch (err) {
    console.error("City aggregate query failed:", err);
    return EMPTY_AGGREGATES;
  }
}