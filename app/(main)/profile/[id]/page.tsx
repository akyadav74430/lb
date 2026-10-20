import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileDetailStatic from "@/components/ProfileDetailStatic";
import ProfileGallery from "@/components/ProfileGallery";
import {
  getCityListing,
  getProfilesForCity,
  getPublicProfileById,
  listPublicProfiles,
} from "@/lib/seo/profiles";
import { buildProfileMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, personJsonLd, JsonLd } from "@/lib/seo/jsonld";
import { citySlug } from "@/lib/seo/site";

interface Props {
  params: Promise<{ id: string }>;
}

// Listings and profile visibility both change; keep the page reasonably fresh
// so a profile that is unpublished leaves the index quickly.
export const revalidate = 300;

/**
 * A profile is only ever rendered here when it is APPROVED, PUBLIC and its
 * account is not suspended. Draft/private profiles and suspended accounts 404,
 * and `generateMetadata` returns noindex for them so nothing leaks into the
 * index (previously the title of an unpublished profile was still served).
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const profile = await getPublicProfileById(id);

  if (!profile) {
    return {
      title: "Profile not available",
      robots: { index: false, follow: true },
    };
  }

  return buildProfileMetadata(profile);
}

export default async function ProfileDetailPage({ params }: Props) {
  const { id } = await params;
  const profile = await getPublicProfileById(id);
  if (!profile) notFound();

  // Parallel data fetching to avoid N+1 sequential queries
  const [city, inCity, allPublic] = await Promise.all([
    getCityListing(citySlug(profile.city)),
    // Fetch city profiles and all public profiles in parallel
    (async () => {
      const cityListing = await getCityListing(citySlug(profile.city));
      return cityListing ? getProfilesForCity(cityListing) : [];
    })(),
    listPublicProfiles(),
  ]);

  const siblings = inCity.filter((p) => p.id !== profile.id);
  const similar =
    siblings.length > 0
      ? siblings
      : allPublic.filter((p) => p.id !== profile.id).slice(0, 4);
  const allProfileIds = inCity.length > 1 ? inCity.map((p) => p.id) : [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Call Girls", path: "/call-girls" },
          { name: profile.city, path: `/call-girls-in/${citySlug(profile.city)}` },
          { name: profile.name, path: `/profile/${profile.id}` },
        ])}
      />
      <JsonLd data={personJsonLd(profile)} />
      <main className="profile-page-main">
        {/* Static content rendered on server */}
        <ProfileDetailStatic profile={profile} />
        {/* Interactive gallery & similar profiles as client component */}
        <ProfileGallery
          profile={profile}
          similarProfiles={similar}
          allProfileIds={allProfileIds}
        />
      </main>
    </>
  );
}