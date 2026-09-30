import { absoluteUrl } from "@/lib/seo/site";

/**
 * Renders schema.org JSON-LD.
 *
 * Only describes facts that are actually present on the page (names, URLs,
 * image URLs). No ratings, reviews or prices are emitted anywhere.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
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