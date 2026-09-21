import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const Role = {
  VISITOR: "VISITOR",
  REGISTERED_USER: "REGISTERED_USER",
  MODERATOR: "MODERATOR",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type RoleType = typeof Role[keyof typeof Role];

// Role hierarchy levels
export const ROLE_HIERARCHY: Record<string, number> = {
  [Role.VISITOR]: 0,
  [Role.REGISTERED_USER]: 1,
  [Role.MODERATOR]: 2,
  [Role.ADMIN]: 3,
  [Role.SUPER_ADMIN]: 4,
};

export function hasRoleLevel(userRole: string | undefined | null, requiredRole: RoleType): boolean {
  if (!userRole) return false;
  const userLevel = ROLE_HIERARCHY[userRole] ?? 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0;
  return userLevel >= requiredLevel;
}

export function isStaffOrAdmin(userRole: string | undefined | null): boolean {
  return hasRoleLevel(userRole, Role.MODERATOR);
}

export function isAdminOrSuper(userRole: string | undefined | null): boolean {
  return hasRoleLevel(userRole, Role.ADMIN);
}

export interface AuthSessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: RoleType;
}

/**
 * Server-side route helper to require authentication
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    return { session: null, errorResponse: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const userRole = ((session.user as any).role as RoleType) || Role.REGISTERED_USER;
  return {
    session: {
      ...session,
      user: {
        ...session.user,
        role: userRole,
      } as AuthSessionUser,
    },
    errorResponse: null,
  };
}

/**
 * Server-side route helper to require specific minimum role
 */
export async function requireMinRole(minRole: RoleType) {
  const { session, errorResponse } = await requireAuth();
  if (errorResponse || !session) {
    return { session: null, errorResponse };
  }

  if (!hasRoleLevel(session.user.role, minRole)) {
    return {
      session: null,
      errorResponse: NextResponse.json({ error: "Forbidden: Insufficient privileges" }, { status: 403 }),
    };
  }

  return { session, errorResponse: null };
}

/**
 * Verify resource ownership or staff override
 */
export function canManageResource(sessionUser: AuthSessionUser, resourceOwnerId: string): boolean {
  if (sessionUser.id === resourceOwnerId) return true;
  return isStaffOrAdmin(sessionUser.role);
}
