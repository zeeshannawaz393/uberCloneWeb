/**
 * QuickReplies Component
 * Action buttons for quick responses
 */

'use client';

import { motion } from 'framer-motion';
import { QuickReplyButton } from '@/chat/message.types';
import { chatLifecycle } from '@/chat/chat.lifecycle';
import { trackQuickReplyClicked } from '@/chat/chat.analytics';
import { useAuthStore } from '@/store/authStore';
import { filterQuickRepliesByRole } from '@/chat/role-guards';
import { cn } from '@/lib/utils';

interface QuickRepliesProps {
    quickReplies: QuickReplyButton[];
    conversationId: string;
}

export function QuickReplies({ quickReplies, conversationId }: QuickRepliesProps) {
    const { user } = useAuthStore();

    // Filter quick replies based on user role
    const filteredReplies = filterQuickRepliesByRole(quickReplies, user?.role || null);

    if (filteredReplies.length === 0) {
        return null;
    }

    const handleQuickReply = (button: QuickReplyButton) => {
        try {
            chatLifecycle.sendMessage(button.value, {
                quickReplyId: button.id,
                quickReplyLabel: button.label,
            });

            trackQuickReplyClicked(button.id, button.label, conversationId);
        } catch (error) {
            console.error('[QuickReplies] Failed to send quick reply:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2"
        >
            <div className="flex flex-wrap gap-2">
                {filteredReplies.map((button, index) => (
                    <motion.button
                        key={button.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleQuickReply(button)}
                        className={cn(
                            'px-4 py-2 rounded-full text-sm font-medium',
                            'transition-colors duration-200',
                            'focus:outline-none focus:ring-2 focus:ring-offset-2',
                            button.type === 'primary' &&
                            'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
                            button.type === 'danger' &&
                            'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
                            (!button.type || button.type === 'secondary') &&
                            'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
                        )}
                        aria-label={button.label}
                    >
                        {button.label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
