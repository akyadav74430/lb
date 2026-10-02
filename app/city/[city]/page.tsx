import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import SiteFooter from "@/components/SiteFooter";
import {
  getCityAggregates,
  getCityListing,
  getProfilesForCity,
  listCitiesWithListings,
  type CityListing,
} from "@/lib/seo/profiles";
import { buildCityMetadata } from "@/lib/seo/metadata";
import { buildCityBody } from "@/lib/seo/city-content";
import { breadcrumbJsonLd, profileListJsonLd, faqPageJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { BRAND, displayCityName } from "@/lib/seo/site";
import { MAJOR_CITY_BY_SLUG } from "@/lib/seo/major-cities";

interface Props {
  params: Promise<{ city: string }>;
}

// Listings change as profiles are published; revalidate hourly.
export const revalidate = 3600;

// A city that gets its first listing after deploy still resolves.
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await listCitiesWithListings();
  return cities.map((city) => ({ city: city.slug }));
}

async function resolveCity(slug: string): Promise<CityListing> {
  const city = await getCityListing(slug);
  if (!city) notFound();
  return city;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: slug } = await params;
  const city = await resolveCity(slug);
  return buildCityMetadata(city);
}

export default async function CityPage({ params }: Props) {
  const { city: slug } = await params;
  const city = await resolveCity(slug);
  const [profiles, allCities, aggregates] = await Promise.all([
    getProfilesForCity(city),
    listCitiesWithListings(),
    getCityAggregates(city),
  ]);
  const otherCities = allCities.filter((c) => c.slug !== city.slug);
  const regionSuffix = city.region ? ` in ${displayCityName(city.region)}` : "";
  const countText = `${city.count} public ${city.count === 1 ? "profile" : "profiles"}`;
  const body = buildCityBody(city, aggregates);
  const cityDef = MAJOR_CITY_BY_SLUG.get(city.slug);
  const faqs = cityDef?.faqs && cityDef.faqs.length > 0 ? cityDef.faqs : null;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Escorts", path: "/escorts" },
          { name: city.name, path: `/city/${city.slug}` },
        ])}
      />
      <JsonLd
        data={profileListJsonLd(
          `Escorts in ${city.name}`,
          profiles.map((p) => ({ name: p.name, id: p.id, city: city.name }))
        )}
      />
      {faqs && <JsonLd data={faqPageJsonLd(faqs)} />}

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/escorts">Escorts</Link>
            <span className="breadcrumb__sep">›</span>
            <span>{city.name}</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">
              Escorts in {city.name} — Call Girls &amp; Companions
            </h1>
            <p className="info-page-subtitle">
              {countText} currently listed in {city.name}
              {regionSuffix}. {BRAND} publishes independent escorts, call girls and companions
              here with real photos and published rates — open a profile to see availability
              and contact details.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">Profiles in {city.name}</h2>
            <div className="profiles-grid">
              {profiles.map((profile, index) => (
                <ProfileCard
                  key={profile.id}
                  name={profile.name}
                  location={`${profile.city}${profile.state ? `, ${profile.state}` : ""}`}
                  photoUrl={profile.photoUrl}
                  topBadge={profile.topBadge}
                  badges={profile.badges}
                  href={`/profile/${profile.id}`}
                  phone={profile.phone}
                  whatsapp={profile.whatsapp}
                  hidePhone={Boolean(profile.isPhoneHidden || profile.hidePhoneFromPublic)}
                  priority={index < 4}
                />
              ))}
            </div>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">About escorts in {city.name}</h2>
            {body.intro.map((paragraph, index) => (
              <p key={index} className="info-text">
                {paragraph}
              </p>
            ))}
            {body.ratesNote && <p className="info-text">{body.ratesNote}</p>}
            <p className="info-text">
              Availability and timings change often, which is why they live on each profile
              rather than on this page. If nothing here fits what you need,{" "}
              <Link href="/escorts">the full India escort directory</Link> lists everything
              published nationwide, and the city pages above cover the neighbouring listings.
            </p>
          </div>

          {body.areasNote && body.areasHeading && (
            <div className="info-card-content">
              <h2 className="info-section__title">{body.areasHeading}</h2>
              <p className="info-text">{body.areasNote}</p>
            </div>
          )}

          {otherCities.length > 0 && (
            <div className="info-card-content">
              <h2 className="info-section__title">Other cities with listings</h2>
              <ul className="city-link-list">
                {otherCities.map((other) => (
                  <li key={other.slug}>
                    <Link href={`/city/${other.slug}`} className="city-link">
                      Escorts in {other.name}
                      <span className="city-link__meta">
                        {other.count} {other.count === 1 ? "profile" : "profiles"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {faqs && (
            <div className="info-card-content">
              <h2 className="info-section__title">Frequently Asked Questions in {city.name}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {faqs.map((faq, index) => (
                  <div key={index} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "12px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "6px", color: "var(--text-primary)" }}>
                      {faq.q}
                    </h3>
                    <p className="info-text" style={{ margin: 0 }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="info-card-content">
            <h2 className="info-section__title">Companion in {city.name}?</h2>
            <p className="info-text">
              If you are a companion based in {city.name}, you can list yourself on {BRAND} for
              free. Your profile only becomes a public page after it is approved, and you can
              hide or unpublish it at any time.
            </p>
            <p className="info-text">
              <Link href="/profile/add" className="btn-leave-review" style={{ display: "inline-block" }}>
                Add your profile
              </Link>
            </p>
            <p className="info-text">
              Before you contact anyone, read the{" "}
              <Link href="/terms">terms of service</Link>.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}