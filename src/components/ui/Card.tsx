'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glass?: boolean;
    hover?: boolean;
}

export function Card({ children, className, glass = false, hover = true }: CardProps) {
    return (
        <motion.div
            className={cn(
                'rounded-2xl p-6',
                glass
                    ? 'glass-dark'
                    : 'bg-white border border-dark-200 shadow-lg',
                hover && 'transition-all duration-300 hover:shadow-xl',
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <h3 className={cn('text-2xl font-bold text-dark-900', className)}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn('text-dark-600', className)}>
            {children}
        </div>
    );
}
