import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [],
    // Allow serving local /uploads images
    unoptimized: true,
    // Profile photos are the LCP element on every listing page, so declare a
    // minimum intrinsic size. Without it the browser cannot reserve space
    // before the bytes arrive, which shows up as CLS on slow connections.
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
