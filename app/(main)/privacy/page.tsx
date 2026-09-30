import Link from "next/link";
import { absoluteUrl } from "@/lib/seo/site";

export const metadata = {
  title: "Privacy & Cookie Policy — lovebite.live",
  description: "Privacy policy, data protection, and cookie disclosures for lovebite.live.",
  alternates: { canonical: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <main className="info-page-main">
      <div className="info-page-container">
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">Privacy Policy</span>
        </nav>

        <div className="info-page-hero">
          <h1 className="info-page-title">Privacy &amp; Cookie Policy</h1>
          <p className="info-page-subtitle">Last modified: September 2026</p>
        </div>

        <div className="info-card-content legal-text-content">
          <section className="info-section">
            <h2 className="info-section__title">1. Information We Collect</h2>
            <p className="info-text">
              We collect minimal personal data essential to service delivery: account credentials (email and encrypted password hash) for registered advertisers, and profile details submitted willingly by advertisers on lovebite.live.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">2. No Tracking of Browsing Visitors</h2>
            <p className="info-text">
              General directory visitors browse anonymously. We do not sell user data, track personal browsing habits, or provide visitor telemetry to third-party ad networks.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">3. Cookies &amp; Local Storage</h2>
            <p className="info-text">
              We use strictly necessary session cookies and local storage exclusively to remember your theme preference (Day / Night mode) and authenticate active advertiser or admin sessions.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">4. GDPR &amp; Data Rights</h2>
            <p className="info-text">
              Under GDPR and relevant privacy regulations, registered users have the right to request full export or permanent deletion of their account and profile data at any time via the Contact page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
