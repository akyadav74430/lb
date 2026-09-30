export interface ProfileReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  city: string;
}

export interface ProfileService {
  name: string;
  category: "Classic" | "Oral" | "Massage & Wellness" | "Special" | "Social";
  available: boolean;
  extraCharge?: string;
}

export interface ProfileRate {
  duration: string;
  incall: string;
  outcall?: string;
}

export interface EscortProfile {
  id: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  state?: string;
  district?: string;
  localArea?: string;
  country: string;
  gender: "female" | "male" | "trans";
  category: "vip" | "girls" | "massages" | "pornstars" | "citytour" | "agencies" | "boys" | "trans" | "videos";
  topBadge: "top" | "new" | null;
  badges: string[];
  photoUrl: string;
  gallery: string[];
  age?: number;
  height?: string;
  weight?: string;
  bust?: string;
  hair?: string;
  eyes?: string;
  ethnicity?: string;
  languages: string[];
  workingHours?: string;
  phone: string;
  whatsapp: string;
  telegram?: string;
  rates: ProfileRate[];
  services: ProfileService[];
  about: string;
  reviews: ProfileReview[];
  views?: number;
  verifiedAt?: string;
  // Extended attributes
  hidePhoneFromPublic?: boolean;
  isPhoneHidden?: boolean;
  status?: "Independent" | "Agency";
  lastSeen?: string;
  hairLength?: string;
  hairColor?: string;
  pubicHair?: string;
  bustSize?: string;
  bustType?: "Natural" | "Enhanced";
  orientation?: string;
  smoker?: "No" | "Sometimes" | "Yes";
  tattoo?: "Yes" | "No";
  piercing?: "Yes" | "No";
  nationality?: string;
  travel?: string[];
  availableFor?: string[];
  meetingWith?: string[];
}

export const ESCORT_PROFILES: EscortProfile[] = [
  {
    id: "1",
    name: "Priya",
    tagline: "Sensual luxury independent companion with genuine elegance, warmth & discretion",
    location: "Escorts Kolkata",
    city: "Kolkata",
    district: "Kolkata",
    state: "West Bengal",
    localArea: "Park Street",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: ["Independent", "Verified", "VIP", "Video"],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg",
    ],
    age: 23,
    height: "168 cm / 5'6\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: ["English", "Hindi", "Bengali"],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_vip_india",
    lastSeen: "Today, Online",
    hairColor: "Black",
    hairLength: "Long",
    pubicHair: "Shaved",
    bustSize: "C",
    bustType: "Natural",
    orientation: "Straight",
    smoker: "No",
    tattoo: "No",
    piercing: "No",
    nationality: "Indian",
    travel: ["City Wide", "State Wide", "All India"],
    availableFor: ["Incall", "Outcall"],
    meetingWith: ["Man", "Couple"],
    rates: [
      { duration: "1 Hour", incall: "₹12,500", outcall: "₹16,500" },
      { duration: "2 Hours", incall: "₹22,000", outcall: "₹28,000" },
      { duration: "3 Hours", incall: "₹30,000", outcall: "₹38,000" },
      { duration: "Dinner Date (4 Hours)", incall: "₹40,000", outcall: "₹50,000" },
      { duration: "Overnight (10 Hours)", incall: "₹75,000", outcall: "₹90,000" },
      { duration: "Weekend Getaway", incall: "₹1,50,000", outcall: "₹1,80,000" },
    ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "French Kissing (Sensual)", category: "Classic", available: true },
      { name: "Classic French Lovemaking", category: "Classic", available: true },
      { name: "Deep Erotic Body Massage", category: "Massage & Wellness", available: true },
      { name: "Nuru Massage with warm oil", category: "Massage & Wellness", available: true },
      { name: "Oral with Condom", category: "Oral", available: true },
      { name: "Dinner Date & Business Accompanying", category: "Social", available: true },
      { name: "Romantic Shower / Jacuzzi Together", category: "Massage & Wellness", available: true },
      { name: "Striptease & Private Dance", category: "Special", available: true },
      { name: "Couples & Duo Sessions", category: "Special", available: true },
      { name: "Anal / Extreme Practices", category: "Special", available: false }
    ],
    about: `Namaste and welcome to my official profile. I am Priya, a charming, well-educated and independent companion providing elite experiences across India.

I believe in true chemistry, unhurried warmth, and absolute discretion. Whether you desire a relaxing evening after a busy day of business meetings, a fine dining date at a 5-star venue, or an intimate overnight rendezvous, I guarantee a magical and authentic connection.

Hygiene, mutual respect, and 100% verified real photos are guaranteed. Contact me directly on WhatsApp to check my availability.`,
    reviews: [
      {
        id: "r1",
        author: "Markus_EXP",
        rating: 5,
        date: "September 18, 2026",
        city: "Kolkata",
        verified: true,
        comment: "Priya is even more gorgeous in person than her pictures. Extremely polite, speaks fluent English, and her massage was incredible. Total GFE experience. Highly recommended."
      },
      {
        id: "r2",
        author: "Dev_K",
        rating: 5,
        date: "September 12, 2026",
        city: "Kolkata",
        verified: true,
        comment: "Booked a 2-hour rendezvous at a luxury 5-star hotel in Park Street. She made me feel comfortable immediately. 10/10 elegance, charm, and beauty."
      }
    ],
    views: 5240,
    verifiedAt: "September 2026"
  }
];

export const STANDARD_PRICING_TIERS: ProfileRate[] = [
  { duration: "1 Hour", incall: "₹12,500", outcall: "₹16,500" },
  { duration: "2 Hours", incall: "₹22,000", outcall: "₹28,000" },
  { duration: "3 Hours", incall: "₹30,000", outcall: "₹38,000" },
  { duration: "Dinner Date (4 Hours)", incall: "₹40,000", outcall: "₹50,000" },
  { duration: "Overnight (10 Hours)", incall: "₹75,000", outcall: "₹90,000" },
  { duration: "Weekend Getaway", incall: "₹1,50,000", outcall: "₹1,80,000" },
];

export function getProfileById(id: string): EscortProfile | undefined {
  return ESCORT_PROFILES.find((p) => p.id === id);
}

export function getAllProfiles(): EscortProfile[] {
  return ESCORT_PROFILES;
}

export function dbProfileToEscortProfile(p: {
  id: string;
  user?: { name: string | null };
  bio?: string | null;
  city?: string | null;
  region?: string | null;
  district?: string | null;
  localArea?: string | null;
  country?: string | null;
  gender?: string | null;
  category?: string | null;
  photoUrl?: string | null;
  photos?: { url: string; isPrimary?: boolean }[];
  phone?: string | null;
  whatsapp?: string | null;
  hidePhoneFromPublic?: boolean | null;
  rates?: { duration: string; incall?: number | string | null; outcall?: number | string | null }[];
}): EscortProfile {
  const primaryPhoto =
    p.photos?.find((ph) => ph.isPrimary)?.url ||
    p.photoUrl ||
    (p.photos && p.photos[0]?.url) ||
    "/profiles/priya-1.jpg";

  const gallery =
    p.photos && p.photos.length > 0
      ? p.photos.map((ph) => ph.url)
      : [primaryPhoto];

  return {
    id: p.id,
    name: p.user?.name || "Verified Companion",
    // Copy is only ever derived from what the owner actually wrote. There is
    // deliberately no fallback bio: inventing a tagline in someone's voice is
    // the same defect as publishing a phone number they never gave.
    tagline: p.bio ? (p.bio.length > 90 ? p.bio.substring(0, 90) + "..." : p.bio) : "",
    location: p.city ? `Escorts ${p.city}` : "Escorts India",
    city: p.city || "",
    district: p.district || undefined,
    state: p.region || undefined,
    localArea: p.localArea || undefined,
    country: p.country || "India",
    gender: (p.gender as "female" | "male" | "trans") || "female",
    category: (p.category as EscortProfile["category"]) || "girls",
    topBadge: null,
    // `status` is a real field the owner sets in the edit form. It is left
    // undefined rather than defaulted, because "Independent" is a claim about
    // how someone does business and there is no data source to back it.
    badges: ["Verified"],
    photoUrl: primaryPhoto,
    gallery,
    // Physical attributes are omitted, not guessed. The DB has columns for
    // none of them, so any value here would be invented.
    languages: [],
    // Contact details are passed through only when the row actually holds one.
    // The previous `|| "+91 62035 40719"` fallback published a different real
    // person's number against anyone who left the field blank.
    phone: p.hidePhoneFromPublic ? "" : (p.phone || ""),
    whatsapp: p.whatsapp || "",
    rates:
      p.rates && p.rates.length > 0
        ? p.rates.map((r) => ({
            duration: r.duration,
            incall: typeof r.incall === "number" ? `₹${r.incall.toLocaleString("en-IN")}` : (r.incall ? String(r.incall) : "—"),
            outcall: typeof r.outcall === "number" ? `₹${r.outcall.toLocaleString("en-IN")}` : (r.outcall ? String(r.outcall) : "—"),
          }))
        // No default price sheet: publishing STANDARD_PRICING_TIERS against a
        // real listing would assert rates its owner never agreed to.
        : [],
    // Same reasoning for services and the "verified" date / view count.
    services: [],
    about: p.bio || "",
    reviews: [],
    hidePhoneFromPublic: Boolean(p.hidePhoneFromPublic),
    isPhoneHidden: Boolean(p.hidePhoneFromPublic),
  };
}
