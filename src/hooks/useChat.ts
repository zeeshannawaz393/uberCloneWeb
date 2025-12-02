/**
 * Chat Hook
 * Custom hook for chat interactions
 */

'use client';

import { useEffect, useCallback } from 'react';
import { useChatStore } from '@/chat/chat.store';
import { chatLifecycle } from '@/chat/chat.lifecycle';
import { useAuthStore } from '@/store/authStore';
import { trackConversationStarted } from '@/chat/chat.analytics';

export function useChat() {
    const { user } = useAuthStore();
    const {
        isOpen,
        setIsOpen,
        conversation,
        messages,
        connectionStatus,
        typing,
        unreadCount,
    } = useChatStore();

    /**
     * Open chat and start conversation if needed
     */
    const openChat = useCallback(
        async (context?: Record<string, any>) => {
            setIsOpen(true);

            // Start conversation if not already started
            if (!conversation) {
                try {
                    // Use authenticated user or create anonymous user
                    const userId = user?.id || `anonymous-${Date.now()}`;
                    const userRole = user?.role || 'rider';

                    await chatLifecycle.startConversation(userId, userRole, context);
                    trackConversationStarted(userRole, '', context);
                } catch (error) {
                    console.error('[useChat] Failed to start conversation:', error);
                }
            }
        },
        [conversation, user, setIsOpen]
    );

    /**
     * Close chat
     */
    const closeChat = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    /**
     * Send message
     */
    const sendMessage = useCallback(
        (content: string, metadata?: Record<string, any>) => {
            try {
                chatLifecycle.sendMessage(content, metadata);
            } catch (error) {
                console.error('[useChat] Failed to send message:', error);
                throw error;
            }
        },
        []
    );

    return {
        // State
        isOpen,
        conversation,
        messages,
        connectionStatus,
        typing,
        unreadCount,

        // Actions
        openChat,
        closeChat,
        sendMessage,
    };
}
