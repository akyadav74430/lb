import Link from "next/link";
import type { Metadata } from "next";
import { listCitiesWithListings, listPublicProfiles } from "@/lib/seo/profiles";
import { absoluteUrl, BRAND, cityRegionLabel, clampMeta } from "@/lib/seo/site";
import SiteFooter from "@/components/SiteFooter";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

export async function generateMetadata(): Promise<Metadata> {
  const cities = await listCitiesWithListings();
  const topCities = cities.slice(0, 5);

  // This page owns the head term "call girls in India". The homepage is a
  // directory and takes a different title; do not reintroduce the duplicate.
  //
  // "Verified" is not used in the title. The only check the pipeline performs
  // is an 18+ self-declaration plus SHA-256 duplicate-photo detection, which
  // the FAQ documents precisely. Selling the word harder than the process
  // supports is the kind of claim that gets a directory de-rated.
  const description = clampMeta(
    `Find call girls in India. Browse independent companions by city — ${topCities
      .map((c) => c.name)
      .join(", ")} and more. Real photos, published rates and direct contact.`,
    160
  );

  return {
    title: "Call Girls in India — Real Photos, Direct Contact",
    description,
    alternates: { canonical: absoluteUrl("/call-girls") },
    openGraph: {
      title: "Call Girls in India — Real Photos, Direct Contact",
      description,
      url: absoluteUrl("/call-girls"),
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

export default async function CallGirlsPage() {
  const [cities, profiles] = await Promise.all([
    listCitiesWithListings(),
    listPublicProfiles(),
  ]);

  const count = profiles.length;
  const topCities = cities.slice(0, 12);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Call Girls", path: "/call-girls" },
        ])}
      />

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span>Call Girls</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">Call Girls in India</h1>
            <p className="info-page-subtitle">
              Verified call girls, escorts and companions across India. Browse listings by
              city, check real photos, see published rates and contact directly.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">What are call girls on {BRAND}?</h2>
            <p className="info-text">
              On {BRAND}, &ldquo;call girls&rdquo; means independent companions and escorts
              who have chosen to list themselves publicly. Every profile goes through a
              review process before it appears, carries the companion&rsquo;s own photographs,
              lists services and publishes rates where provided. Contact details stay on
              the profile, so you reach the person directly with no middleman fees.
            </p>
            <p className="info-text">
              {count === 0
                ? "New profiles appear here as they are approved. Each city page goes live the moment its first public listing is approved."
                : `There ${count === 1 ? "is" : "are"} currently ${count} public ${
                    count === 1 ? "listing" : "listings"
                  } across India. Browse by city below, or head to the{" "}
                  <Link href="/">main directory</Link> to filter by state, district or local
                  area.`}
            </p>
          </div>

          {topCities.length > 0 && (
            <div className="info-card-content">
              <h2 className="info-section__title">Call girls by city</h2>
              <ul className="city-link-list">
                {topCities.map((city) => (
                  <li key={city.slug}>
                    <Link href={`/city/${city.slug}`} className="city-link">
                      Call girls in {cityRegionLabel(city.name, city.region)}
                      <span className="city-link__meta">
                        {city.count} {city.count === 1 ? "profile" : "profiles"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {cities.length > 12 && (
                <p className="info-text" style={{ marginTop: 16 }}>
                  More cities with listings are available on <Link href="/escorts">the
                  escorts directory</Link>.
                </p>
              )}
            </div>
          )}

          <div className="info-card-content">
            <h2 className="info-section__title">Safety & how it works</h2>
            <p className="info-text">
              The directory does not handle payments. Never send advance deposits to
              anyone you haven&rsquo;t met in person. If someone asks for a booking fee,
              gift card, crypto or UPI in advance, treat it as a scam and report the
              profile.
            </p>
            <p className="info-text">
              <Link href="/faq" className="auth-link">
                Read the FAQ
              </Link>{" "}
              for verification, privacy and reporting guidance.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
