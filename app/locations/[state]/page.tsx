import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import { initializeLGDRegistry, getLGDRegistry, isLGDRegistryReady } from "@/lib/india-locations-lgd";
import { absoluteUrl, BRAND } from "@/lib/seo/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { NO_INDEX } from "@/lib/seo/site";

// State directory pages are noindex, follow
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const registry = getLGDRegistry();

  if (!isLGDRegistryReady()) {
    await initializeLGDRegistry();
  }

  const state = registry.getStates().find(s => s.slug === stateSlug);
  if (!state) {
    return {
      title: "State not found",
      robots: NO_INDEX,
    };
  }

  const districts = registry.getDistrictsForState(state.id.replace('state:', ''));
  const districtCount = districts.length;
  const citiesWithListings = districts.flatMap(d => d.children.filter(c => c.type === 'city' && c.isIndexable)).length;

  const title = `${state.name} — Call Girls Directory`;
  const description = `Browse call girls and escorts in ${state.name}. ${districtCount} districts, ${citiesWithListings} cities with verified listings. Official directory by ${BRAND}.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(`/locations/${state.slug}`) },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/locations/${state.slug}`),
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

async function resolveState(stateSlug: string) {
  if (!isLGDRegistryReady()) {
    await initializeLGDRegistry();
  }
  const registry = getLGDRegistry();
  const state = registry.getStates().find(s => s.slug === stateSlug);
  if (!state) notFound();
  return state;
}

export default async function StateDirectoryPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;
  const state = await resolveState(stateSlug);
  const registry = getLGDRegistry();

  const districts = registry.getDistrictsForState(state.id.replace('state:', ''));
  const citiesWithListings = districts.flatMap(d => d.children.filter(c => c.type === 'city' && c.isIndexable));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: state.name, path: `/locations/${state.slug}` },
        ])}
      />

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/locations">Locations</Link>
            <span className="breadcrumb__sep">›</span>
            <span>{state.name}</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">{state.name} — Call Girls Directory</h1>
            <p className="info-page-subtitle">
              {districts.length} districts, {citiesWithListings.length} cities with verified listings.
              Browse districts below to find call girls and escorts in {state.name}.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">Districts in {state.name}</h2>
            {districts.length > 0 ? (
              <ul className="city-link-list">
                {districts.map((district) => {
                  const districtCities = district.children.filter(c => c.type === 'city' && c.isIndexable);
                  return (
                    <li key={district.slug}>
                      <Link href={`/locations/${state.slug}/${district.slug}`} className="city-link">
                        {district.name}
                        <span className="city-link__meta">
                          {districtCities.length} {districtCities.length === 1 ? "city" : "cities"} with listings
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="info-text">No districts with verified listings found in {state.name}.</p>
            )}
          </div>

          {citiesWithListings.length > 0 && (
            <div className="info-card-content">
              <h2 className="info-section__title">Cities with Listings in {state.name}</h2>
              <ul className="city-link-list">
                {citiesWithListings.map((city) => (
                  <li key={city.slug}>
                    <Link href={`/call-girls-in/${city.slug}`} className="city-link">
                      Call Girls in {city.name}
                      <span className="city-link__meta">
                        {city.listingCount} {city.listingCount === 1 ? "profile" : "profiles"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="info-card-content">
            <h2 className="info-section__title">About {state.name}</h2>
            <p className="info-text">
              {state.name} is a state in India with {districts.length} districts. {BRAND} provides verified
              listings of independent escorts, call girls, and companions across {state.name}. Each listing
              is manually reviewed and includes real photos, published rates, and direct contact information.
            </p>
            <p className="info-text">
              If you are a companion based in {state.name}, you can <Link href="/profile/add">create a profile</Link>
              for free. Your profile only becomes public after approval.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}