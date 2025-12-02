/**
 * ChatProvider Component
 * Initializes chat system and provides chat context
 */

'use client';

import { useEffect } from 'react';
import { chatLifecycle } from '@/chat/chat.lifecycle';
import { chatConfig } from '@/chat/chat.config';
import { useAuthStore } from '@/store/authStore';
import { ChatLauncher } from './ChatLauncher';
import { ChatContainer } from './ChatContainer';

export function ChatProvider() {
    const { user, token } = useAuthStore();

    useEffect(() => {
        // Only initialize if chat is enabled
        if (!chatConfig.enabled) {
            console.log('[ChatProvider] Chat is disabled');
            return;
        }

        // Initialize chat lifecycle
        chatLifecycle.initialize(token || undefined);

        // Try to resume conversation from storage
        if (user) {
            const resumed = chatLifecycle.tryResumeFromStorage(user.id);
            if (!resumed) {
                console.log('[ChatProvider] No conversation to resume');
            }
        }

        // Cleanup on unmount
        return () => {
            // Don't disconnect on unmount to preserve connection
            // chatLifecycle.disconnect();
        };
    }, [user, token]);

    // Don't render if chat is disabled
    if (!chatConfig.enabled) {
        return null;
    }

    return (
        <>
            <ChatLauncher />
            <ChatContainer />
        </>
    );
}
