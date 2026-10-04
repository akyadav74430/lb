import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Primary rule: allow all crawlers access to the public directory.
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Dashboards and admin APIs.
          "/admin",
          "/admin/",
          "/api/admin",
          "/api/admin/",
          // Authentication and account management.
          "/api/auth",
          "/api/auth/",
          "/signin",
          "/signup",
          "/auth",
          // Profile authoring: /profile/add, /profile/edit, /profile/<id>/edit
          // stay open, the owner-only prefixes do not.
          "/profile/add",
          "/profile/edit",
          "/profile/*/edit",
          // Internal/API surfaces that are not pages.
          "/api/",
          // Search/filter query variants of the homepage are not separate pages
          // and should not be crawled or indexed independently.
          "/*?*",
        ],
      },
      // Block known AI training scrapers that ignore robots.txt at a UA level.
      // These bots consume bandwidth without ever sending a user.
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "Omgilibot", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      // Block known bad bots / scrapers.
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "BLEXBot", disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}