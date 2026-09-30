import { BRAND, cityRegionLabel } from "@/lib/seo/site";
import type { CityAggregates } from "@/lib/seo/profiles";
import { CITY_EDITORIAL } from "@/content/city-editorial";

/**
 * Builds the body copy for a /city/<slug> landing page.
 *
 * Two rules govern everything here:
 *
 * 1. Only real data is stated. Counts come from the public-profile filter,
 *    areas come from the districts/local areas companions actually filled in,
 *    and the price range is derived from published rates. When a fact is
 *    missing the sentence that would have carried it is simply not emitted,
 *    rather than being padded with a plausible guess.
 * 2. Each city must read differently. The sentences are selected and ordered
 *    from the data, so two cities with different listings produce materially
 *    different copy instead of one template with the name swapped.
 *
 * A hand-written paragraph in `content/city-editorial.ts` always wins over
 * anything generated here.
 */

export interface CityBody {
  /** Opening paragraph(s) for the page. */
  intro: string[];
  /** Sentence about the areas companions listed, when that data exists. */
  areasNote: string | null;
  /** Sentence about the published rate spread, when that data exists. */
  ratesNote: string | null;
  /** Heading for the areas line, e.g. "Areas listed in Delhi". */
  areasHeading: string | null;
}

function rupees(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function listWords(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Capitalises a stored area value without mangling names like "south delhi". */
function areaName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function titleCase(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function buildCityBody(
  city: { slug: string; name: string; region: string | null; count: number },
  aggregates: CityAggregates
): CityBody {
  const editorial = CITY_EDITORIAL[city.slug] ?? {};
  const name = titleCase(city.name);
  const region = city.region ? titleCase(city.region) : null;
  // Some states are also cities ("Delhi", "Chandigarh"), and the directory
  // stores both, so guard against rendering "Delhi, Delhi".
  const where = cityRegionLabel(city.name, city.region);
  const regionOrName = region ?? name;

  const many = city.count > 1;

  /* ---------- opening paragraph(s) ---------- */

  const generated: string[] = [];

  generated.push(
    many
      ? `Searching for call girls in ${where}? ${BRAND} currently lists ${city.count} ${
          city.count === 1 ? "companion" : "companions"
        } in ${name} with public contact details, real photographs and rates published up front. Every entry below was submitted by the person it describes and approved before it went live, so you can compare the details before you contact anyone.`
      : `${name} currently has ${city.count} public ${
          city.count === 1 ? "listing" : "listings"
        } on ${BRAND}. If you are looking for call girls in ${where}, ${
          many ? "the listings below are" : "the listing below is"
        } everything published for this city right now — open one for photographs, rates and direct contact details.`
  );

  if (aggregates.areas.length > 0) {
    generated.push(
      `The listings below cover ${listWords(
        aggregates.areas.map(areaName)
      )} — open a profile to see exactly which area and how quickly that companion can travel.`
    );
  }

  /* ---------- areas sentence ---------- */

  let areasHeading: string | null = null;
  let areasNote: string | null = null;

  if (aggregates.areas.length > 0) {
    areasHeading = `Areas covered in ${name}`;
    const areaList = aggregates.areas.map(areaName);
    areasNote =
      areaList.length === 1
        ? `The only area published for ${name} right now is ${areaList[0]}. If you need a different part of ${regionOrName}, the nationwide directory is the faster route.`
        : `Published areas in ${name} are ${listWords(areaList)}. Companions list their own travel area, so check the profile if you are somewhere else in ${regionOrName}.`;
  }

  /* ---------- rate sentence ---------- */

  let ratesNote: string | null = null;
  if (aggregates.rateMin !== null && aggregates.rateMax !== null) {
    const spread =
      aggregates.rateMin === aggregates.rateMax
        ? `${rupees(aggregates.rateMin)}`
        : `${rupees(aggregates.rateMin)} to ${rupees(aggregates.rateMax)}`;
    ratesNote = `Published rates for ${name} currently run ${spread}. These are the figures companions entered on their own profiles, so treat them as a starting point and confirm timing and duration directly before you travel.`;
  }

  /* ---------- editorial overrides win ---------- */

  const intro = editorial.intro ?? generated;
  if (editorial.extra?.length) intro.push(...editorial.extra);

  return {
    intro,
    areasNote: editorial.areasNote ?? areasNote,
    ratesNote: editorial.ratesNote ?? ratesNote,
    areasHeading,
  };
}
