const NONE = {
    eligible: false,
    showContact: false,
    showCall: false,
    showWhatsApp: false,
    gated: false,
};
function staffRole(role) {
    return role === "ADMIN" || role === "SUPER_ADMIN";
}
/**
 * Single source of truth for contact-visibility rules.
 * Used by directory cards and profile detail pages alike.
 */
export function getContactVisibility(profile, requester) {
    if (!profile)
        return NONE;
    const isOwner = Boolean(requester && profile.userId && requester.id === profile.userId);
    const isStaff = staffRole(requester?.role);
    // Unpublished / unapproved / suspended profiles expose no contact actions.
    if (profile.isSuspended)
        return NONE;
    if (profile.status != null && profile.status !== "APPROVED")
        return NONE;
    if (profile.visibility != null && profile.visibility !== "PUBLIC")
        return NONE;
    // Owner and staff may always see their own numbers, even when hidden publicly.
    const mayReveal = isOwner || isStaff || !profile.hidePhoneFromPublic;
    const phone = mayReveal ? normalizePhone(profile.phone) : undefined;
    const whatsapp = mayReveal ? normalizePhone(profile.whatsapp) : undefined;
    const gated = Boolean(profile.hidePhoneFromPublic) && !mayReveal;
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
export function normalizePhone(value) {
    if (!value)
        return undefined;
    const trimmed = value.trim();
    if (!trimmed)
        return undefined;
    const hasPlus = trimmed.startsWith("+");
    const digits = trimmed.replace(/\D/g, "");
    if (!digits)
        return undefined;
    return hasPlus ? `+${digits}` : digits;
}
export function telHref(phone) {
    return `tel:${phone.replace(/\D/g, "")}`;
}
export function whatsappHref(whatsapp) {
    return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}
