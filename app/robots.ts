import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
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
          // stay open, the two owner-only prefixes do not.
          "/profile/edit",
          "/profile/add",
          // Internal/API surfaces that are not pages.
          "/api/",
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}