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
  title: "LoveBite - Verified Escorts & Companions",
  description:
    "Browse verified escort profiles, read real reviews, and connect with premium companions on LoveBite.com.",
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
