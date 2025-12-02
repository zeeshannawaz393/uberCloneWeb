/**
 * MessageList Component
 * Scrollable message list with auto-scroll
 */

'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/chat/chat.store';
import { shouldGroupMessages } from '@/chat/message.mapper';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { QuickReplies } from './QuickReplies';
import { chatConfig } from '@/chat/chat.config';
import { Loader2 } from 'lucide-react';

export function MessageList() {
    const { messages, typing, conversation } = useChatStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };

        const timer = setTimeout(scrollToBottom, chatConfig.ui.autoScrollDelay);
        return () => clearTimeout(timer);
    }, [messages, typing.isTyping]);

    // Show loading state if no conversation
    if (!conversation) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-500">Starting conversation...</p>
                </div>
            </div>
        );
    }

    // Empty state
    if (messages.length === 0 && !typing.isTyping) {
        return (
            <div className="h-full flex items-center justify-center p-6">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Welcome to Chat Support
                    </h3>
                    <p className="text-sm text-gray-600">
                        How can we help you today? Send a message to get started.
                    </p>
                </div>
            </div>
        );
    }

    // Get last message with quick replies
    const lastMessageWithQuickReplies = messages
        .slice()
        .reverse()
        .find(msg => msg.quickReplies && msg.quickReplies.length > 0);

    return (
        <div
            ref={containerRef}
            className="h-full overflow-y-auto scroll-smooth"
            role="log"
            aria-label="Chat messages"
            aria-live="polite"
        >
            <div className="py-4">
                {messages.map((message, index) => {
                    const prevMessage = index > 0 ? messages[index - 1] : null;
                    const isGrouped = prevMessage ? shouldGroupMessages(prevMessage, message) : false;

                    return <MessageBubble key={message.id} message={message} isGrouped={isGrouped} />;
                })}

                {/* Typing Indicator */}
                {typing.isTyping && typing.typingUser && (
                    <TypingIndicator userName={typing.typingUser.name} role={typing.typingUser.role} />
                )}

                {/* Quick Replies (show for last message only) */}
                {lastMessageWithQuickReplies && lastMessageWithQuickReplies.quickReplies && (
                    <QuickReplies
                        quickReplies={lastMessageWithQuickReplies.quickReplies}
                        conversationId={conversation.id}
                    />
                )}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}
