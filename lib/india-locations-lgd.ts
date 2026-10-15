/**
 * LGD Registry Integration - Server-side only
 *
 * This module contains all LGD (Local Government Directory) registry functionality
 * that depends on Prisma and server-side APIs. It should only be imported in
 * server-side code (Server Components, API routes, sitemap generation).
 *
 * DO NOT import this in Client Components.
 */

import { locationRegistry } from './locations/registry';
import { LGDState, LGDDistrict, LGDSubdistrict, LGDLocalBody } from './locations/lgd-source';
import { listPublicProfiles, getPublicProfileById } from '@/lib/seo/profiles';
import { matchProfileToLGD, buildLGDLookups } from '@/lib/locations/matcher-core';

/** Registry initialization state */
let registryInitialized = false;
let registryInitPromise: Promise<void> | null = null;

/**
 * Build profile counts mapped to LGD local body codes
 * Uses the LGD matcher to properly map profiles to LGD locations
 */
async function fetchProfileCountsLGD(): Promise<Map<string, number>> {
  const counts = new Map<string, number>();
  const profiles = await listPublicProfiles();

  // Get LGD local bodies for matching
  const { fetchLGDLocalBodies } = await import('./locations/lgd-source');
  const localBodies = await fetchLGDLocalBodies();
  const { buildLGDLookups, matchProfileToLGD } = await import('@/lib/locations/matcher-core');
  const lookups = buildLGDLookups(localBodies);

  for (const profile of profiles) {
    const match = matchProfileToLGD({
      profileId: profile.id,
      city: profile.city,
      district: profile.district,
      region: profile.state,
      localArea: profile.localArea,
    }, lookups);

    if (match.lgdLocation && match.lgdLocation.lgdCode) {
      const key = `localbody:${match.lgdLocation.lgdCode}`;
      counts.set(key, (counts.get(key) || 0) + 1);
    } else if (profile.city) {
      // Fallback for unmatched profiles - use composite key for city
      const cityKey = `${profile.state || ''}|${profile.city}|${profile.district || ''}|${profile.localArea || ''}`;
      counts.set(cityKey, (counts.get(cityKey) || 0) + 1);
    }
  }

  return counts;
}

/**
 * Initialize the LGD registry with official government data
 * This should be called once at server startup
 */
export async function initializeLGDRegistry(): Promise<void> {
  if (registryInitialized) return;
  if (registryInitPromise) return registryInitPromise;

  registryInitPromise = (async () => {
    try {
      console.log('[LGD] Initializing location registry from official Government of India data...');

      // Dynamic import to avoid bundling fetch in client
      const { fetchLGDStates, fetchLGDDistricts, fetchLGDSubdistricts, fetchLGDLocalBodies } =
        await import('./locations/lgd-source');

      // First fetch all LGD data
      const [states, districts, subdistricts, localBodies] = await Promise.all([
        fetchLGDStates(),
        fetchLGDDistricts(),
        fetchLGDSubdistricts(),
        fetchLGDLocalBodies(),
      ]);

      console.log(`[LGD] Fetched: ${states.length} states, ${districts.length} districts, ${subdistricts.length} subdistricts, ${localBodies.length} local bodies`);

      // Build profile counts using LGD matching
      const profileCounts = await fetchProfileCountsLGD();

      console.log(`[LGD] Profile counts mapped to ${profileCounts.size} LGD locations`);

      await locationRegistry.initialize(states, districts, subdistricts, localBodies, profileCounts);

      const stats = locationRegistry.getStats();
      console.log(`[LGD] Registry initialized: ${stats.states} states, ${stats.districts} districts, ${stats.subdistricts} subdistricts, ${stats.cities} cities, ${stats.indexableCities} indexable cities`);

      registryInitialized = true;
    } catch (error) {
      console.error('[LGD] Failed to initialize registry, falling back to static data:', error);
      registryInitialized = false;
      throw error;
    }
  })();

  return registryInitPromise;
}

/**
 * Check if LGD registry is ready
 */
export function isLGDRegistryReady(): boolean {
  return registryInitialized && locationRegistry.isReady();
}

/**
 * Get the LGD registry instance (after initialization)
 */
export function getLGDRegistry() {
  return locationRegistry;
}

/**
 * Enhanced search that uses LGD registry when available, falls back to static data
 */
export async function searchIndiaLocationsEnhanced(query: string, limit = 12) {
  if (isLGDRegistryReady()) {
    const results = locationRegistry.search(query, limit);
    return results.map(loc => ({
      type: loc.type as "state" | "district" | "city" | "localArea",
      displayName: loc.name,
      state: loc.stateName,
      district: loc.districtName,
      city: loc.type === 'city' ? loc.name : undefined,
      localArea: loc.type === 'locality' ? loc.name : undefined,
      hierarchy: `India › ${loc.stateName}${loc.districtName ? ` › ${loc.districtName}` : ''}${loc.name ? ` › ${loc.name}` : ''}${loc.subdistrictName ? ` › ${loc.subdistrictName}` : ''}`,
    }));
  }

  // Fallback to static data
  const { searchIndiaLocations } = await import('@/lib/india-locations');
  return searchIndiaLocations(query, limit);
}

/**
 * Get all states (uses LGD registry when available)
 */
export async function getAllStatesEnhanced(): Promise<string[]> {
  if (isLGDRegistryReady()) {
    return locationRegistry.getStates().map(s => s.name);
  }
  const { getAllStates } = await import('@/lib/india-locations');
  return getAllStates();
}

/**
 * Get districts for state (uses LGD registry when available)
 */
export async function getDistrictsForStateEnhanced(stateName: string): Promise<string[]> {
  if (isLGDRegistryReady()) {
    const state = locationRegistry.getStates().find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (state) {
      return locationRegistry.getDistrictsForState(state.id.replace('state:', '')).map(d => d.name);
    }
  }
  const { getDistrictsForState } = await import('@/lib/india-locations');
  return getDistrictsForState(stateName);
}

/**
 * Get cities for district (uses LGD registry when available)
 */
export async function getCitiesForDistrictEnhanced(stateName: string, districtName: string): Promise<string[]> {
  if (isLGDRegistryReady()) {
    const state = locationRegistry.getStates().find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (state) {
      const districts = locationRegistry.getDistrictsForState(state.id.replace('state:', ''));
      const district = districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
      if (district) {
        return locationRegistry.getCitiesForDistrict(
          state.id.replace('state:', ''),
          district.id.replace(`district:${state.id.replace('state:', '')}:`, '')
        ).map(c => c.name);
      }
    }
  }
  const { getCitiesForDistrict } = await import('@/lib/india-locations');
  return getCitiesForDistrict(stateName, districtName);
}

/**
 * Get local areas for city (uses LGD registry when available)
 */
export async function getLocalAreasEnhanced(stateName: string, districtName: string, cityName: string): Promise<string[]> {
  if (isLGDRegistryReady()) {
    const state = locationRegistry.getStates().find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (state) {
      const districts = locationRegistry.getDistrictsForState(state.id.replace('state:', ''));
      const district = districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
      if (district) {
        const cities = locationRegistry.getCitiesForDistrict(
          state.id.replace('state:', ''),
          district.id.replace(`district:${state.id.replace('state:', '')}:`, '')
        );
        const city = cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
        if (city) {
          // Localities are children of city
          return city.children.filter(l => l.type === 'locality').map(l => l.name);
        }
      }
    }
  }
  const { getLocalAreas } = await import('@/lib/india-locations');
  return getLocalAreas(stateName, districtName, cityName);
}

/**
 * Get indexable city pages for sitemap/generation
 */
export async function getIndexableCities(): Promise<Array<{ name: string; slug: string; state: string; district: string; count: number }>> {
  if (!isLGDRegistryReady()) return [];

  const cities = locationRegistry.getIndexableCities();
  return cities.map(city => ({
    name: city.name,
    slug: city.slug,
    state: city.stateName,
    district: city.districtName || '',
    count: city.listingCount,
  }));
}

/**
 * Get indexable locality pages for sitemap/generation
 */
export async function getIndexableLocalities(): Promise<Array<{ name: string; slug: string; city: string; state: string; count: number }>> {
  if (!isLGDRegistryReady()) return [];

  const localities = locationRegistry.getIndexableLocalities();
  return localities.map(loc => ({
    name: loc.name,
    slug: loc.slug,
    city: loc.parentId ? loc.parentId.replace(/^.*:/, '') : '',
    state: loc.stateName,
    count: loc.listingCount,
  }));
}