import type { AuthSessionUser } from "./rbac";

/**
 * Fields required to decide whether contact actions may be rendered.
 * Field names mirror the Prisma `Profile` model / `migration.sql`:
 *   Profile.status, Profile.visibility, Profile.hidePhoneFromPublic,
 *   Profile.phone, Profile.whatsapp, Profile.userId, User.isSuspended
 *
 * NOTE: This helper is client-safe (type-only rbac import). The server
 * (`lib/security.ts` -> sanitizeProfileDTO) is the authority and strips
 * phone/whatsapp from the response when they must not be exposed.
 */
export interface ContactVisibilityInput {
  status?: string | null;
  visibility?: string | null;
  isSuspended?: boolean | null;
  hidePhoneFromPublic?: boolean | null;
  isPhoneHidden?: boolean | null;
  phone?: string | null;
  whatsapp?: string | null;
  userId?: string | null;
}

export interface ContactVisibility {
  /** Profile is publicly eligible at all (published + approved + not suspended). */
  eligible: boolean;
  /** Generic "Contact" action is always shown for eligible public cards. */
  showContact: boolean;
  showCall: boolean;
  showWhatsApp: boolean;
  phone?: string;
  whatsapp?: string;
  /** Contact details exist but are withheld by the profile owner. */
  gated: boolean;
}

const NONE: ContactVisibility = {
  eligible: false,
  showContact: false,
  showCall: false,
  showWhatsApp: false,
  gated: false,
};

function staffRole(role?: string | null): boolean {
  return role === "ADMIN" || role === "SUPER_ADMIN" || role === "MODERATOR";
}

/**
 * Single source of truth for contact-visibility rules.
 * Used by directory cards and profile detail pages alike.
 */
export function getContactVisibility(
  profile: ContactVisibilityInput | null | undefined,
  requester?: AuthSessionUser | null
): ContactVisibility {
  if (!profile) return NONE;

  const isOwner = Boolean(requester && profile.userId && requester.id === profile.userId);
  const isStaff = staffRole(requester?.role);

  // Unpublished / unapproved / suspended profiles expose no contact actions.
  if (profile.isSuspended) return NONE;
  if (profile.status != null && profile.status !== "APPROVED") return NONE;
  if (profile.visibility != null && profile.visibility !== "PUBLIC") return NONE;

  // Owner and staff may always see their own numbers, even when hidden publicly.
  const isPrivacyHidden = Boolean(profile.hidePhoneFromPublic) || Boolean(profile.isPhoneHidden);
  const mayReveal = isOwner || isStaff || !isPrivacyHidden;

  const phone = mayReveal ? normalizePhone(profile.phone) : undefined;
  const whatsapp = mayReveal ? normalizePhone(profile.whatsapp) : undefined;
  const gated = isPrivacyHidden && !mayReveal;

  return {
    eligible: true,
    showContact: true,
    showCall: Boolean(phone),
    showWhatsApp: Boolean(whatsapp),
    phone,
    whatsapp,
    gated,
  };
}

/** Keep a leading `+`, drop spaces/dashes/parens. */
export function normalizePhone(value?: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return undefined;
  return hasPlus ? `+${digits}` : digits;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function whatsappHref(whatsapp: string): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}
