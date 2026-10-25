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

export const MIN_PLAUSIBLE_RATE = 1000;

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