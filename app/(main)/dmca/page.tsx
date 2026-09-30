import Link from "next/link";

export const metadata = {
  title: "DMCA Notice & 18 U.S.C. § 2257 Compliance — lovebite.live",
  description: "DMCA copyright takedown procedure and 18 U.S.C. 2257 record-keeping statement for lovebite.live.",
};

export default function DmcaPage() {
  return (
    <main className="info-page-main">
      <div className="info-page-container">
        <nav className="profile-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/" className="profile-breadcrumb__link">Home</Link>
          <span className="profile-breadcrumb__sep">›</span>
          <span className="profile-breadcrumb__current">DMCA &amp; 2257 Compliance</span>
        </nav>

        <div className="info-page-hero">
          <h1 className="info-page-title">DMCA Takedown &amp; 18 U.S.C. § 2257 Statement</h1>
          <p className="info-page-subtitle">Copyright enforcement and adult age verification compliance on lovebite.live.</p>
        </div>

        <div className="info-card-content legal-text-content">
          <section className="info-section">
            <h2 className="info-section__title">18 U.S.C. § 2257 Record-Keeping Compliance</h2>
            <p className="info-text">
              All visual depictions of actual sexually explicit conduct appearing on this website comply with the record-keeping requirements of 18 U.S.C. § 2257 and 28 C.F.R. Part 75. 
            </p>
            <p className="info-text">
              All models, escorts, and depicted performers were at least 18 years of age at the time of creation of such depictions. All required records are maintained by the respective independent content creators and verified prior to listing publication.
            </p>
          </section>

          <section className="info-section">
            <h2 className="info-section__title">DMCA Copyright Infringement Claims</h2>
            <p className="info-text">
              lovebite.live respects intellectual property rights. If you are a copyright owner or authorized representative and believe that content hosted on our website infringes your rights, you may submit a formal DMCA notification containing:
            </p>
            <ul className="legal-list">
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material to be removed, including specific URLs.</li>
              <li>Your contact details: legal name, address, telephone number, and email.</li>
              <li>A statement of good faith belief that the use is not authorized by the copyright owner.</li>
              <li>A statement made under penalty of perjury that the information is accurate and you are authorized to act.</li>
            </ul>
            <p className="info-text" style={{ marginTop: 16 }}>
              Send DMCA takedown requests directly to: <strong>dmca@lovebite.com</strong> or submit via our <Link href="/contact" className="auth-link">Contact Department</Link>. Verified takedowns are processed within 24 hours.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
