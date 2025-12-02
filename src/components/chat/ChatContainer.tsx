/**
 * ChatContainer Component
 * Main chat interface container (modal on desktop, full-screen on mobile)
 */

'use client';

import { useEffect, useRef } from 'react';
import { X, Wifi, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/chat/chat.store';
import { ConnectionStatus } from '@/chat/message.types';
import { getOwnershipDisplayText, getOwnershipStatusColor } from '@/chat/ownership.manager';
import { trapFocus, handleEscapeKey, announceMessage } from '@/chat/chat.a11y';
import { trackChatOpened, trackChatClosed } from '@/chat/chat.analytics';
import { chatLifecycle } from '@/chat/chat.lifecycle';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

export function ChatContainer() {
    const { isOpen, setIsOpen, conversation, messages, connectionStatus } = useChatStore();
    const { user } = useAuthStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const openTimeRef = useRef<number>(0);

    useEffect(() => {
        if (isOpen) {
            openTimeRef.current = Date.now();
            trackChatOpened(user?.role || null);
            announceMessage('Chat opened');

            // Auto-start conversation if not exists
            if (!conversation) {
                const userId = user?.id || `anonymous-${Date.now()}`;
                const userRole = user?.role || 'rider';
                chatLifecycle.startConversation(userId, userRole).catch(err => {
                    console.error('[ChatContainer] Failed to start conversation:', err);
                });
            }

            // Trap focus within chat
            if (containerRef.current) {
                const cleanup = trapFocus(containerRef.current);
                return cleanup;
            }
        } else {
            if (openTimeRef.current > 0) {
                const duration = Date.now() - openTimeRef.current;
                trackChatClosed(user?.role || null, duration, messages.length);
                openTimeRef.current = 0;
            }
        }
    }, [isOpen, user?.role, user?.id, messages.length, conversation]);

    useEffect(() => {
        const handleEscape = handleEscapeKey(() => setIsOpen(false));
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, setIsOpen]);

    const handleClose = () => {
        setIsOpen(false);
        announceMessage('Chat closed');
    };

    const isConnected = connectionStatus === ConnectionStatus.CONNECTED;
    const isReconnecting = connectionStatus === ConnectionStatus.RECONNECTING;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop (desktop only) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 hidden md:block"
                        aria-hidden="true"
                    />

                    {/* Chat Container */}
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            'fixed z-50',
                            // Mobile: full screen
                            'inset-0 md:inset-auto',
                            // Desktop: bottom-right modal
                            'md:bottom-6 md:right-6',
                            'md:w-[400px] md:h-[600px]',
                            'md:rounded-2xl md:shadow-2xl',
                            'bg-white',
                            'flex flex-col',
                            'overflow-hidden'
                        )}
                        role="dialog"
                        aria-label="Chat"
                        aria-modal="true"
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold">Chat Support</h2>
                                    {conversation && (
                                        <p className={cn('text-sm', getOwnershipStatusColor(conversation.ownership))}>
                                            {getOwnershipDisplayText(conversation.ownership)}
                                        </p>
                                    )}
                                </div>

                                {/* Connection Status */}
                                <div className="flex items-center gap-3">
                                    {isReconnecting ? (
                                        <div className="flex items-center gap-1 text-yellow-300">
                                            <WifiOff className="w-4 h-4 animate-pulse" />
                                            <span className="text-xs">Reconnecting...</span>
                                        </div>
                                    ) : !isConnected ? (
                                        <div className="flex items-center gap-1 text-red-300">
                                            <WifiOff className="w-4 h-4" />
                                            <span className="text-xs">Offline</span>
                                        </div>
                                    ) : (
                                        <Wifi className="w-4 h-4 text-green-300" aria-label="Connected" />
                                    )}

                                    {/* Close Button */}
                                    <button
                                        onClick={handleClose}
                                        className={cn(
                                            'p-1 rounded-lg',
                                            'hover:bg-white/10 transition-colors',
                                            'focus:outline-none focus:ring-2 focus:ring-white/50'
                                        )}
                                        aria-label="Close chat"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-hidden">
                            <MessageList />
                        </div>

                        {/* Input */}
                        <div className="flex-shrink-0 border-t border-gray-200">
                            <ChatInput />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
