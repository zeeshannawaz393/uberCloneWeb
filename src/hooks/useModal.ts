/**
 * useModal Hook
 * Modal management hook
 */

'use client';

import { useUIState } from '@/state/ui.state';

export function useModal() {
    const { modals, openModal, closeModal, closeAllModals } = useUIState();

    const open = (component: string, props?: Record<string, any>) => {
        openModal(component, props);
    };

    const close = (id: string) => {
        closeModal(id);
    };

    const closeAll = () => {
        closeAllModals();
    };

    return {
        modals,
        open,
        close,
        closeAll,
    };
}
