/**
 * Access Control - Types
 */

export interface AccessContext {
    userId: string | null;
    role: string | null;
    permissions: string[];
    isAuthenticated: boolean;
}

export interface RouteGuard {
    requiresAuth: boolean;
    allowedRoles?: string[];
    requiredPermissions?: string[];
}
