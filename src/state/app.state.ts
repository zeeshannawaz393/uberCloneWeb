/**
 * App State
 * Global application state
 */

import { create } from 'zustand';

interface AppState {
    // App info
    version: string;
    environment: 'development' | 'staging' | 'production';

    // Feature flags
    features: Record<string, boolean>;
    isFeatureEnabled: (feature: string) => boolean;

    // Network status
    isOnline: boolean;
    setOnline: (online: boolean) => void;

    // Theme
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppState = create<AppState>((set, get) => ({
    version: '1.0.0',
    environment: (process.env.NODE_ENV as any) || 'development',

    features: {},
    isFeatureEnabled: (feature) => get().features[feature] ?? false,

    isOnline: typeof window !== 'undefined' ? navigator.onLine : true,
    setOnline: (online) => set({ isOnline: online }),

    theme: 'light',
    setTheme: (theme) => set({ theme }),
}));

// Listen for online/offline events
if (typeof window !== 'undefined') {
    window.addEventListener('online', () => useAppState.getState().setOnline(true));
    window.addEventListener('offline', () => useAppState.getState().setOnline(false));
}
