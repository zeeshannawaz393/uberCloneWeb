/**
 * Access Control - Permissions
 * Permission definitions and mappings
 */

import { Role, ROLES } from './roles';

export const PERMISSIONS = {
    // Trip permissions
    BOOK_TRIP: 'book_trip',
    VIEW_TRIP_HISTORY: 'view_trip_history',
    CANCEL_TRIP: 'cancel_trip',

    // Driver permissions
    ACCEPT_RIDE: 'accept_ride',
    VIEW_EARNINGS: 'view_earnings',
    UPDATE_LOCATION: 'update_location',

    // Courier permissions
    CREATE_DELIVERY: 'create_delivery',
    UPDATE_DELIVERY: 'update_delivery',
    VIEW_DELIVERIES: 'view_deliveries',

    // Account permissions
    VIEW_PROFILE: 'view_profile',
    UPDATE_PROFILE: 'update_profile',
    MANAGE_SECURITY: 'manage_security',
    MANAGE_PRIVACY: 'manage_privacy',

    // Admin permissions
    MANAGE_USERS: 'manage_users',
    VIEW_ANALYTICS: 'view_analytics',
} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const rolePermissions: Record<Role, Permission[]> = {
    [ROLES.RIDER]: [
        PERMISSIONS.BOOK_TRIP,
        PERMISSIONS.VIEW_TRIP_HISTORY,
        PERMISSIONS.CANCEL_TRIP,
        PERMISSIONS.VIEW_PROFILE,
        PERMISSIONS.UPDATE_PROFILE,
        PERMISSIONS.MANAGE_SECURITY,
        PERMISSIONS.MANAGE_PRIVACY,
    ],
    [ROLES.DRIVER]: [
        PERMISSIONS.ACCEPT_RIDE,
        PERMISSIONS.VIEW_EARNINGS,
        PERMISSIONS.UPDATE_LOCATION,
        PERMISSIONS.VIEW_PROFILE,
        PERMISSIONS.UPDATE_PROFILE,
        PERMISSIONS.MANAGE_SECURITY,
    ],
    [ROLES.COURIER]: [
        PERMISSIONS.CREATE_DELIVERY,
        PERMISSIONS.UPDATE_DELIVERY,
        PERMISSIONS.VIEW_DELIVERIES,
        PERMISSIONS.VIEW_PROFILE,
        PERMISSIONS.UPDATE_PROFILE,
        PERMISSIONS.MANAGE_SECURITY,
    ],
    [ROLES.ADMIN]: Object.values(PERMISSIONS),
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
    return rolePermissions[userRole]?.includes(permission) ?? false;
}
