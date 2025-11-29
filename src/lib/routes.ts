/**
 * Route Definitions
 * Centralized route paths
 */

export const routes = {
    // Public
    home: '/',

    // Auth
    auth: {
        start: '/auth/start',
        phone: '/auth/phone',
        otp: '/auth/otp',
        profile: '/auth/profile',
        terms: '/auth/terms',
        security: '/auth/security-choice',
    },

    // Trip
    trip: '/trip',

    // Account
    account: {
        root: '/account',
        personalInfo: '/account/personal-info',
        security: '/account/security',
        privacy: '/account/privacy-data',
    },

    // Courier
    courier: {
        root: '/courier',
        create: '/courier/create',
    },

    // Legacy routes (for backward compatibility)
    login: '/login',
    register: '/register',
    rider: '/rider',
    driver: '/driver',
    track: (id: string) => `/track/${id}`,
} as const;

export type Routes = typeof routes;
