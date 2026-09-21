import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getProfileById, getAllProfiles, EscortProfile } from "@/lib/profiles-data";
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
    include: { rates: { orderBy: { order: "asc" } }, user: { select: { id: true, name: true } } },
  });

  if (!dbProfile) {
    notFound();
  }

  // Map dbProfile to EscortProfile shape
  const mappedProfile: EscortProfile = {
    id: dbProfile.id,
    name: dbProfile.user.name,
    tagline: dbProfile.bio || "Independent escort offering discreet luxury companionship",
    location: `${dbProfile.city || "Kolkata"}, ${dbProfile.country || "India"}`,
    city: dbProfile.city || "Kolkata",
    country: dbProfile.country || "India",
    gender: "female",
    category: "girls",
    topBadge: null,
    badges: ["Verified", "Independent"],
    photoUrl: dbProfile.photoUrl || "/profiles/saloni.jpg",
    gallery: [dbProfile.photoUrl || "/profiles/saloni.jpg"],
    age: 24,
    height: "168 cm",
    weight: "52 kg",
    bust: "34C",
    hair: "Dark Brown",
    eyes: "Brown",
    ethnicity: "South Asian",
    languages: ["English", "Hindi"],
    workingHours: "10:00 AM – 01:00 AM",
    phone: dbProfile.phone || "+91 98300 00000",
    whatsapp: dbProfile.whatsapp || "+919830000000",
    telegram: "@ege_companion",
    rates: dbProfile.rates && dbProfile.rates.length > 0 
      ? dbProfile.rates.map(r => ({
          duration: r.duration,
          incall: r.incall ? "₹" + r.incall.toLocaleString("en-IN") : "—",
          outcall: r.outcall ? "₹" + r.outcall.toLocaleString("en-IN") : "—"
        }))
      : [
          { duration: "1 Hour", incall: "₹2,000" },
          { duration: "2 Hours", incall: "₹2,500" },
          { duration: "3 Hours", incall: "₹3,000" },
          { duration: "Full Night", incall: "₹4,000" },
          { duration: "Full Day", incall: "₹5,000" }
        ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "Sensual Massage", category: "Massage & Wellness", available: true },
      { name: "French Kissing", category: "Classic", available: true },
      { name: "Dinner Date Companion", category: "Social", available: true },
    ],
    about: dbProfile.bio || `Welcome to my profile. I am ${dbProfile.user.name}, available for booking in ${dbProfile.city || "Kolkata"}. Contact me directly for inquiries.`,
    reviews: [],
    views: 120,
    verifiedAt: "September 2026",
  };

  const all = getAllProfiles();
  const similar = all.slice(0, 4);

  return (
    <main className="profile-page-main">
      <ProfileDetailView profile={mappedProfile} similarProfiles={similar} />
    </main>
  );
}
