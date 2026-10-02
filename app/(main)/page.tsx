import { Suspense } from "react";
import type { Metadata } from "next";
import HomeDirectory from "@/components/HomeDirectory";
import SeoHomeIntro from "@/components/SeoHomeIntro";
import SiteFooter from "@/components/SiteFooter";
import { getCityListing } from "@/lib/seo/profiles";
import { buildCityMetadata } from "@/lib/seo/metadata";
import { absoluteUrl, clampMeta } from "@/lib/seo/site";
import { JsonLd, siteJsonLd } from "@/lib/seo/jsonld";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

/**
 * The homepage is the browsable directory grid driven by query parameters
 * (?city=, ?state=, ?filter=).
 *
 * Filtered variants are not separate landing pages, so each one canonicalises
 * to the clean URL that should actually rank: the matching city page when that
 * city has public listings, otherwise the homepage itself.
 */
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const city = first(sp.city);
  const state = first(sp.state);
  const filter = first(sp.filter);

  if (city) {
    const entry = await getCityListing(city);
    if (entry) {
      // e.g. /?city=Kolkata -> canonical https://www.lovebite.live/city/kolkata
      return buildCityMetadata(entry);
    }
  }

  if (filter) {
    const label: Record<string, string> = {
      vip: "VIP Escorts in India",
      massages: "Sensual Massage & Wellness Escorts in India",
    };
    const heading = label[filter] ?? "Escorts in India";
    return {
      title: `${heading} | Browse Profiles`,
      description: clampMeta(
        `Browse ${heading.toLowerCase()} on Lovebite. Filter the directory by city, then open a profile to see photos, published rates and contact details.`,
        160
      ),
      // A filtered view of one page: keep the clean URL as the canonical.
      alternates: { canonical: absoluteUrl("/") },
    };
  }

  if (state) {
    return {
      title: `Escorts in ${state} — Browse Verified Profiles`,
      description: clampMeta(
        `Browse escort and companion listings in ${state} on Lovebite. Open a profile to see real photos, published rates and contact details.`,
        160
      ),
      alternates: { canonical: absoluteUrl("/") },
    };
  }

  // The homepage is the directory itself: the browsable, filterable index.
  //
  // `/call-girls` is the term-targeted landing page and owns the head term.
  // Until this commit both pages shipped the identical title "Call Girls in
  // India — Verified Escorts", so Google had to pick one to rank and split
  // the signals between two URLs competing for the same query. Differentiating
  // them here: the homepage sells breadth and browsing, /call-girls owns the
  return {
    title: {
      absolute: "Lovebite — Escorts & Call Girls Directory in India",
    },
    description: clampMeta(
      "The Lovebite directory of independent escorts and call girls in India. Browse every public profile by city or state, then open one for photos, rates and contact.",
      160
    ),
    alternates: { canonical: absoluteUrl("/") },
    openGraph: {
      title: "Escorts & Call Girls Directory — Browse by City | Lovebite",
      description:
        "Browse every public escort and companion profile in India by city, state or category.",
      url: absoluteUrl("/"),
      type: "website",
      images: ["/opengraph-image"],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={siteJsonLd()} />
      <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
        <HomeDirectory />
      </Suspense>
      <SeoHomeIntro />
      <SiteFooter />
    </>
  );
}