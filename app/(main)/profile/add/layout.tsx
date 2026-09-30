import type { Metadata } from "next";
import { NO_INDEX } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Add New Profile",
  description: "Create your escort profile on Lovebite.",
  // Authoring surface: useful to users, worthless in an index.
  robots: NO_INDEX,
};

export default function AddProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
