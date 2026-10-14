/**
 * Core Location Matcher - Essential Matching Logic
 *
 * Contains the core matching logic without heavy dependencies.
 * Used by lgd-matched-listings.ts and india-locations.ts.
 */

import { locationRegistry, Location } from './registry';
import { LGDLocalBody } from './lgd-source';
import { citySlug, displayCityName, normalizeKey } from '@/lib/seo/site';
import { publicProfileWhere } from '@/lib/seo/profiles';
import { Prisma } from '@/lib/generated/prisma';
import { prisma } from '@/lib/db';

export interface ProfileLocationInput {
  city: string | null | undefined;
  district: string | null | undefined;
  region: string | null | undefined;
  localArea: string | null | undefined;
  profileId: string;
}

export interface MatchedLocation {
  profileId: string;
  lgdLocation: Location | null;
  matchType: 'exact' | 'city-only' | 'ambiguous' | 'unmatched';
  candidates: Location[];
  matchedBy: 'lgd-code' | 'city-slug' | 'city-name' | 'locality-slug' | 'locality-name' | 'none';
  warning?: string;
}

export interface MatchReport {
  total: number;
  exact: number;
  cityOnly: number;
  ambiguous: number;
  unmatched: number;
  details: MatchedLocation[];
}

/**
 * Normalize a location name for comparison
 */
function normalizeLocationName(name: string | null | undefined): string {
  if (!name) return '';
  return normalizeKey(displayCityName(name));
}

/**
 * Build lookup maps for LGD local bodies for efficient matching
 */
interface LGDLookups {
  byLocalBodyCode: Map<string, LGDLocalBody>;
  byCitySlug: Map<string, LGDLocalBody[]>;
  byCityName: Map<string, LGDLocalBody[]>;
  byLocalitySlug: Map<string, LGDLocalBody[]>;
  byLocalityName: Map<string, LGDLocalBody[]>;
  byDistrictSlug: Map<string, LGDLocalBody[]>;
  byStateCode: Map<string, LGDLocalBody[]>;
}

function buildLGDLookups(localBodies: LGDLocalBody[]): LGDLookups {
  const byLocalBodyCode = new Map<string, LGDLocalBody>();
  const byCitySlug = new Map<string, LGDLocalBody[]>();
  const byCityName = new Map<string, LGDLocalBody[]>();
  const byLocalitySlug = new Map<string, LGDLocalBody[]>();
  const byLocalityName = new Map<string, LGDLocalBody[]>();
  const byDistrictSlug = new Map<string, LGDLocalBody[]>();
  const byStateCode = new Map<string, LGDLocalBody[]>();

  for (const lb of localBodies) {
    if (lb.localbodyCode) {
      byLocalBodyCode.set(lb.localbodyCode, lb);
    }

    const citySlug_ = citySlug(lb.localbodyName);
    if (citySlug_) {
      const arr = byCitySlug.get(citySlug_) || [];
      arr.push(lb);
      byCitySlug.set(citySlug_, arr);
    }

    const cityNameNorm = normalizeLocationName(lb.localbodyName);
    if (cityNameNorm) {
      const arr = byCityName.get(cityNameNorm) || [];
      arr.push(lb);
      byCityName.set(cityNameNorm, arr);
    }

    if (lb.villageName) {
      const localitySlug = citySlug(lb.villageName);
      if (localitySlug) {
        const arr = byLocalitySlug.get(localitySlug) || [];
        arr.push(lb);
        byLocalitySlug.set(localitySlug, arr);
      }
      const localityNameNorm = normalizeLocationName(lb.villageName);
      if (localityNameNorm) {
        const arr = byLocalityName.get(localityNameNorm) || [];
        arr.push(lb);
        byLocalityName.set(localityNameNorm, arr);
      }
    }

    const districtSlug = citySlug(lb.districtName);
    if (districtSlug) {
      const arr = byDistrictSlug.get(districtSlug) || [];
      arr.push(lb);
      byDistrictSlug.set(districtSlug, arr);
    }

    if (lb.districtCode && lb.stateName) {
      const stateCode = lb.stateName.toUpperCase().replace(/\s+/g, '_');
      const arr = byStateCode.get(stateCode) || [];
      arr.push(lb);
      byStateCode.set(stateCode, arr);
    }
  }

  return {
    byLocalBodyCode,
    byCitySlug,
    byCityName,
    byLocalitySlug,
    byLocalityName,
    byDistrictSlug,
    byStateCode,
  };
}

/**
 * Match a single profile to LGD locations
 */
export function matchProfileToLGD(
  profile: ProfileLocationInput,
  lookups: LGDLookups
): MatchedLocation {
  const { city, district, region, localArea, profileId } = profile;
  const candidates: Location[] = [];
  let matchedLocation: Location | null = null;
  let matchType: MatchedLocation['matchType'] = 'unmatched';
  let matchedBy: MatchedLocation['matchedBy'] = 'none';
  let warning: string | undefined;

  const registry = locationRegistry;
  const bySlugMap = registry.getBySlugMap();

  const citySlug_ = city ? citySlug(city) : '';
  const districtSlug_ = district ? citySlug(district) : '';
  const localAreaSlug_ = localArea ? citySlug(localArea) : '';
  const regionNorm = region ? normalizeLocationName(region) : '';

  if (citySlug_ && localAreaSlug_) {
    const cityLocations = Array.from(bySlugMap.values())
      .filter(l => l.type === 'city' && normalizeKey(l.slug) === normalizeKey(citySlug_));

    for (const cityLoc of cityLocations) {
      const localityChildren = cityLoc.children.filter(
        c => c.type === 'locality' && normalizeKey(c.slug) === normalizeKey(localAreaSlug_)
      );
      candidates.push(...localityChildren);
    }
  }

  if (citySlug_) {
    const lgdByCitySlug = lookups.byCitySlug.get(citySlug_);
    if (lgdByCitySlug && lgdByCitySlug.length > 0) {
      for (const lb of lgdByCitySlug) {
        if (district && normalizeKey(lb.districtName) !== normalizeKey(district)) continue;
        if (region && normalizeLocationName(lb.stateName) !== regionNorm) continue;

        const loc = registry.getLocation(`localbody:${lb.localbodyCode}`);
        if (loc) candidates.push(loc);
      }
    }
  }

  if (!candidates.length && city) {
    const cityNameNorm = normalizeLocationName(city);
    const lgdByCityName = lookups.byCityName.get(cityNameNorm);
    if (lgdByCityName && lgdByCityName.length > 0) {
      for (const lb of lgdByCityName) {
        if (district && normalizeKey(lb.districtName) !== normalizeKey(district)) continue;
        if (region && normalizeLocationName(lb.stateName) !== regionNorm) continue;

        const loc = registry.getLocation(`localbody:${lb.localbodyCode}`);
        if (loc) candidates.push(loc);
      }
    }
  }

  if (localAreaSlug_) {
    const lgdByLocalitySlug = lookups.byLocalitySlug.get(localAreaSlug_);
    if (lgdByLocalitySlug && lgdByLocalitySlug.length > 0) {
      for (const lb of lgdByLocalitySlug) {
        if (city && normalizeKey(lb.localbodyName) !== normalizeKey(city)) continue;
        if (district && normalizeKey(lb.districtName) !== normalizeKey(district)) continue;
        if (region && normalizeLocationName(lb.stateName) !== regionNorm) continue;

        const loc = registry.getLocation(`localbody:${lb.localbodyCode}`);
        if (loc) candidates.push(loc);
      }
    }
  }

  if (!candidates.length && localArea) {
    const localityNameNorm = normalizeLocationName(localArea);
    const lgdByLocalityName = lookups.byLocalityName.get(localityNameNorm);
    if (lgdByLocalityName && lgdByLocalityName.length > 0) {
      for (const lb of lgdByLocalityName) {
        if (city && normalizeKey(lb.localbodyName) !== normalizeKey(city)) continue;
        if (district && normalizeKey(lb.districtName) !== normalizeKey(district)) continue;
        if (region && normalizeLocationName(lb.stateName) !== regionNorm) continue;

        const loc = registry.getLocation(`localbody:${lb.localbodyCode}`);
        if (loc) candidates.push(loc);
      }
    }
  }

  const uniqueCandidates = Array.from(new Map(candidates.map(c => [c.id, c])).values());

  if (uniqueCandidates.length === 1) {
    matchedLocation = uniqueCandidates[0];
    matchType = 'exact';
    matchedBy = 'lgd-code';
  } else if (uniqueCandidates.length > 1) {
    const uniqueByLGDCode = new Map<string, Location>();
    for (const c of uniqueCandidates) {
      if (c.lgdCode && !uniqueByLGDCode.has(c.lgdCode)) {
        uniqueByLGDCode.set(c.lgdCode, c);
      }
    }
    if (uniqueByLGDCode.size === 1) {
      matchedLocation = uniqueByLGDCode.values().next().value!;
      matchType = 'exact';
      matchedBy = 'lgd-code';
    } else {
      matchType = 'ambiguous';
      matchedBy = 'city-slug';
      warning = `Ambiguous match: ${uniqueCandidates.length} LGD locations match profile ${profileId} (city: ${city}, district: ${district}, locality: ${localArea})`;
    }
  } else if (city) {
    matchType = 'city-only';
    matchedBy = 'city-slug';
    warning = `Profile ${profileId} matched to city only (no locality match): ${city}`;
  } else {
    matchType = 'unmatched';
    matchedBy = 'none';
    warning = `Profile ${profileId} could not be matched to any LGD location (city: ${city}, district: ${district}, locality: ${localArea})`;
  }

  return {
    profileId,
    lgdLocation: matchedLocation,
    matchType,
    candidates: uniqueCandidates,
    matchedBy,
    warning,
  };
}

export { buildLGDLookups };