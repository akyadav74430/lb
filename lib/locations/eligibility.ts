/**
 * Listing Eligibility Checker
 *
 * Determines which locations qualify for indexable SEO pages based on
 * actual approved public profile data. Prevents thin/empty doorway pages.
 */

import { Location } from './registry';
import { listPublicProfiles, getPublicProfileById } from '@/lib/seo/profiles';

export interface EligibilityResult {
  isEligible: boolean;
  reason: string;
  listingCount: number;
  indexableType: 'city' | 'locality' | 'none';
}

export interface EligibilityConfig {
  /** Minimum number of profiles required for a city to be indexable */
  minCityProfiles: number;
  /** Minimum number of profiles required for a locality to be indexable */
  minLocalityProfiles: number;
  /** Whether to allow indexable pages for locations with 0 profiles but high commercial value */
  allowCommercialHubs: boolean;
  /** List of LGD codes for commercial hubs that should be indexable even with 0 profiles */
  commercialHubLgdCodes: string[];
}

/**
 * Default eligibility configuration
 */
export const DEFAULT_ELIGIBILITY_CONFIG: EligibilityConfig = {
  minCityProfiles: 1,
  minLocalityProfiles: 1,
  allowCommercialHubs: false, // Strict: no indexable pages without real listings
  commercialHubLgdCodes: [],
};

/**
 * Check if a location is eligible for an indexable SEO page
 */
export function checkLocationEligibility(
  location: Location,
  config: EligibilityConfig = DEFAULT_ELIGIBILITY_CONFIG
): EligibilityResult {
  const count = location.listingCount;

  // State, district, subdistrict are never directly indexable (directory only)
  if (['state', 'district', 'subdistrict'].includes(location.type)) {
    return {
      isEligible: false,
      reason: `${location.type} pages are directory-only (noindex)`,
      listingCount: count,
      indexableType: 'none',
    };
  }

  // Cities: eligible if they have listings OR are commercial hubs
  if (location.type === 'city') {
    if (count >= config.minCityProfiles) {
      return {
        isEligible: true,
        reason: `City has ${count} public profile${count === 1 ? '' : 's'}`,
        listingCount: count,
        indexableType: 'city',
      };
    }

    if (config.allowCommercialHubs && config.commercialHubLgdCodes.includes(location.lgdCode || '')) {
      return {
        isEligible: true,
        reason: 'Commercial hub (configured exception)',
        listingCount: count,
        indexableType: 'city',
      };
    }

    return {
      isEligible: false,
      reason: `City has ${count} profile${count === 1 ? '' : 's'} (minimum ${config.minCityProfiles} required)`,
      listingCount: count,
      indexableType: 'none',
    };
  }

  // Localities: eligible if they have listings
  if (location.type === 'locality') {
    if (count >= config.minLocalityProfiles) {
      return {
        isEligible: true,
        reason: `Locality has ${count} public profile${count === 1 ? '' : 's'}`,
        listingCount: count,
        indexableType: 'locality',
      };
    }

    return {
      isEligible: false,
      reason: `Locality has ${count} profile${count === 1 ? '' : 's'} (minimum ${config.minLocalityProfiles} required)`,
      listingCount: count,
      indexableType: 'none',
    };
  }

  // Villages: never directly indexable (map to parent city)
  if (location.type === 'village') {
    return {
      isEligible: false,
      reason: 'Villages map to parent city/locality page',
      listingCount: count,
      indexableType: 'none',
    };
  }

  return {
    isEligible: false,
    reason: `Unknown location type: ${location.type}`,
    listingCount: count,
    indexableType: 'none',
  };
}

/**
 * Get all indexable locations from a registry
 */
export function getIndexableLocations(
  locations: Map<string, Location>,
  config: EligibilityConfig = DEFAULT_ELIGIBILITY_CONFIG
): Location[] {
  const indexable: Location[] = [];

  for (const location of locations.values()) {
    const result = checkLocationEligibility(location, config);
    if (result.isEligible) {
      indexable.push(location);
    }
  }

  return indexable;
}

/**
 * Get indexable cities
 */
export function getIndexableCities(
  locations: Map<string, Location>,
  config: EligibilityConfig = DEFAULT_ELIGIBILITY_CONFIG
): Location[] {
  return Array.from(locations.values())
    .filter(l => l.type === 'city')
    .filter(l => checkLocationEligibility(l, config).isEligible);
}

/**
 * Get indexable localities
 */
export function getIndexableLocalities(
  locations: Map<string, Location>,
  config: EligibilityConfig = DEFAULT_ELIGIBILITY_CONFIG
): Location[] {
  return Array.from(locations.values())
    .filter(l => l.type === 'locality')
    .filter(l => checkLocationEligibility(l, config).isEligible);
}

/**
 * Build eligibility report for all locations
 */
export function buildEligibilityReport(
  locations: Map<string, Location>,
  config: EligibilityConfig = DEFAULT_ELIGIBILITY_CONFIG
): {
  total: number;
  eligible: number;
  byType: Record<string, { total: number; eligible: number }>;
  ineligibleReasons: Record<string, number>;
} {
  const report = {
    total: 0,
    eligible: 0,
    byType: {} as Record<string, { total: number; eligible: number }>,
    ineligibleReasons: {} as Record<string, number>,
  };

  for (const location of locations.values()) {
    report.total++;
    const type = location.type;

    if (!report.byType[type]) {
      report.byType[type] = { total: 0, eligible: 0 };
    }
    report.byType[type].total++;

    const result = checkLocationEligibility(location, config);
    if (result.isEligible) {
      report.eligible++;
      report.byType[type].eligible++;
    } else {
      const reason = result.reason;
      report.ineligibleReasons[reason] = (report.ineligibleReasons[reason] || 0) + 1;
    }
  }

  return report;
}

/**
 * Check if a location should be in the sitemap
 */
export function shouldIncludeInSitemap(
  location: Location,
  config: EligibilityConfig = DEFAULT_ELIGIBILITY_CONFIG
): boolean {
  return checkLocationEligibility(location, config).isEligible;
}

/**
 * Get canonical URL for a location based on eligibility
 * Returns null if location should not have a canonical URL (not indexable)
 */
export function getCanonicalUrlForLocation(location: Location): string | null {
  const isEligible = checkLocationEligibility(location).isEligible;
  if (!isEligible) return null;

  switch (location.type) {
    case 'city':
      return `/call-girls-in/${location.slug}`;
    case 'locality':
      // Need parent city slug - would need registry access
      return `/call-girls-in/${location.slug}`; // Simplified
    default:
      return null;
  }
}