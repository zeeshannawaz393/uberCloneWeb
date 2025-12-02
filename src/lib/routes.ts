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

    // Driver
    driver: {
        root: '/driver',
        onboarding: {
            resume: '/driver/onboarding/resume',
            city: '/driver/onboarding/city',
            personal: '/driver/onboarding/personal',
            licence: '/driver/onboarding/licence',
            identity: '/driver/onboarding/identity',
            vehicle: '/driver/onboarding/vehicle',
            payout: '/driver/onboarding/payout',
            review: '/driver/onboarding/review',
        },
    },

    // Legacy routes (for backward compatibility)
    login: '/login',
    register: '/register',
    rider: '/rider',
    track: (id: string) => `/track/${id}`,
} as const;

export type Routes = typeof routes;
