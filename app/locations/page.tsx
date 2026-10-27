import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import {
  initializeLGDRegistry,
  getLGDRegistry,
  isLGDRegistryReady,
} from "@/lib/india-locations-lgd";
import { absoluteUrl, BRAND } from "@/lib/seo/site";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo/jsonld";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const registry = getLGDRegistry();

  if (!isLGDRegistryReady()) {
    await initializeLGDRegistry();
  }

  const states = registry.getStates();
  const stateCount = states.length;

  return {
    title: "Locations in India — Call Girls Directory",
    description: `Browse verified escort and companion listings across ${stateCount} states and union territories in India. Find cities, districts, and profiles with real photos, published rates, and direct contact.`,
    robots: { index: true, follow: true },
    alternates: { canonical: absoluteUrl("/locations") },
    openGraph: {
      title: `Locations in India — Call Girls Directory | ${BRAND}`,
      description: `Browse verified escort and companion listings across ${stateCount} states and union territories in India.`,
      url: absoluteUrl("/locations"),
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

export default async function LocationsDirectoryPage() {
  const registry = getLGDRegistry();

  if (!isLGDRegistryReady()) {
    await initializeLGDRegistry();
  }

  const states = registry.getStates().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
        ])}
      />

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span>Locations</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">Locations in India</h1>
            <p className="info-page-subtitle">
              Browse verified escort and companion listings by state and union
              territory. Select a state to view its districts and cities with
              public listings.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">States and Union Territories</h2>
            {states.length > 0 ? (
              <ul className="city-link-list">
                {states.map((state) => {
                  const districts = registry.getDistrictsForState(
                    state.id.replace("state:", "")
                  );
                  const districtCount = districts.length;
                  return (
                    <li key={state.slug}>
                      <Link href={`/locations/${state.slug}`} className="city-link">
                        {state.name}
                        {districtCount > 0 && (
                          <span className="city-link__meta">
                            {districtCount} {districtCount === 1 ? "district" : "districts"}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="info-text">No states found.</p>
            )}
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">About the Location Directory</h2>
            <p className="info-text">
              {BRAND} provides a state-wise directory of independent escorts, call
              girls, and companions across India. Select a state to browse its
              districts, then open a city page to view real photos, published rates,
              and direct contact details.
            </p>
            <p className="info-text">
              If you are a companion based in India, you can{" "}
              <Link href="/profile/add">create a profile</Link> for free. Your
              profile only becomes public after approval.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
