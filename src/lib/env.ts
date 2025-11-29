/**
 * Environment Variables
 * Type-safe environment variable access
 */

export const env = {
    // API
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',

    // Mapbox
    mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',

    // App
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'RideShare Platform',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

    // Environment
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
} as const;
