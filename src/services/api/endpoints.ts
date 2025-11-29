/**
 * API Endpoints
 * Centralized API endpoint definitions
 */

export const endpoints = {
    // Auth
    auth: {
        sendOTP: '/auth/send-otp',
        verifyOTP: '/auth/verify-otp',
        register: '/auth/register',
        login: '/auth/login',
        logout: '/auth/logout',
        refreshToken: '/auth/refresh',
    },

    // User
    user: {
        profile: '/user/profile',
        updateProfile: '/user/profile',
        security: '/user/security',
        privacy: '/user/privacy',
    },

    // Trip
    trip: {
        search: '/trip/search',
        estimate: '/trip/estimate',
        create: '/trip/create',
        cancel: '/trip/cancel',
        history: '/trip/history',
    },

    // Ride
    ride: {
        options: '/ride/options',
        pricing: '/ride/pricing',
        book: '/ride/book',
        status: '/ride/status',
    },

    // Payment
    payment: {
        methods: '/payment/methods',
        add: '/payment/add',
        remove: '/payment/remove',
        process: '/payment/process',
    },

    // Courier
    courier: {
        create: '/courier/create',
        list: '/courier/list',
        track: '/courier/track',
        update: '/courier/update',
    },
} as const;
