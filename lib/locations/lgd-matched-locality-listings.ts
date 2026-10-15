export {}; // Force module mode
/**
 * LGD-Matched Locality Listing Functions
 *
 * These functions use the LGD matcher to provide stable, LGD-code-based
 * locality listings for SEO pages.
 */

import { Prisma } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db';
import { ESCORT_PROFILES } from '@/lib/profiles-data';
import { citySlug, displayCityName } from '@/lib/seo/site';
import { publicProfileWhere } from '@/lib/seo/profiles';
import { fetchLGDLocalBodies } from './lgd-source';
import { buildLGDLookups, matchProfileToLGD } from './matcher-core';
import { locationRegistry, Location } from './registry';

/** Return type for LGD-matched locality listings */
type LGDMatchedLocalityListing = {
  lgdCode: string;
  slug: string;
  name: string;
  citySlug: string;
  cityName: string;
  region: string | null;
  count: number;
  lastModified: Date;
  storedLocalAreas: string[];
  lgdLocation: Location;
};

/** Function return type */
type GetLGDMatchedLocalityListingsReturn = Promise<Array<LGDMatchedLocalityListing>>;

/**
 * Get LGD-matched locality listings using database as source of truth with LGD matching
 */
export async function getLGDMatchedLocalityListings(): GetLGDMatchedLocalityListingsReturn {
  const localBodies = await fetchLGDLocalBodies();
  const lookups = buildLGDLookups(localBodies);

  let profiles: Array<{ id: string; city: string | null; localArea: string | null; region: string | null; district: string | null; updatedAt: Date | null }> = [];
  try {
    const { prisma } = await import('@/lib/db');
    const { publicProfileWhere } = await import('@/lib/seo/profiles');
    profiles = await prisma.profile.findMany({
      where: { ...publicProfileWhere, localArea: { not: null }, city: { not: null } },
      select: { id: true, city: true, localArea: true, region: true, district: true, updatedAt: true },
    });
  } catch (err) {
    console.warn('[getLGDMatchedLocalityListings] Database unavailable, falling back to static profiles:', err);
    profiles = [];
  }

  const { ESCORT_PROFILES: staticProfiles } = await import('@/lib/profiles-data');
  const staticProfileList = staticProfiles.filter(p => p.city && p.localArea);

  const localityGroups = new Map<string, LocalityGroupValue>();

  /** Map value type for locality groups */
  type LocalityGroupValue = {
    lgdCode: string;
    name: string;
    slug: string;
    citySlug: string;
    cityName: string;
    region: string | null;
    count: number;
    lastModified: Date;
    storedLocalAreas: Set<string>;
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

    if (match.lgdLocation && match.lgdLocation.type === 'locality' && match.lgdLocation.lgdCode) {
      const lgdCode = match.lgdLocation.lgdCode;
      const existing = localityGroups.get(lgdCode);
      if (existing) {
        existing.count += 1;
        existing.storedLocalAreas.add(profile.localArea || '');
        if (profile.updatedAt && profile.updatedAt > existing.lastModified) {
          existing.lastModified = profile.updatedAt;
        }
      } else {
        localityGroups.set(lgdCode, {
          lgdCode,
          name: match.lgdLocation.name,
          slug: match.lgdLocation.slug,
          citySlug: match.lgdLocation.parentId?.split(':').pop() || '',
          cityName: match.lgdLocation.name,
          region: match.lgdLocation.stateName ?? null,
          count: 1,
          lastModified: profile.updatedAt ?? new Date(0),
          storedLocalAreas: new Set([profile.localArea || '']),
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

    if (match.lgdLocation && match.lgdLocation.type === 'locality' && match.lgdLocation.lgdCode) {
      const lgdCode = match.lgdLocation.lgdCode;
      const existing = localityGroups.get(lgdCode);
      if (existing) {
        existing.count += 1;
        existing.storedLocalAreas.add(profile.localArea ?? '');
      } else {
        localityGroups.set(lgdCode, {
          lgdCode,
          name: match.lgdLocation.name,
          slug: match.lgdLocation.slug,
          citySlug: match.lgdLocation.parentId?.split(':').pop() || '',
          cityName: match.lgdLocation.name,
          region: match.lgdLocation.stateName ?? null,
          count: 1,
          lastModified: new Date(0),
          storedLocalAreas: new Set([profile.localArea ?? '']),
          lgdLocation: match.lgdLocation,
        });
      }
    }
  }

  return Array.from(localityGroups.values())
    .map(g => ({
      ...g,
      storedLocalAreas: Array.from(g.storedLocalAreas),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}