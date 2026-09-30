import Link from "next/link";
import { BRAND, cityRegionLabel } from "@/lib/seo/site";
import { listCitiesWithListings, listPublicProfiles } from "@/lib/seo/profiles";

/**
 * Crawlable body copy for the homepage.
 *
 * The directory grid is the product, but a grid alone gives a crawler almost
 * no text to judge relevance by, and the H1 alone is not enough body copy to
 * compete for a head term. This block is a server component, so it is present
 * in the initial HTML, and it links down to the /call-girls page and to every
 * city that actually has listings.
 *
 * Every number here is counted from the same public filter the pages use, so
 * the copy cannot drift from what the site actually serves.
 */
export default async function SeoHomeIntro() {
  const [cities, profiles] = await Promise.all([
    listCitiesWithListings(),
    listPublicProfiles(),
  ]);

  const count = profiles.length;
  const withRates = profiles.filter((p) => p.rates && p.rates.length > 0).length;

  return (
    <section className="seo-intro" aria-labelledby="seo-intro-heading">
      <div className="seo-intro__inner">
        <h2 id="seo-intro-heading" className="seo-intro__title">
          Verified call girls and escorts across India
        </h2>

        <p className="seo-intro__text">
          {BRAND} is a directory of call girls, escorts and companions working across India.
          Every listing is created by the person it describes, reviewed before publication,
          and carries that person&rsquo;s own photographs, services and rates. Contact
          details are published on the profile rather than hidden behind a form, so you can
          read everything first and then reach the companion directly.
        </p>

        <p className="seo-intro__text">
          {count === 0 ? (
            <>
              New listings are published here as they are approved, and each city gets its
              own page as soon as the first listing in it goes live.
            </>
          ) : (
            <>
              There {count === 1 ? "is" : "are"} currently {count} public{" "}
              {count === 1 ? "listing" : "listings"} on the site
              {withRates > 0 ? `, ${withRates} of which publish rates` : ""}. Use the
              location selector above to narrow by city, district or state, or start from
              the dedicated <Link href="/call-girls">call girls in India</Link> page, which
              explains how the listings work and how to book safely.
            </>
          )}
        </p>

        {cities.length > 0 && (
          <>
            <h3 className="seo-intro__subtitle">Call girls by city</h3>
            <ul className="seo-intro__cities">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/city/${city.slug}`}>
                    Call girls in {cityRegionLabel(city.name, city.region)}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="seo-intro__text seo-intro__text--muted">
          Review the frequently asked questions before your first booking —
          particularly the section on advance-payment scams, which are the single most
          common way clients get targeted.
        </p>
      </div>
    </section>
  );
}
