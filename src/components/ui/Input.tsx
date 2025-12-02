'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'filled' | 'onboarding';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, variant = 'default', className, required, id, ...props }, ref) => {
        // Generate IDs for accessibility
        const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s/g, '-')}` : undefined);
        const errorId = error && inputId ? `${inputId}-error` : undefined;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "block text-sm font-medium mb-2",
                            variant === 'onboarding' ? 'text-gray-700' : 'text-dark-700'
                        )}
                    >
                        {label} {required && <span className="text-red-600" aria-label="required">*</span>}
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
                        id={inputId}
                        className={cn(
                            'w-full transition-all duration-200',
                            'focus:outline-none',
                            'disabled:cursor-not-allowed',
                            variant === 'filled'
                                ? 'bg-gray-100 rounded-lg px-4 py-3 text-[15px] text-black placeholder-gray-500 border-0 focus:ring-2 focus:ring-black'
                                : variant === 'onboarding'
                                    ? cn(
                                        'h-12 px-4 text-[15px] sm:text-base border-2 rounded-lg focus:border-black',
                                        error ? 'border-red-500 focus:border-red-600' : 'border-gray-300'
                                    )
                                    : cn(
                                        'px-4 py-3 rounded-xl border-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-dark-100',
                                        error ? 'border-red-500 focus:ring-red-500' : 'border-dark-200 hover:border-dark-300'
                                    ),
                            icon && 'pl-10',
                            className
                        )}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={errorId}
                        aria-required={required}
                        required={required}
                        {...props}
                    />
                </div>
                {error && (
                    <p
                        id={errorId}
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
