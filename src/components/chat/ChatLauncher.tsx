/**
 * ChatLauncher Component
 * Floating chat button with unread badge
 */

'use client';

import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/chat/chat.store';
import { cn } from '@/lib/utils';

export function ChatLauncher() {
    const { isOpen, setIsOpen, unreadCount } = useChatStore();

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggle}
                    className={cn(
                        'fixed bottom-6 right-6 z-50',
                        'w-14 h-14 rounded-full',
                        'bg-gradient-to-br from-blue-600 to-blue-700',
                        'text-white shadow-lg hover:shadow-xl',
                        'flex items-center justify-center',
                        'transition-shadow duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    )}
                    aria-label="Open chat"
                    aria-expanded={isOpen}
                >
                    <MessageCircle className="w-6 h-6" />

                    {/* Unread badge */}
                    {unreadCount > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={cn(
                                'absolute -top-1 -right-1',
                                'w-6 h-6 rounded-full',
                                'bg-red-500 text-white',
                                'flex items-center justify-center',
                                'text-xs font-bold',
                                'border-2 border-white'
                            )}
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </motion.div>
                    )}
                </motion.button>
            )}
        </AnimatePresence>
    );
}
