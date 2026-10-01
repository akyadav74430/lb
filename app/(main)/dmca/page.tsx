import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { absoluteUrl, BRAND } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "DMCA & Content Removal Policy",
  description:
    `How to submit a copyright or stolen-photograph removal request for content on ${BRAND}, how duplicate-photo detection works, and how to report content involving a minor.`,
  alternates: { canonical: absoluteUrl("/dmca") },
  openGraph: {
    title: "DMCA & Content Removal Policy",
    description: `Copyright and stolen-photograph removal requests for content on ${BRAND}.`,
    url: absoluteUrl("/dmca"),
    type: "website",
    images: ["/opengraph-image"],
  },
};

const STEPS: string[] = [
  "Send the request from an address we can reply to, or include a working contact address. Anonymous takedown requests are much harder to verify and are handled more slowly.",
  "Identify the exact content: the full profile URL, and the photograph URLs or a description of what is being complained about.",
  "Say what the material is and why you have the right to have it removed — that you own the photograph, that you are the person depicted and did not consent to publication, that it is your copyrighted text, or that it concerns a minor.",
  "Include your name, your contact details, and a statement that the removal request is made in good faith and that the information is accurate.",
];

export default function DmcaPage() {
  return (
    <>
      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span>DMCA &amp; Removal</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">DMCA &amp; Content Removal</h1>
            <p className="info-page-subtitle">
              How to remove photographs or text from {BRAND} that you own, how our duplicate
              detection works before a listing goes live, and the faster route for
              emergencies.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">Remove your own photographs</h2>
            <p className="info-text">
              If a photograph published on this site belongs to you and you never consented
              to its publication here, send a removal request through the contact page with
              the profile URL and a description of the image. We will remove it and confirm
              to you.
            </p>
            <p className="info-text">
              If you are the person depicted and you want your profile removed, the fastest
              route is to unpublish it yourself from your profile&rsquo;s edit screen. If you no
              longer have access, request removal through the contact page.
            </p>
            <p className="info-text">
              A request must be sent from a verifiable address and should include: the full
              profile URL, which images or text are affected, why you have the right to have
              them removed, your contact details, and a good-faith statement that the request
              is accurate. Requests sent without these details may be delayed while we ask
              for more information.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">How duplicate photographs are caught</h2>
            <p className="info-text">
              Every photograph uploaded to the site is hashed with SHA-256 at upload time.
              When a new profile is submitted, each of its photographs is checked against
              the hashes already on the site. If a new submission contains a photograph that
              is byte-for-byte identical to one already published on a different profile,
              the submission is held for manual review instead of being published, and the
              match is recorded in the moderation audit log for a moderator to inspect.
            </p>
            <p className="info-text">
              This catches the common case of one person submitting the same set of images
              under several profiles. It does not catch a photograph that has been cropped,
              filtered or re-compressed, because those produce a different hash. If you
              believe a stolen image has been altered to evade this check, please report it
              from the profile page rather than relying on the hash check alone.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">What to do first</h2>
            <ol className="info-text">
              {STEPS.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">Emergencies: content involving a minor</h2>
            <p className="info-text">
              If you believe any photograph or listing on this site depicts a person under
              18, treat it as an emergency. Do not wait for a normal response.
            </p>
            <ol className="info-text">
              <li>Report it from the profile page and select the concern about age.</li>
              <li>
                Also send it through the contact page with the profile URL so it reaches a
                moderator directly.
              </li>
              <li>
                Contact the appropriate authorities in your jurisdiction. Content
                involving a minor is a matter for law enforcement, not only for us.
              </li>
            </ol>
            <p className="info-text">
              Reports of this kind are treated as the most serious category the site handles
              and are reviewed ahead of routine reports.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">False or mistaken reports</h2>
            <p className="info-text">
              Knowingly misrepresenting a copyright claim, or repeatedly submitting removal
              requests in order to suppress a competitor&rsquo;s legitimate listing, is itself a
              misuse of this process. We keep a record of removal requests and reports, and
              a pattern of unfounded claims can result in the requester&rsquo;s account being
              restricted or suspended.
            </p>
          </div>

          <div className="info-card-content">
            <h2 className="info-section__title">Related</h2>
            <p className="info-text">
              <Link href="/terms">Terms of service</Link> — acceptable use and the rules for
              content on the site. <Link href="/faq">FAQ</Link> — how verification works and
              what the Verified badge means. <Link href="/privacy">Privacy policy</Link> — how
              we handle your information.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
