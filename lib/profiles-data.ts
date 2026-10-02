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

/**
 * Rupee amounts below this are treated as keying errors, not real prices.
 *
 * The listings table is hand-entered, and short keys are common enough that
 * single- and double-digit values turn up (0, 2, 55, 222, 225, 500). A booking
 * priced at ₹2 for ten hours is not information a visitor can act on, and
 * printing it lends the whole page a fabricated air, so these are discarded.
 *
 * Defined here rather than in `lib/seo/profiles.ts` because this module is pure
 * data with no Prisma import, which keeps it safe for the client components that
 * render profiles. The city-level aggregation reuses this same floor.
 */
export const MIN_PLAUSIBLE_RATE = 1000;

/** Renders as "—" wherever a rate is absent or not a credible amount. */
const NO_RATE = "—";

/**
 * Pulls a rupee amount out of a stored rate, which may be a number, a
 * pre-formatted string ("₹12,500"), or null. Returns null when the value is
 * missing, unparseable, non-positive, or below the plausibility floor.
 */
export function parseRateAmount(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined) return null;

  const amount =
    typeof value === "number"
      ? value
      : Number.parseFloat(String(value).replace(/[^0-9.]/g, ""));

  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount < MIN_PLAUSIBLE_RATE ? null : amount;
}

/** Formats a rate cell, or "—" when the tier holds no credible amount. */
function formatRateCell(value: number | string | null | undefined): string {
  const amount = parseRateAmount(value);
  return amount === null ? NO_RATE : `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Normalises a profile's published rate rows for public display.
 *
 * A tier with no credible amount renders as "—" so the column stays aligned,
 * and a row where neither tier holds a credible amount is dropped entirely
 * rather than showing a duration with no price attached to it.
 */
export function sanitizeRates(
  rates: { duration: string; incall?: number | string | null; outcall?: number | string | null }[]
): ProfileRate[] {
  const rows: ProfileRate[] = [];

  for (const rate of rates) {
    const incall = formatRateCell(rate.incall);
    const outcall = formatRateCell(rate.outcall);

    // Nothing credible on either side: the row carries no information.
    if (incall === NO_RATE && outcall === NO_RATE) continue;

    rows.push({ duration: rate.duration, incall, outcall });
  }

  return rows;
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
  },
  {
    id: "2",
    name: "Ananya",
    tagline: "High-class independent companion in Mumbai for discerning gentlemen & corporate executives",
    location: "Escorts Mumbai",
    city: "Mumbai",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    localArea: "Bandra West",
    country: "India",
    gender: "female",
    category: "vip",
    topBadge: "top",
    status: "Independent",
    badges: ["Independent", "Verified", "VIP"],
    photoUrl: "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/48035ce4-8194-4827-912a-29cc6b538704.webp",
    gallery: [
      "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/48035ce4-8194-4827-912a-29cc6b538704.webp",
      "/profiles/priya-2.jpg",
    ],
    age: 24,
    height: "170 cm / 5'7\"",
    weight: "54 kg / 119 lbs",
    bust: "34D",
    hair: "Chestnut Brown",
    eyes: "Hazel",
    ethnicity: "Indian",
    languages: ["English", "Hindi", "Marathi"],
    workingHours: "12:00 PM – 03:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@ananya_mumbai_vip",
    lastSeen: "Today, Online",
    hairColor: "Brown",
    hairLength: "Long",
    orientation: "Straight",
    travel: ["City Wide", "State Wide"],
    availableFor: ["Incall", "Outcall"],
    meetingWith: ["Man"],
    rates: [
      { duration: "1 Hour", incall: "₹15,000", outcall: "₹20,000" },
      { duration: "2 Hours", incall: "₹25,000", outcall: "₹32,000" },
      { duration: "Dinner Date (4 Hours)", incall: "₹45,000", outcall: "₹55,000" },
      { duration: "Overnight (10 Hours)", incall: "₹80,000", outcall: "₹95,000" },
    ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "Deep Erotic Body Massage", category: "Massage & Wellness", available: true },
      { name: "Dinner Date & Business Accompanying", category: "Social", available: true },
      { name: "Sensual French Kissing", category: "Classic", available: true },
    ],
    about: `Hello and welcome. I am Ananya, an educated and independent VIP companion in Mumbai. I am based in Bandra West and offer unhurried, discreet companionship for businessmen, international travellers, and upscale gentlemen. Discretion, mutual respect, and authentic chemistry guaranteed.`,
    reviews: [
      {
        id: "r201",
        author: "Vikram_M",
        rating: 5,
        date: "September 25, 2026",
        city: "Mumbai",
        verified: true,
        comment: "Ananya is an absolute sweetheart. Met her at the St. Regis in Lower Parel. Highly articulate, elegant, and exceptional company. 10/10.",
      },
    ],
    views: 4120,
    verifiedAt: "September 2026"
  },
  {
    id: "3",
    name: "Simran",
    tagline: "Charming, elegant and elite companion in South Delhi & Aerocity",
    location: "Escorts Delhi",
    city: "Delhi",
    district: "South Delhi",
    state: "Delhi",
    localArea: "South Delhi",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: ["Independent", "Verified"],
    photoUrl: "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/7e83eb4c-31e8-4427-92f6-c440d96bd045.webp",
    gallery: [
      "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/7e83eb4c-31e8-4427-92f6-c440d96bd045.webp",
      "/profiles/priya-3.jpg",
    ],
    age: 22,
    height: "165 cm / 5'5\"",
    languages: ["English", "Hindi", "Punjabi"],
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    lastSeen: "Today, Online",
    travel: ["City Wide", "State Wide"],
    availableFor: ["Incall", "Outcall"],
    meetingWith: ["Man"],
    rates: [
      { duration: "1 Hour", incall: "₹12,000", outcall: "₹16,000" },
      { duration: "2 Hours", incall: "₹20,000", outcall: "₹26,000" },
      { duration: "Dinner Date (4 Hours)", incall: "₹38,000", outcall: "₹48,000" },
      { duration: "Overnight (10 Hours)", incall: "₹70,000", outcall: "₹85,000" },
    ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "Sensual Massage with Essential Oils", category: "Massage & Wellness", available: true },
      { name: "VIP Social Dates & Events", category: "Social", available: true },
    ],
    about: `Hi, I am Simran, a passionate independent companion in Delhi. I meet clients at luxury hotel suites in Aerocity, South Delhi, and Central Delhi. You will enjoy total privacy, genuine warmth, and a completely unhurried experience.`,
    reviews: [
      {
        id: "r301",
        author: "Karan_ND",
        rating: 5,
        date: "September 28, 2026",
        city: "Delhi",
        verified: true,
        comment: "Simran is lovely. Great conversation and totally genuine pictures. Truly an independent companion.",
      },
    ],
    views: 3890,
    verifiedAt: "September 2026"
  },
  {
    id: "4",
    name: "Natasha",
    tagline: "Modern, sophisticated companion in Bangalore for IT executives & travellers",
    location: "Escorts Bangalore",
    city: "Bangalore",
    district: "Bengaluru Urban",
    state: "Karnataka",
    localArea: "Koramangala",
    country: "India",
    gender: "female",
    category: "vip",
    topBadge: "top",
    status: "Independent",
    badges: ["Independent", "Verified", "VIP"],
    photoUrl: "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/e501e326-aa8a-41f1-a8c5-c532b70974fe.webp",
    gallery: [
      "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/e501e326-aa8a-41f1-a8c5-c532b70974fe.webp",
      "/profiles/priya-4.jpg",
    ],
    age: 25,
    height: "167 cm / 5'6\"",
    languages: ["English", "Hindi", "Kannada"],
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    lastSeen: "Today, Online",
    travel: ["City Wide"],
    availableFor: ["Incall", "Outcall"],
    meetingWith: ["Man"],
    rates: [
      { duration: "1 Hour", incall: "₹14,000", outcall: "₹18,000" },
      { duration: "2 Hours", incall: "₹24,000", outcall: "₹30,000" },
      { duration: "Dinner Date (4 Hours)", incall: "₹42,000", outcall: "₹52,000" },
      { duration: "Overnight (10 Hours)", incall: "₹75,000", outcall: "₹90,000" },
    ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "Relaxing Swedish Body Massage", category: "Massage & Wellness", available: true },
      { name: "Fine Dining & Business Accompanying", category: "Social", available: true },
    ],
    about: `Namaste! I am Natasha, an independent Bangalore companion with a warm persona and sophisticated conversational flair. Available for outcalls to tech hub star hotels in Whitefield, Koramangala, and Central Bangalore.`,
    reviews: [
      {
        id: "r401",
        author: "Sameer_BLR",
        rating: 5,
        date: "September 29, 2026",
        city: "Bangalore",
        verified: true,
        comment: "Natasha made my weekend memorable. Extremely sweet, speaks fluent English, and gives the best massage.",
      },
    ],
    views: 3450,
    verifiedAt: "September 2026"
  },
  {
    id: "5",
    name: "Riya",
    tagline: "Sweet, sensual and independent companion in Koregaon Park & Viman Nagar Pune",
    location: "Escorts Pune",
    city: "Pune",
    district: "Pune",
    state: "Maharashtra",
    localArea: "Koregaon Park",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "new",
    status: "Independent",
    badges: ["Independent", "Verified"],
    photoUrl: "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/d2c89d8e-cbb9-426a-8b7c-aa7d3fb2deb6.webp",
    gallery: [
      "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/d2c89d8e-cbb9-426a-8b7c-aa7d3fb2deb6.webp",
      "/profiles/priya-5.jpg",
    ],
    age: 23,
    height: "163 cm / 5'4\"",
    languages: ["English", "Hindi"],
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    lastSeen: "Today, Online",
    travel: ["City Wide"],
    availableFor: ["Incall", "Outcall"],
    meetingWith: ["Man"],
    rates: [
      { duration: "1 Hour", incall: "₹10,000", outcall: "₹14,000" },
      { duration: "2 Hours", incall: "₹18,000", outcall: "₹24,000" },
      { duration: "Dinner Date (4 Hours)", incall: "₹35,000", outcall: "₹45,000" },
      { duration: "Overnight (10 Hours)", incall: "₹65,000", outcall: "₹75,000" },
    ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "Aromatherapy Full Body Massage", category: "Massage & Wellness", available: true },
      { name: "Sensual French Kissing", category: "Classic", available: true },
    ],
    about: `Hi, I am Riya, an independent escort in Pune. I love meaningful connections, music, and quiet luxury evenings. Available for outcalls to Koregaon Park, Hinjewadi, and Viman Nagar hotels.`,
    reviews: [
      {
        id: "r501",
        author: "Rahul_P",
        rating: 5,
        date: "September 30, 2026",
        city: "Pune",
        verified: true,
        comment: "Riya is genuine and gentle. She arrived right on time at my hotel in KP. Excellent service.",
      },
    ],
    views: 2980,
    verifiedAt: "September 2026"
  },
  {
    id: "6",
    name: "Zara",
    tagline: "Vibrant beach holiday companion & bikini model in Goa",
    location: "Escorts Goa",
    city: "Goa",
    district: "North Goa",
    state: "Goa",
    localArea: "Calangute",
    country: "India",
    gender: "female",
    category: "vip",
    topBadge: "top",
    status: "Independent",
    badges: ["Independent", "Verified", "VIP"],
    photoUrl: "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/f1ea5db5-d3eb-4b3f-a51d-719b9032a0fd.webp",
    gallery: [
      "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/f1ea5db5-d3eb-4b3f-a51d-719b9032a0fd.webp",
      "/profiles/priya-6.jpg",
    ],
    age: 24,
    height: "172 cm / 5'8\"",
    languages: ["English", "Hindi"],
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    lastSeen: "Today, Online",
    travel: ["City Wide", "State Wide"],
    availableFor: ["Incall", "Outcall"],
    meetingWith: ["Man", "Couple"],
    rates: [
      { duration: "1 Hour", incall: "₹15,000", outcall: "₹20,000" },
      { duration: "2 Hours", incall: "₹25,000", outcall: "₹32,000" },
      { duration: "Dinner Date (4 Hours)", incall: "₹45,000", outcall: "₹55,000" },
      { duration: "Overnight (10 Hours)", incall: "₹80,000", outcall: "₹95,000" },
      { duration: "Weekend Getaway", incall: "₹1,60,000", outcall: "₹1,90,000" },
    ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "Beach Resort & Yacht Companion", category: "Social", available: true },
      { name: "Sensual Warm Oil Nuru Massage", category: "Massage & Wellness", available: true },
      { name: "Couples & Duo Sessions", category: "Special", available: true },
    ],
    about: `Hey there! I am Zara, your premier holiday companion in sunny Goa. Whether you want a stunning companion for beachside cocktails, a fine-dining date, or an intimate private villa rendezvous, I ensure complete luxury and excitement.`,
    reviews: [
      {
        id: "r601",
        author: "Alex_UK",
        rating: 5,
        date: "September 27, 2026",
        city: "Goa",
        verified: true,
        comment: "Zara made my Goa vacation unforgettable. Stunning looks, friendly attitude, and absolute discretion.",
      },
    ],
    views: 4560,
    verifiedAt: "September 2026"
  },
  {
    id: "7",
    name: "Pooja",
    tagline: "Warm, respectful and gorgeous companion in Banjara Hills & Hitech City",
    location: "Escorts Hyderabad",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    localArea: "Banjara Hills",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: ["Independent", "Verified"],
    photoUrl: "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/23429e9b-9bb0-4377-8ab9-4ce4d2541d90.webp",
    gallery: [
      "https://kjoiiitwkqbvbsosjhyy.supabase.co/storage/v1/object/public/uploads/profiles/23429e9b-9bb0-4377-8ab9-4ce4d2541d90.webp",
      "/profiles/priya-1.jpg",
    ],
    age: 23,
    height: "166 cm / 5'5\"",
    languages: ["English", "Hindi", "Telugu"],
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    lastSeen: "Today, Online",
    travel: ["City Wide"],
    availableFor: ["Incall", "Outcall"],
    meetingWith: ["Man"],
    rates: [
      { duration: "1 Hour", incall: "₹12,000", outcall: "₹16,000" },
      { duration: "2 Hours", incall: "₹20,000", outcall: "₹26,000" },
      { duration: "Dinner Date (4 Hours)", incall: "₹38,000", outcall: "₹48,000" },
      { duration: "Overnight (10 Hours)", incall: "₹70,000", outcall: "₹85,000" },
    ],
    services: [
      { name: "Girlfriend Experience (GFE)", category: "Classic", available: true },
      { name: "Deep Tissue Sensual Massage", category: "Massage & Wellness", available: true },
      { name: "Dinner Date Accompanying", category: "Social", available: true },
    ],
    about: `Namaskaram! I am Pooja, an independent companion based in Banjara Hills, Hyderabad. I cater to refined gentlemen visiting Cyberabad and upscale business hotels. 100% real photos and mutual respect guaranteed.`,
    reviews: [
      {
        id: "r701",
        author: "Kishore_HYD",
        rating: 5,
        date: "September 24, 2026",
        city: "Hyderabad",
        verified: true,
        comment: "Pooja is wonderful. Exactly as in the photos, sweet nature and very polite. Will definitely book again.",
      },
    ],
    views: 3120,
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
        ? sanitizeRates(p.rates)
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
