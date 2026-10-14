/**
 * Unified Location Registry
 *
 * Combines LGD states, districts, subdistricts, and local bodies into a single
 * searchable hierarchy. Provides stable IDs, slugs, and parent-child relationships.
 */

import { LGDState, LGDDistrict, LGDSubdistrict, LGDLocalBody } from './lgd-source';
import { citySlug } from '@/lib/seo/site';

export type LocationType = 'state' | 'district' | 'subdistrict' | 'city' | 'locality' | 'village';

export interface Location {
  id: string;
  type: LocationType;
  name: string;
  nameLocal?: string;
  slug: string;
  parentId?: string;
  stateCode: string;
  stateName: string;
  districtCode?: string;
  districtName?: string;
  subdistrictCode?: string;
  subdistrictName?: string;
  lgdCode?: string;
  census2011Code?: string;
  listingCount: number;
  isIndexable: boolean;
  children: Location[];
}

export interface LocationNode {
  location: Location;
  children: LocationNode[];
}

export interface RegistryStats {
  states: number;
  districts: number;
  subdistricts: number;
  cities: number;
  localities: number;
  villages: number;
  indexableCities: number;
  indexableLocalities: number;
}

/**
 * Build the complete location registry from LGD data
 * This is the single source of truth for all location data
 */
export class LocationRegistry {
  private locations: Map<string, Location> = new Map();
  private bySlug: Map<string, Location> = new Map();
  private byStateCode: Map<string, Location[]> = new Map();
  private byDistrictCode: Map<string, Location[]> = new Map();
  private stats: RegistryStats = {
    states: 0,
    districts: 0,
    subdistricts: 0,
    cities: 0,
    localities: 0,
    villages: 0,
    indexableCities: 0,
    indexableLocalities: 0,
  };
  private initialized = false;

  /**
   * Initialize the registry with LGD data and profile listing counts
   */
  async initialize(
    states: LGDState[],
    districts: LGDDistrict[],
    subdistricts: LGDSubdistrict[],
    localBodies: LGDLocalBody[],
    profileCounts: Map<string, number> // key: "state|district|city|locality" -> count
  ): Promise<void> {
    if (this.initialized) return;

    // Clear existing data
    this.locations.clear();
    this.bySlug.clear();
    this.byStateCode.clear();
    this.byDistrictCode.clear();

    // 1. Create state nodes
    for (const state of states) {
      const id = `state:${state.code}`;
      const slug = this.generateSlug(state.name, 'state');
      const location: Location = {
        id,
        type: 'state',
        name: this.toTitleCase(state.name),
        nameLocal: state.nameLocal,
        slug,
        stateCode: state.code,
        stateName: this.toTitleCase(state.name),
        listingCount: profileCounts.get(id) || 0,
        isIndexable: false, // State pages are directory only
        children: [],
      };
      this.addLocation(location);
    }

    // 2. Create district nodes
    for (const district of districts) {
      const state = states.find(s => s.code === district.stateCode);
      if (!state) continue;

      const id = `district:${district.stateCode}:${district.code}`;
      const slug = this.generateSlug(district.name, 'district');
      const location: Location = {
        id,
        type: 'district',
        name: this.toTitleCase(district.name),
        slug,
        parentId: `state:${district.stateCode}`,
        stateCode: district.stateCode,
        stateName: this.toTitleCase(state.name),
        districtCode: district.code,
        districtName: this.toTitleCase(district.name),
        lgdCode: district.code,
        census2011Code: district.census2011Code,
        listingCount: profileCounts.get(id) || 0,
        isIndexable: false, // District pages are directory only
        children: [],
      };
      this.addLocation(location);
    }

    // 3. Create subdistrict nodes
    for (const sub of subdistricts) {
      const district = districts.find(d => d.code === sub.districtCode && d.stateCode === sub.stateCode);
      if (!district) continue;

      const id = `subdistrict:${sub.stateCode}:${sub.districtCode}:${sub.code}`;
      const slug = this.generateSlug(sub.name, 'subdistrict');
      const location: Location = {
        id,
        type: 'subdistrict',
        name: this.toTitleCase(sub.name),
        slug,
        parentId: `district:${sub.stateCode}:${sub.districtCode}`,
        stateCode: sub.stateCode,
        stateName: this.toTitleCase(sub.stateName),
        districtCode: sub.districtCode,
        districtName: this.toTitleCase(district.name),
        subdistrictCode: sub.code,
        subdistrictName: this.toTitleCase(sub.name),
        lgdCode: sub.code,
        census2011Code: sub.census2011Code,
        listingCount: profileCounts.get(id) || 0,
        isIndexable: false, // Subdistrict pages are directory only
        children: [],
      };
      this.addLocation(location);
    }

    // 4. Create city/locality/village nodes from local bodies
    // Local bodies include both urban (cities/towns) and rural (villages)
    const cityCounts = new Map<string, number>();
    const localityCounts = new Map<string, number>();

    for (const lb of localBodies) {
      const parentKey = `${lb.stateName}|${lb.districtName}|${lb.subdistrictName || ''}|${lb.localbodyName}`;
      const count = cityCounts.get(parentKey) || 0;
      cityCounts.set(parentKey, count + 1);
    }

    for (const lb of localBodies) {
      const state = states.find(s => s.name.toLowerCase() === lb.stateName.toLowerCase());
      const district = districts.find(d => d.name.toLowerCase() === lb.districtName.toLowerCase() && d.stateCode === state?.code);
      const subdistrict = district && lb.subdistrictName
        ? subdistricts.find(s => s.name.toLowerCase() === lb.subdistrictName!.toLowerCase() && s.districtCode === district.code)
        : undefined;

      if (!state || !district) continue;

      // Determine if this is a city (urban local body) or village
      const censusCode = lb.census2011Code || '';
      const isUrban = censusCode.startsWith('800'); // Urban bodies have 800xxx codes
      const type = isUrban ? 'city' : 'village';

      const parentKey = `${lb.stateName}|${lb.districtName}|${lb.subdistrictName || ''}|${lb.localbodyName}`;
      const listingCount = profileCounts.get(parentKey) || 0;

      const id = `localbody:${lb.localbodyCode}`;
      const slug = this.generateSlug(lb.localbodyName, type);
      const location: Location = {
        id,
        type,
        name: this.toTitleCase(lb.localbodyName),
        slug,
        parentId: subdistrict
          ? `subdistrict:${state.code}:${district.code}:${subdistrict.code}`
          : `district:${state.code}:${district.code}`,
        stateCode: state.code,
        stateName: this.toTitleCase(state.name),
        districtCode: district.code,
        districtName: this.toTitleCase(district.name),
        subdistrictCode: subdistrict?.code,
        subdistrictName: subdistrict ? this.toTitleCase(subdistrict.name) : undefined,
        lgdCode: lb.localbodyCode,
        census2011Code: lb.census2011Code,
        listingCount,
        isIndexable: isUrban && listingCount > 0, // Only cities with listings are indexable
        children: [],
      };
      this.addLocation(location);

      if (type === 'city') {
        this.stats.cities++;
        if (listingCount > 0) this.stats.indexableCities++;
      } else {
        this.stats.villages++;
      }
    }

    // Build child relationships
    this.buildHierarchy();

    // Update stats
    this.stats.states = states.length;
    this.stats.districts = districts.length;
    this.stats.subdistricts = subdistricts.length;

    this.initialized = true;
  }

  private addLocation(location: Location): void {
    this.locations.set(location.id, location);
    this.bySlug.set(location.slug, location);

    if (location.stateCode) {
      const arr = this.byStateCode.get(location.stateCode) || [];
      arr.push(location);
      this.byStateCode.set(location.stateCode, arr);
    }
    if (location.districtCode) {
      const key = `${location.stateCode}:${location.districtCode}`;
      const arr = this.byDistrictCode.get(key) || [];
      arr.push(location);
      this.byDistrictCode.set(key, arr);
    }
  }

  private buildHierarchy(): void {
    // Build children arrays for tree traversal
    for (const location of this.locations.values()) {
      if (location.parentId) {
        const parent = this.locations.get(location.parentId);
        if (parent) {
          parent.children.push(location);
        }
      }
    }
  }

  private generateSlug(name: string, type: LocationType): string {
    const base = citySlug(name);
    let slug = base;
    let counter = 1;

    // Handle collisions by appending type suffix or number
    while (this.bySlug.has(slug)) {
      const existing = this.bySlug.get(slug)!;
      if (existing.name.toLowerCase() === name.toLowerCase() && existing.type === type) {
        // Same name and type - this shouldn't happen with LGD codes but handle gracefully
        slug = `${base}-${counter}`;
        counter++;
      } else {
        // Different location with same slug - add type disambiguation
        slug = `${base}-${type}`;
        if (this.bySlug.has(slug)) {
          slug = `${base}-${type}-${counter}`;
          counter++;
        }
      }
    }
    return slug;
  }

  private toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // --- Public API ---

  getLocation(id: string): Location | undefined {
    return this.locations.get(id);
  }

  getLocationBySlug(slug: string): Location | undefined {
    return this.bySlug.get(slug);
  }

  getStates(): Location[] {
    return Array.from(this.locations.values()).filter(l => l.type === 'state');
  }

  getDistrictsForState(stateCode: string): Location[] {
    return (this.byStateCode.get(stateCode) || []).filter(l => l.type === 'district');
  }

  getSubdistrictsForDistrict(stateCode: string, districtCode: string): Location[] {
    return (this.byDistrictCode.get(`${stateCode}:${districtCode}`) || [])
      .filter(l => l.type === 'subdistrict');
  }

  getCitiesForSubdistrict(stateCode: string, districtCode: string, subdistrictCode: string): Location[] {
    const parentId = `subdistrict:${stateCode}:${districtCode}:${subdistrictCode}`;
    const parent = this.locations.get(parentId);
    if (!parent) return [];
    return parent.children.filter(l => l.type === 'city');
  }

  getCitiesForDistrict(stateCode: string, districtCode: string): Location[] {
    return (this.byDistrictCode.get(`${stateCode}:${districtCode}`) || [])
      .filter(l => l.type === 'city');
  }

  getAllCitiesForState(stateCode: string): Location[] {
    const state = this.locations.get(`state:${stateCode}`);
    if (!state) return [];

    const cities: Location[] = [];
    const collectCities = (loc: Location) => {
      if (loc.type === 'city') cities.push(loc);
      for (const child of loc.children) collectCities(child);
    };
    collectCities(state);
    return cities;
  }

  getIndexableLocations(): Location[] {
    return Array.from(this.locations.values()).filter(l => l.isIndexable);
  }

  getIndexableCities(): Location[] {
    return Array.from(this.locations.values()).filter(l => l.type === 'city' && l.isIndexable);
  }

  getIndexableLocalities(): Location[] {
    return Array.from(this.locations.values()).filter(l => l.type === 'locality' && l.isIndexable);
  }

  search(query: string, limit = 20): Location[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: Location[] = [];
    for (const location of this.locations.values()) {
      if (
        location.name.toLowerCase().includes(q) ||
        location.nameLocal?.toLowerCase().includes(q) ||
        location.districtName?.toLowerCase().includes(q) ||
        location.stateName.toLowerCase().includes(q)
      ) {
        results.push(location);
        if (results.length >= limit) break;
      }
    }
    return results;
  }

  getHierarchy(locationId: string): Location[] {
    const path: Location[] = [];
    let current = this.locations.get(locationId);
    while (current) {
      path.unshift(current);
      current = current.parentId ? this.locations.get(current.parentId) : undefined;
    }
    return path;
  }

  getBreadcrumbs(locationId: string): { name: string; slug: string }[] {
    const hierarchy = this.getHierarchy(locationId);
    return hierarchy.map(loc => ({
      name: loc.name,
      slug: loc.type === 'state' ? `/locations/${loc.slug}` :
            loc.type === 'district' ? `/locations/${this.getStateSlug(loc.stateCode)}/${loc.slug}` :
            loc.type === 'city' ? `/call-girls-in/${loc.slug}` :
            `/call-girls-in/${loc.slug}`,
    }));
  }

  private getStateSlug(stateCode: string): string {
    const state = this.locations.get(`state:${stateCode}`);
    return state?.slug || '';
  }

  getStats(): RegistryStats {
    return { ...this.stats };
  }

  isReady(): boolean {
    return this.initialized;
  }

  /**
   * Export registry for serialization (e.g., to JSON for client-side use)
   */
  toJSON(): { locations: Location[]; stats: RegistryStats } {
    return {
      locations: Array.from(this.locations.values()),
      stats: this.getStats(),
    };
  }

  /**
   * Get the internal slug map for matching (used by matcher)
   */
  getBySlugMap(): Map<string, Location> {
    return this.bySlug;
  }
}

/**
 * Singleton instance for the application
 */
export const locationRegistry = new LocationRegistry();