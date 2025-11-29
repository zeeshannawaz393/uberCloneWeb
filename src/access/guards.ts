/**
 * Access Control - Guards
 * Route guards and permission checks
 */

import { Role } from './roles';
import { Permission, hasPermission } from './permissions';

export interface GuardContext {
    userRole: Role | null;
    isAuthenticated: boolean;
}

export function requireAuth(context: GuardContext): boolean {
    return context.isAuthenticated;
}

export function requireRole(context: GuardContext, requiredRole: Role): boolean {
    return context.isAuthenticated && context.userRole === requiredRole;
}

export function requirePermission(context: GuardContext, permission: Permission): boolean {
    if (!context.isAuthenticated || !context.userRole) {
        return false;
    }
    return hasPermission(context.userRole, permission);
}

export function requireAnyRole(context: GuardContext, roles: Role[]): boolean {
    return context.isAuthenticated && context.userRole !== null && roles.includes(context.userRole);
}
