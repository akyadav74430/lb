import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import SiteFooter from "@/components/SiteFooter";
import {
  getProfilesForLocality,
  getLocalityListing,
  listLocalitiesWithListings,
  type LocalityListing,
} from "@/lib/seo/profiles";
import { buildLocalityMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, profileListJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { BRAND, displayCityName } from "@/lib/seo/site";

interface Props {
  params: Promise<{ city: string; locality: string }>;
}

export const revalidate = 3600;

export const dynamicParams = true;

export async function generateStaticParams() {
  const localities = await listLocalitiesWithListings();
  return localities.map((loc) => ({ city: loc.citySlug, locality: loc.slug }));
}

async function resolveLocality(citySlug: string, localitySlug: string): Promise<LocalityListing> {
  const locality = await getLocalityListing(citySlug, localitySlug);
  if (!locality) notFound();
  return locality;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, locality: localitySlug } = await params;
  const locality = await resolveLocality(citySlug, localitySlug);
  return buildLocalityMetadata(locality);
}

export default async function LocalityPage({ params }: Props) {
  const { city: citySlug, locality: localitySlug } = await params;
  const locality = await resolveLocality(citySlug, localitySlug);
  const profiles = await getProfilesForLocality(locality);

  const regionSuffix = locality.region ? ` in ${displayCityName(locality.region)}` : "";
  const countText = locality.count > 0
    ? `${locality.count} public ${locality.count === 1 ? "profile" : "profiles"}`
    : "No verified listings yet";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Call Girls", path: "/call-girls" },
          { name: locality.cityName, path: `/call-girls-in/${locality.citySlug}` },
          { name: locality.name, path: `/call-girls-in/${locality.citySlug}/${locality.slug}` },
        ])}
      />
      <JsonLd
        data={profileListJsonLd(
          `Call Girls in ${locality.name}, ${locality.cityName}`,
          profiles.map((p) => ({ name: p.name, id: p.id, city: locality.cityName }))
        )}
      />

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/call-girls">Call Girls</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href={`/call-girls-in/${locality.citySlug}`}>{locality.cityName}</Link>
            <span className="breadcrumb__sep">›</span>
            <span>{locality.name}</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">
              Call Girls in {locality.name}, {locality.cityName} — Independent Escorts & Companions
            </h1>
            <p className="info-page-subtitle">
              {countText} currently listed in {locality.name}, {locality.cityName}
              {regionSuffix}. {BRAND} publishes independent escorts, call girls and companions
              here with real photos and published rates — open a profile to see availability
              and contact details.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">Profiles in {locality.name}, {locality.cityName}</h2>
            {profiles.length > 0 ? (
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
            ) : (
              <p className="info-text">
                No verified profiles are currently listed in {locality.name}, {locality.cityName}.{" "}
                {locality.count === 0 && (
                  <>
                    Be the first to{" "}
                    <Link href="/profile/add" className="btn-leave-review" style={{ display: "inline-block" }}>
                      add your profile
                    </Link>
                    {"."}
                  </>
                )}
              </p>
            )}
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">About call girls in {locality.name}, {locality.cityName}</h2>
            <p className="info-text">
              {BRAND} publishes verified independent escorts and call girls in {locality.name}, {locality.cityName}.
              {locality.count > 0
                ? ` There ${locality.count === 1 ? "is" : "are"} currently ${locality.count} public ${locality.count === 1 ? "listing" : "listings"} in this locality.`
                : " No verified listings are currently available in this locality."}
              Open a profile to see real photos, published rates, and direct contact details.
            </p>
            <p className="info-text">
              Availability and timings change often, which is why they live on each profile
              rather than on this page. If nothing here fits what you need,{" "}
              <Link href={`/call-girls-in/${locality.citySlug}`}>the {locality.cityName} call girls directory</Link> lists everything
              published in the city, and the city pages above cover the neighbouring listings.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">Companion in {locality.name}?</h2>
            <p className="info-text">
              If you are a companion based in {locality.name}, {locality.cityName}, you can list yourself on {BRAND} for
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