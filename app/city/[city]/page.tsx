import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { citySlug } from "@/lib/seo/site";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return {
    title: "Redirecting…",
    robots: { index: false, follow: true },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  redirect(`/call-girls-in-${citySlug(city)}`);
}