import type { Metadata } from "next";
import { absoluteUrl, clampMeta } from "@/lib/seo/site";

/**
 * `/faq` is a client component (it has interactive category tabs and an
 * accordion), so it cannot export `metadata` directly. A layout is the
 * supported way to attach it, and without this the page inherited the root
 * layout's default title and had no canonical at all.
 */
export const metadata: Metadata = {
  title: "FAQ — Verification, Safety & Booking Questions",
  description: clampMeta(
    "Answers on contacting a companion, photo verification, advance-payment scams, privacy, and reporting a profile on lovebite.live.",
    160
  ),
  alternates: { canonical: absoluteUrl("/faq") },
  openGraph: {
    title: "FAQ — Verification, Safety & Booking Questions",
    description:
      "How to contact a companion, photo verification, advance-payment scams, privacy and reporting on lovebite.live.",
    url: absoluteUrl("/faq"),
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
