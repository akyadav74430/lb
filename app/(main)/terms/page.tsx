import Link from "next/link";

export const metadata = {
  title: "Terms of Service — lovebite.com",
  description: "Terms and conditions of use for lovebite.com directory.",
};

export default function TermsPage() {
  return (
    <main className="info-page-main">
      <div className="info-page-container">
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">Terms of Service</span>
        </nav>

        <div className="info-page-hero">
          <h1 className="info-page-title">Terms of Service</h1>
          <p className="info-page-subtitle">Last modified: September 2026</p>
        </div>

        <div className="info-card-content legal-text-content">
          <section className="info-section">
            <h2 className="info-section__title">1. Age Requirement (Strict 18+ / 21+)</h2>
            <p className="info-text">
              By accessing lovebite.com (the “Website”), you affirm under penalty of perjury that you are of legal adult age in your jurisdiction (at least 18 years of age, or 21 where required by local law), and that you are not prohibited from viewing sexually oriented adult advertisements.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">2. Nature of the Service</h2>
            <p className="info-text">
              lovebite.com is an online advertising directory and publisher of independent adult service provider listings. lovebite.com is not an escort agency, employer, or booking broker. All advertisers are independent contractors who represent and warrant that their listings and services conform to all applicable local laws.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">3. Advertiser Responsibilities &amp; Verification</h2>
            <p className="info-text">
              Advertisers represent that they own the rights to all images, videos, and texts uploaded, that no depicted individuals are under 18 years old, and that all depictions are consensual. Advertisers agree to maintain records required under 18 U.S.C. § 2257.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">4. Prohibited Content &amp; Anti-Trafficking</h2>
            <p className="info-text">
              Any form of human trafficking, non-consensual content, underage depictions, coercion, or illegal substances is strictly forbidden. Violations result in immediate permanent termination, IP blocking, and reporting to relevant law enforcement agencies.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">5. Disclaimer &amp; Limitation of Liability</h2>
            <p className="info-text">
              lovebite.com provides the directory on an &quot;as is&quot; and &quot;as available&quot; basis without warranty of any kind. lovebite.com disclaims all liability for any interactions, financial transactions, or disputes arising between users and advertisers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
