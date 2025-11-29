/**
 * Session State
 * Global user session management
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    name: string;
    email: string;
}

interface SessionState {
    // Authentication
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;

    // Actions
    login: (name: string, email: string) => void;
    logout: () => void;
    setUser: (user: User, token?: string) => void;
    updateUser: (updates: Partial<User>) => void;
    clearSession: () => void;
}

export const useSessionState = create<SessionState>()(
    persist(
        (set) => ({
            // Initial state
            isAuthenticated: false,
            user: null,
            token: null,

            // Actions
            login: (name, email) => {
                set({
                    isAuthenticated: true,
                    user: { name, email },
                });
            },

            logout: () => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                }
                set({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                });
            },

            setUser: (user, token) => {
                if (token && typeof window !== 'undefined') {
                    localStorage.setItem('auth_token', token);
                }
                set({
                    user,
                    token,
                    isAuthenticated: true,
                });
            },

            updateUser: (updates) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updates } : null,
                })),

            clearSession: () => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('auth_token');
                }
                set({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                });
            },
        }),
        {
            name: 'session-storage',
        }
    )
);
