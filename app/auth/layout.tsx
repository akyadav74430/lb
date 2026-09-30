import type { Metadata } from "next";
import { NO_INDEX } from "@/lib/seo/site";

export const metadata: Metadata = {
  robots: NO_INDEX,
};

export default function AuthBridgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
