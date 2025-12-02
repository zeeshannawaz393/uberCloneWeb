/**
 * ChatInput Component
 * Message input field with validation
 */

'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '@/chat/chat.store';
import { chatLifecycle } from '@/chat/chat.lifecycle';
import { chatConfig } from '@/chat/chat.config';
import { shouldDisableInput, getInputPlaceholder } from '@/chat/ownership.manager';
import { trackMessageSent } from '@/chat/chat.analytics';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';

export function ChatInput() {
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { conversation } = useChatStore();
    const { user } = useAuthStore();

    const isDisabled = !conversation || shouldDisableInput(conversation.ownership);
    const placeholder = conversation
        ? getInputPlaceholder(conversation.ownership)
        : 'Type your message...';

    const handleSend = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || isSending || isDisabled) {
            return;
        }

        // Validate message length
        if (trimmedMessage.length < chatConfig.message.minLength) {
            return;
        }

        if (trimmedMessage.length > chatConfig.message.maxLength) {
            // TODO: Show error toast
            console.warn('[ChatInput] Message too long');
            return;
        }

        try {
            setIsSending(true);
            chatLifecycle.sendMessage(trimmedMessage);

            trackMessageSent(
                user?.role || null,
                trimmedMessage.length,
                conversation?.id || ''
            );

            setMessage('');

            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        } catch (error) {
            console.error('[ChatInput] Failed to send message:', error);
            // TODO: Show error toast
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        // Auto-resize textarea
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
    };

    const canSend = message.trim().length > 0 && !isSending && !isDisabled;

    return (
        <div className="p-4">
            <div className="flex items-end gap-2">
                {/* Textarea */}
                <div className="flex-1 relative">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleInput}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={isDisabled || isSending}
                        rows={1}
                        className={cn(
                            'w-full px-4 py-3 pr-12',
                            'bg-gray-100 rounded-2xl',
                            'resize-none overflow-hidden',
                            'focus:outline-none focus:ring-2 focus:ring-blue-500',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            'placeholder:text-gray-400'
                        )}
                        aria-label="Message input"
                        maxLength={chatConfig.message.maxLength}
                    />

                    {/* Character count (when approaching limit) */}
                    {message.length > chatConfig.message.maxLength * 0.8 && (
                        <div className="absolute bottom-1 right-2 text-xs text-gray-400">
                            {message.length}/{chatConfig.message.maxLength}
                        </div>
                    )}
                </div>

                {/* Send Button */}
                <button
                    onClick={handleSend}
                    disabled={!canSend}
                    className={cn(
                        'flex-shrink-0 w-10 h-10 rounded-full',
                        'flex items-center justify-center',
                        'transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                        canSend
                            ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    )}
                    aria-label="Send message"
                >
                    <Send className={cn('w-5 h-5', isSending && 'animate-pulse')} />
                </button>
            </div>

            {/* Helper text */}
            <p className="text-xs text-gray-400 mt-2 px-1">
                Press Enter to send, Shift+Enter for new line
            </p>
        </div>
    );
}
