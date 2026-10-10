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

/**
 * Desk number used when a profile has not published its own number yet, so that
 * every listed profile still exposes a working Call / WhatsApp button.
 */
export const DEFAULT_CONTACT_NUMBER = "+916203540719";

/** India dialling code — this directory is India-only. */
const DEFAULT_COUNTRY_CODE = "91";

/**
 * Digits-only international form for `tel:` / `wa.me` links. Numbers stored
 * without a country code are normalised with the Indian dialling code, and a
 * domestic trunk prefix (`098765 43210`) is dropped rather than kept — keeping
 * it produces dead links like `wa.me/09876543210`.
 */
function toInternationalDigits(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `${DEFAULT_COUNTRY_CODE}${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) {
    return `${DEFAULT_COUNTRY_CODE}${digits.slice(1)}`;
  }
  return digits;
}

/** Message pre-filled in the WhatsApp chat. */
export function whatsappPrefill(profileName?: string | null): string {
  const name = (profileName ?? "").trim();
  return name
    ? `I've seen you on ❕Lovebite.live❕ ---------> 6203540719. I'd like to get in touch... (${name})`
    : "I've seen you on ❕Lovebite.live❕ ---------> 6203540719. I'd like to get in touch...";
}

/** `https://wa.me/<digits>?text=<encoded prefill>` */
export function whatsappUrl(whatsapp: string, profileName?: string | null): string {
  return `${whatsappHref(whatsapp)}?text=${encodeURIComponent(whatsappPrefill(profileName))}`;
}

/** Human-readable rendering, e.g. `+91 62035 40719`. */
export function formatPhone(value?: string | null): string {
  let digits = (value ?? "").replace(/\D/g, "");
  if (!digits) return "";
  // A leading `0` is a trunk prefix, not a country code.
  if (digits.length > 10 && digits.startsWith("0")) digits = digits.replace(/^0+/, "");
  if (digits.length <= 10) return digits;
  const local = digits.slice(-10);
  return `+${digits.slice(0, digits.length - 10)} ${local.slice(0, 5)} ${local.slice(5)}`;
}

export interface ContactLinksInput {
  phone?: string | null;
  whatsapp?: string | null;
  profileName?: string | null;
  /** Owner withheld the numbers — render a sign-in prompt instead of links. */
  gated?: boolean;
}

export interface ContactLinks {
  /** Normalized profile phone, when the owner published one. */
  phone?: string;
  /** Normalized WhatsApp number, falling back to the phone, then to the desk number. */
  whatsapp: string;
  callHref: string;
  whatsappHref: string;
  /** Pretty number to show once revealed; falls back to the desk number. */
  displayPhone: string;
  /** True when the number shown is the desk number rather than the profile's own. */
  usingFallback: boolean;
  gated: boolean;
}

/**
 * Builds every Call / WhatsApp link for a profile in one place so directory
 * cards and profile detail pages can never drift apart.
 */
export function buildContactLinks({
  phone,
  whatsapp,
  profileName,
  gated,
}: ContactLinksInput = {}): ContactLinks {
  if (gated) {
    return {
      whatsapp: "",
      callHref: "#",
      whatsappHref: "#",
      displayPhone: "",
      usingFallback: false,
      gated: true,
    };
  }

  const ownPhone = normalizePhone(phone);
  const ownWhatsApp = normalizePhone(whatsapp) ?? ownPhone;
  const fallback = normalizePhone(DEFAULT_CONTACT_NUMBER) as string;

  const callNumber = ownPhone ?? fallback;
  const waNumber = ownWhatsApp ?? callNumber;

  return {
    phone: ownPhone,
    whatsapp: waNumber,
    callHref: telHref(toInternationalDigits(callNumber)),
    whatsappHref: whatsappUrl(toInternationalDigits(waNumber), profileName),
    displayPhone: formatPhone(ownPhone ?? fallback),
    usingFallback: !ownPhone,
    gated: false,
  };
}
