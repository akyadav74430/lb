import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
export const Role = {
    ADMIN: "ADMIN",
    SUPER_ADMIN: "SUPER_ADMIN",
};
// Role hierarchy levels
export const ROLE_HIERARCHY = {
    [Role.ADMIN]: 1,
    [Role.SUPER_ADMIN]: 2,
};
export function hasRoleLevel(userRole, requiredRole) {
    if (!userRole)
        return false;
    const userLevel = ROLE_HIERARCHY[userRole] ?? 0;
    const requiredLevel = ROLE_HIERARCHY[requiredRole] ?? 0;
    return userLevel >= requiredLevel;
}
export function isStaffOrAdmin(userRole) {
    return hasRoleLevel(userRole, Role.ADMIN);
}
export function isAdminOrSuper(userRole) {
    return hasRoleLevel(userRole, Role.ADMIN);
}
/**
 * Server-side route helper to require authentication
 */
export async function requireAuth() {
    const session = await auth();
    if (!session?.user?.id) {
        return { session: null, errorResponse: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
    }
    const userRole = session.user.role || Role.ADMIN;
    return {
        session: {
            ...session,
            user: {
                ...session.user,
                role: userRole,
            },
        },
        errorResponse: null,
    };
}
/**
 * Server-side route helper to require specific minimum role
 */
export async function requireMinRole(minRole) {
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
export function canManageResource(sessionUser, resourceOwnerId) {
    if (sessionUser.id === resourceOwnerId)
        return true;
    return isStaffOrAdmin(sessionUser.role);
}
