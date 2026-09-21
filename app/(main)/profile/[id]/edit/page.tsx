import { notFound } from "next/navigation";
import { getProfileById } from "@/lib/profiles-data";
import EscortProfileForm from "@/components/EscortProfileForm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const profile = getProfileById(id);
  return {
    title: profile
      ? `Edit Profile: ${profile.name} — lovebite.com`
      : "Edit Profile — lovebite.com",
  };
}

export default async function EditProfilePage({ params }: Props) {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) {
    notFound();
  }

  const initialData = {
    displayName: profile.name,
    status: (profile.status || "Independent") as "Independent" | "Agency" | "",
    gender: profile.gender,
    age: String(profile.age),
    state: profile.state || "",
    district: profile.district || "",
    city: profile.city,
    localArea: profile.localArea || "",
    country: profile.country || "India",
    nationality: profile.nationality || "Indian",
    languages: profile.languages,
    eyes: profile.eyes,
    hairColor: profile.hairColor || profile.hair,
    hairLength: profile.hairLength || "",
    pubicHair: profile.pubicHair || "",
    bustSize: profile.bustSize || "",
    bustType: (profile.bustType === "Natural" || profile.bustType === "Enhanced" ? profile.bustType : "") as "Natural" | "Enhanced" | "",
    weightKg: profile.weight.split(" ")[0],
    heightCm: profile.height.split(" ")[0],
    ethnicity: profile.ethnicity,
    orientation: profile.orientation || "",
    smoker: (profile.smoker === "No" || profile.smoker === "Sometimes" || profile.smoker === "Yes" ? profile.smoker : "") as "No" | "Sometimes" | "Yes" | "",
    tattoo: (profile.tattoo === "Yes" || profile.tattoo === "No" ? profile.tattoo : "") as "Yes" | "No" | "",
    piercing: (profile.piercing === "Yes" || profile.piercing === "No" ? profile.piercing : "") as "Yes" | "No" | "",
    travel: profile.travel || [],
    availableFor: profile.availableFor || [],
    meetingWith: profile.meetingWith || [],
    services: profile.services.filter((s) => s.available).map((s) => s.name),
    badges: profile.badges,
    about: profile.about,
    phone: profile.phone,
    whatsapp: profile.whatsapp,
    telegram: profile.telegram,
  };

  return (
    <main className="epf-page-main">
      <EscortProfileForm mode="edit" initialData={initialData} />
    </main>
  );
}
