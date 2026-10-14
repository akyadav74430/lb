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
  const siteUrl = absoluteUrl("/");

  // Both nodes share a single @graph so each gets the same @context without
  // repeating it, and the @id cross-references resolve correctly.
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: SITE_NAME,
        url: siteUrl,
        logo,
        image: logo,
        description:
          "City-wise directory of independent escorts, call girls and companions in India.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: SITE_NAME,
        publisher: { "@id": `${siteUrl}#organization` },
        inLanguage: "en-IN",
      },
    ],
  };
}


/**
 * Person schema for a public escort profile page.
 *
 * Only facts that are unambiguously present on the page are emitted.
 * No price, rating, or review data is synthesised; those only appear when
 * the companion published them on the profile itself.
 */
export function personJsonLd(profile: {
  id: string;
  name: string;
  city: string;
  state?: string;
  photoUrl?: string | null;
  about?: string | null;
  age?: number | null;
  languages?: string[];
}) {
  const url = absoluteUrl(`/profile/${profile.id}`);
  const location = [profile.city, profile.state].filter(Boolean).join(", ");

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: profile.name,
    url,
    // homepLocation is more appropriate than `address` for a public directory:
    // it conveys city-level presence without a street address.
    homeLocation: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.city,
        ...(profile.state ? { addressRegion: profile.state } : {}),
        addressCountry: "IN",
      },
    },
  };

  if (profile.photoUrl) {
    node.image = absoluteUrl(profile.photoUrl);
  }
  if (profile.about) {
    // Truncate the bio to 300 chars for the schema description — Google does
    // not display more than that in any surface that uses this type.
    node.description = profile.about.replace(/\s+/g, " ").trim().slice(0, 300);
  }
  if (profile.age && profile.age > 0) {
    node.age = profile.age;
  }
  if (profile.languages && profile.languages.length > 0) {
    node.knowsLanguage = profile.languages;
  }

  return node;
}

/**
 * Service schema for a /call-girls-in/<city> landing page.
 *
 * Represents the call girls directory service available in a given city. This
 * is a lightweight `Service` node that ties the page to a geographic area.
 * It does not emit prices or ratings — neither of which is verifiable from
 * the directory's side.
 */
export function cityServiceJsonLd(cityName: string, citySlug: string, region?: string | null) {
  const url = absoluteUrl(`/call-girls-in/${citySlug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Call Girls Directory — ${cityName}`,
    description: `Browse independent call girls, escorts and companions in ${cityName}${region ? `, ${region}` : ""}. Real photos, published rates and direct contact.`,
    url,
    provider: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: SITE_NAME,
    },
    areaServed: {
      "@type": "City",
      name: cityName,
      ...(region
        ? {
            containedInPlace: {
              "@type": "State",
              name: region,
              addressCountry: "IN",
            },
          }
        : {}),
    },
    serviceType: "Call Girls Directory",
  };
}