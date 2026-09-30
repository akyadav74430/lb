import type { Metadata } from "next";
import { NO_INDEX } from "@/lib/seo/site";

export const metadata: Metadata = {
  // The sign-in and sign-up pages are client components and cannot export
  // metadata themselves, so the group layout marks the whole route noindex.
  robots: NO_INDEX,
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
