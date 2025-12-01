import React, { forwardRef } from 'react';

interface SharedLocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    showClear?: boolean;
    onClear?: () => void;
    isLoading?: boolean;
    containerClassName?: string;
}

export const SharedLocationInput = forwardRef<HTMLInputElement, SharedLocationInputProps>(
    ({ className, containerClassName, startContent, endContent, showClear, onClear, isLoading, value, ...props }, ref) => {
        return (
            <div className={`relative ${containerClassName || ''}`}>
                {/* Start Content (Icon/Dot) */}
                {startContent && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        {startContent}
                    </div>
                )}

                {/* Input Field */}
                <input
                    ref={ref}
                    type="text"
                    value={value}
                    className={`w-full pl-10 pr-10 py-4 bg-[#F3F3F3] rounded-xl text-[15px] font-medium outline-none transition-all placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-black ${className || ''}`}
                    {...props}
                />

                {/* Right Side Actions (Clear, Loading, Custom End Content) */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-20">
                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    )}

                    {/* Clear Button */}
                    {showClear && onClear && !isLoading && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClear();
                            }}
                            className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors touch-manipulation"
                            aria-label="Clear input"
                        >
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    {/* Custom End Content (e.g. Remove Stop button) */}
                    {endContent}
                </div>
            </div>
        );
    }
);

SharedLocationInput.displayName = 'SharedLocationInput';
