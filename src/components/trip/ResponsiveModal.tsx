/**
 * ResponsiveModal Component
 * Renders as a bottom sheet on mobile (<1024px) and a modal on desktop (>=1024px)
 */

'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BottomSheet } from './BottomSheet';

interface ResponsiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export function ResponsiveModal({ isOpen, onClose, children, title }: ResponsiveModalProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Detect viewport size
    useEffect(() => {
        setMounted(true);

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen && !isMobile) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen, isMobile]);

    if (!mounted || !isOpen) return null;

    // Mobile: Render as bottom sheet
    if (isMobile) {
        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={onClose}
                />

                {/* Bottom Sheet */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden">
                    {/* Drag Handle */}
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />

                    {/* Title (if provided) */}
                    {title && (
                        <div className="px-6 py-3 border-b border-gray-100">
                            <h2 className="text-lg font-bold text-black">{title}</h2>
                        </div>
                    )}

                    {/* Content */}
                    <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
                        {children}
                    </div>
                </div>
            </>
        );
    }

    // Desktop: Render as modal with portal
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Close"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Title (if provided) */}
                {title && (
                    <div className="px-8 py-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-black">{title}</h2>
                    </div>
                )}

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
