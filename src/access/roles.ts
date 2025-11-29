/**
 * Access Control - Roles
 * User role definitions
 */

export const ROLES = {
    RIDER: 'rider',
    DRIVER: 'driver',
    COURIER: 'courier',
    ADMIN: 'admin',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const roleHierarchy: Record<Role, number> = {
    [ROLES.RIDER]: 1,
    [ROLES.DRIVER]: 2,
    [ROLES.COURIER]: 2,
    [ROLES.ADMIN]: 10,
};

export function hasRole(userRole: Role, requiredRole: Role): boolean {
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
