/**
 * AI Fallback Component
 * Fallback UI when AI is unavailable
 */

'use client';

import { AlertTriangle, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AIFallbackProps {
    onEscalateToAgent?: () => void;
}

export function AIFallback({ onEscalateToAgent }: AIFallbackProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6"
        >
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-yellow-900 mb-1">
                            AI Assistant Temporarily Limited
                        </h3>
                        <p className="text-sm text-yellow-800 mb-3">
                            Our AI assistant is currently experiencing issues. You can still get help from our support team.
                        </p>

                        {onEscalateToAgent && (
                            <button
                                onClick={onEscalateToAgent}
                                className={cn(
                                    'inline-flex items-center gap-2',
                                    'px-4 py-2 rounded-lg',
                                    'bg-yellow-600 text-white',
                                    'hover:bg-yellow-700',
                                    'transition-colors duration-200',
                                    'focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
                                    'text-sm font-medium'
                                )}
                            >
                                <Headphones className="w-4 h-4" />
                                Connect with Support Agent
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
