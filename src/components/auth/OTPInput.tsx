/**
 * OTP Input Component
 * 4-digit OTP input with auto-focus
 */

'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';

interface OTPInputProps {
    value: string[];
    onChange: (value: string[]) => void;
    hasError?: boolean;
}

export function OTPInput({ value, onChange, hasError = false }: OTPInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Auto-focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = (index: number, digit: string) => {
        // Only allow single digit
        if (digit.length > 1) return;

        // Only allow numbers
        if (digit && !/^\d$/.test(digit)) return;

        const newValue = [...value];
        newValue[index] = digit;
        onChange(newValue);

        // Auto-focus next input
        if (digit && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);

        if (/^\d+$/.test(pastedData)) {
            const newValue = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
            onChange(newValue);

            // Focus last filled input or next empty
            const nextIndex = Math.min(pastedData.length, 3);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    return (
        <div className="flex gap-3 justify-center">
            {value.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`
            w-14 h-14 text-center text-2xl font-medium rounded-lg
            border-2 transition-all
            focus:outline-none focus:ring-0
            ${hasError
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-300 focus:border-black'
                        }
          `}
                />
            ))}
        </div>
    );
}
