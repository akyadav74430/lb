import { isStaffOrAdmin, AuthSessionUser } from "./rbac";

/**
 * Sanitize user object for client response — never leak password hashes or internal sensitive data
 */
export function sanitizeUserDTO(user: Record<string, unknown> | null | undefined) {
  if (!user) return null;
  const safeUser = { ...user };
  delete safeUser.passwordHash;
  return safeUser;
}

/**
 * Sanitize profile according to privacy settings and requester privileges
 */
export function sanitizeProfileDTO(
  profile: Record<string, unknown> | null | undefined,
  requester?: AuthSessionUser | null
) {
  if (!profile) return null;

  const isOwner = requester && requester.id === profile.userId;
  const isStaff = requester && isStaffOrAdmin(requester.role);

  // If profile is not approved, only owner or staff can see it
  if (profile.status !== "APPROVED" && !isOwner && !isStaff) {
    return null;
  }

  // If profile visibility is REGISTERED_USERS_ONLY and requester is not logged in
  if (profile.visibility === "REGISTERED_USERS_ONLY" && !requester) {
    const userObj = profile.user as { name?: string } | undefined;
    return {
      id: profile.id,
      name: userObj?.name || "Member Profile",
      city: profile.city,
      region: profile.region,
      visibility: profile.visibility,
      isRestricted: true,
      restrictedMessage: "This profile is visible to registered lovebite.live members only. Please sign in to view full details.",
    };
  }

  // If profile is PRIVATE or UNPUBLISHED and requester is not owner/staff
  if ((profile.visibility === "PRIVATE" || profile.visibility === "UNPUBLISHED") && !isOwner && !isStaff) {
    return null;
  }

  const safe: Record<string, unknown> = {
    ...profile,
    // Mask exact street address for privacy (India-only State -> District -> City navigation)
    address: isOwner || isStaff ? profile.address : undefined,
  };

  // Mask phone number if owner enabled hidePhoneFromPublic and visitor is unauthenticated
  if (profile.hidePhoneFromPublic && !requester && !isStaff) {
    safe.phone = undefined;
    safe.whatsapp = undefined;
    safe.isPhoneHidden = true;
  }

  // Filter unapproved photos for public viewers
  if (profile.photos && Array.isArray(profile.photos)) {
    if (!isOwner && !isStaff) {
      safe.photos = (profile.photos as { status?: string }[]).filter((p) => p.status === "APPROVED");
    }
  }

  // Do not expose internal moderation notes to regular public
  if (!isStaff && !isOwner) {
    delete safe.moderationNotes;
    delete safe.rejectionReason;
  }

  return safe;
}

/**
 * Extract IP address from Next.js request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}
