'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    showBackButton?: boolean;
    onBack?: () => void;
    showHeaderBorder?: boolean;
    showFooterBorder?: boolean;
    size?: 'sm' | 'md' | 'lg';
    hideCloseButton?: boolean;
    contentRef?: React.RefObject<HTMLDivElement | null>;
}

export function BaseModal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    showBackButton = false,
    onBack,
    showHeaderBorder = true,
    showFooterBorder = true,
    size = 'md',
    hideCloseButton = false,
    contentRef
}: BaseModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Detect viewport size
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            setMounted(false);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!mounted) return null;

    const sizeClasses = {
        sm: 'w-[400px]',
        md: 'w-[480px]',
        lg: 'w-[600px]'
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-[300]"
                        onClick={onClose}
                    />

                    {/* Modal Container - Bottom Sheet on Mobile, Centered Modal on Desktop */}
                    <div className={`fixed z-[300] pointer-events-none ${isMobile
                        ? 'inset-x-0 bottom-0'
                        : 'inset-0 flex items-center justify-center'
                        }`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                            className={`bg-white shadow-2xl overflow-hidden pointer-events-auto flex flex-col ${isMobile
                                ? 'w-full rounded-t-3xl max-h-[90vh]'
                                : `${sizeClasses[size]} rounded-2xl mx-4 max-h-[85vh]`
                                }`}
                        >
                            {/* Drag Handle (Mobile Only) */}
                            {isMobile && (
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2 flex-shrink-0" />
                            )}

                            {/* Header */}
                            <div className={`px-6 py-4 flex items-center justify-between flex-shrink-0 ${showHeaderBorder ? 'border-b border-gray-200' : ''
                                }`}>
                                <div className="flex items-center gap-3">
                                    {showBackButton && onBack && (
                                        <button
                                            onClick={onBack}
                                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            aria-label="Go back"
                                        >
                                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                    )}
                                    <h2 className="text-xl font-bold text-black">{title}</h2>
                                </div>
                                {!hideCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors -mr-1"
                                        aria-label="Close modal"
                                    >
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Content - Scrollable */}
                            <div ref={contentRef} className="flex-1 overflow-y-auto">
                                {children}
                            </div>

                            {/* Footer (Optional) */}
                            {footer && (
                                <div className={`px-6 py-4 flex-shrink-0 ${showFooterBorder ? 'border-t border-gray-200' : ''
                                    }`}>
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
