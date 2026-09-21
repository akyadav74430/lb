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
  title: "lovebite.com — Verified Escorts & Companions",
  description:
    "Browse verified escort profiles, read real reviews, and connect with premium companions on lovebite.com.",
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
