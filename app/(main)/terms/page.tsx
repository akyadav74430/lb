import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { absoluteUrl, BRAND } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The rules for using the Lovebite directory: 18+ only, no advance payments, listings are self-published, moderation and removal, and the limits of what the directory does.",
  alternates: { canonical: absoluteUrl("/terms") },
  openGraph: {
    title: "Terms of Service",
    description: `Rules for using the ${BRAND} directory.`,
    url: absoluteUrl("/terms"),
    type: "website",
    images: ["/opengraph-image"],
  },
};

/**
 * Written to describe what the code actually enforces. Where the directory has no
 * mechanism — no payments, no ID checks, no live verification — the terms say so
 * rather than promising a control that does not exist.
 */
const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "1. Who may use this site",
    body: [
      `${BRAND} is an adult directory. You may use it only if you are at least 18 years old and legally permitted to do so in your jurisdiction. By continuing to browse you confirm both.`,
      "Laws concerning paid companionship differ between countries and, in India, between states. Some carry serious penalties for every party involved. This site does not provide legal advice and cannot tell you what the law allows where you are. If you are unsure, stop and find out before proceeding.",
      "If you are a minor, leave now. Do not create a profile, and do not contact anyone listed here. Reports concerning a minor are treated as the most serious category this site handles.",
    ],
  },
  {
    title: "2. What this site is, and is not",
    body: [
      `${BRAND} is a directory. It publishes listings that independent companions submit about themselves. It does not employ companions, does not act as an agency, does not broker or arrange bookings, and does not introduce visitors to anyone.`,
      `${BRAND} does not handle payments, hold funds in escrow, or take a commission. It has no facility for taking money from a visitor and passing it to a companion, because no such facility exists.`,
      "Every listing is self-published. The person described is the person who wrote it and supplied the photographs. Where the directory displays a rate, a service or a contact detail, it is reporting what that person submitted, not a term the directory has negotiated or guaranteed.",
      "Contact details published on a profile are chosen by that companion. The directory publishes only what a profile owner submits, and a profile owner may hide their phone number or unpublish their listing at any time.",
    ],
  },
  {
    title: "3. No payments in advance",
    body: [
      "The directory will never ask you for money, for login credentials, or for payment to any third party. Nobody claiming to represent this site and asking for any of these is impersonating us.",
      "You should never send an advance payment, deposit, booking fee, security charge, gift card, cryptocurrency or UPI transfer to a companion before meeting them, or in exchange for a guarantee of availability. Advance-payment fraud is the most common form of targeting on directories of this kind and it is nearly always recognisable by that request.",
      "Meeting in person is the only reliable verification. Any arrangement that must be paid for before you have met someone is an arrangement you cannot verify.",
    ],
  },
  {
    title: "4. Listings, moderation and removal",
    body: [
      "Submissions require the submitter to confirm they are at least 18 and to consent to publication of the photographs supplied. Uploaded photographs are hashed with SHA-256; a submission containing a photograph that hashes identically to one already published on another profile is held for manual review rather than published.",
      "The directory does not perform live video verification and does not collect or examine government identification. A verified mark indicates that a listing passed this review process. It is not a background check, an identity check, or a guarantee of any kind.",
      "Moderators may request changes, unpublish, reject or suspend a listing or account where a profile appears to be false, to use photographs that belong to someone else, to impersonate another person, to describe someone who has not consented, to concern a person under 18, or to break these terms.",
      "You may report a profile from the profile page. You may unpublish your own profile at any time. To have content removed permanently, or to claim ownership of photographs, use the DMCA process described in the DMCA page.",
      "Removal requests are assessed on their grounds. A request to remove a profile because you dislike its rates, its services or its content is not a basis for removal, and may be declined.",
    ],
  },
  {
    title: "5. Acceptable use",
    body: [
      "Do not use this site to contact anyone for any unlawful purpose, to harass or intimidate a person, to impersonate another individual, or to distribute content involving anyone who has not consented.",
      "Do not scrape, mirror, republish, or copy listings, photographs or descriptions from this site. Photographs on a profile belong to the person depicted and are published with their consent for the purpose of that listing.",
      "Do not misrepresent yourself as the directory, as a moderator, or as any companion listed here.",
      "Access to administrative areas is restricted to authorised staff and is logged.",
    ],
  },
  {
    title: "6. No warranty, and limits on liability",
    body: [
      "This site is provided on an as-is and as-available basis. Listings are submitted by third parties who are not parties to any agreement with you. The directory does not warrant that a listing is accurate, current, available, or that a person meets any description, and it cannot warrant that contact made through a listing will lead to any particular outcome.",
      "To the fullest extent permitted by law, the directory is not liable for loss arising from reliance on a listing, from any contact made through one, or from any arrangement entered into with a person met through one. Any such arrangement is between you and that person alone.",
      "Nothing in these terms excludes liability that cannot lawfully be excluded, including liability for fraud.",
    ],
  },
  {
    title: "7. Changes, and how to reach us",
    body: [
      "These terms may be updated as the directory changes. The version published on this page is the version that applies. Continuing to use the site after a change means you accept the updated terms.",
      `Questions about these terms can be sent through the contact page. Concerns about a specific profile should be raised using the report option on that profile, which reaches moderators faster than general correspondence.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span>Terms of Service</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">Terms of Service</h1>
            <p className="info-page-subtitle">
              The rules for using the {BRAND} directory: 18+ only, no advance payments,
              listings are self-published and reviewed, and the limits of what a directory can
              and cannot vouch for.
            </p>
          </header>

          {SECTIONS.map((section) => (
            <div key={section.title} className="info-card-content">
              <h2 className="info-section__title">{section.title}</h2>
              {section.body.map((paragraph, i) => (
                <p key={i} className="info-text">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <div className="info-card-content">
            <h2 className="info-section__title">Related</h2>
            <p className="info-text">
              <Link href="/faq">FAQ</Link> — practical safety guidance and how verification
              works. <Link href="/privacy">Privacy policy</Link> — what is collected and why.{" "}
              <Link href="/dmca">DMCA</Link> — removing photographs or content.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
