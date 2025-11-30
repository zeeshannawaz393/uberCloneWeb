/**
 * LocationCards Component
 * Floating pickup/destination cards positioned near map markers - Uber design
 */

'use client';

interface LocationCardsProps {
    pickup: string | null;
    destination: string | null;
    stops?: string[];
    onEditPickup: () => void;
    onEditDestination: () => void;
    onEditStop?: (index: number) => void;
}

// Helper function to get first 2 words from address
function getShortAddress(address: string): string {
    if (!address) return '';

    // Split by comma first (common in addresses)
    const parts = address.split(',')[0].trim();

    // Then split by space and take first 2 words
    const words = parts.split(' ').slice(0, 2).join(' ');

    return words;
}

export function LocationCards({
    pickup,
    destination,
    stops = [],
    onEditPickup,
    onEditDestination,
    onEditStop,
}: LocationCardsProps) {
    const shortDestination = destination ? getShortAddress(destination) : '';
    const shortPickup = pickup ? getShortAddress(pickup) : '';

    return (
        <>
            {/* Destination Card - Top area near destination marker */}
            {destination && (
                <div className="absolute top-20 left-4 right-4 z-10">
                    <button
                        onClick={onEditDestination}
                        className="bg-white rounded-lg shadow-md px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors max-w-[240px]"
                    >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="text-left flex-1 min-w-0">
                                <div className="text-[11px] text-gray-600 leading-tight mb-0.5">To</div>
                                <div className="font-medium text-sm leading-tight">
                                    {shortDestination}...
                                </div>
                            </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-900 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Pickup Card with ETA Badge - Bottom-left area near pickup marker */}
            {pickup && (
                <div className="absolute bottom-[42%] left-4 z-10 flex items-center gap-2">
                    {/* ETA Badge - Black pill on the left */}
                    <div className="flex-shrink-0 bg-black text-white px-2.5 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                        </svg>
                        <span className="text-xs font-semibold">3 min</span>
                    </div>

                    {/* Pickup Card */}
                    <button
                        onClick={onEditPickup}
                        className="bg-white rounded-lg shadow-md px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <div className="text-left">
                                <div className="text-[11px] text-gray-600 leading-tight mb-0.5">From</div>
                                <div className="font-medium text-sm leading-tight whitespace-nowrap">
                                    {shortPickup}
                                </div>
                            </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-900 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Stops - positioned between destination and pickup */}
            {stops.map((stop, i) => {
                const shortStop = getShortAddress(stop);
                return (
                    <div key={i} className="absolute left-4 right-4 z-10" style={{ top: `${120 + (i * 50)}px` }}>
                        <button
                            onClick={() => onEditStop?.(i)}
                            className="bg-white rounded-lg shadow-md px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors max-w-[240px]"
                        >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className="text-left flex-1 min-w-0">
                                    <div className="text-[11px] text-gray-600 leading-tight mb-0.5">Stop {i + 1}</div>
                                    <div className="font-medium text-sm leading-tight">
                                        {shortStop}...
                                    </div>
                                </div>
                            </div>
                            <svg className="w-4 h-4 text-gray-900 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                );
            })}
        </>
    );
}
