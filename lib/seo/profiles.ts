import type { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/db";
import {
  ESCORT_PROFILES,
  dbProfileToEscortProfile,
  MIN_PLAUSIBLE_RATE as PROFILE_MIN_PLAUSIBLE_RATE,
  type EscortProfile,
} from "@/lib/profiles-data";
import { citySlug, displayCityName, normalizeKey } from "@/lib/seo/site";
import { MAJOR_CITIES, MAJOR_CITY_BY_SLUG } from "@/lib/seo/major-cities";
// Import LGD-matched functions from dedicated module
import { getLGDMatchedCityListings, getLGDMatchedLocalityListings } from '@/lib/seo/lgd-matched-listings';

/** Major city localities derived from static profiles and major city definitions */
const MAJOR_CITY_LOCALITIES: Record<string, Array<{ name: string; slug: string }>> = {
  mumbai: [
    { name: "Bandra West", slug: "bandra-west" },
    { name: "Andheri West", slug: "andheri-west" },
    { name: "Juhu", slug: "juhu" },
    { name: "Colaba", slug: "colaba" },
    { name: "Powai", slug: "powai" },
    { name: "Worli", slug: "worli" },
    { name: "BKC", slug: "bkc" },
    { name: "Thane", slug: "thane" },
    { name: "Navi Mumbai", slug: "navi-mumbai" },
    { name: "Santacruz", slug: "santacruz" },
  ],
  delhi: [
    { name: "South Delhi", slug: "south-delhi" },
    { name: "Connaught Place", slug: "connaught-place" },
    { name: "Aerocity", slug: "aerocity" },
    { name: "Dwarka", slug: "dwarka" },
    { name: "Vasant Kunj", slug: "vasant-kunj" },
    { name: "Karol Bagh", slug: "karol-bagh" },
    { name: "Saket", slug: "saket" },
    { name: "Hauz Khas", slug: "hauz-khas" },
    { name: "Greater Kailash", slug: "greater-kailash" },
  ],
  bangalore: [
    { name: "Koramangala", slug: "koramangala" },
    { name: "Indiranagar", slug: "indiranagar" },
    { name: "Whitefield", slug: "whitefield" },
    { name: "HSR Layout", slug: "hsr-layout" },
    { name: "MG Road", slug: "mg-road" },
    { name: "Electronic City", slug: "electronic-city" },
    { name: "Jayanagar", slug: "jayanagar" },
    { name: "Marathahalli", slug: "marathahalli" },
    { name: "Hebbal", slug: "hebbal" },
  ],
  pune: [
    { name: "Koregaon Park", slug: "koregaon-park" },
    { name: "Viman Nagar", slug: "viman-nagar" },
    { name: "Hinjewadi", slug: "hinjewadi" },
    { name: "Kalyani Nagar", slug: "kalyani-nagar" },
    { name: "Baner", slug: "baner" },
    { name: "Wakad", slug: "wakad" },
    { name: "Shivaji Nagar", slug: "shivaji-nagar" },
    { name: "Aundh", slug: "aundh" },
    { name: "Magarpatta", slug: "magarpatta" },
  ],
  hyderabad: [
    { name: "Banjara Hills", slug: "banjara-hills" },
    { name: "Jubilee Hills", slug: "jubilee-hills" },
    { name: "Hitech City", slug: "hitech-city" },
    { name: "Gachibowli", slug: "gachibowli" },
    { name: "Madhapur", slug: "madhapur" },
    { name: "Kondapur", slug: "kondapur" },
    { name: "Begumpet", slug: "begumpet" },
    { name: "Somajiguda", slug: "somajiguda" },
  ],
  goa: [
    { name: "Calangute", slug: "calangute" },
    { name: "Baga", slug: "baga" },
    { name: "Candolim", slug: "candolim" },
    { name: "Panaji", slug: "panaji" },
    { name: "Anjuna", slug: "anjuna" },
    { name: "Arpora", slug: "arpora" },
    { name: "Colva", slug: "colva" },
    { name: "Morjim", slug: "morjim" },
    { name: "Vagator", slug: "vagator" },
  ],
  kolkata: [
    { name: "Park Street", slug: "park-street" },
    { name: "Salt Lake", slug: "salt-lake" },
    { name: "New Town", slug: "new-town" },
    { name: "Ballygunge", slug: "ballygunge" },
    { name: "Alipore", slug: "alipore" },
    { name: "Howrah", slug: "howrah" },
    { name: "Rajarhat", slug: "rajarhat" },
    { name: "Gariahat", slug: "gariahat" },
  ],
  chennai: [
    { name: "T Nagar", slug: "t-nagar" },
    { name: "Nungambakkam", slug: "nungambakkam" },
    { name: "OMR", slug: "omr" },
    { name: "Velachery", slug: "velachery" },
    { name: "Anna Nagar", slug: "anna-nagar" },
    { name: "Guindy", slug: "guindy" },
    { name: "ECR", slug: "ecr" },
    { name: "Alwarpet", slug: "alwarpet" },
  ],
  jaipur: [
    { name: "C-Scheme", slug: "c-scheme" },
    { name: "Vaishali Nagar", slug: "vaishali-nagar" },
    { name: "Malviya Nagar", slug: "malviya-nagar" },
    { name: "Mansarovar", slug: "mansarovar" },
    { name: "MI Road", slug: "mi-road" },
    { name: "Tonk Road", slug: "tonk-road" },
    { name: "Raja Park", slug: "raja-park" },
  ],
  ahmedabad: [
    { name: "SG Highway", slug: "sg-highway" },
    { name: "Bodakdev", slug: "bodakdev" },
    { name: "Satellite", slug: "satellite" },
    { name: "Vastrapur", slug: "vastrapur" },
    { name: "Prahlad Nagar", slug: "prahlad-nagar" },
    { name: "Navrangpura", slug: "navrangpura" },
    { name: "Thaltej", slug: "thaltej" },
  ],
  chandigarh: [
    { name: "Sector 17", slug: "sector-17" },
    { name: "Sector 35", slug: "sector-35" },
    { name: "Sector 22", slug: "sector-22" },
    { name: "Sector 8", slug: "sector-8" },
    { name: "Mohali", slug: "mohali" },
    { name: "Panchkula", slug: "panchkula" },
    { name: "Zirakpur", slug: "zirakpur" },
    { name: "IT Park", slug: "it-park" },
  ],
  lucknow: [
    { name: "Gomti Nagar", slug: "gomti-nagar" },
    { name: "Hazratganj", slug: "hazratganj" },
    { name: "Aliganj", slug: "aliganj" },
    { name: "Indira Nagar", slug: "indira-nagar" },
    { name: "Vibhuti Khand", slug: "vibhuti-khand" },
    { name: "Charbagh", slug: "charbagh" },
  ],
  noida: [
    { name: "Sector 18", slug: "sector-18" },
    { name: "Sector 62", slug: "sector-62" },
    { name: "Sector 50", slug: "sector-50" },
    { name: "Sector 137", slug: "sector-137" },
    { name: "Sector 15", slug: "sector-15" },
    { name: "Greater Noida", slug: "greater-noida" },
    { name: "Pari Chowk", slug: "pari-chowk" },
  ],
  gurgaon: [
    { name: "DLF Cyber City", slug: "dlf-cyber-city" },
    { name: "Sector 29", slug: "sector-29" },
    { name: "Golf Course Road", slug: "golf-course-road" },
    { name: "Sohna Road", slug: "sohna-road" },
    { name: "Sector 56", slug: "sector-56" },
    { name: "MG Road Gurgaon", slug: "mg-road-gurgaon" },
    { name: "Udyog Vihar", slug: "udyog-vihar" },
  ],
  surat: [
    { name: "Vesu", slug: "vesu" },
    { name: "Dumas Road", slug: "dumas-road" },
    { name: "Adajan", slug: "adajan" },
    { name: "Varachha", slug: "varachha" },
    { name: "Piplod", slug: "piplod" },
    { name: "Ghod Dod Road", slug: "ghod-dod-road" },
  ],
  indore: [
    { name: "Vijay Nagar", slug: "vijay-nagar" },
    { name: "Palasia", slug: "palasia" },
    { name: "AB Road", slug: "ab-road" },
    { name: "Bhawar Kuan", slug: "bhawar-kuan" },
    { name: "Sapna Sangeeta", slug: "sapna-sangeeta" },
  ],
  bhubaneswar: [
    { name: "Patia", slug: "patia" },
    { name: "Saheed Nagar", slug: "saheed-nagar" },
    { name: "Nayapalli", slug: "nayapalli" },
    { name: "Jayadev Vihar", slug: "jayadev-vihar" },
    { name: "Chandrasekharpur", slug: "chandrasekharpur" },
    { name: "Khandagiri", slug: "khandagiri" },
  ],
  cochin: [
    { name: "Ernakulam", slug: "ernakulam" },
    { name: "Marine Drive", slug: "marine-drive" },
    { name: "MG Road", slug: "mg-road" },
    { name: "Kakkanad", slug: "kakkanad" },
    { name: "Fort Kochi", slug: "fort-kochi" },
    { name: "Edappally", slug: "edappally" },
  ],
  dehradun: [
    { name: "Rajpur Road", slug: "rajpur-road" },
    { name: "Jakhan", slug: "jakhan" },
    { name: "Sahastradhara Road", slug: "sahastradhara-road" },
    { name: "Clement Town", slug: "clement-town" },
    { name: "Ballupur", slug: "ballupur" },
  ],
  patna: [
    { name: "Bailey Road", slug: "bailey-road" },
    { name: "Kankarbagh", slug: "kankarbagh" },
    { name: "Boring Road", slug: "boring-road" },
    { name: "Fraser Road", slug: "fraser-road" },
    { name: "Danapur", slug: "danapur" },
  ],
};

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

// In-memory cache for public profiles (60s TTL matches ISR revalidate)
let publicProfilesCache: { data: EscortProfile[]; timestamp: number } | null = null;
const PUBLIC_PROFILES_TTL_MS = 60_000;

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
 * Cached for 60 seconds to avoid hitting DB on every request.
 */
export async function listPublicProfiles(): Promise<EscortProfile[]> {
  const now = Date.now();
  if (publicProfilesCache && now - publicProfilesCache.timestamp < PUBLIC_PROFILES_TTL_MS) {
    return publicProfilesCache.data;
  }

  const fromDb = await safeDbProfiles(publicProfileWhere);
  const dbIds = new Set(fromDb.map((p) => p.id));
  const fromStatic = staticPublicProfiles().filter((p) => !dbIds.has(p.id));
  const combined = [...fromStatic, ...fromDb];

  publicProfilesCache = { data: combined, timestamp: now };
  return combined;
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
 *
 * Now uses LGD-matched data as the source of truth for stable city identification.
 */
export async function listCitiesWithListings(): Promise<CityListing[]> {
  if (cityCache && Date.now() - cityCache.at < CITY_CACHE_MS) {
    return cityCache.entries;
  }

  try {
    // Use LGD-matched data as primary source of truth
    const lgdCities = await getLGDMatchedCityListings();

    // Convert to CityListing format
    const entries: CityListing[] = lgdCities.map(city => ({
      slug: city.slug,
      name: city.name,
      region: city.region,
      count: city.count,
      lastModified: city.lastModified,
      storedCities: city.storedCities,
    }));

    // If LGD matching returns no results, fall back to legacy method
    if (entries.length === 0) {
      console.warn('[listCitiesWithListings] LGD matching returned empty results, falling back to legacy method');
      const fallbackEntries = await fallbackListCitiesWithListings();
      return mergeMajorCities(fallbackEntries);
    }

    // Merge major cities to ensure all major hubs are included
    const mergedEntries = mergeMajorCities(entries);
    cityCache = { at: Date.now(), entries: mergedEntries };
    return mergedEntries;
  } catch (error) {
    console.error('[listCitiesWithListings] LGD matching failed, falling back to legacy method:', error);
    const fallbackEntries = await fallbackListCitiesWithListings();
    return mergeMajorCities(fallbackEntries);
  }
}

function mergeMajorCities(entries: CityListing[]): CityListing[] {
  const bySlug = new Map<string, CityListing>();
  
  // Add existing entries
  for (const entry of entries) {
    bySlug.set(entry.slug, entry);
  }
  
  // Add major cities (with count=0 if not already present)
  for (const majorCity of MAJOR_CITIES) {
    if (!bySlug.has(majorCity.slug)) {
      bySlug.set(majorCity.slug, {
        slug: majorCity.slug,
        name: majorCity.name,
        region: majorCity.region,
        count: 0,
        lastModified: new Date(0),
        storedCities: [majorCity.name],
      });
    }
  }
  
  // Sort: cities with listings first, then alphabetically
  return [...bySlug.values()].sort(
    (a, b) => (b.count - a.count) || a.name.localeCompare(b.name)
  );
}

async function fallbackListCitiesWithListings(): Promise<CityListing[]> {
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

  return mergeMajorCities(entries);
}

/** Resolve a /city/<slug> URL to a city that has real listings or major hub status. */
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
    (p) =>
      (citySlug(p.city) === city.slug ||
        city.storedCities.some((c) => c.toLowerCase() === p.city.toLowerCase())) &&
      !dbIds.has(p.id)
  );

  const direct = [...fromStatic, ...fromDb];
  // Only return profiles genuinely associated with this city
  return direct;
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
 *
 * The floor itself lives in `lib/profiles-data.ts` so the profile pages and this
 * aggregation cannot drift apart; `sanitizeRates()` applies the same rule to the
 * rate table each profile page renders.
 */
const MIN_PLAUSIBLE_RATE = PROFILE_MIN_PLAUSIBLE_RATE;

export async function getCityAggregates(
  city: CityListing
): Promise<CityAggregates> {
  const major = MAJOR_CITY_BY_SLUG.get(city.slug);

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

    const finalAreas =
      areas.size > 0
        ? [...areas].sort((a, b) => a.localeCompare(b))
        : (major?.areas ?? []);

    return {
      areas: finalAreas,
      rateMin: amounts.length ? Math.min(...amounts) : (major?.rateMin ?? null),
      rateMax: amounts.length ? Math.max(...amounts) : (major?.rateMax ?? null),
      profilesWithRates: profilesWithRates || (major ? 1 : 0),
    };
  } catch (err) {
    console.error("City aggregate query failed:", err);
    if (major) {
      return {
        areas: major.areas,
        rateMin: major.rateMin,
        rateMax: major.rateMax,
        profilesWithRates: 1,
      };
    }
    return EMPTY_AGGREGATES;
  }
}

/**
 * Locality listing interface for /call-girls-in/<city>/<locality> pages
 */
export interface LocalityListing {
  /** URL segment for the locality. */
  slug: string;
  /** Human readable locality name. */
  name: string;
  /** Parent city slug. */
  citySlug: string;
  /** Parent city name. */
  cityName: string;
  /** Region/state name. */
  region: string | null;
  /** Number of publicly listable profiles in this locality. */
  count: number;
  lastModified: Date;
  /** Raw `localArea` column values that map to this slug. */
  storedLocalAreas: string[];
}

let localityCache: { at: number; entries: LocalityListing[] } | null = null;
const LOCALITY_CACHE_MS = 60_000;

/**
 * Localities that genuinely have at least one publicly listable profile.
 * A locality only becomes a landing page when real listings back it.
 *
 * Now uses LGD-matched data as the source of truth for stable locality identification.
 */
export async function listLocalitiesWithListings(): Promise<LocalityListing[]> {
  if (localityCache && Date.now() - localityCache.at < LOCALITY_CACHE_MS) {
    return localityCache.entries;
  }

  try {
    // Use LGD-matched data as primary source of truth
    const lgdLocalities = await getLGDMatchedLocalityListings();

    // Convert to LocalityListing format
    const entries: LocalityListing[] = lgdLocalities.map(loc => ({
      slug: loc.slug,
      name: loc.name,
      citySlug: loc.citySlug,
      cityName: loc.cityName,
      region: loc.region,
      count: loc.count,
      lastModified: loc.lastModified,
      storedLocalAreas: loc.storedLocalAreas,
    }));

    // If LGD matching returns no results, fall back to legacy method
    if (entries.length === 0) {
      console.warn('[listLocalitiesWithListings] LGD matching returned empty results, falling back to legacy method');
      const fallbackEntries = await fallbackListLocalitiesWithListings();
      return mergeMajorLocalities(fallbackEntries);
    }

    // Merge major localities to ensure all major hubs are included
    const mergedEntries = mergeMajorLocalities(entries);
    localityCache = { at: Date.now(), entries: mergedEntries };
    return mergedEntries;
  } catch (error) {
    console.error('[listLocalitiesWithListings] LGD matching failed, falling back to legacy method:', error);
    const fallbackEntries = await fallbackListLocalitiesWithListings();
    return mergeMajorLocalities(fallbackEntries);
  }
}

function mergeMajorLocalities(entries: LocalityListing[]): LocalityListing[] {
  const bySlug = new Map<string, LocalityListing>();
  
  // Add existing entries
  for (const entry of entries) {
    const compositeSlug = `${entry.citySlug}|${entry.slug}`;
    bySlug.set(compositeSlug, entry);
  }
  
  // Add major city localities (with count=0 if not already present)
  for (const [citySlug, localities] of Object.entries(MAJOR_CITY_LOCALITIES)) {
    const majorCity = MAJOR_CITY_BY_SLUG.get(citySlug);
    if (!majorCity) continue;
    
    for (const locality of localities) {
      const compositeSlug = `${citySlug}|${locality.slug}`;
      if (!bySlug.has(compositeSlug)) {
        bySlug.set(compositeSlug, {
          slug: locality.slug,
          name: locality.name,
          citySlug,
          cityName: majorCity.name,
          region: majorCity.region,
          count: 0,
          lastModified: new Date(0),
          storedLocalAreas: [locality.name],
        });
      }
    }
  }
  
  // Sort: localities with listings first, then alphabetically
  return [...bySlug.values()].sort(
    (a, b) => (b.count - a.count) || a.name.localeCompare(b.name)
  );
}

async function fallbackListLocalitiesWithListings(): Promise<LocalityListing[]> {
  const groups = await prisma.profile.groupBy({
    by: ["city", "localArea", "region"],
    where: { ...publicProfileWhere, localArea: { not: null }, city: { not: null } },
    _count: { _all: true },
    _max: { updatedAt: true },
  });

  const bySlug = new Map<string, LocalityListing>();

  for (const group of groups) {
    const storedCity = group.city;
    const storedLocalArea = group.localArea;
    if (!storedCity || !storedCity.trim() || !storedLocalArea || !storedLocalArea.trim()) continue;

    const citySlug_ = citySlug(storedCity);
    const localitySlug_ = citySlug(storedLocalArea);
    if (!citySlug_ || !localitySlug_) continue;

    const compositeSlug = `${citySlug_}|${localitySlug_}`;

    const existing = bySlug.get(compositeSlug);
    if (existing) {
      existing.count += group._count._all;
      if (!existing.storedLocalAreas.includes(storedLocalArea)) existing.storedLocalAreas.push(storedLocalArea);
      if (group._max.updatedAt && group._max.updatedAt > existing.lastModified) {
        existing.lastModified = group._max.updatedAt;
      }
      continue;
    }

    bySlug.set(compositeSlug, {
      slug: localitySlug_,
      name: displayCityName(storedLocalArea),
      citySlug: citySlug_,
      cityName: displayCityName(storedCity),
      region: group.region,
      count: group._count._all,
      lastModified: group._max.updatedAt ?? new Date(0),
      storedLocalAreas: [storedLocalArea],
    });
  }

  // Also add static profiles
  for (const profile of staticPublicProfiles()) {
    if (!profile.city || !profile.localArea) continue;
    const citySlug_ = citySlug(profile.city);
    const localitySlug_ = citySlug(profile.localArea);
    if (!citySlug_ || !localitySlug_) continue;

    const compositeSlug = `${citySlug_}|${localitySlug_}`;
    const existing = bySlug.get(compositeSlug);
    if (existing) {
      existing.count += 1;
      if (!existing.storedLocalAreas.includes(profile.localArea)) {
        existing.storedLocalAreas.push(profile.localArea);
      }
      continue;
    }

    bySlug.set(compositeSlug, {
      slug: localitySlug_,
      name: displayCityName(profile.localArea),
      citySlug: citySlug_,
      cityName: displayCityName(profile.city),
      region: profile.state ?? null,
      count: 1,
      lastModified: new Date(0),
      storedLocalAreas: [profile.localArea],
    });
  }

  const entries = [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  );

  return mergeMajorLocalities(entries);
}

/** Resolve a /call-girls-in/<city>/<locality> URL to a locality with real listings. */
export async function getLocalityListing(
  citySlug: string,
  localitySlug: string
): Promise<LocalityListing | null> {
  const normalizedCity = normalizeKey(citySlug);
  const normalizedLocality = normalizeKey(localitySlug);
  const compositeKey = `${normalizedCity}|${normalizedLocality}`;

  const localities = await listLocalitiesWithListings();
  return localities.find((l) =>
    normalizeKey(l.citySlug) === normalizedCity &&
    normalizeKey(l.slug) === normalizedLocality
  ) ?? null;
}

/** The publicly listable profiles backing one locality landing page. */
export async function getProfilesForLocality(
  locality: LocalityListing
): Promise<EscortProfile[]> {
  const fromDb = await safeDbProfiles({
    ...publicProfileWhere,
    city: locality.cityName,
    localArea: { in: locality.storedLocalAreas },
  });

  const dbIds = new Set(fromDb.map((p) => p.id));
  const fromStatic = staticPublicProfiles().filter(
    (p) =>
      displayCityName(p.city) === locality.cityName &&
      locality.storedLocalAreas.some((la) => la.toLowerCase() === (p.localArea || '').toLowerCase()) &&
      !dbIds.has(p.id)
  );

  return [...fromStatic, ...fromDb];
}