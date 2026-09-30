import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import SiteFooter from "@/components/SiteFooter";
import {
  getCityListing,
  getProfilesForCity,
  listCitiesWithListings,
  type CityListing,
} from "@/lib/seo/profiles";
import { buildCityMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, profileListJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { BRAND } from "@/lib/seo/site";

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
  const [profiles, allCities] = await Promise.all([
    getProfilesForCity(city),
    listCitiesWithListings(),
  ]);
  const otherCities = allCities.filter((c) => c.slug !== city.slug);
  const regionSuffix = city.region ? ` in ${city.region}` : "";
  const countText = `${city.count} public ${city.count === 1 ? "profile" : "profiles"}`;

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
              {profiles.map((profile) => (
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
                />
              ))}
            </div>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">About escorts in {city.name}</h2>
            <p className="info-text">
              If you are looking for escorts in {city.name}, this page lists the companions who
              have chosen to be listed publicly in that city{regionSuffix} — nothing imported,
              nothing invented. Every profile is checked before it goes live, and each one
              carries its own photos, services and rates so you can compare before contacting
              anyone.
            </p>
            <p className="info-text">
              Availability changes often, which is why rates and timings live on the profile
              rather than on this page. If you are searching for escorts near you and nothing
              here fits, the neighbouring city pages below usually carry more listings, and{" "}
              <Link href="/escorts">the main escort service page</Link> lists everything
              published across India.
            </p>
          </div>

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
              Before you contact anyone, read the <Link href="/terms">terms of service</Link>{" "}
              and check the <Link href="/blacklist">blacklist</Link>.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}