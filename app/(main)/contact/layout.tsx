import type { Metadata } from "next";
import { absoluteUrl, clampMeta } from "@/lib/seo/site";

/**
 * `/contact` is a client component (it owns form state and the reCAPTCHA
 * ref), so its metadata lives here. Without it the page had no canonical and
 * fell back to the site-wide default title.
 */
export const metadata: Metadata = {
  title: "Contact Support — Report or Reach the Team",
  description: clampMeta(
    "Contact the lovebite.live team to report a profile, dispute a takedown, or ask a question. Support replies by email and Telegram.",
    160
  ),
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact Support — Report or Reach the Team",
    description:
      "Report a profile, dispute a takedown, or reach the lovebite.live support team.",
    url: absoluteUrl("/contact"),
    type: "website",
    images: ["/opengraph-image"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
