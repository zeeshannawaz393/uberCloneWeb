/**
 * MessageBubble Component
 * Individual message display
 */

'use client';

import { ChatMessage, MessageType } from '@/chat/message.types';
import { formatMessageTime } from '@/chat/message.mapper';
import { getMessageAriaLabel } from '@/chat/chat.a11y';
import { cn } from '@/lib/utils';
import { Bot, User, Headphones, AlertCircle } from 'lucide-react';

interface MessageBubbleProps {
    message: ChatMessage;
    isGrouped?: boolean;
}

export function MessageBubble({ message, isGrouped = false }: MessageBubbleProps) {
    const isUser = message.type === MessageType.USER_MESSAGE;
    const isBot = message.type === MessageType.BOT_MESSAGE;
    const isAgent = message.type === MessageType.AGENT_MESSAGE;
    const isSystem = message.type === MessageType.SYSTEM_MESSAGE;
    const isError = message.type === MessageType.ERROR_MESSAGE;

    const timeString = formatMessageTime(message.timestamp);
    const ariaLabel = getMessageAriaLabel(message.sender.name, message.content, timeString);

    // System and error messages (centered)
    if (isSystem || isError) {
        return (
            <div className="flex justify-center px-4 py-2">
                <div
                    className={cn(
                        'max-w-xs px-3 py-2 rounded-lg text-sm text-center',
                        isError
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-gray-100 text-gray-600'
                    )}
                    role="status"
                    aria-label={ariaLabel}
                >
                    {isError && <AlertCircle className="w-4 h-4 inline mr-1" />}
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'flex gap-2 px-4',
                isGrouped ? 'py-0.5' : 'py-2',
                isUser ? 'justify-end' : 'justify-start'
            )}
            role="article"
            aria-label={ariaLabel}
        >
            {/* Avatar (left side for bot/agent) */}
            {!isUser && !isGrouped && (
                <div
                    className={cn(
                        'flex-shrink-0 w-8 h-8 rounded-full',
                        'flex items-center justify-center',
                        isBot ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    )}
                    aria-hidden="true"
                >
                    {isBot ? <Bot className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
                </div>
            )}

            {/* Spacer for grouped messages */}
            {!isUser && isGrouped && <div className="w-8 flex-shrink-0" />}

            {/* Message Content */}
            <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start', 'max-w-[75%]')}>
                {/* Sender name (only if not grouped and not user) */}
                {!isGrouped && !isUser && (
                    <span className="text-xs text-gray-500 mb-1 px-1">{message.sender.name}</span>
                )}

                {/* Bubble */}
                <div
                    className={cn(
                        'px-4 py-2 rounded-2xl',
                        'break-words whitespace-pre-wrap',
                        isUser
                            ? 'bg-blue-600 text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                    )}
                >
                    {message.content}
                </div>

                {/* Timestamp (only if not grouped) */}
                {!isGrouped && (
                    <span className="text-xs text-gray-400 mt-1 px-1">{timeString}</span>
                )}
            </div>

            {/* Avatar (right side for user) */}
            {isUser && !isGrouped && (
                <div
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"
                    aria-hidden="true"
                >
                    <User className="w-5 h-5" />
                </div>
            )}

            {/* Spacer for grouped user messages */}
            {isUser && isGrouped && <div className="w-8 flex-shrink-0" />}
        </div>
    );
}
