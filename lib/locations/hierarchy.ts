/**
 * Hierarchy Traversal Utilities
 *
 * Provides tree navigation, breadcrumbs, ancestor/descendant queries,
 * and path building for the location hierarchy.
 */

import { Location, LocationNode } from './registry';

export interface BreadcrumbItem {
  name: string;
  url: string;
  type: Location['type'];
}

/**
 * Build breadcrumb trail for a location
 */
export function buildBreadcrumbs(location: Location, allLocations: Map<string, Location>): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with Home
  breadcrumbs.push({ name: 'Home', url: '/', type: 'state' });

  // Build path from root to this location
  const path = getAncestorPath(location, allLocations);

  for (const loc of path) {
    let url: string;

    switch (loc.type) {
      case 'state':
        url = `/locations/${loc.slug}`;
        break;
      case 'district':
        url = `/locations/${getStateSlug(loc, allLocations)}/${loc.slug}`;
        break;
      case 'subdistrict':
        url = `/locations/${getStateSlug(loc, allLocations)}/${getDistrictSlug(loc, allLocations)}/${loc.slug}`;
        break;
      case 'city':
        url = `/call-girls-in/${loc.slug}`;
        break;
      case 'locality':
        url = `/call-girls-in/${getCitySlug(loc, allLocations)}/${loc.slug}`;
        break;
      case 'village':
        url = `/call-girls-in/${getCitySlug(loc, allLocations)}`;
        break;
      default:
        url = '/';
    }

    breadcrumbs.push({
      name: loc.name,
      url,
      type: loc.type,
    });
  }

  return breadcrumbs;
}

/**
 * Get the full ancestor path from root to location (inclusive)
 */
export function getAncestorPath(location: Location, allLocations: Map<string, Location>): Location[] {
  const path: Location[] = [];
  let current: Location | undefined = location;

  while (current) {
    path.unshift(current);
    current = current.parentId ? allLocations.get(current.parentId) : undefined;
  }

  return path;
}

/**
 * Get all descendants of a location (recursive)
 */
export function getDescendants(location: Location, allLocations: Map<string, Location>, types?: Location['type'][]): Location[] {
  const descendants: Location[] = [];

  const traverse = (loc: Location) => {
    for (const child of loc.children) {
      if (!types || types.includes(child.type)) {
        descendants.push(child);
      }
      traverse(child);
    }
  };

  traverse(location);
  return descendants;
}

/**
 * Get all indexable descendants (cities/localities with listings)
 */
export function getIndexableDescendants(location: Location, allLocations: Map<string, Location>): Location[] {
  return getDescendants(location, allLocations, ['city', 'locality'])
    .filter(l => l.isIndexable);
}

/**
 * Get the state slug for a location
 */
function getStateSlug(location: Location, allLocations: Map<string, Location>): string {
  let current: Location | undefined = location;
  while (current && current.type !== 'state') {
    current = current.parentId ? allLocations.get(current.parentId) : undefined;
  }
  return current?.slug || '';
}

/**
 * Get the district slug for a location
 */
function getDistrictSlug(location: Location, allLocations: Map<string, Location>): string {
  let current: Location | undefined = location;
  while (current && current.type !== 'district') {
    current = current.parentId ? allLocations.get(current.parentId) : undefined;
  }
  return current?.slug || '';
}

/**
 * Get the city slug for a location
 */
function getCitySlug(location: Location, allLocations: Map<string, Location>): string {
  let current: Location | undefined = location;
  while (current && current.type !== 'city') {
    current = current.parentId ? allLocations.get(current.parentId) : undefined;
  }
  return current?.slug || '';
}

/**
 * Build a tree structure for UI rendering (e.g., sidebar navigation)
 */
export function buildLocationTree(
  rootLocations: Location[],
  allLocations: Map<string, Location>,
  options: {
    includeTypes?: Location['type'][];
    maxDepth?: number;
    includeCounts?: boolean;
  } = {}
): LocationNode[] {
  const { includeTypes, maxDepth = 3, includeCounts = true } = options;

  const buildNode = (location: Location, depth: number): LocationNode => {
    const shouldInclude = !includeTypes || includeTypes.includes(location.type);
    const children: LocationNode[] = [];

    if (depth < maxDepth) {
      for (const child of location.children) {
        if (!includeTypes || includeTypes.includes(child.type)) {
          children.push(buildNode(child, depth + 1));
        }
      }
    }

    return {
      location: {
        ...location,
        children: includeCounts ? location.children : [],
      },
      children,
    };
  };

  return rootLocations.map(loc => buildNode(loc, 0));
}

/**
 * Find the nearest indexable ancestor (for fallback navigation)
 */
export function findNearestIndexableAncestor(location: Location, allLocations: Map<string, Location>): Location | null {
  let current: Location | undefined = location;

  while (current) {
    if (current.isIndexable) return current;
    current = current.parentId ? allLocations.get(current.parentId) : undefined;
  }

  return null;
}

/**
 * Get sibling locations (same parent, same type)
 */
export function getSiblings(location: Location, allLocations: Map<string, Location>): Location[] {
  if (!location.parentId) return [];

  const parent = allLocations.get(location.parentId);
  if (!parent) return [];

  return parent.children.filter(child =>
    child.type === location.type && child.id !== location.id
  );
}

/**
 * Get cousin locations (same grandparent, same type)
 */
export function getCousins(location: Location, allLocations: Map<string, Location>): Location[] {
  if (!location.parentId) return [];

  const parent = allLocations.get(location.parentId);
  if (!parent || !parent.parentId) return [];

  const grandparent = allLocations.get(parent.parentId);
  if (!grandparent) return [];

  const cousins: Location[] = [];
  for (const uncle of grandparent.children) {
    if (uncle.id === parent.id) continue;
    for (const cousin of uncle.children) {
      if (cousin.type === location.type) {
        cousins.push(cousin);
      }
    }
  }
  return cousins;
}

/**
 * Check if location A is ancestor of location B
 */
export function isAncestor(ancestor: Location, descendant: Location, allLocations: Map<string, Location>): boolean {
  let current: Location | undefined = descendant;
  while (current) {
    if (current.id === ancestor.id) return true;
    current = current.parentId ? allLocations.get(current.parentId) : undefined;
  }
  return false;
}

/**
 * Get the lowest common ancestor of two locations
 */
export function getLowestCommonAncestor(loc1: Location, loc2: Location, allLocations: Map<string, Location>): Location | null {
  const path1 = getAncestorPath(loc1, allLocations);
  const path2 = getAncestorPath(loc2, allLocations);

  let lca: Location | null = null;
  const minLen = Math.min(path1.length, path2.length);

  for (let i = 0; i < minLen; i++) {
    if (path1[i].id === path2[i].id) {
      lca = path1[i];
    } else {
      break;
    }
  }

  return lca;
}

/**
 * Calculate distance (levels) between two locations
 */
export function getDistance(loc1: Location, loc2: Location, allLocations: Map<string, Location>): number {
  const lca = getLowestCommonAncestor(loc1, loc2, allLocations);
  if (!lca) return -1;

  const path1 = getAncestorPath(loc1, allLocations);
  const path2 = getAncestorPath(loc2, allLocations);

  const depth1 = path1.findIndex(l => l.id === lca.id);
  const depth2 = path2.findIndex(l => l.id === lca.id);

  return (depth1 >= 0 ? depth1 : path1.length) + (depth2 >= 0 ? depth2 : path2.length);
}

/**
 * Get all locations at a specific depth level
 */
export function getLocationsAtDepth(root: Location, depth: number): Location[] {
  const results: Location[] = [];

  const traverse = (loc: Location, currentDepth: number) => {
    if (currentDepth === depth) {
      results.push(loc);
      return;
    }
    if (currentDepth > depth) return;

    for (const child of loc.children) {
      traverse(child, currentDepth + 1);
    }
  };

  traverse(root, 0);
  return results;
}

/**
 * Flatten tree to array with depth info
 */
export function flattenTree(root: Location): Array<Location & { depth: number }> {
  const results: Array<Location & { depth: number }> = [];

  const traverse = (loc: Location, depth: number) => {
    results.push({ ...loc, depth });
    for (const child of loc.children) {
      traverse(child, depth + 1);
    }
  };

  traverse(root, 0);
  return results;
}