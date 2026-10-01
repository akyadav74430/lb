import Link from "next/link";
import { absoluteUrl, BRAND } from "@/lib/seo/site";
import SiteFooter from "@/components/SiteFooter";
import { listCitiesWithListings } from "@/lib/seo/profiles";

export const metadata = {
  title: "About Us — lovebite.live Directory",
  description: "Learn about lovebite.live, the verified adult companion directory operating across India.",
  alternates: { canonical: absoluteUrl("/about") },
};

export default async function AboutPage() {
  const cities = await listCitiesWithListings();
  const cityNames = cities.map((c) => c.name);

  return (
    <>
      <main className="info-page-main">
      <div className="info-page-container">
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">About Us</span>
        </nav>

        <div className="info-page-hero">
          <h1 className="info-page-title">About lovebite.live</h1>
          <p className="info-page-subtitle">
            A city-wise directory of independent escorts, call girls and companions in
            India. Listings are written by the people they describe, reviewed before they
            are published, and contacted directly by visitors.
          </p>
        </div>

        <div className="info-card-content">
          <section className="info-section">
            <h2 className="info-section__title">What this is</h2>
            <p className="info-text">
              lovebite.live is a directory, not an agency. We do not employ companions, do
              not broker bookings, and do not handle money. A companion creates a profile,
              publishes their own photographs, description, rates and contact details, and
              visitors then contact them directly.
            </p>
            <p className="info-text">
              The directory exists because the alternative is usually a wall of anonymous
              adverts with no way to tell which photographs are real and whose they are. Our
              position is that a listing should be attributable, reviewable, and removable —
              including by the person it describes.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">Where we currently list</h2>
            {cityNames.length > 0 ? (
              <>
                <p className="info-text">
                  We only publish a city page once a companion in that city has an approved
                  public listing, so there is never a landing page for a city where nobody is
                  listed. Right now that is{" "}
                  {cityNames.length === 1
                    ? cityNames[0]
                    : `${cityNames.slice(0, -1).join(", ")} and ${cityNames[cityNames.length - 1]}`}
                  .
                </p>
                <ul className="city-link-list">
                  {cities.map((city) => (
                    <li key={city.slug}>
                      <Link href={`/city/${city.slug}`} className="city-link">
                        Escorts in {city.name}
                        <span className="city-link__meta">
                          {city.count} {city.count === 1 ? "profile" : "profiles"}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="info-text">
                No city has a published listing yet. City pages appear as soon as the first
                listing in a city is approved.
              </p>
            )}
            <p className="info-text">
              The directory is national and growing, but coverage is limited by real supply.
              We would rather show two cities accurately than fifty thin ones.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">How review works</h2>
            <div className="info-pillars-grid">
              <div className="pillar-box">
                <div className="pillar-icon">🛡️</div>
                <h3 className="pillar-title">Self-published, then reviewed</h3>
                <p className="pillar-desc">
                  Submitters confirm they are 18 or older and consent to their photographs
                  being published. Nothing is written on a companion&rsquo;s behalf by us.
                </p>
              </div>

              <div className="pillar-box">
                <div className="pillar-icon">🔍</div>
                <h3 className="pillar-title">Duplicate-photo detection</h3>
                <p className="pillar-desc">
                  Every upload is hashed with SHA-256. A submission containing an identical
                  photograph to one already published elsewhere is held for manual review
                  rather than published.
                </p>
              </div>

              <div className="pillar-box">
                <div className="pillar-icon">⚖️</div>
                <h3 className="pillar-title">No invented claims</h3>
                <p className="pillar-desc">
                  We do not run live video checks, do not collect government ID, and do not
                  publish review scores or star ratings we have not verified. Where we do
                  not have a mechanism, we say so.
                </p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">For independent companions &amp; agencies</h2>
            <p className="info-text">
              If you work independently, you keep control of your own rates, services,
              photographs and schedule, and you can hide your phone number or unpublish your
              listing at any time. Because we handle no payments, there is no commission to
              deduct.
            </p>
            <p className="info-text">
              <Link href="/faq">Read the FAQ</Link> first — it explains exactly what review
              covers, what the Verified mark does and does not mean, and the
              advance-payment scam that targets clients everywhere in this industry.
            </p>
            <div className="info-cta-box">
              <span>Ready to list your profile on lovebite.live?</span>
              <Link href="/profile/add" className="info-cta-btn">
                Create your profile →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>

      <SiteFooter />
    </>
  );
}
