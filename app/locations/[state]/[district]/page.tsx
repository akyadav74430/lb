import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import { initializeLGDRegistry, getLGDRegistry, isLGDRegistryReady } from "@/lib/india-locations-lgd";
import { absoluteUrl, BRAND } from "@/lib/seo/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { NO_INDEX } from "@/lib/seo/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ state: string; district: string }> }): Promise<Metadata> {
  const { state: stateSlug, district: districtSlug } = await params;
  const registry = getLGDRegistry();

  if (!isLGDRegistryReady()) {
    await initializeLGDRegistry();
  }

  const state = registry.getStates().find(s => s.slug === stateSlug);
  if (!state) {
    return { title: "Not found", robots: NO_INDEX };
  }

  const districts = registry.getDistrictsForState(state.id.replace('state:', ''));
  const district = districts.find(d => d.slug === districtSlug);

  if (!district) {
    return {
      title: "District not found",
      robots: NO_INDEX,
    };
  }

  const districtCities = district.children.filter(c => c.type === 'city' && c.isIndexable);
  const cityCount = districtCities.length;

  const title = `${district.name}, ${state.name} — Call Girls Directory | ${BRAND}`;
  const description = `Browse call girls and escorts in ${district.name} district, ${state.name}. ${cityCount} ${cityCount === 1 ? "city" : "cities"} with verified listings. Official directory by ${BRAND}.`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: absoluteUrl(`/locations/${state.slug}/${district.slug}`) },
    openGraph: {
      title: `${title} | ${BRAND}`,
      description,
      url: absoluteUrl(`/locations/${state.slug}/${district.slug}`),
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

async function resolveDistrict(stateSlug: string, districtSlug: string) {
  if (!isLGDRegistryReady()) {
    await initializeLGDRegistry();
  }
  const registry = getLGDRegistry();
  const state = registry.getStates().find(s => s.slug === stateSlug);
  if (!state) notFound();

  const districts = registry.getDistrictsForState(state.id.replace('state:', ''));
  const district = districts.find(d => d.slug === districtSlug);
  if (!district) notFound();

  return { state, district, registry };
}

export default async function DistrictDirectoryPage({ params }: { params: Promise<{ state: string; district: string }> }) {
  const { state: stateSlug, district: districtSlug } = await params;
  const { state, district, registry } = await resolveDistrict(stateSlug, districtSlug);

  const districtCities = district.children.filter(c => c.type === 'city' && c.isIndexable);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: state.name, path: `/locations/${state.slug}` },
          { name: district.name, path: `/locations/${state.slug}/${district.slug}` },
        ])}
      />

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href="/locations">Locations</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href={`/locations/${state.slug}`}>{state.name}</Link>
            <span className="breadcrumb__sep">›</span>
            <span>{district.name}</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">{district.name}, {state.name} — Call Girls Directory</h1>
            <p className="info-page-subtitle">
              {districtCities.length} {districtCities.length === 1 ? "city" : "cities"} with verified listings in {district.name} district.
              Browse cities below to find call girls and escorts.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">Cities in {district.name} District</h2>
            {districtCities.length > 0 ? (
              <ul className="city-link-list">
                {districtCities.map((city) => (
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
            ) : (
              <p className="info-text">
                No cities with verified listings found in {district.name} district yet.
              </p>
            )}
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">About {district.name} District</h2>
            <p className="info-text">
              {district.name} is a district in {state.name} with {district.children.filter(c => c.type === 'city').length} cities and towns.
              {BRAND} provides verified listings of independent escorts, call girls, and companions across {district.name}.
              Each listing is manually reviewed and includes real photos, published rates, and direct contact information.
            </p>
            <p className="info-text">
              If you are a companion based in {district.name}, you can <Link href="/profile/add">create a profile</Link>
              for free. Your profile only becomes public after approval.
            </p>
            <p className="info-text">
              Browse all locations in {state.name} at <Link href={`/locations/${state.slug}`}>the state directory</Link>.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}