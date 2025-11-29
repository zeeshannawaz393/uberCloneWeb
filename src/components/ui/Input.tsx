'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'filled';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, variant = 'default', className, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full px-4 py-3 transition-all duration-200',
                            'focus:outline-none',
                            'disabled:cursor-not-allowed',
                            variant === 'filled'
                                ? 'bg-gray-100 rounded-lg text-[15px] text-black placeholder-gray-500 border-0 focus:ring-2 focus:ring-black'
                                : 'rounded-xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-dark-100',
                            variant === 'default' && (error
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-dark-200 hover:border-dark-300'),
                            icon && 'pl-10',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
