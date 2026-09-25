import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address")
    .max(150, "Email cannot exceed 150 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export const photoItemSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1),
  sha256Hash: z.string().optional().nullable(),
  order: z.number().int().min(0).default(0),
  isPrimary: z.boolean().default(false),
});

export const profileRateSchema = z.object({
  id: z.string().optional(),
  duration: z.string().min(1),
  incall: z.union([z.string(), z.number()]).optional().transform(v => typeof v === 'string' ? parseInt(v.replace(/\D/g, '')) || 0 : v || 0),
  outcall: z.union([z.string(), z.number()]).optional().transform(v => typeof v === 'string' ? parseInt(v.replace(/\D/g, '')) || 0 : v || 0),
  order: z.number().int().min(0).default(0),
});

export const profileSchema = z.object({
  bio: z.string().max(1000, "Bio must be at most 1000 characters").optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  region: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  localArea: z.string().max(100).optional(),
  country: z.string().max(100).default("India"),
  favColor: z.string().max(20).optional(),
  phone: z.string().max(30).optional(),
  whatsapp: z.string().max(30).optional(),
  photoUrl: z.string().max(500).optional().nullable(),
  photos: z.array(photoItemSchema).optional().default([]),
  rates: z.array(profileRateSchema).optional().default([]),
  visibility: z.enum(["PUBLIC", "REGISTERED_USERS_ONLY", "PRIVATE", "UNPUBLISHED"]).default("PUBLIC"),
  hidePhoneFromPublic: z.boolean().default(false),
  ageConfirmed: z.boolean().default(false),
  consentRecorded: z.boolean().default(false),
});

export const reportCategories = [
  "FAKE_PROFILE",
  "STOLEN_PHOTOS",
  "IMPERSONATION",
  "UNDERAGE_CONCERN",
  "HARASSMENT",
  "SPAM",
  "FRAUD",
  "NON_CONSENSUAL_CONTENT",
  "WRONG_INFORMATION",
  "OTHER",
] as const;

export const reportSchema = z.object({
  profileId: z.string().min(1, "Profile ID is required"),
  category: z.enum(reportCategories, {
    message: "Invalid report category",
  }),
  description: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing the issue")
    .max(2000, "Description cannot exceed 2000 characters"),
});

export const moderationActionSchema = z.object({
  targetType: z.enum(["PROFILE", "USER", "PHOTO", "REPORT"]),
  targetId: z.string().min(1, "Target ID is required"),
  action: z.enum(["APPROVE", "REJECT", "REQUEST_CHANGES", "SUSPEND", "UNPUBLISH", "RESTORE"]),
  reason: z.string().max(1000).optional(),
});

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "You must enter the name")
    .max(100, "Name is too long (maximum 100 characters)"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter a valid email address")
    .email("Please enter a valid email address")
    .max(150, "Email is too long (maximum 150 characters)"),
  message: z
    .string()
    .trim()
    .min(1, "Please enter your message")
    .max(5000, "Message is too long (maximum 5000 characters)"),
  recaptchaToken: z
    .string()
    .min(1, "Please complete the reCAPTCHA verification"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ReportInput = z.infer<typeof reportSchema>;
export type ModerationActionInput = z.infer<typeof moderationActionSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

