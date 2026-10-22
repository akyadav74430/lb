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
    name: "Priya Cuttack City",
    tagline: "Elite independent escort in Cuttack City offering genuine GFE & discretion",
    location: "Escorts Cuttack City",
    city: "Cuttack City",
    district: "Cuttack",
    state: "Odisha",
    localArea: "Badambadi",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_cuttack_city_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r1a",
        author: "Client_Cuttack City",
        rating: 5,
        date: "September 2026",
        city: "Cuttack City",
        verified: true,
        comment: "Priya in Cuttack City is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r1b",
        author: "Visitor_1",
        rating: 5,
        date: "August 2026",
        city: "Cuttack City",
        verified: true,
        comment: "Booked Priya in Cuttack City. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4761,
    verifiedAt: "September 2026"
  },

  {
    id: "2",
    name: "Priya Choudwar",
    tagline: "Charming VIP companion in Choudwar for discerning gentlemen",
    location: "Escorts Choudwar",
    city: "Choudwar",
    district: "Cuttack",
    state: "Odisha",
    localArea: "Industrial Area",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_choudwar_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r2a",
        author: "Client_Choudwar",
        rating: 5,
        date: "September 2026",
        city: "Choudwar",
        verified: true,
        comment: "Priya in Choudwar is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r2b",
        author: "Visitor_2",
        rating: 5,
        date: "August 2026",
        city: "Choudwar",
        verified: true,
        comment: "Booked Priya in Choudwar. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4039,
    verifiedAt: "September 2026"
  },

  {
    id: "3",
    name: "Priya Bhubaneswar",
    tagline: "Sophisticated independent companion in Bhubaneswar with verified photos",
    location: "Escorts Bhubaneswar",
    city: "Bhubaneswar",
    district: "Khordha",
    state: "Odisha",
    localArea: "Patia",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_bhubaneswar_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r3a",
        author: "Client_Bhubaneswar",
        rating: 5,
        date: "September 2026",
        city: "Bhubaneswar",
        verified: true,
        comment: "Priya in Bhubaneswar is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r3b",
        author: "Visitor_3",
        rating: 5,
        date: "August 2026",
        city: "Bhubaneswar",
        verified: true,
        comment: "Booked Priya in Bhubaneswar. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2788,
    verifiedAt: "September 2026"
  },

  {
    id: "4",
    name: "Priya Jatani",
    tagline: "Beautiful luxury escort in Jatani - 100% real & independent",
    location: "Escorts Jatani",
    city: "Jatani",
    district: "Khordha",
    state: "Odisha",
    localArea: "Station Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_jatani_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r4a",
        author: "Client_Jatani",
        rating: 5,
        date: "September 2026",
        city: "Jatani",
        verified: true,
        comment: "Priya in Jatani is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r4b",
        author: "Visitor_4",
        rating: 5,
        date: "August 2026",
        city: "Jatani",
        verified: true,
        comment: "Booked Priya in Jatani. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2990,
    verifiedAt: "September 2026"
  },

  {
    id: "5",
    name: "Priya Puri",
    tagline: "Sensual luxury independent companion in Puri with genuine elegance, warmth & discretion",
    location: "Escorts Puri",
    city: "Puri",
    district: "Puri",
    state: "Odisha",
    localArea: "VIP Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_puri_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r5a",
        author: "Client_Puri",
        rating: 5,
        date: "September 2026",
        city: "Puri",
        verified: true,
        comment: "Priya in Puri is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r5b",
        author: "Visitor_5",
        rating: 5,
        date: "August 2026",
        city: "Puri",
        verified: true,
        comment: "Booked Priya in Puri. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3135,
    verifiedAt: "September 2026"
  },

  {
    id: "6",
    name: "Priya Berhampur",
    tagline: "Elite independent escort in Berhampur offering genuine GFE & discretion",
    location: "Escorts Berhampur",
    city: "Berhampur",
    district: "Ganjam",
    state: "Odisha",
    localArea: "Gandhi Nagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_berhampur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r6a",
        author: "Client_Berhampur",
        rating: 5,
        date: "September 2026",
        city: "Berhampur",
        verified: true,
        comment: "Priya in Berhampur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r6b",
        author: "Visitor_6",
        rating: 5,
        date: "August 2026",
        city: "Berhampur",
        verified: true,
        comment: "Booked Priya in Berhampur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4771,
    verifiedAt: "September 2026"
  },

  {
    id: "7",
    name: "Priya Rourkela",
    tagline: "Charming VIP companion in Rourkela for discerning gentlemen",
    location: "Escorts Rourkela",
    city: "Rourkela",
    district: "Sundargarh",
    state: "Odisha",
    localArea: "Civil Township",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_rourkela_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r7a",
        author: "Client_Rourkela",
        rating: 5,
        date: "September 2026",
        city: "Rourkela",
        verified: true,
        comment: "Priya in Rourkela is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r7b",
        author: "Visitor_7",
        rating: 5,
        date: "August 2026",
        city: "Rourkela",
        verified: true,
        comment: "Booked Priya in Rourkela. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4225,
    verifiedAt: "September 2026"
  },

  {
    id: "8",
    name: "Priya Sambalpur City",
    tagline: "Sophisticated independent companion in Sambalpur City with verified photos",
    location: "Escorts Sambalpur City",
    city: "Sambalpur City",
    district: "Sambalpur",
    state: "Odisha",
    localArea: "Budharaja",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Odia"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_sambalpur_city_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r8a",
        author: "Client_Sambalpur City",
        rating: 5,
        date: "September 2026",
        city: "Sambalpur City",
        verified: true,
        comment: "Priya in Sambalpur City is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r8b",
        author: "Visitor_8",
        rating: 5,
        date: "August 2026",
        city: "Sambalpur City",
        verified: true,
        comment: "Booked Priya in Sambalpur City. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2668,
    verifiedAt: "September 2026"
  },

  {
    id: "9",
    name: "Priya Kolkata",
    tagline: "Beautiful luxury escort in Kolkata - 100% real & independent",
    location: "Escorts Kolkata",
    city: "Kolkata",
    district: "Kolkata",
    state: "West Bengal",
    localArea: "Salt Lake (Bidhannagar)",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_kolkata_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r9a",
        author: "Client_Kolkata",
        rating: 5,
        date: "September 2026",
        city: "Kolkata",
        verified: true,
        comment: "Priya in Kolkata is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r9b",
        author: "Visitor_9",
        rating: 5,
        date: "August 2026",
        city: "Kolkata",
        verified: true,
        comment: "Booked Priya in Kolkata. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2705,
    verifiedAt: "September 2026"
  },

  {
    id: "10",
    name: "Priya Barasat",
    tagline: "Sensual luxury independent companion in Barasat with genuine elegance, warmth & discretion",
    location: "Escorts Barasat",
    city: "Barasat",
    district: "North 24 Parganas",
    state: "West Bengal",
    localArea: "Champadali",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_barasat_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r10a",
        author: "Client_Barasat",
        rating: 5,
        date: "September 2026",
        city: "Barasat",
        verified: true,
        comment: "Priya in Barasat is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r10b",
        author: "Visitor_10",
        rating: 5,
        date: "August 2026",
        city: "Barasat",
        verified: true,
        comment: "Booked Priya in Barasat. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2616,
    verifiedAt: "September 2026"
  },

  {
    id: "11",
    name: "Priya Barrackpore",
    tagline: "Elite independent escort in Barrackpore offering genuine GFE & discretion",
    location: "Escorts Barrackpore",
    city: "Barrackpore",
    district: "North 24 Parganas",
    state: "West Bengal",
    localArea: "Station Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_barrackpore_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r11a",
        author: "Client_Barrackpore",
        rating: 5,
        date: "September 2026",
        city: "Barrackpore",
        verified: true,
        comment: "Priya in Barrackpore is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r11b",
        author: "Visitor_11",
        rating: 5,
        date: "August 2026",
        city: "Barrackpore",
        verified: true,
        comment: "Booked Priya in Barrackpore. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3510,
    verifiedAt: "September 2026"
  },

  {
    id: "12",
    name: "Priya Bidhannagar",
    tagline: "Charming VIP companion in Bidhannagar for discerning gentlemen",
    location: "Escorts Bidhannagar",
    city: "Bidhannagar",
    district: "North 24 Parganas",
    state: "West Bengal",
    localArea: "Sector 1",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_bidhannagar_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r12a",
        author: "Client_Bidhannagar",
        rating: 5,
        date: "September 2026",
        city: "Bidhannagar",
        verified: true,
        comment: "Priya in Bidhannagar is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r12b",
        author: "Visitor_12",
        rating: 5,
        date: "August 2026",
        city: "Bidhannagar",
        verified: true,
        comment: "Booked Priya in Bidhannagar. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3329,
    verifiedAt: "September 2026"
  },

  {
    id: "13",
    name: "Priya Jadavpur",
    tagline: "Sophisticated independent companion in Jadavpur with verified photos",
    location: "Escorts Jadavpur",
    city: "Jadavpur",
    district: "South 24 Parganas",
    state: "West Bengal",
    localArea: "Central Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_jadavpur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r13a",
        author: "Client_Jadavpur",
        rating: 5,
        date: "September 2026",
        city: "Jadavpur",
        verified: true,
        comment: "Priya in Jadavpur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r13b",
        author: "Visitor_13",
        rating: 5,
        date: "August 2026",
        city: "Jadavpur",
        verified: true,
        comment: "Booked Priya in Jadavpur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4024,
    verifiedAt: "September 2026"
  },

  {
    id: "14",
    name: "Priya Sonarpur",
    tagline: "Beautiful luxury escort in Sonarpur - 100% real & independent",
    location: "Escorts Sonarpur",
    city: "Sonarpur",
    district: "South 24 Parganas",
    state: "West Bengal",
    localArea: "Station Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_sonarpur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r14a",
        author: "Client_Sonarpur",
        rating: 5,
        date: "September 2026",
        city: "Sonarpur",
        verified: true,
        comment: "Priya in Sonarpur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r14b",
        author: "Visitor_14",
        rating: 5,
        date: "August 2026",
        city: "Sonarpur",
        verified: true,
        comment: "Booked Priya in Sonarpur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2584,
    verifiedAt: "September 2026"
  },

  {
    id: "15",
    name: "Priya Howrah",
    tagline: "Sensual luxury independent companion in Howrah with genuine elegance, warmth & discretion",
    location: "Escorts Howrah",
    city: "Howrah",
    district: "Howrah",
    state: "West Bengal",
    localArea: "Shibpur",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_howrah_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r15a",
        author: "Client_Howrah",
        rating: 5,
        date: "September 2026",
        city: "Howrah",
        verified: true,
        comment: "Priya in Howrah is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r15b",
        author: "Visitor_15",
        rating: 5,
        date: "August 2026",
        city: "Howrah",
        verified: true,
        comment: "Booked Priya in Howrah. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3460,
    verifiedAt: "September 2026"
  },

  {
    id: "16",
    name: "Priya Siliguri",
    tagline: "Elite independent escort in Siliguri offering genuine GFE & discretion",
    location: "Escorts Siliguri",
    city: "Siliguri",
    district: "Darjeeling",
    state: "West Bengal",
    localArea: "Sevoke Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_siliguri_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r16a",
        author: "Client_Siliguri",
        rating: 5,
        date: "September 2026",
        city: "Siliguri",
        verified: true,
        comment: "Priya in Siliguri is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r16b",
        author: "Visitor_16",
        rating: 5,
        date: "August 2026",
        city: "Siliguri",
        verified: true,
        comment: "Booked Priya in Siliguri. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4843,
    verifiedAt: "September 2026"
  },

  {
    id: "17",
    name: "Priya Darjeeling",
    tagline: "Charming VIP companion in Darjeeling for discerning gentlemen",
    location: "Escorts Darjeeling",
    city: "Darjeeling",
    district: "Darjeeling",
    state: "West Bengal",
    localArea: "Mall Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_darjeeling_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r17a",
        author: "Client_Darjeeling",
        rating: 5,
        date: "September 2026",
        city: "Darjeeling",
        verified: true,
        comment: "Priya in Darjeeling is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r17b",
        author: "Visitor_17",
        rating: 5,
        date: "August 2026",
        city: "Darjeeling",
        verified: true,
        comment: "Booked Priya in Darjeeling. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3210,
    verifiedAt: "September 2026"
  },

  {
    id: "18",
    name: "Priya Durgapur",
    tagline: "Sophisticated independent companion in Durgapur with verified photos",
    location: "Escorts Durgapur",
    city: "Durgapur",
    district: "Paschim Bardhaman",
    state: "West Bengal",
    localArea: "City Centre",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_durgapur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r18a",
        author: "Client_Durgapur",
        rating: 5,
        date: "September 2026",
        city: "Durgapur",
        verified: true,
        comment: "Priya in Durgapur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r18b",
        author: "Visitor_18",
        rating: 5,
        date: "August 2026",
        city: "Durgapur",
        verified: true,
        comment: "Booked Priya in Durgapur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4249,
    verifiedAt: "September 2026"
  },

  {
    id: "19",
    name: "Priya Asansol",
    tagline: "Beautiful luxury escort in Asansol - 100% real & independent",
    location: "Escorts Asansol",
    city: "Asansol",
    district: "Paschim Bardhaman",
    state: "West Bengal",
    localArea: "Court Area",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Bengali"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_asansol_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r19a",
        author: "Client_Asansol",
        rating: 5,
        date: "September 2026",
        city: "Asansol",
        verified: true,
        comment: "Priya in Asansol is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r19b",
        author: "Visitor_19",
        rating: 5,
        date: "August 2026",
        city: "Asansol",
        verified: true,
        comment: "Booked Priya in Asansol. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2154,
    verifiedAt: "September 2026"
  },

  {
    id: "20",
    name: "Priya Mumbai South",
    tagline: "Sensual luxury independent companion in Mumbai South with genuine elegance, warmth & discretion",
    location: "Escorts Mumbai South",
    city: "Mumbai South",
    district: "Mumbai City",
    state: "Maharashtra",
    localArea: "Colaba",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Marathi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_mumbai_south_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r20a",
        author: "Client_Mumbai South",
        rating: 5,
        date: "September 2026",
        city: "Mumbai South",
        verified: true,
        comment: "Priya in Mumbai South is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r20b",
        author: "Visitor_20",
        rating: 5,
        date: "August 2026",
        city: "Mumbai South",
        verified: true,
        comment: "Booked Priya in Mumbai South. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4717,
    verifiedAt: "September 2026"
  },

  {
    id: "21",
    name: "Priya Mumbai",
    tagline: "Elite independent escort in Mumbai offering genuine GFE & discretion",
    location: "Escorts Mumbai",
    city: "Mumbai",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    localArea: "Bandra West",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Marathi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_mumbai_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r21a",
        author: "Client_Mumbai",
        rating: 5,
        date: "September 2026",
        city: "Mumbai",
        verified: true,
        comment: "Priya in Mumbai is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r21b",
        author: "Visitor_21",
        rating: 5,
        date: "August 2026",
        city: "Mumbai",
        verified: true,
        comment: "Booked Priya in Mumbai. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2694,
    verifiedAt: "September 2026"
  },

  {
    id: "22",
    name: "Priya Pune",
    tagline: "Charming VIP companion in Pune for discerning gentlemen",
    location: "Escorts Pune",
    city: "Pune",
    district: "Pune",
    state: "Maharashtra",
    localArea: "Koregaon Park",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Marathi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_pune_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r22a",
        author: "Client_Pune",
        rating: 5,
        date: "September 2026",
        city: "Pune",
        verified: true,
        comment: "Priya in Pune is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r22b",
        author: "Visitor_22",
        rating: 5,
        date: "August 2026",
        city: "Pune",
        verified: true,
        comment: "Booked Priya in Pune. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3994,
    verifiedAt: "September 2026"
  },

  {
    id: "23",
    name: "Priya Thane",
    tagline: "Sophisticated independent companion in Thane with verified photos",
    location: "Escorts Thane",
    city: "Thane",
    district: "Thane",
    state: "Maharashtra",
    localArea: "Ghodbunder Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Marathi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_thane_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r23a",
        author: "Client_Thane",
        rating: 5,
        date: "September 2026",
        city: "Thane",
        verified: true,
        comment: "Priya in Thane is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r23b",
        author: "Visitor_23",
        rating: 5,
        date: "August 2026",
        city: "Thane",
        verified: true,
        comment: "Booked Priya in Thane. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3733,
    verifiedAt: "September 2026"
  },

  {
    id: "24",
    name: "Priya Navi Mumbai",
    tagline: "Beautiful luxury escort in Navi Mumbai - 100% real & independent",
    location: "Escorts Navi Mumbai",
    city: "Navi Mumbai",
    district: "Thane",
    state: "Maharashtra",
    localArea: "Vashi",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Marathi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_navi_mumbai_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r24a",
        author: "Client_Navi Mumbai",
        rating: 5,
        date: "September 2026",
        city: "Navi Mumbai",
        verified: true,
        comment: "Priya in Navi Mumbai is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r24b",
        author: "Visitor_24",
        rating: 5,
        date: "August 2026",
        city: "Navi Mumbai",
        verified: true,
        comment: "Booked Priya in Navi Mumbai. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2147,
    verifiedAt: "September 2026"
  },

  {
    id: "25",
    name: "Priya Nagpur",
    tagline: "Sensual luxury independent companion in Nagpur with genuine elegance, warmth & discretion",
    location: "Escorts Nagpur",
    city: "Nagpur",
    district: "Nagpur",
    state: "Maharashtra",
    localArea: "Dharampeth",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Marathi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_nagpur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r25a",
        author: "Client_Nagpur",
        rating: 5,
        date: "September 2026",
        city: "Nagpur",
        verified: true,
        comment: "Priya in Nagpur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r25b",
        author: "Visitor_25",
        rating: 5,
        date: "August 2026",
        city: "Nagpur",
        verified: true,
        comment: "Booked Priya in Nagpur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3347,
    verifiedAt: "September 2026"
  },

  {
    id: "26",
    name: "Priya Nashik",
    tagline: "Elite independent escort in Nashik offering genuine GFE & discretion",
    location: "Escorts Nashik",
    city: "Nashik",
    district: "Nashik",
    state: "Maharashtra",
    localArea: "College Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Marathi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_nashik_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r26a",
        author: "Client_Nashik",
        rating: 5,
        date: "September 2026",
        city: "Nashik",
        verified: true,
        comment: "Priya in Nashik is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r26b",
        author: "Visitor_26",
        rating: 5,
        date: "August 2026",
        city: "Nashik",
        verified: true,
        comment: "Booked Priya in Nashik. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4469,
    verifiedAt: "September 2026"
  },

  {
    id: "27",
    name: "Priya New Delhi",
    tagline: "Charming VIP companion in New Delhi for discerning gentlemen",
    location: "Escorts New Delhi",
    city: "New Delhi",
    district: "New Delhi",
    state: "Delhi",
    localArea: "Connaught Place",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_new_delhi_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r27a",
        author: "Client_New Delhi",
        rating: 5,
        date: "September 2026",
        city: "New Delhi",
        verified: true,
        comment: "Priya in New Delhi is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r27b",
        author: "Visitor_27",
        rating: 5,
        date: "August 2026",
        city: "New Delhi",
        verified: true,
        comment: "Booked Priya in New Delhi. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3498,
    verifiedAt: "September 2026"
  },

  {
    id: "28",
    name: "Priya South Delhi",
    tagline: "Sophisticated independent companion in South Delhi with verified photos",
    location: "Escorts South Delhi",
    city: "South Delhi",
    district: "South Delhi",
    state: "Delhi",
    localArea: "South Extension",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_south_delhi_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r28a",
        author: "Client_South Delhi",
        rating: 5,
        date: "September 2026",
        city: "South Delhi",
        verified: true,
        comment: "Priya in South Delhi is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r28b",
        author: "Visitor_28",
        rating: 5,
        date: "August 2026",
        city: "South Delhi",
        verified: true,
        comment: "Booked Priya in South Delhi. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4307,
    verifiedAt: "September 2026"
  },

  {
    id: "29",
    name: "Priya Dwarka",
    tagline: "Beautiful luxury escort in Dwarka - 100% real & independent",
    location: "Escorts Dwarka",
    city: "Dwarka",
    district: "South West Delhi",
    state: "Delhi",
    localArea: "Sector 6",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_dwarka_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r29a",
        author: "Client_Dwarka",
        rating: 5,
        date: "September 2026",
        city: "Dwarka",
        verified: true,
        comment: "Priya in Dwarka is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r29b",
        author: "Visitor_29",
        rating: 5,
        date: "August 2026",
        city: "Dwarka",
        verified: true,
        comment: "Booked Priya in Dwarka. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2313,
    verifiedAt: "September 2026"
  },

  {
    id: "30",
    name: "Priya West Delhi",
    tagline: "Sensual luxury independent companion in West Delhi with genuine elegance, warmth & discretion",
    location: "Escorts West Delhi",
    city: "West Delhi",
    district: "West Delhi",
    state: "Delhi",
    localArea: "Rajouri Garden",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_west_delhi_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r30a",
        author: "Client_West Delhi",
        rating: 5,
        date: "September 2026",
        city: "West Delhi",
        verified: true,
        comment: "Priya in West Delhi is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r30b",
        author: "Visitor_30",
        rating: 5,
        date: "August 2026",
        city: "West Delhi",
        verified: true,
        comment: "Booked Priya in West Delhi. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4642,
    verifiedAt: "September 2026"
  },

  {
    id: "31",
    name: "Priya North Delhi",
    tagline: "Elite independent escort in North Delhi offering genuine GFE & discretion",
    location: "Escorts North Delhi",
    city: "North Delhi",
    district: "North Delhi",
    state: "Delhi",
    localArea: "Civil Lines",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_north_delhi_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r31a",
        author: "Client_North Delhi",
        rating: 5,
        date: "September 2026",
        city: "North Delhi",
        verified: true,
        comment: "Priya in North Delhi is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r31b",
        author: "Visitor_31",
        rating: 5,
        date: "August 2026",
        city: "North Delhi",
        verified: true,
        comment: "Booked Priya in North Delhi. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3771,
    verifiedAt: "September 2026"
  },

  {
    id: "32",
    name: "Priya East Delhi",
    tagline: "Charming VIP companion in East Delhi for discerning gentlemen",
    location: "Escorts East Delhi",
    city: "East Delhi",
    district: "East Delhi",
    state: "Delhi",
    localArea: "Mayur Vihar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_east_delhi_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r32a",
        author: "Client_East Delhi",
        rating: 5,
        date: "September 2026",
        city: "East Delhi",
        verified: true,
        comment: "Priya in East Delhi is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r32b",
        author: "Visitor_32",
        rating: 5,
        date: "August 2026",
        city: "East Delhi",
        verified: true,
        comment: "Booked Priya in East Delhi. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2879,
    verifiedAt: "September 2026"
  },

  {
    id: "33",
    name: "Priya Bangalore",
    tagline: "Sophisticated independent companion in Bangalore with verified photos",
    location: "Escorts Bangalore",
    city: "Bangalore",
    district: "Bangalore Urban",
    state: "Karnataka",
    localArea: "Indiranagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Kannada"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_bangalore_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r33a",
        author: "Client_Bangalore",
        rating: 5,
        date: "September 2026",
        city: "Bangalore",
        verified: true,
        comment: "Priya in Bangalore is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r33b",
        author: "Visitor_33",
        rating: 5,
        date: "August 2026",
        city: "Bangalore",
        verified: true,
        comment: "Booked Priya in Bangalore. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3799,
    verifiedAt: "September 2026"
  },

  {
    id: "34",
    name: "Priya Mysore",
    tagline: "Beautiful luxury escort in Mysore - 100% real & independent",
    location: "Escorts Mysore",
    city: "Mysore",
    district: "Mysore",
    state: "Karnataka",
    localArea: "Gokulam",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Kannada"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_mysore_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r34a",
        author: "Client_Mysore",
        rating: 5,
        date: "September 2026",
        city: "Mysore",
        verified: true,
        comment: "Priya in Mysore is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r34b",
        author: "Visitor_34",
        rating: 5,
        date: "August 2026",
        city: "Mysore",
        verified: true,
        comment: "Booked Priya in Mysore. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3540,
    verifiedAt: "September 2026"
  },

  {
    id: "35",
    name: "Priya Mangalore",
    tagline: "Sensual luxury independent companion in Mangalore with genuine elegance, warmth & discretion",
    location: "Escorts Mangalore",
    city: "Mangalore",
    district: "Dakshina Kannada",
    state: "Karnataka",
    localArea: "Kadri",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Kannada"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_mangalore_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r35a",
        author: "Client_Mangalore",
        rating: 5,
        date: "September 2026",
        city: "Mangalore",
        verified: true,
        comment: "Priya in Mangalore is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r35b",
        author: "Visitor_35",
        rating: 5,
        date: "August 2026",
        city: "Mangalore",
        verified: true,
        comment: "Booked Priya in Mangalore. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4612,
    verifiedAt: "September 2026"
  },

  {
    id: "36",
    name: "Priya Hyderabad",
    tagline: "Elite independent escort in Hyderabad offering genuine GFE & discretion",
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
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Telugu"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_hyderabad_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r36a",
        author: "Client_Hyderabad",
        rating: 5,
        date: "September 2026",
        city: "Hyderabad",
        verified: true,
        comment: "Priya in Hyderabad is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r36b",
        author: "Visitor_36",
        rating: 5,
        date: "August 2026",
        city: "Hyderabad",
        verified: true,
        comment: "Booked Priya in Hyderabad. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4138,
    verifiedAt: "September 2026"
  },

  {
    id: "37",
    name: "Priya Secunderabad",
    tagline: "Charming VIP companion in Secunderabad for discerning gentlemen",
    location: "Escorts Secunderabad",
    city: "Secunderabad",
    district: "Medchal-Malkajgiri",
    state: "Telangana",
    localArea: "Sainikpuri",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Telugu"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_secunderabad_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r37a",
        author: "Client_Secunderabad",
        rating: 5,
        date: "September 2026",
        city: "Secunderabad",
        verified: true,
        comment: "Priya in Secunderabad is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r37b",
        author: "Visitor_37",
        rating: 5,
        date: "August 2026",
        city: "Secunderabad",
        verified: true,
        comment: "Booked Priya in Secunderabad. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2156,
    verifiedAt: "September 2026"
  },

  {
    id: "38",
    name: "Priya Chennai",
    tagline: "Sophisticated independent companion in Chennai with verified photos",
    location: "Escorts Chennai",
    city: "Chennai",
    district: "Chennai",
    state: "Tamil Nadu",
    localArea: "T. Nagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Tamil"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_chennai_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r38a",
        author: "Client_Chennai",
        rating: 5,
        date: "September 2026",
        city: "Chennai",
        verified: true,
        comment: "Priya in Chennai is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r38b",
        author: "Visitor_38",
        rating: 5,
        date: "August 2026",
        city: "Chennai",
        verified: true,
        comment: "Booked Priya in Chennai. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2158,
    verifiedAt: "September 2026"
  },

  {
    id: "39",
    name: "Priya Coimbatore",
    tagline: "Beautiful luxury escort in Coimbatore - 100% real & independent",
    location: "Escorts Coimbatore",
    city: "Coimbatore",
    district: "Coimbatore",
    state: "Tamil Nadu",
    localArea: "RS Puram",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Tamil"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_coimbatore_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r39a",
        author: "Client_Coimbatore",
        rating: 5,
        date: "September 2026",
        city: "Coimbatore",
        verified: true,
        comment: "Priya in Coimbatore is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r39b",
        author: "Visitor_39",
        rating: 5,
        date: "August 2026",
        city: "Coimbatore",
        verified: true,
        comment: "Booked Priya in Coimbatore. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4859,
    verifiedAt: "September 2026"
  },

  {
    id: "40",
    name: "Priya Madurai",
    tagline: "Sensual luxury independent companion in Madurai with genuine elegance, warmth & discretion",
    location: "Escorts Madurai",
    city: "Madurai",
    district: "Madurai",
    state: "Tamil Nadu",
    localArea: "KK Nagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Tamil"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_madurai_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r40a",
        author: "Client_Madurai",
        rating: 5,
        date: "September 2026",
        city: "Madurai",
        verified: true,
        comment: "Priya in Madurai is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r40b",
        author: "Visitor_40",
        rating: 5,
        date: "August 2026",
        city: "Madurai",
        verified: true,
        comment: "Booked Priya in Madurai. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2731,
    verifiedAt: "September 2026"
  },

  {
    id: "41",
    name: "Priya Ahmedabad",
    tagline: "Elite independent escort in Ahmedabad offering genuine GFE & discretion",
    location: "Escorts Ahmedabad",
    city: "Ahmedabad",
    district: "Ahmedabad",
    state: "Gujarat",
    localArea: "SG Highway",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Gujarati"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_ahmedabad_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r41a",
        author: "Client_Ahmedabad",
        rating: 5,
        date: "September 2026",
        city: "Ahmedabad",
        verified: true,
        comment: "Priya in Ahmedabad is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r41b",
        author: "Visitor_41",
        rating: 5,
        date: "August 2026",
        city: "Ahmedabad",
        verified: true,
        comment: "Booked Priya in Ahmedabad. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4184,
    verifiedAt: "September 2026"
  },

  {
    id: "42",
    name: "Priya Surat",
    tagline: "Charming VIP companion in Surat for discerning gentlemen",
    location: "Escorts Surat",
    city: "Surat",
    district: "Surat",
    state: "Gujarat",
    localArea: "Vesu",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Gujarati"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_surat_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r42a",
        author: "Client_Surat",
        rating: 5,
        date: "September 2026",
        city: "Surat",
        verified: true,
        comment: "Priya in Surat is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r42b",
        author: "Visitor_42",
        rating: 5,
        date: "August 2026",
        city: "Surat",
        verified: true,
        comment: "Booked Priya in Surat. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2115,
    verifiedAt: "September 2026"
  },

  {
    id: "43",
    name: "Priya Vadodara",
    tagline: "Sophisticated independent companion in Vadodara with verified photos",
    location: "Escorts Vadodara",
    city: "Vadodara",
    district: "Vadodara",
    state: "Gujarat",
    localArea: "Alkapuri",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Gujarati"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_vadodara_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r43a",
        author: "Client_Vadodara",
        rating: 5,
        date: "September 2026",
        city: "Vadodara",
        verified: true,
        comment: "Priya in Vadodara is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r43b",
        author: "Visitor_43",
        rating: 5,
        date: "August 2026",
        city: "Vadodara",
        verified: true,
        comment: "Booked Priya in Vadodara. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2470,
    verifiedAt: "September 2026"
  },

  {
    id: "44",
    name: "Priya Jaipur",
    tagline: "Beautiful luxury escort in Jaipur - 100% real & independent",
    location: "Escorts Jaipur",
    city: "Jaipur",
    district: "Jaipur",
    state: "Rajasthan",
    localArea: "C-Scheme",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_jaipur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r44a",
        author: "Client_Jaipur",
        rating: 5,
        date: "September 2026",
        city: "Jaipur",
        verified: true,
        comment: "Priya in Jaipur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r44b",
        author: "Visitor_44",
        rating: 5,
        date: "August 2026",
        city: "Jaipur",
        verified: true,
        comment: "Booked Priya in Jaipur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4912,
    verifiedAt: "September 2026"
  },

  {
    id: "45",
    name: "Priya Udaipur",
    tagline: "Sensual luxury independent companion in Udaipur with genuine elegance, warmth & discretion",
    location: "Escorts Udaipur",
    city: "Udaipur",
    district: "Udaipur",
    state: "Rajasthan",
    localArea: "Fateh Sagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_udaipur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r45a",
        author: "Client_Udaipur",
        rating: 5,
        date: "September 2026",
        city: "Udaipur",
        verified: true,
        comment: "Priya in Udaipur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r45b",
        author: "Visitor_45",
        rating: 5,
        date: "August 2026",
        city: "Udaipur",
        verified: true,
        comment: "Booked Priya in Udaipur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3638,
    verifiedAt: "September 2026"
  },

  {
    id: "46",
    name: "Priya Jodhpur",
    tagline: "Elite independent escort in Jodhpur offering genuine GFE & discretion",
    location: "Escorts Jodhpur",
    city: "Jodhpur",
    district: "Jodhpur",
    state: "Rajasthan",
    localArea: "Ratanada",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_jodhpur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r46a",
        author: "Client_Jodhpur",
        rating: 5,
        date: "September 2026",
        city: "Jodhpur",
        verified: true,
        comment: "Priya in Jodhpur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r46b",
        author: "Visitor_46",
        rating: 5,
        date: "August 2026",
        city: "Jodhpur",
        verified: true,
        comment: "Booked Priya in Jodhpur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3056,
    verifiedAt: "September 2026"
  },

  {
    id: "47",
    name: "Priya Panaji",
    tagline: "Charming VIP companion in Panaji for discerning gentlemen",
    location: "Escorts Panaji",
    city: "Panaji",
    district: "North Goa",
    state: "Goa",
    localArea: "Miramar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_panaji_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r47a",
        author: "Client_Panaji",
        rating: 5,
        date: "September 2026",
        city: "Panaji",
        verified: true,
        comment: "Priya in Panaji is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r47b",
        author: "Visitor_47",
        rating: 5,
        date: "August 2026",
        city: "Panaji",
        verified: true,
        comment: "Booked Priya in Panaji. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2045,
    verifiedAt: "September 2026"
  },

  {
    id: "48",
    name: "Priya Candolim / Calangute",
    tagline: "Sophisticated independent companion in Candolim / Calangute with verified photos",
    location: "Escorts Candolim / Calangute",
    city: "Candolim / Calangute",
    district: "North Goa",
    state: "Goa",
    localArea: "Candolim Beach Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_candolim_/_calangute_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r48a",
        author: "Client_Candolim / Calangute",
        rating: 5,
        date: "September 2026",
        city: "Candolim / Calangute",
        verified: true,
        comment: "Priya in Candolim / Calangute is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r48b",
        author: "Visitor_48",
        rating: 5,
        date: "August 2026",
        city: "Candolim / Calangute",
        verified: true,
        comment: "Booked Priya in Candolim / Calangute. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2325,
    verifiedAt: "September 2026"
  },

  {
    id: "49",
    name: "Priya Anjuna / Vagator",
    tagline: "Beautiful luxury escort in Anjuna / Vagator - 100% real & independent",
    location: "Escorts Anjuna / Vagator",
    city: "Anjuna / Vagator",
    district: "North Goa",
    state: "Goa",
    localArea: "Anjuna Flea Market Area",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_anjuna_/_vagator_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r49a",
        author: "Client_Anjuna / Vagator",
        rating: 5,
        date: "September 2026",
        city: "Anjuna / Vagator",
        verified: true,
        comment: "Priya in Anjuna / Vagator is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r49b",
        author: "Visitor_49",
        rating: 5,
        date: "August 2026",
        city: "Anjuna / Vagator",
        verified: true,
        comment: "Booked Priya in Anjuna / Vagator. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4033,
    verifiedAt: "September 2026"
  },

  {
    id: "50",
    name: "Priya Margao",
    tagline: "Sensual luxury independent companion in Margao with genuine elegance, warmth & discretion",
    location: "Escorts Margao",
    city: "Margao",
    district: "South Goa",
    state: "Goa",
    localArea: "Borda",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_margao_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r50a",
        author: "Client_Margao",
        rating: 5,
        date: "September 2026",
        city: "Margao",
        verified: true,
        comment: "Priya in Margao is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r50b",
        author: "Visitor_50",
        rating: 5,
        date: "August 2026",
        city: "Margao",
        verified: true,
        comment: "Booked Priya in Margao. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2388,
    verifiedAt: "September 2026"
  },

  {
    id: "51",
    name: "Priya Vasco da Gama",
    tagline: "Elite independent escort in Vasco da Gama offering genuine GFE & discretion",
    location: "Escorts Vasco da Gama",
    city: "Vasco da Gama",
    district: "South Goa",
    state: "Goa",
    localArea: "Bogmalo",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_vasco_da_gama_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r51a",
        author: "Client_Vasco da Gama",
        rating: 5,
        date: "September 2026",
        city: "Vasco da Gama",
        verified: true,
        comment: "Priya in Vasco da Gama is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r51b",
        author: "Visitor_51",
        rating: 5,
        date: "August 2026",
        city: "Vasco da Gama",
        verified: true,
        comment: "Booked Priya in Vasco da Gama. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3761,
    verifiedAt: "September 2026"
  },

  {
    id: "52",
    name: "Priya Noida",
    tagline: "Charming VIP companion in Noida for discerning gentlemen",
    location: "Escorts Noida",
    city: "Noida",
    district: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    localArea: "Sector 18",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_noida_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r52a",
        author: "Client_Noida",
        rating: 5,
        date: "September 2026",
        city: "Noida",
        verified: true,
        comment: "Priya in Noida is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r52b",
        author: "Visitor_52",
        rating: 5,
        date: "August 2026",
        city: "Noida",
        verified: true,
        comment: "Booked Priya in Noida. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4218,
    verifiedAt: "September 2026"
  },

  {
    id: "53",
    name: "Priya Greater Noida",
    tagline: "Sophisticated independent companion in Greater Noida with verified photos",
    location: "Escorts Greater Noida",
    city: "Greater Noida",
    district: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    localArea: "Alpha 1",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_greater_noida_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r53a",
        author: "Client_Greater Noida",
        rating: 5,
        date: "September 2026",
        city: "Greater Noida",
        verified: true,
        comment: "Priya in Greater Noida is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r53b",
        author: "Visitor_53",
        rating: 5,
        date: "August 2026",
        city: "Greater Noida",
        verified: true,
        comment: "Booked Priya in Greater Noida. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4607,
    verifiedAt: "September 2026"
  },

  {
    id: "54",
    name: "Priya Lucknow",
    tagline: "Beautiful luxury escort in Lucknow - 100% real & independent",
    location: "Escorts Lucknow",
    city: "Lucknow",
    district: "Lucknow",
    state: "Uttar Pradesh",
    localArea: "Gomti Nagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_lucknow_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r54a",
        author: "Client_Lucknow",
        rating: 5,
        date: "September 2026",
        city: "Lucknow",
        verified: true,
        comment: "Priya in Lucknow is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r54b",
        author: "Visitor_54",
        rating: 5,
        date: "August 2026",
        city: "Lucknow",
        verified: true,
        comment: "Booked Priya in Lucknow. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2013,
    verifiedAt: "September 2026"
  },

  {
    id: "55",
    name: "Priya Ghaziabad",
    tagline: "Sensual luxury independent companion in Ghaziabad with genuine elegance, warmth & discretion",
    location: "Escorts Ghaziabad",
    city: "Ghaziabad",
    district: "Ghaziabad",
    state: "Uttar Pradesh",
    localArea: "Indirapuram",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_ghaziabad_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r55a",
        author: "Client_Ghaziabad",
        rating: 5,
        date: "September 2026",
        city: "Ghaziabad",
        verified: true,
        comment: "Priya in Ghaziabad is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r55b",
        author: "Visitor_55",
        rating: 5,
        date: "August 2026",
        city: "Ghaziabad",
        verified: true,
        comment: "Booked Priya in Ghaziabad. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3436,
    verifiedAt: "September 2026"
  },

  {
    id: "56",
    name: "Priya Agra",
    tagline: "Elite independent escort in Agra offering genuine GFE & discretion",
    location: "Escorts Agra",
    city: "Agra",
    district: "Agra",
    state: "Uttar Pradesh",
    localArea: "Tajganj",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_agra_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r56a",
        author: "Client_Agra",
        rating: 5,
        date: "September 2026",
        city: "Agra",
        verified: true,
        comment: "Priya in Agra is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r56b",
        author: "Visitor_56",
        rating: 5,
        date: "August 2026",
        city: "Agra",
        verified: true,
        comment: "Booked Priya in Agra. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4571,
    verifiedAt: "September 2026"
  },

  {
    id: "57",
    name: "Priya Varanasi",
    tagline: "Charming VIP companion in Varanasi for discerning gentlemen",
    location: "Escorts Varanasi",
    city: "Varanasi",
    district: "Varanasi",
    state: "Uttar Pradesh",
    localArea: "Cantonment",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_varanasi_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r57a",
        author: "Client_Varanasi",
        rating: 5,
        date: "September 2026",
        city: "Varanasi",
        verified: true,
        comment: "Priya in Varanasi is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r57b",
        author: "Visitor_57",
        rating: 5,
        date: "August 2026",
        city: "Varanasi",
        verified: true,
        comment: "Booked Priya in Varanasi. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4969,
    verifiedAt: "September 2026"
  },

  {
    id: "58",
    name: "Priya Kanpur",
    tagline: "Sophisticated independent companion in Kanpur with verified photos",
    location: "Escorts Kanpur",
    city: "Kanpur",
    district: "Kanpur Nagar",
    state: "Uttar Pradesh",
    localArea: "Civil Lines",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_kanpur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r58a",
        author: "Client_Kanpur",
        rating: 5,
        date: "September 2026",
        city: "Kanpur",
        verified: true,
        comment: "Priya in Kanpur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r58b",
        author: "Visitor_58",
        rating: 5,
        date: "August 2026",
        city: "Kanpur",
        verified: true,
        comment: "Booked Priya in Kanpur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4725,
    verifiedAt: "September 2026"
  },

  {
    id: "59",
    name: "Priya Gurugram (Gurgaon)",
    tagline: "Beautiful luxury escort in Gurugram (Gurgaon) - 100% real & independent",
    location: "Escorts Gurugram (Gurgaon)",
    city: "Gurugram (Gurgaon)",
    district: "Gurugram",
    state: "Haryana",
    localArea: "DLF Phase 1-5",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_gurugram_gurgaon_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r59a",
        author: "Client_Gurugram (Gurgaon)",
        rating: 5,
        date: "September 2026",
        city: "Gurugram (Gurgaon)",
        verified: true,
        comment: "Priya in Gurugram (Gurgaon) is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r59b",
        author: "Visitor_59",
        rating: 5,
        date: "August 2026",
        city: "Gurugram (Gurgaon)",
        verified: true,
        comment: "Booked Priya in Gurugram (Gurgaon). She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4815,
    verifiedAt: "September 2026"
  },

  {
    id: "60",
    name: "Priya Faridabad",
    tagline: "Sensual luxury independent companion in Faridabad with genuine elegance, warmth & discretion",
    location: "Escorts Faridabad",
    city: "Faridabad",
    district: "Faridabad",
    state: "Haryana",
    localArea: "Sector 15",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_faridabad_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r60a",
        author: "Client_Faridabad",
        rating: 5,
        date: "September 2026",
        city: "Faridabad",
        verified: true,
        comment: "Priya in Faridabad is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r60b",
        author: "Visitor_60",
        rating: 5,
        date: "August 2026",
        city: "Faridabad",
        verified: true,
        comment: "Booked Priya in Faridabad. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2268,
    verifiedAt: "September 2026"
  },

  {
    id: "61",
    name: "Priya Panchkula",
    tagline: "Elite independent escort in Panchkula offering genuine GFE & discretion",
    location: "Escorts Panchkula",
    city: "Panchkula",
    district: "Panchkula",
    state: "Haryana",
    localArea: "Sector 5",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_panchkula_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r61a",
        author: "Client_Panchkula",
        rating: 5,
        date: "September 2026",
        city: "Panchkula",
        verified: true,
        comment: "Priya in Panchkula is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r61b",
        author: "Visitor_61",
        rating: 5,
        date: "August 2026",
        city: "Panchkula",
        verified: true,
        comment: "Booked Priya in Panchkula. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4198,
    verifiedAt: "September 2026"
  },

  {
    id: "62",
    name: "Priya Mohali",
    tagline: "Charming VIP companion in Mohali for discerning gentlemen",
    location: "Escorts Mohali",
    city: "Mohali",
    district: "SAS Nagar (Mohali)",
    state: "Punjab",
    localArea: "Phase 3B2",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_mohali_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r62a",
        author: "Client_Mohali",
        rating: 5,
        date: "September 2026",
        city: "Mohali",
        verified: true,
        comment: "Priya in Mohali is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r62b",
        author: "Visitor_62",
        rating: 5,
        date: "August 2026",
        city: "Mohali",
        verified: true,
        comment: "Booked Priya in Mohali. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3659,
    verifiedAt: "September 2026"
  },

  {
    id: "63",
    name: "Priya Ludhiana",
    tagline: "Sophisticated independent companion in Ludhiana with verified photos",
    location: "Escorts Ludhiana",
    city: "Ludhiana",
    district: "Ludhiana",
    state: "Punjab",
    localArea: "Sarabha Nagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_ludhiana_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r63a",
        author: "Client_Ludhiana",
        rating: 5,
        date: "September 2026",
        city: "Ludhiana",
        verified: true,
        comment: "Priya in Ludhiana is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r63b",
        author: "Visitor_63",
        rating: 5,
        date: "August 2026",
        city: "Ludhiana",
        verified: true,
        comment: "Booked Priya in Ludhiana. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2747,
    verifiedAt: "September 2026"
  },

  {
    id: "64",
    name: "Priya Amritsar",
    tagline: "Beautiful luxury escort in Amritsar - 100% real & independent",
    location: "Escorts Amritsar",
    city: "Amritsar",
    district: "Amritsar",
    state: "Punjab",
    localArea: "Ranjit Avenue",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_amritsar_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r64a",
        author: "Client_Amritsar",
        rating: 5,
        date: "September 2026",
        city: "Amritsar",
        verified: true,
        comment: "Priya in Amritsar is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r64b",
        author: "Visitor_64",
        rating: 5,
        date: "August 2026",
        city: "Amritsar",
        verified: true,
        comment: "Booked Priya in Amritsar. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3623,
    verifiedAt: "September 2026"
  },

  {
    id: "65",
    name: "Priya Jalandhar",
    tagline: "Sensual luxury independent companion in Jalandhar with genuine elegance, warmth & discretion",
    location: "Escorts Jalandhar",
    city: "Jalandhar",
    district: "Jalandhar",
    state: "Punjab",
    localArea: "Model Town",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Punjabi"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_jalandhar_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r65a",
        author: "Client_Jalandhar",
        rating: 5,
        date: "September 2026",
        city: "Jalandhar",
        verified: true,
        comment: "Priya in Jalandhar is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r65b",
        author: "Visitor_65",
        rating: 5,
        date: "August 2026",
        city: "Jalandhar",
        verified: true,
        comment: "Booked Priya in Jalandhar. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3436,
    verifiedAt: "September 2026"
  },

  {
    id: "66",
    name: "Priya Chandigarh",
    tagline: "Elite independent escort in Chandigarh offering genuine GFE & discretion",
    location: "Escorts Chandigarh",
    city: "Chandigarh",
    district: "Chandigarh",
    state: "Chandigarh",
    localArea: "Sector 17",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_chandigarh_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r66a",
        author: "Client_Chandigarh",
        rating: 5,
        date: "September 2026",
        city: "Chandigarh",
        verified: true,
        comment: "Priya in Chandigarh is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r66b",
        author: "Visitor_66",
        rating: 5,
        date: "August 2026",
        city: "Chandigarh",
        verified: true,
        comment: "Booked Priya in Chandigarh. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2834,
    verifiedAt: "September 2026"
  },

  {
    id: "67",
    name: "Priya Kochi (Cochin)",
    tagline: "Charming VIP companion in Kochi (Cochin) for discerning gentlemen",
    location: "Escorts Kochi (Cochin)",
    city: "Kochi (Cochin)",
    district: "Ernakulam",
    state: "Kerala",
    localArea: "Kakkanad (Infopark)",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Malayalam"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_kochi_cochin_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r67a",
        author: "Client_Kochi (Cochin)",
        rating: 5,
        date: "September 2026",
        city: "Kochi (Cochin)",
        verified: true,
        comment: "Priya in Kochi (Cochin) is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r67b",
        author: "Visitor_67",
        rating: 5,
        date: "August 2026",
        city: "Kochi (Cochin)",
        verified: true,
        comment: "Booked Priya in Kochi (Cochin). She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2439,
    verifiedAt: "September 2026"
  },

  {
    id: "68",
    name: "Priya Trivandrum",
    tagline: "Sophisticated independent companion in Trivandrum with verified photos",
    location: "Escorts Trivandrum",
    city: "Trivandrum",
    district: "Thiruvananthapuram",
    state: "Kerala",
    localArea: "Kazhakkoottam (Technopark)",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Malayalam"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_trivandrum_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r68a",
        author: "Client_Trivandrum",
        rating: 5,
        date: "September 2026",
        city: "Trivandrum",
        verified: true,
        comment: "Priya in Trivandrum is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r68b",
        author: "Visitor_68",
        rating: 5,
        date: "August 2026",
        city: "Trivandrum",
        verified: true,
        comment: "Booked Priya in Trivandrum. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3106,
    verifiedAt: "September 2026"
  },

  {
    id: "69",
    name: "Priya Calicut",
    tagline: "Beautiful luxury escort in Calicut - 100% real & independent",
    location: "Escorts Calicut",
    city: "Calicut",
    district: "Kozhikode",
    state: "Kerala",
    localArea: "Mavoor Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Malayalam"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_calicut_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r69a",
        author: "Client_Calicut",
        rating: 5,
        date: "September 2026",
        city: "Calicut",
        verified: true,
        comment: "Priya in Calicut is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r69b",
        author: "Visitor_69",
        rating: 5,
        date: "August 2026",
        city: "Calicut",
        verified: true,
        comment: "Booked Priya in Calicut. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4681,
    verifiedAt: "September 2026"
  },

  {
    id: "70",
    name: "Priya Visakhapatnam (Vizag)",
    tagline: "Sensual luxury independent companion in Visakhapatnam (Vizag) with genuine elegance, warmth & discretion",
    location: "Escorts Visakhapatnam (Vizag)",
    city: "Visakhapatnam (Vizag)",
    district: "Visakhapatnam",
    state: "Andhra Pradesh",
    localArea: "Siripuram",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Telugu"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_visakhapatnam_vizag_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r70a",
        author: "Client_Visakhapatnam (Vizag)",
        rating: 5,
        date: "September 2026",
        city: "Visakhapatnam (Vizag)",
        verified: true,
        comment: "Priya in Visakhapatnam (Vizag) is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r70b",
        author: "Visitor_70",
        rating: 5,
        date: "August 2026",
        city: "Visakhapatnam (Vizag)",
        verified: true,
        comment: "Booked Priya in Visakhapatnam (Vizag). She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3029,
    verifiedAt: "September 2026"
  },

  {
    id: "71",
    name: "Priya Vijayawada",
    tagline: "Elite independent escort in Vijayawada offering genuine GFE & discretion",
    location: "Escorts Vijayawada",
    city: "Vijayawada",
    district: "NTR / Krishna",
    state: "Andhra Pradesh",
    localArea: "MG Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Telugu"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_vijayawada_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r71a",
        author: "Client_Vijayawada",
        rating: 5,
        date: "September 2026",
        city: "Vijayawada",
        verified: true,
        comment: "Priya in Vijayawada is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r71b",
        author: "Visitor_71",
        rating: 5,
        date: "August 2026",
        city: "Vijayawada",
        verified: true,
        comment: "Booked Priya in Vijayawada. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3269,
    verifiedAt: "September 2026"
  },

  {
    id: "72",
    name: "Priya Indore",
    tagline: "Charming VIP companion in Indore for discerning gentlemen",
    location: "Escorts Indore",
    city: "Indore",
    district: "Indore",
    state: "Madhya Pradesh",
    localArea: "Vijay Nagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_indore_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r72a",
        author: "Client_Indore",
        rating: 5,
        date: "September 2026",
        city: "Indore",
        verified: true,
        comment: "Priya in Indore is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r72b",
        author: "Visitor_72",
        rating: 5,
        date: "August 2026",
        city: "Indore",
        verified: true,
        comment: "Booked Priya in Indore. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3585,
    verifiedAt: "September 2026"
  },

  {
    id: "73",
    name: "Priya Bhopal",
    tagline: "Sophisticated independent companion in Bhopal with verified photos",
    location: "Escorts Bhopal",
    city: "Bhopal",
    district: "Bhopal",
    state: "Madhya Pradesh",
    localArea: "Arera Colony",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_bhopal_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r73a",
        author: "Client_Bhopal",
        rating: 5,
        date: "September 2026",
        city: "Bhopal",
        verified: true,
        comment: "Priya in Bhopal is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r73b",
        author: "Visitor_73",
        rating: 5,
        date: "August 2026",
        city: "Bhopal",
        verified: true,
        comment: "Booked Priya in Bhopal. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2319,
    verifiedAt: "September 2026"
  },

  {
    id: "74",
    name: "Priya Patna",
    tagline: "Beautiful luxury escort in Patna - 100% real & independent",
    location: "Escorts Patna",
    city: "Patna",
    district: "Patna",
    state: "Bihar",
    localArea: "Boring Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_patna_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r74a",
        author: "Client_Patna",
        rating: 5,
        date: "September 2026",
        city: "Patna",
        verified: true,
        comment: "Priya in Patna is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r74b",
        author: "Visitor_74",
        rating: 5,
        date: "August 2026",
        city: "Patna",
        verified: true,
        comment: "Booked Priya in Patna. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2221,
    verifiedAt: "September 2026"
  },

  {
    id: "75",
    name: "Priya Ranchi",
    tagline: "Sensual luxury independent companion in Ranchi with genuine elegance, warmth & discretion",
    location: "Escorts Ranchi",
    city: "Ranchi",
    district: "Ranchi",
    state: "Jharkhand",
    localArea: "Main Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_ranchi_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r75a",
        author: "Client_Ranchi",
        rating: 5,
        date: "September 2026",
        city: "Ranchi",
        verified: true,
        comment: "Priya in Ranchi is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r75b",
        author: "Visitor_75",
        rating: 5,
        date: "August 2026",
        city: "Ranchi",
        verified: true,
        comment: "Booked Priya in Ranchi. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3463,
    verifiedAt: "September 2026"
  },

  {
    id: "76",
    name: "Priya Jamshedpur",
    tagline: "Elite independent escort in Jamshedpur offering genuine GFE & discretion",
    location: "Escorts Jamshedpur",
    city: "Jamshedpur",
    district: "East Singhbhum",
    state: "Jharkhand",
    localArea: "Bistupur",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_jamshedpur_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r76a",
        author: "Client_Jamshedpur",
        rating: 5,
        date: "September 2026",
        city: "Jamshedpur",
        verified: true,
        comment: "Priya in Jamshedpur is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r76b",
        author: "Visitor_76",
        rating: 5,
        date: "August 2026",
        city: "Jamshedpur",
        verified: true,
        comment: "Booked Priya in Jamshedpur. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3794,
    verifiedAt: "September 2026"
  },

  {
    id: "77",
    name: "Priya Guwahati",
    tagline: "Charming VIP companion in Guwahati for discerning gentlemen",
    location: "Escorts Guwahati",
    city: "Guwahati",
    district: "Kamrup Metropolitan",
    state: "Assam",
    localArea: "GS Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Assamese"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_guwahati_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r77a",
        author: "Client_Guwahati",
        rating: 5,
        date: "September 2026",
        city: "Guwahati",
        verified: true,
        comment: "Priya in Guwahati is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r77b",
        author: "Visitor_77",
        rating: 5,
        date: "August 2026",
        city: "Guwahati",
        verified: true,
        comment: "Booked Priya in Guwahati. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4319,
    verifiedAt: "September 2026"
  },

  {
    id: "78",
    name: "Priya Dehradun",
    tagline: "Sophisticated independent companion in Dehradun with verified photos",
    location: "Escorts Dehradun",
    city: "Dehradun",
    district: "Dehradun",
    state: "Uttarakhand",
    localArea: "Rajpur Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_dehradun_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r78a",
        author: "Client_Dehradun",
        rating: 5,
        date: "September 2026",
        city: "Dehradun",
        verified: true,
        comment: "Priya in Dehradun is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r78b",
        author: "Visitor_78",
        rating: 5,
        date: "August 2026",
        city: "Dehradun",
        verified: true,
        comment: "Booked Priya in Dehradun. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2173,
    verifiedAt: "September 2026"
  },

  {
    id: "79",
    name: "Priya Rishikesh",
    tagline: "Beautiful luxury escort in Rishikesh - 100% real & independent",
    location: "Escorts Rishikesh",
    city: "Rishikesh",
    district: "Dehradun",
    state: "Uttarakhand",
    localArea: "Tapovan",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "167 cm / 5'6\\\"",
    weight: "51 kg / 112 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_rishikesh_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r79a",
        author: "Client_Rishikesh",
        rating: 5,
        date: "September 2026",
        city: "Rishikesh",
        verified: true,
        comment: "Priya in Rishikesh is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r79b",
        author: "Visitor_79",
        rating: 5,
        date: "August 2026",
        city: "Rishikesh",
        verified: true,
        comment: "Booked Priya in Rishikesh. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4518,
    verifiedAt: "September 2026"
  },

  {
    id: "80",
    name: "Priya Shimla",
    tagline: "Sensual luxury independent companion in Shimla with genuine elegance, warmth & discretion",
    location: "Escorts Shimla",
    city: "Shimla",
    district: "Shimla",
    state: "Himachal Pradesh",
    localArea: "Mall Road",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 23,
    height: "168 cm / 5'6\\\"",
    weight: "52 kg / 115 lbs",
    bust: "34C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_shimla_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r80a",
        author: "Client_Shimla",
        rating: 5,
        date: "September 2026",
        city: "Shimla",
        verified: true,
        comment: "Priya in Shimla is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r80b",
        author: "Visitor_80",
        rating: 5,
        date: "August 2026",
        city: "Shimla",
        verified: true,
        comment: "Booked Priya in Shimla. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3352,
    verifiedAt: "September 2026"
  },

  {
    id: "81",
    name: "Priya Manali",
    tagline: "Elite independent escort in Manali offering genuine GFE & discretion",
    location: "Escorts Manali",
    city: "Manali",
    district: "Kullu",
    state: "Himachal Pradesh",
    localArea: "Old Manali",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 24,
    height: "165 cm / 5'5\\\"",
    weight: "50 kg / 110 lbs",
    bust: "34B / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_manali_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r81a",
        author: "Client_Manali",
        rating: 5,
        date: "September 2026",
        city: "Manali",
        verified: true,
        comment: "Priya in Manali is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r81b",
        author: "Visitor_81",
        rating: 5,
        date: "August 2026",
        city: "Manali",
        verified: true,
        comment: "Booked Priya in Manali. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 3979,
    verifiedAt: "September 2026"
  },

  {
    id: "82",
    name: "Priya Srinagar",
    tagline: "Charming VIP companion in Srinagar for discerning gentlemen",
    location: "Escorts Srinagar",
    city: "Srinagar",
    district: "Srinagar",
    state: "Jammu and Kashmir",
    localArea: "Rajbagh",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 22,
    height: "170 cm / 5'7\\\"",
    weight: "54 kg / 119 lbs",
    bust: "34D / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_srinagar_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r82a",
        author: "Client_Srinagar",
        rating: 5,
        date: "September 2026",
        city: "Srinagar",
        verified: true,
        comment: "Priya in Srinagar is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r82b",
        author: "Visitor_82",
        rating: 5,
        date: "August 2026",
        city: "Srinagar",
        verified: true,
        comment: "Booked Priya in Srinagar. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 4959,
    verifiedAt: "September 2026"
  },

  {
    id: "83",
    name: "Priya Jammu",
    tagline: "Sophisticated independent companion in Jammu with verified photos",
    location: "Escorts Jammu",
    city: "Jammu",
    district: "Jammu",
    state: "Jammu and Kashmir",
    localArea: "Gandhi Nagar",
    country: "India",
    gender: "female",
    category: "girls",
    topBadge: "top",
    status: "Independent",
    badges: [
      "Independent",
      "Verified",
      "VIP",
      "Video"
    ],
    photoUrl: "/profiles/priya-1.jpg",
    gallery: [
      "/profiles/priya-1.jpg",
      "/profiles/priya-2.jpg",
      "/profiles/priya-3.jpg",
      "/profiles/priya-4.jpg",
      "/profiles/priya-5.jpg",
      "/profiles/priya-6.jpg"
    ],
    age: 25,
    height: "163 cm / 5'4\\\"",
    weight: "49 kg / 108 lbs",
    bust: "32C / Natural",
    hair: "Long Black, Silky",
    eyes: "Deep Brown",
    ethnicity: "Indian",
    languages: [
      "English",
      "Hindi",
      "Local Language"
    ],
    workingHours: "11:00 AM – 02:00 AM",
    phone: "+91 62035 40719",
    whatsapp: "+916203540719",
    telegram: "@priya_jammu_vip",
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
    travel: [
      "City Wide",
      "State Wide",
      "All India"
    ],
    availableFor: [
      "Incall",
      "Outcall"
    ],
    meetingWith: [
      "Man",
      "Couple"
    ],
    rates: [
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" }
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
        id: "r83a",
        author: "Client_Jammu",
        rating: 5,
        date: "September 2026",
        city: "Jammu",
        verified: true,
        comment: "Priya in Jammu is absolutely stunning. Genuine photos, great conversation, and amazing experience. Highly recommended!"
      },
      {
        id: "r83b",
        author: "Visitor_83",
        rating: 5,
        date: "August 2026",
        city: "Jammu",
        verified: true,
        comment: "Booked Priya in Jammu. She exceeded all expectations. Professional, beautiful, and truly independent. Will book again."
      }
    ],
    views: 2233,
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
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" },
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
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" },
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
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" },
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
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" },
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
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" },
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
      { duration: "1 Hour", incall: "₹1,500", outcall: "₹1,500" },
      { duration: "2 Hours", incall: "₹2,000", outcall: "₹2,000" },
      { duration: "Full Night", incall: "₹5,000", outcall: "₹5,000" },
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
