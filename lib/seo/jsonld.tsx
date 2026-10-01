import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

/**
 * Renders schema.org JSON-LD.
 *
 * Only describes facts that are actually present on the page (names, URLs,
 * image URLs). No ratings, reviews or prices are emitted anywhere.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so profile text can never break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * A FAQPage built from questions that are visibly rendered on the page.
 *
 * Google's FAQ rich results are restricted to a small set of well-known
 * government and health authorities, so this will not earn a rich result on
 * an adult directory. It is still worth emitting: it makes the question and
 * answer text unambiguous to any consumer of the page, and it costs nothing.
 *
 * Do not pass invented questions. Every entry must be rendered in the body.
 */
export function faqPageJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** An ItemList of the profiles actually rendered on the page. */
export function profileListJsonLd(
  heading: string,
  profiles: { name: string; id: string; city: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: heading,
    numberOfItems: profiles.length,
    itemListElement: profiles.map((profile, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${profile.name} — Escort in ${profile.city}`,
      url: absoluteUrl(`/profile/${profile.id}`),
    })),
  };
}

/**
 * Site-level entity graph for the homepage.
 *
 * Ties the Organization to the WebSite node via `publisher`/`isPartOf` so the
 * brand, domain and logo are unambiguous to a crawler. No ratings, prices or
 * review counts are emitted — those are reserved for data the site can prove.
 */
export function siteJsonLd() {
  const logo = absoluteUrl("/icon-512.png");

  const organization = {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo,
    image: logo,
    description:
      "City-wise directory of independent escorts, call girls and companions in India.",
  };

  return [
    {
      ...organization,
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      url: absoluteUrl("/"),
      name: SITE_NAME,
      publisher: { "@id": organization["@id"] },
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      ...organization,
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    },
  ];
}