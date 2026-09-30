/**
 * Hand-written, per-city copy.
 *
 * `lib/seo/city-content.ts` already assembles each city page from facts that
 * are true (published counts, the areas companions actually listed, the real
 * rate spread). That keeps the pages honest but the prose still follows one
 * shape, so each entry here replaces the generated paragraph with something a
 * person wrote about that specific city.
 *
 * Add a key per city slug and fill in only the fields you want to override;
 * anything left out falls back to the generated, fact-based version.
 *
 * Example:
 *
 *   delhi: {
 *     intro: [
 *       "South Delhi listings skew towards premium hotel meets...",
 *     ],
 *     areasNote:
 *       "Most companions here travel across the NCR belt, including ..."],
 *   },
 */
export interface CityEditorial {
  /** Replaces the generated opening paragraph(s). */
  intro?: string[];
  /** Replaces the generated "areas listed" sentence. */
  areasNote?: string;
  /** Replaces the generated rate-spread sentence. */
  ratesNote?: string;
  /** Extra factual paragraphs appended after the generated body. */
  extra?: string[];
}

export const CITY_EDITORIAL: Record<string, CityEditorial> = {};
