import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import SubNav from "@/components/SubNav";
import Providers from "@/components/Providers";
import { BRAND, SITE_URL } from "@/lib/seo/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Canonical, Open Graph, sitemap and robots.txt URLs all resolve against this.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND} — Escorts, Call Girls & Companions in India`,
    template: `%s | ${BRAND}`,
  },
  description:
    "City-wise directory of independent escorts, call girls and companions in India. Every listing is publicly visible, photo-checked and contactable directly.",
  // No `alternates.canonical` here on purpose: a canonical declared in the root
  // layout is inherited by every child route, which would make the homepage the
  // canonical URL for the entire site. Each page declares its own instead.
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: BRAND,
    title: `${BRAND} — Escorts, Call Girls & Companions in India`,
    description:
      "City-wise listings of independent escorts, call girls and companions in India, with real photos and published rates.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — Escorts, Call Girls & Companions in India`,
    description:
      "City-wise listings of independent escorts, call girls and companions in India, with real photos and published rates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <TopHeader />
          <SubNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
