/**
 * Locations Module - Unified India Geographic Hierarchy
 *
 * Exports all location-related functionality:
 * - LGD data source (official Government of India data)
 * - Unified registry with searchable hierarchy
 * - Slug generation with collision handling
 * - Hierarchy traversal utilities
 * - Eligibility checking for indexable pages
 */

export * from './lgd-source';
export * from './registry';
export * from './slugs';
export * from './hierarchy';
export * from './eligibility';