import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Allow Next.js Image Optimization for local and remote images.
    // Profile photos from Supabase Storage and local /profiles/ images.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kjoiiitwkqbvbsosjhyy.supabase.co",
        pathname: "/storage/v1/object/public/uploads/profiles/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Profile photos are the LCP element on every listing page, so declare a
    // minimum intrinsic size. Without it the browser cannot reserve space
    // before the bytes arrive, which shows up as CLS on slow connections.
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    // Optimize for profile photo dimensions (portrait 3:4 ratio)
    imageSizes: [16, 32, 48, 64, 96, 128, 180, 256, 384, 420, 640, 750, 828, 1080],
    // Allow SVG for placeholder/icon use
    dangerouslyAllowSVG: false,
    // Quality settings - balance between size and visual fidelity for profile photos
    qualities: [75, 85],
    // Default loader uses Next.js optimization (disabled by unoptimized: true previously)
    // Now optimization is ENABLED - images will be resized, converted to WebP/AVIF
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  async redirects() {
    return [
      // Permanent redirects from old /city/<slug> to new /call-girls-in/<slug>
      {
        source: "/city/:city*",
        destination: "/call-girls-in/:city*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // Security headers — applied to every response.
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      // Long-lived cache for Next.js immutable static assets (hashed filenames).
      // These never change at the same URL, so a 1-year max-age is safe and
      // eliminates the network round-trip for returning visitors entirely.
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Profile photos and other /uploads are content-addressed by the
      // upload pipeline, so a 7-day cache with revalidation is safe.
      {
        source: "/uploads/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      // Public assets (icons, manifest, sitemap) — 1 hour with revalidation.
      {
        source: "/(favicon.ico|icon.*\\.png|apple-icon\\.png|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|llms\\.txt)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
