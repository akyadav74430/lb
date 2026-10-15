import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { NO_INDEX } from "@/lib/seo/site";

/**
 * Custom 404 page.
 *
 * The default Next.js not-found page is a bare white screen with no links,
 * which is a dead end for both users and crawlers. This replaces it with a
 * branded page that:
 *   - Is noindexed (404s should never be in the index)
 *   - Links back to key directory pages so Googlebot can continue crawling
 *   - Uses a clear h1 so the page is unambiguous to any consumer
 */
export const metadata: Metadata = {
  title: "Page Not Found — 404",
  description: "The page you are looking for does not exist or has been removed.",
  robots: NO_INDEX,
};

export default function NotFound() {
  return (
    <>
      <main className="info-page-main">
        <div className="info-page-container" style={{ textAlign: "center", paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ fontSize: 96, fontWeight: 900, color: "var(--primary, #c41e3a)", lineHeight: 1 }}>
            404
          </div>
          <h1 className="info-page-title" style={{ marginTop: 16 }}>
            Page not found
          </h1>
          <p className="info-text" style={{ maxWidth: 480, margin: "16px auto 0" }}>
            The profile, city or page you were looking for does not exist or has been
            removed. Use the links below to get back to the directory.
          </p>

          <div style={{ marginTop: 40, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="info-cta-btn">
              Browse Directory
            </Link>
            <Link
              href="/escorts"
              className="info-cta-btn"
              style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
            >
              All Escorts
            </Link>
            <Link
              href="/call-girls"
              className="info-cta-btn"
              style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text)" }}
            >
              Call Girls
            </Link>
          </div>

          <div style={{ marginTop: 40 }}>
            <h2 className="info-section__title">Popular cities</h2>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 12 }}>
{[
                { name: "Mumbai", slug: "mumbai" },
                { name: "Delhi", slug: "delhi" },
                { name: "Bangalore", slug: "bangalore" },
                { name: "Pune", slug: "pune" },
                { name: "Hyderabad", slug: "hyderabad" },
                { name: "Goa", slug: "goa" },
                { name: "Kolkata", slug: "kolkata" },
                { name: "Chennai", slug: "chennai" },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/call-girls-in/${city.slug}`}
                  className="city-link"
                  style={{ fontSize: 13 }}
                >
                  Call girls in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}