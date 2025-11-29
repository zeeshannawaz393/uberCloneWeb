/**
 * UI State
 * Global UI state management (modals, toasts, loading)
 */

import { create } from 'zustand';

interface Modal {
    id: string;
    component: string;
    props?: Record<string, any>;
}

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
}

interface UIState {
    // Modals
    modals: Modal[];
    openModal: (component: string, props?: Record<string, any>) => void;
    closeModal: (id: string) => void;
    closeAllModals: () => void;

    // Toasts
    toasts: Toast[];
    showToast: (message: string, type: Toast['type'], duration?: number) => void;
    hideToast: (id: string) => void;

    // Loading
    isLoading: boolean;
    loadingMessage: string | null;
    setLoading: (loading: boolean, message?: string) => void;

    // Sidebar
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
}

export const useUIState = create<UIState>((set) => ({
    // Modals
    modals: [],
    openModal: (component, props) =>
        set((state) => ({
            modals: [...state.modals, { id: Date.now().toString(), component, props }],
        })),
    closeModal: (id) =>
        set((state) => ({
            modals: state.modals.filter((modal) => modal.id !== id),
        })),
    closeAllModals: () => set({ modals: [] }),

    // Toasts
    toasts: [],
    showToast: (message, type, duration = 5000) =>
        set((state) => {
            const id = Date.now().toString();
            const toast = { id, message, type, duration };

            // Auto-hide after duration
            if (duration > 0) {
                setTimeout(() => {
                    set((state) => ({
                        toasts: state.toasts.filter((t) => t.id !== id),
                    }));
                }, duration);
            }

            return { toasts: [...state.toasts, toast] };
        }),
    hideToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((toast) => toast.id !== id),
        })),

    // Loading
    isLoading: false,
    loadingMessage: null,
    setLoading: (loading, message) =>
        set({ isLoading: loading, loadingMessage: message || null }),

    // Sidebar
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (open) => set({ isSidebarOpen: open }),
}));
