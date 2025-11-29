/**
 * Error State Component
 * Shown when service is not available
 */

'use client';

interface ErrorStateProps {
    pickup: string;
    destination: string;
}

export function ErrorState({ pickup, destination }: ErrorStateProps) {
    return (
        <div className="flex-1 p-6">
            {/* Header */}
            <h2 className="text-2xl font-bold text-black mb-8">Choose a ride</h2>

            {/* Warning Message */}
            <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#FFC107]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM11 10v4h2v-4h-2zm0 5v2h2v-2h-2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[16px] text-black leading-relaxed">
                        Service is not available at this pick-up location.
                    </p>
                </div>
            </div>

            {/* Location Inputs */}
            <div className="space-y-3 mb-6">
                {/* Pickup */}
                <div className="flex items-center gap-3 px-4 py-3.5 bg-[#F6F6F6] rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-black flex-shrink-0"></div>
                    <span className="text-[15px] text-black truncate">{pickup}</span>
                </div>

                {/* Destination (Disabled) */}
                <div className="flex items-center gap-3 px-4 py-3.5 bg-[#EEEEEE] rounded-lg opacity-60">
                    <div className="w-3 h-3 bg-gray-400 flex-shrink-0"></div>
                    <span className="text-[15px] text-gray-500 truncate">{destination}</span>
                </div>
            </div>

            {/* Time Selector (Disabled) */}
            <div className="mb-3">
                <button disabled className="w-full flex items-center justify-between px-4 py-3.5 bg-[#EEEEEE] rounded-lg opacity-60 cursor-not-allowed">
                    <span className="text-[15px] text-gray-500">Pick-up now</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Rider Selector (Disabled) */}
            <div className="mb-6">
                <button disabled className="w-full flex items-center justify-between px-4 py-3.5 bg-[#EEEEEE] rounded-lg opacity-60 cursor-not-allowed">
                    <span className="text-[15px] text-gray-500">For me</span>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Add Payment Method */}
            <button className="w-full flex items-center justify-center gap-2 py-3.5 text-[15px] text-black font-medium mb-4">
                <span className="text-xl">+</span>
                <span>Add payment method</span>
            </button>

            {/* Loading Button (Disabled) */}
            <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-3.5 rounded-lg text-[16px] font-semibold cursor-not-allowed"
            >
                Loading
            </button>
        </div>
    );
}
