/**
 * Slug Generation with Collision Handling
 *
 * Provides stable, SEO-friendly URL slugs for all location types
 * with automatic collision resolution using LGD codes.
 */

import { citySlug } from '@/lib/seo/site';

export interface SlugCollisionInfo {
  slug: string;
  existingNames: string[];
  resolvedSlug: string;
  strategy: 'none' | 'type-suffix' | 'parent-suffix' | 'numeric';
}

/**
 * Generate a base slug from a name
 */
export function generateBaseSlug(name: string): string {
  return citySlug(name);
}

/**
 * Generate a slug for a location with collision handling
 */
export function generateLocationSlug(
  name: string,
  type: 'state' | 'district' | 'subdistrict' | 'city' | 'locality' | 'village',
  existingSlugs: Set<string>,
  lgdCode?: string
): { slug: string; collisionInfo: SlugCollisionInfo } {
  const baseSlug = generateBaseSlug(name);
  let slug = baseSlug;
  const collisionInfo: SlugCollisionInfo = {
    slug: baseSlug,
    existingNames: [],
    resolvedSlug: baseSlug,
    strategy: 'none',
  };

  if (!existingSlugs.has(slug)) {
    return { slug, collisionInfo };
  }

  // Collision detected - find existing names with this slug
  collisionInfo.existingNames = ['(collision detected)'];
  collisionInfo.strategy = 'type-suffix';

  // Strategy 1: Add type suffix
  slug = `${baseSlug}-${type}`;
  if (!existingSlugs.has(slug)) {
    collisionInfo.resolvedSlug = slug;
    collisionInfo.strategy = 'type-suffix';
    return { slug, collisionInfo };
  }

  // Strategy 2: Add LGD code suffix (most stable)
  if (lgdCode) {
    slug = `${baseSlug}-${lgdCode}`;
    if (!existingSlugs.has(slug)) {
      collisionInfo.resolvedSlug = slug;
      collisionInfo.strategy = 'parent-suffix';
      return { slug, collisionInfo };
    }
  }

  // Strategy 3: Numeric suffix
  let counter = 1;
  slug = `${baseSlug}-${counter}`;
  while (existingSlugs.has(slug)) {
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
  collisionInfo.resolvedSlug = slug;
  collisionInfo.strategy = 'numeric';

  return { slug, collisionInfo };
}

/**
 * Generate canonical URL for a location
 */
export function getLocationUrl(location: {
  type: 'state' | 'district' | 'subdistrict' | 'city' | 'locality' | 'village';
  slug: string;
  stateCode?: string;
  parentSlug?: string;
}): string {
  switch (location.type) {
    case 'state':
      return `/locations/${location.slug}`;
    case 'district':
      return `/locations/${location.parentSlug}/${location.slug}`;
    case 'subdistrict':
      return `/locations/${location.parentSlug}/${location.slug}`;
    case 'city':
      return `/call-girls-in/${location.slug}`;
    case 'locality':
      return `/call-girls-in/${location.parentSlug}/${location.slug}`;
    case 'village':
      // Villages map to their parent city/locality page
      return `/call-girls-in/${location.parentSlug}`;
    default:
      return `/locations/${location.slug}`;
  }
}

/**
 * Parse a location URL back to its components
 */
export function parseLocationUrl(url: string): {
  type: 'state' | 'district' | 'subdistrict' | 'city' | 'locality' | 'unknown';
  slugs: string[];
} | null {
  const path = url.replace(/^\/+|\/+$/g, '');
  const parts = path.split('/');

  if (parts[0] === 'locations') {
    if (parts.length === 2) return { type: 'state', slugs: [parts[1]] };
    if (parts.length === 3) return { type: 'district', slugs: [parts[1], parts[2]] };
    if (parts.length === 4) return { type: 'subdistrict', slugs: [parts[1], parts[2], parts[3]] };
  }

  if (parts[0] === 'call-girls-in') {
    if (parts.length === 2) return { type: 'city', slugs: [parts[1]] };
    if (parts.length === 3) return { type: 'locality', slugs: [parts[1], parts[2]] };
  }

  return null;
}

/**
 * Build a slug map for collision detection
 */
export function buildSlugMap(locations: Array<{ slug: string; name: string; type: string }>): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();
  for (const loc of locations) {
    const existing = map.get(loc.slug) || new Set();
    existing.add(`${loc.name} (${loc.type})`);
    map.set(loc.slug, existing);
  }
  return map;
}

/**
 * Find all collisions in a set of locations
 */
export function findCollisions(locations: Array<{ slug: string; name: string; type: string }>): SlugCollisionInfo[] {
  const slugMap = buildSlugMap(locations);
  const collisions: SlugCollisionInfo[] = [];

  for (const [slug, names] of slugMap.entries()) {
    if (names.size > 1) {
      collisions.push({
        slug,
        existingNames: Array.from(names),
        resolvedSlug: slug,
        strategy: 'none',
      });
    }
  }

  return collisions;
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length > 0 && slug.length <= 200;
}

/**
 * Normalize slug for comparison
 */
export function normalizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/^-+|-+$/g, '').replace(/-+/g, '-');
}