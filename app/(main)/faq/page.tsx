import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { absoluteUrl } from "@/lib/seo/site";
import { BRAND } from "@/lib/seo/site";
import { listCitiesWithListings } from "@/lib/seo/profiles";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = {
  title: "FAQ — Safety, Verification & Booking Answers",
  description:
    "How Lovebite listings are reviewed, how to spot an advance-payment scam, what verification actually means, how to report a profile, and how to leave or unpublish your own listing.",
  alternates: { canonical: absoluteUrl("/faq") },
  openGraph: {
    title: "FAQ — Safety, Verification & Booking Answers",
    description:
      "How listings are reviewed, how to spot an advance-payment scam, and how to report a profile on Lovebite.",
    url: absoluteUrl("/faq"),
    type: "website",
    images: ["/opengraph-image"],
  },
};

/**
 * Each answer describes a mechanism that exists in the codebase. Where the
 * directory does not do something, the answer says so plainly rather than
 * implying a control that isn't there — a safety page that overstates its own
 * safeguards is worse than no page at all.
 */
const SECTIONS: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "How this directory works",
    items: [
      {
        q: `What is ${BRAND}?`,
        a: `${BRAND} is a directory, not an agency. It does not employ companions, does not arrange bookings on anyone's behalf, and does not handle money. Every profile is created by the person it describes, and you contact that person directly using the details they published.`,
      },
      {
        q: "Who writes the listings?",
        a: "The companion whose profile it is. They submit their own photographs, their own description, their own rates and their own contact details. Nothing on a profile is written by us on their behalf.",
      },
      {
        q: "Why does a city page only exist when someone is listed there?",
        a: "Because we do not publish pages for cities with nobody in them. A page for a city with no listings would be an empty advert dressed up as a landing page, so a city page goes live the moment its first approved public listing appears and disappears when that listing is removed.",
      },
      {
        q: "Are the rates on a profile guaranteed?",
        a: "No. Rates are entered by each companion and can change without notice. Treat a published rate as the starting point for a conversation and confirm the figure, timing and duration directly before you travel anywhere.",
      },
    ],
  },
  {
    title: "Verification — what it does and does not mean",
    items: [
      {
        q: "What does the Verified badge actually mean?",
        a: "It means the listing passed our review process: the submitter confirmed they are at least 18, confirmed they consent to the photographs being published, and no photograph on the profile matched a photograph already published on another profile. It is a check on the listing, not a background check on the person.",
      },
      {
        q: "How do you check for stolen or reused photos?",
        a: "Every uploaded photograph is hashed with SHA-256 on upload. If a new profile's photograph produces a hash that already exists on a different profile, the submission is held for manual review instead of publishing, and the match is written to the moderation audit log. Identical files are what this catches — a re-cropped or filtered copy of a stolen photo will not produce the same hash.",
      },
      {
        q: "Do you do live video verification or check government ID?",
        a: "No. We do not run live video checks and we do not collect or review government identification. We will not claim otherwise, because a badge that implies checks we do not perform is exactly the sort of thing this page exists to warn you about.",
      },
      {
        q: "Can I request removal of my photographs?",
        a: "Yes. Photograph ownership complaints go through the DMCA process, and a profile can be unpublished by its owner at any time from the profile's own edit screen. Write to us through the contact page and include the profile URL.",
      },
    ],
  },
  {
    title: "Safety",
    items: [
      {
        q: "What is the most common scam on escort directories?",
        a: "The advance-payment scam. Someone contacts you directly, sounds genuine, and then asks for money before the meeting: a booking fee, a security deposit, a gift card, crypto, or a UPI transfer to 'confirm'. Once the money is sent there is no meeting and no way to recover it. This is the single most common way clients are targeted, and it is worth being suspicious of anyone who asks for payment in advance, for any reason.",
      },
      {
        q: "Does this site take payments?",
        a: `No. ${BRAND} never asks for payment, never holds funds in escrow, and never introduces itself as a booking intermediary. If a message arrives claiming to be from us asking for money or login details, it is not from us.`,
      },
      {
        q: "What should I do before meeting someone for the first time?",
        a: "Tell a second person where you are going and who you are meeting. Meet in public the first time if you possibly can, or in a staffed venue rather than a private home. Do not carry more cash than you need. Do not get intoxicated. Do not send anything intimate to anyone you have not met — that request is itself a common tactic.",
      },
      {
        q: "Is meeting someone a companion illegal?",
        a: "Laws around paid companionship vary by state and by country, and in some jurisdictions they carry serious penalties for both parties. This is not legal advice. If you are unsure about the law where you are, that is a reasonable reason to stop and find out before doing anything.",
      },
      {
        q: "What should I do if I feel unsafe or out of my depth?",
        a: "Leave. No meeting is worth the situation you are in. If you are in immediate danger, contact local emergency services first. Afterwards you can file a report here — a safety report about a specific profile is more useful than a general complaint.",
      },
    ],
  },
  {
    title: "Reporting and removal",
    items: [
      {
        q: "How do I report a profile?",
        a: "Open the profile and use the report option on it. Reports can be filed against a specific listing for a specific reason, which is far more useful to a moderator than an email describing a problem in general terms.",
      },
      {
        q: "What happens after I file a report?",
        a: "The report enters a moderation queue. Reports of fake profiles, stolen photographs, impersonation and concerns about age are treated as the most serious. Outcomes include requesting changes, unpublishing the listing, rejecting it, or suspending the account.",
      },
      {
        q: "Can I get a profile removed just because I dislike it?",
        a: "No. Removal requests need a reason tied to something the directory can act on — false information, non-consensual content, a photograph you own, harassment, or a concern about age. Disagreement with someone's rates or services is not a basis for removal, and we would rather say so than quietly comply with it.",
      },
      {
        q: "How long does a review take?",
        a: "Reports are looked at in the order they arrive. There is no published service-level target, because publishing one we do not meet would be worse than not publishing one.",
      },
    ],
  },
  {
    title: "For companions",
    items: [
      {
        q: "How do I list myself?",
        a: "Create a profile and submit it. You set your own rates, services, description and contact details, and you can hide your phone number from the public profile or unpublish the listing entirely at any time.",
      },
      {
        q: "What happens to my submission?",
        a: "If a photograph on your submission matches one already published elsewhere on the site, the submission is held for manual review rather than published. Otherwise it is published as submitted. Either way the lifecycle status of your profile is visible to you.",
      },
      {
        q: "Do you take a commission?",
        a: "No. The directory does not handle payments, so there is nothing for a commission to be taken from.",
      },
      {
        q: "Can I be removed permanently?",
        a: "You can unpublish your profile at any time, which removes it from the public directory immediately.",
      },
    ],
  },
];

export default async function FaqPage() {
  const cities = await listCitiesWithListings();

  // Built from SECTIONS, the same constant the body renders, so the schema
  // cannot drift out of sync with the visible questions.
  const allFaq = SECTIONS.flatMap((section) => section.items);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ])} />
      <JsonLd data={faqPageJsonLd(allFaq)} />

      <main className="info-page-main">
        <div className="info-page-container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="breadcrumb__sep">›</span>
            <span>FAQ</span>
          </nav>

          <header className="info-page-hero">
            <h1 className="info-page-title">
              Frequently Asked Questions — Safety, Verification &amp; Bookings
            </h1>
            <p className="info-page-subtitle">
              How listings on {BRAND} are created and reviewed, what the Verified badge does
              and does not mean, the advance-payment scam that targets almost every client
              eventually, and how to report a profile or remove your own.
            </p>
          </header>

          <div className="info-card-content">
            <h2 className="info-section__title">The short version</h2>
            <p className="info-text">
              {BRAND} is a directory. It does not employ anyone, does not broker bookings and
              does not handle money. Profiles are written by the companions they describe,
              reviewed before publication, and contacted directly by you.
            </p>
            <p className="info-text">
              <strong>
                Never send an advance payment to anyone.
              </strong>{" "}
              A booking fee, security deposit, gift card, crypto or UPI transfer requested
              before a meeting is the defining marker of a scam. The directory will never ask
              you for money.
            </p>
            <p className="info-text">
              Suspicious profile, or one you think is using photographs that belong to someone
              else? Report it from the profile page — it goes straight to a moderator.
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title} className="info-card-content">
              <h2 className="info-section__title">{section.title}</h2>
              {section.items.map((item) => (
                <div key={item.q}>
                  <h3 className="pillar-title">{item.q}</h3>
                  <p className="info-text">{item.a}</p>
                </div>
              ))}
            </div>
          ))}

          {cities.length > 0 && (
            <div className="info-card-content">
              <h2 className="info-section__title">Cities with published listings</h2>
              <p className="info-text">
                These are the cities where a companion has an approved public listing right
                now. There is no page for any other city, because there is nobody listed there.
              </p>
              <ul className="city-link-list">
                {cities.map((city) => (
                  <li key={city.slug}>
                    <Link href={`/city/${city.slug}`} className="city-link">
                      Escorts in {city.name}
                      <span className="city-link__meta">
                        {city.count} {city.count === 1 ? "profile" : "profiles"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="info-card-content">
            <h2 className="info-section__title">Still stuck?</h2>
            <p className="info-text">
              <Link href="/contact">Contact the team</Link> with your question. If you are
              reporting a specific profile, use the report option on that profile instead —
              it carries the profile identifier automatically.
            </p>
            <p className="info-text">
              The <Link href="/terms">terms of service</Link> and{" "}
              <Link href="/privacy">privacy policy</Link> set out the rules the directory
              operates under.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
