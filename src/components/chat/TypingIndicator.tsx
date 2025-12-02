/**
 * TypingIndicator Component
 * Animated typing indicator
 */

'use client';

import { motion } from 'framer-motion';
import { getTypingAriaLabel } from '@/chat/chat.a11y';
import { cn } from '@/lib/utils';
import { Bot, Headphones } from 'lucide-react';

interface TypingIndicatorProps {
    userName: string;
    role: 'bot' | 'agent';
}

export function TypingIndicator({ userName, role }: TypingIndicatorProps) {
    const isBot = role === 'bot';
    const ariaLabel = getTypingAriaLabel(userName);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-2 px-4 py-2"
            role="status"
            aria-label={ariaLabel}
        >
            {/* Avatar */}
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

            {/* Typing bubble */}
            <div className="flex flex-col items-start max-w-[75%]">
                <span className="text-xs text-gray-500 mb-1 px-1">{userName}</span>

                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{
                                    y: [0, -6, 0],
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
