import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { absoluteUrl, BRAND } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What we collect, why we collect it, how long we keep it, how IP addresses are handled, and what control you have over your information when using the Lovebite directory.",
  alternates: { canonical: absoluteUrl("/privacy") },
  openGraph: {
    title: "Privacy Policy",
    description: `How your information is collected and handled when using ${BRAND}.`,
    url: absoluteUrl("/privacy"),
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span>Privacy Policy</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">Privacy Policy</h1>
            <p className="info-page-subtitle">
              We only collect what is necessary to run the directory. We do not run
              advertising trackers, we do not profile visitors for advertising, and we
              minimise what we store.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">1. Who we are</h2>
            <p className="info-text">
              This is the privacy policy for {BRAND} (lovebite.live). We operate the
              directory and do not act as a booking agency or service provider to
              visitors.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">2. Information we collect</h2>

            <h3 className="pillar-title">2.1 Information you provide</h3>
            <p className="info-text">
              <strong>Profile submissions.</strong> If you create a profile, you submit a
              name, a short bio, city and location information, contact details if you
              choose to share them, photographs, rates and services. Some of this becomes
              publicly visible depending on the choices you make when editing your profile.
            </p>
            <p className="info-text">
              <strong>Reports.</strong> When you report a profile, we store the reason for
              the report, the profile it relates to, any notes you supply, and the IP
              address used to submit the report. IP addresses are recorded for rate
              limiting and basic abuse prevention only.
            </p>
            <p className="info-text">
              <strong>Contact messages.</strong> Messages sent via the contact page store
              your name, email address, message, submission time, and the IP address used
              to send the message.
            </p>

            <h3 className="pillar-title">2.2 Information collected automatically</h3>
            <p className="info-text">
              <strong>Server logs.</strong> Requests to the site are logged in the
              application and hosting layer for operational purposes. Logs may include IP
              addresses, timestamps, the resource requested, and basic browser metadata.
              These are used for debugging, performance, security and abuse mitigation.
            </p>
            <p className="info-text">
              <strong>Rate limiting data.</strong> To protect forms against automated
              abuse, we store hashed identifiers derived from IP addresses for a short
              window. These are not used for profiling.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">3. Why we collect it</h2>
            <p className="info-text">
              We collect the minimum necessary to operate a directory (publishing approved
              listings, preventing spam, reviewing reports), to secure the site, and to
              respond when someone contacts us. We do not sell, rent, or trade visitor
              information for advertising.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">4. IP addresses</h2>
            <p className="info-text">
              IP addresses are recorded where required for security (reports, contact
              messages, rate limits and audit logs). We do not use IP addresses for
              fingerprinting across unrelated sites, we do not pass them to ad networks,
              and we do not attempt to pinpoint a visitor&rsquo;s exact street address. IP
              addresses stored in audit or moderation logs are kept only as long as needed
              for security and abuse prevention.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">5. Cookies and tracking</h2>
            <p className="info-text">
              There are no third-party advertising cookies, no third-party analytics, and
              no cross-site tracking pixels. Any cookies used are strictly necessary for
              authentication when you sign in as an authorised user (session cookies). If
              you do not sign in, you are not issued an authentication cookie from our
              auth provider.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">6. Retention</h2>
            <p className="info-text">
              Public profiles are kept for as long as they remain approved and public. A
              profile owner may unpublish or remove their listing at any time. Contact
              messages and reports are retained for a reasonable period to address abuse
              and maintain an audit trail, then deleted or anonymised. Server logs are
              rotated as part of normal operations.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">7. Your choices and control</h2>
            <p className="info-text">
              <strong>Unpublish your profile.</strong> You can hide your listing by
              unpublishing it from the profile edit screen at any time.
            </p>
            <p className="info-text">
              <strong>Hide your contact details.</strong> If you do not want your phone
              number shown on the public profile, you can hide it in your profile settings.
            </p>
            <p className="info-text">
              <strong>Remove photographs.</strong> To have a photograph removed because you
              own it and never consented to its publication, use the DMCA process (see the
              DMCA page).
            </p>
            <p className="info-text">
              <strong>Ask us about your data.</strong> If you have a question about what
              we hold about you, email us via the contact page and include enough detail to
              identify the relevant record.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">8. Security</h2>
            <p className="info-text">
              We use HTTPS for all pages, standard security headers, and rate limiting on
              public forms. Profile photographs are stored in a dedicated storage bucket
              and delivered through secure URLs. Access to moderation tools is restricted
              to authorised staff.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">9. Changes</h2>
            <p className="info-text">
              This privacy policy may change as the site changes. The published version is
              the one in effect at the time you use the site. If we make a material change
              we will update the date here; no banner is promised because the site does not
              use invasive tracking.
            </p>
            <p className="info-text">
              Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric" })}
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">Related</h2>
            <p className="info-text">
              <Link href="/terms">Terms of service</Link> — the rules for using the site.{" "}
              <Link href="/faq">FAQ</Link> — safety and verification.{" "}
              <Link href="/dmca">DMCA</Link> — photograph removal requests.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
