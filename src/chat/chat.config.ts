/**
 * Chat Configuration
 * Environment-driven configuration for chat feature
 */

export const chatConfig = {
    // Feature flags
    enabled: process.env.NEXT_PUBLIC_CHAT_ENABLED !== 'false',
    analyticsEnabled: process.env.NEXT_PUBLIC_CHAT_ANALYTICS_ENABLED !== 'false',

    // WebSocket configuration
    socketUrl: process.env.NEXT_PUBLIC_CHAT_SOCKET_URL || 'http://localhost:3001',

    // Connection settings
    reconnection: {
        enabled: true,
        delay: 1000,
        delayMax: 5000,
        attempts: 5,
    },

    // Heartbeat/ping settings
    heartbeat: {
        interval: 30000, // 30 seconds
        timeout: 5000,   // 5 seconds
    },

    // Message settings
    message: {
        maxLength: 1000,
        minLength: 1,
    },

    // UI settings
    ui: {
        typingIndicatorDelay: 300, // ms
        messageAnimationDuration: 200, // ms
        autoScrollDelay: 100, // ms
    },

    // Rate limiting (client-side)
    rateLimit: {
        messagesPerMinute: 20,
        burstLimit: 5,
    },
} as const;

export type ChatConfig = typeof chatConfig;
