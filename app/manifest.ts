import type { MetadataRoute } from "next";
import { BRAND, SITE_URL } from "@/lib/seo/site";

/**
 * Web App Manifest — served at /manifest.webmanifest.
 *
 * Presence of a valid manifest is one of the prerequisites Google checks
 * when deciding whether to surface a PWA install prompt, and it feeds the
 * `theme-color` that Chrome uses in the address-bar chrome.
 *
 * It also lets Bing, DuckDuckGo and social scrapers identify the brand name
 * and icon set independently of the HTML, which is worth having for an adult
 * directory where page-level metadata is sometimes stripped by intermediaries.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND} — Escorts & Call Girls Directory India`,
    short_name: BRAND,
    description:
      "City-wise directory of independent escorts, call girls and companions in India. Real photos, published rates and direct contact.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0f14",
    theme_color: "#c41e3a",
    orientation: "portrait-primary",
    lang: "en-IN",
    scope: "/",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["lifestyle", "entertainment"],
    shortcuts: [
      {
        name: "Browse Escorts",
        url: "/escorts",
        description: "Browse escort profiles across India",
      },
      {
        name: "Call Girls",
        url: "/call-girls",
        description: "Call girls in India directory",
      },
    ],
  };
}