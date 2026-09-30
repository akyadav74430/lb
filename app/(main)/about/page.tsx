import Link from "next/link";

export const metadata = {
  title: "About Us — lovebite.live Directory",
  description: "Learn about lovebite.live, the premier verified adult companion directory operating across India and Asia.",
};

export default function AboutPage() {
  return (
    <main className="info-page-main">
      <div className="info-page-container">
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">About Us</span>
        </nav>

        <div className="info-page-hero">
          <h1 className="info-page-title">About lovebite.live</h1>
          <p className="info-page-subtitle">
            Connecting discerning gentlemen with verified, independent companions and luxury agencies since 2012.
          </p>
        </div>

        <div className="info-card-content">
          <section className="info-section">
            <h2 className="info-section__title">Our Mission</h2>
            <p className="info-text">
              lovebite.live was founded with a single, uncompromising vision: to build the most trustworthy, elegant, and functionally advanced adult companion directory in the world. 
              We believe adult advertising should be dignified, transparent, and completely free from misleading advertisements, fraudulent booking agents, and stolen photography.
            </p>
            <p className="info-text">
              Over the last decade, we have established the premier independent companion directory, prominently covering Mumbai, Delhi NCR, Bangalore, Kolkata, Goa, Pune, Hyderabad, and Dubai.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">The 3 Pillars of lovebite.live</h2>
            <div className="info-pillars-grid">
              <div className="pillar-box">
                <div className="pillar-icon">🛡️</div>
                <h3 className="pillar-title">100% Real Verification</h3>
                <p className="pillar-desc">
                  Every profile displaying our green <strong>✓ Verified</strong> badge has provided real timestamp photo verification, government ID proof of age (18+), and live video checks.
                </p>
              </div>

              <div className="pillar-box">
                <div className="pillar-icon">🔒</div>
                <h3 className="pillar-title">Discretion &amp; Privacy</h3>
                <p className="pillar-desc">
                  We collect minimal data, never share your contact information with third parties, and employ high-grade SSL/TLS encryption for all site navigation and messaging.
                </p>
              </div>

              <div className="pillar-box">
                <div className="pillar-icon">⚖️</div>
                <h3 className="pillar-title">Zero Tolerance for Exploitation</h3>
                <p className="pillar-desc">
                  We maintain strict compliance with global anti-trafficking standards, 18 U.S.C. § 2257 requirements, and cooperate fully with international human rights watchdogs.
                </p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">For Independent Companions &amp; Agencies</h2>
            <p className="info-text">
              Whether you are an independent model seeking direct client bookings without abusive middleman cuts, or an upscale agency looking for premium exposure, lovebite.live gives you full control over your rates, services, photos, and schedule.
            </p>
            <div className="info-cta-box">
              <span>Ready to list your profile or agency on lovebite.live?</span>
              <Link href="/signup" className="info-cta-btn">
                Register as an Escort →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
