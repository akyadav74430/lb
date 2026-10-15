export {}; // Force module mode
/**
 * LGD-Matched City Listing Functions
 *
 * These functions use the LGD matcher to provide stable, LGD-code-based
 * city listings for SEO pages.
 */

import { Prisma } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db';
import { ESCORT_PROFILES } from '@/lib/profiles-data';
import { citySlug, displayCityName } from '@/lib/seo/site';
import { publicProfileWhere } from '@/lib/seo/profiles';
import { fetchLGDLocalBodies } from './lgd-source';
import { buildLGDLookups, matchProfileToLGD } from './matcher-core';
import { locationRegistry, Location } from './registry';

/** Return type for LGD-matched city listings */
type LGDMatchedCityListing = {
  lgdCode: string;
  slug: string;
  name: string;
  region: string | null;
  count: number;
  lastModified: Date;
  storedCities: string[];
  lgdLocation: Location;
};

/** Function return type */
type GetLGDMatchedCityListingsReturn = Promise<Array<LGDMatchedCityListing>>;

/**
 * Get LGD-matched city listings using database as source of truth with LGD matching
 */
export async function getLGDMatchedCityListings(): GetLGDMatchedCityListingsReturn {
  const localBodies = await fetchLGDLocalBodies();
  const lookups = buildLGDLookups(localBodies);

  let profiles: Array<{ id: string; city: string | null; district: string | null; region: string | null; localArea: string | null; updatedAt: Date | null }> = [];
  try {
    const { prisma } = await import('@/lib/db');
    const { publicProfileWhere } = await import('@/lib/seo/profiles');
    profiles = await prisma.profile.findMany({
      where: publicProfileWhere,
      select: { id: true, city: true, district: true, region: true, localArea: true, updatedAt: true },
    });
  } catch (err) {
    console.warn('[getLGDMatchedCityListings] Database unavailable, falling back to static profiles:', err);
    profiles = [];
  }

  const { ESCORT_PROFILES: staticProfiles } = await import('@/lib/profiles-data');
  const staticProfileList = staticProfiles.filter(p => p.city && p.city.trim().length > 0);

  const cityGroups = new Map<string, CityGroupValue>();

  /** Map value type for city groups */
  type CityGroupValue = {
    lgdCode: string;
    name: string;
    slug: string;
    region: string | null;
    count: number;
    lastModified: Date;
    storedCities: Set<string>;
    lgdLocation: Location;
  };

  // Process DB profiles
  for (const profile of profiles) {
    const match = matchProfileToLGD({
      profileId: profile.id,
      city: profile.city,
      district: profile.district,
      region: profile.region,
      localArea: profile.localArea,
    }, lookups);

    if (match.lgdLocation && match.lgdLocation.type === 'city' && match.lgdLocation.lgdCode) {
      const lgdCode = match.lgdLocation.lgdCode;
      const existing = cityGroups.get(lgdCode);
      if (existing) {
        existing.count += 1;
        existing.storedCities.add(profile.city || '');
        if (profile.updatedAt && profile.updatedAt > existing.lastModified) {
          existing.lastModified = profile.updatedAt;
        }
      } else {
        cityGroups.set(lgdCode, {
          lgdCode,
          name: match.lgdLocation.name,
          slug: match.lgdLocation.slug,
          region: match.lgdLocation.stateName ?? null,
          count: 1,
          lastModified: profile.updatedAt ?? new Date(0),
          storedCities: new Set([profile.city || '']),
          lgdLocation: match.lgdLocation,
        });
      }
    }
  }

  // Process static profiles
  for (const profile of staticProfileList) {
    const match = matchProfileToLGD({
      profileId: profile.id,
      city: profile.city,
      district: profile.district,
      region: profile.state,
      localArea: profile.localArea,
    }, lookups);

    if (match.lgdLocation && match.lgdLocation.type === 'city' && match.lgdLocation.lgdCode) {
      const lgdCode = match.lgdLocation.lgdCode;
      const existing = cityGroups.get(lgdCode);
      if (existing) {
        existing.count += 1;
        existing.storedCities.add(profile.city ?? '');
      } else {
        cityGroups.set(lgdCode, {
          lgdCode,
          name: match.lgdLocation.name,
          slug: match.lgdLocation.slug,
          region: match.lgdLocation.stateName ?? null,
          count: 1,
          lastModified: new Date(0),
          storedCities: new Set([profile.city ?? '']),
          lgdLocation: match.lgdLocation,
        });
      }
    }
  }

  // Convert to array and sort
  return Array.from(cityGroups.values())
    .map(g => ({
      ...g,
      storedCities: Array.from(g.storedCities),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}