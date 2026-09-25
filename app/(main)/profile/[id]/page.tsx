import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getProfileById, getAllProfiles, dbProfileToEscortProfile } from "@/lib/profiles-data";
import ProfileDetailView from "@/components/ProfileDetailView";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const demoProfile = getProfileById(id);
  if (demoProfile) {
    return {
      title: `${demoProfile.name} — ${demoProfile.location} | lovebite.com`,
      description: `${demoProfile.name} in ${demoProfile.city}. ${demoProfile.tagline}. Verified photos, rates, reviews and WhatsApp contact on lovebite.com.`,
    };
  }

  const dbProfile = await prisma.profile.findUnique({
    where: { id },
    include: { user: { select: { name: true } } },
  });

  if (!dbProfile) {
    return { title: "Profile Not Found — lovebite.com" };
  }

  return {
    title: `${dbProfile.user.name} — lovebite.com`,
    description: `Escort profile of ${dbProfile.user.name} on lovebite.com directory.`,
  };
}

export default async function ProfileDetailPage({ params }: Props) {
  const { id } = await params;

  // Check demo profiles first
  const demoProfile = getProfileById(id);
  if (demoProfile) {
    const all = getAllProfiles();
    const similar = all.filter((p) => p.id !== id && p.city === demoProfile.city).slice(0, 4);
    const allIds = all.map((p) => p.id);
    return (
      <main className="profile-page-main">
        <ProfileDetailView profile={demoProfile} similarProfiles={similar} allProfileIds={allIds} />
      </main>
    );
  }

  // Fallback to database profile
  const dbProfile = await prisma.profile.findUnique({
    where: { id },
    include: {
      rates: { orderBy: { order: "asc" } },
      photos: { orderBy: { order: "asc" } },
      user: { select: { id: true, name: true } },
    },
  });

  if (!dbProfile) {
    notFound();
  }

  // Map dbProfile to EscortProfile shape using shared helper
  const mappedProfile = dbProfileToEscortProfile(dbProfile);
  const all = getAllProfiles();
  const similar = all.slice(0, 4);

  return (
    <main className="profile-page-main">
      <ProfileDetailView profile={mappedProfile} similarProfiles={similar} />
    </main>
  );
}
