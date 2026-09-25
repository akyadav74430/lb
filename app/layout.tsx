import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopHeader from "@/components/TopHeader";
import SubNav from "@/components/SubNav";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lovebite.com"),
  title: {
    default: "lovebite.com — Verified Escorts & Companions India",
    template: "%s | lovebite.com",
  },
  description:
    "Discover verified independent escorts, VIP companions, and premium wellness services across India on lovebite.com. Genuine reviews, authentic photos, and instant WhatsApp booking.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://lovebite.com",
    siteName: "lovebite.com",
    title: "lovebite.com — Verified Escorts & Companions India",
    description:
      "Browse verified independent escorts, VIP companions, and reviews across major cities in India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "lovebite.com Verified Escorts Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "lovebite.com — Verified Escorts & Companions India",
    description:
      "Browse verified independent escorts, VIP companions, and reviews across major cities in India.",
    images: ["/og-image.png"],
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
