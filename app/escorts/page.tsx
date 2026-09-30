import type { Metadata } from "next";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import SiteFooter from "@/components/SiteFooter";
import { listPublicProfiles, listCitiesWithListings } from "@/lib/seo/profiles";
import { breadcrumbJsonLd, profileListJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { BRAND } from "@/lib/seo/site";

// The listing changes as profiles are published, so keep the page fresh
// without re-rendering it on every request.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Escort Service & Independent Escorts in India",
  description:
    "India escort service directory. Browse independent escorts, call girls and companions city by city, with real photos, published rates and direct contact.",
  alternates: { canonical: "/escorts" },
  openGraph: {
    title: "Escort Service & Independent Escorts in India",
    description:
      "Browse independent escorts, call girls and companions in India, city by city, with real photos and published rates.",
    url: "/escorts",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const PILLARS = [
  {
    title: "Public listings only",
    body: "A profile appears here after it has been approved and set to public visibility. Draft, private and suspended profiles are never published or indexed.",
  },
  {
    title: "City pages backed by real profiles",
    body: "We only publish a city page once companions in that city have a public listing, so you never land on an empty page for a place with nobody listed.",
  },
  {
    title: "Contact details you choose",
    body: "Each profile carries only the contact details that companion chose to publish. Street addresses are never shown on a listing.",
  },
];

export default async function EscortsPage() {
  const [cities, profiles] = await Promise.all([listCitiesWithListings(), listPublicProfiles()]);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Escorts", path: "/escorts" },
        ])}
      />

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span>Escorts</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">
              Escort Service in India — Independent Escorts &amp; Companions
            </h1>
            <p className="info-page-subtitle">
              {BRAND} lists independent escorts, call girls and companions across India. Every
              entry links to a full profile page with photos, published rates and contact details.
              Pick your city to see the profiles available near you.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">How this directory works</h2>
            <p className="info-text">
              Searching for an escort service usually means searching for escorts in one
              particular city. That is why listings are grouped city by city here rather than
              buried in a single feed: open a city, compare the profiles that are actually
              listed there, and contact the companion directly. No agency middleman, no
              invented availability.
            </p>

            <div className="info-pillars-grid">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="pillar-box">
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">Browse escorts by city</h2>
            {cities.length > 0 ? (
              <>
                <p className="info-text">
                  These are the cities with published listings right now. Use them to find
                  escorts near you.
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
                No city has a published listing yet. If you are a companion, you can{" "}
                <Link href="/profile/add">create a profile</Link> and it will appear here once
                approved.
              </p>
            )}
          </div>

          {profiles.length > 0 && (
            <>
              <JsonLd
                data={profileListJsonLd(
                  `Escorts & Call Girls in India`,
                  profiles.map((p) => ({ name: p.name, id: p.id, city: p.city }))
                )}
              />
              <div className="info-card-content">
                <h2 className="info-section__title">Public profiles across India</h2>
                <div className="profiles-grid">
                  {profiles.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      name={profile.name}
                      location={`${profile.city}${profile.state ? `, ${profile.state}` : ""}`}
                      photoUrl={profile.photoUrl}
                      topBadge={profile.topBadge}
                      badges={profile.badges}
                      href={`/profile/${profile.id}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="info-card-content">
            <h2 className="info-section__title">Companion services listed here</h2>
            <p className="info-text">
              Profiles on {BRAND} cover the services most people look for: girlfriend
              experience dates, outcall and incall meetings, couple bookings, dinner
              accompaniment, city tours and massage &amp; wellness sessions. Availability and
              rates are published on each individual profile, so you can compare before you
              make contact.
            </p>
            <p className="info-text">
              Please read our <Link href="/terms">terms</Link> before contacting anyone, and
              check the <Link href="/blacklist">blacklist</Link> if a profile you visited looks
              wrong. Reports can be filed from any profile page.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}