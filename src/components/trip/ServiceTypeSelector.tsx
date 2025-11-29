/**
 * ServiceTypeSelector Component
 * Visual selector for Ride vs Delivery with icons and labels
 */

'use client';

interface ServiceTypeSelectorProps {
    serviceMode: 'ride' | 'send' | 'receive';
    onModeChange: (mode: 'ride' | 'send' | 'receive') => void;
}

export function ServiceTypeSelector({ serviceMode, onModeChange }: ServiceTypeSelectorProps) {
    const isDeliveryMode = serviceMode === 'send' || serviceMode === 'receive';

    return (
        <div className="flex gap-3 mb-5">
            {/* Ride Option */}
            <button
                onClick={() => onModeChange('ride')}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${!isDeliveryMode
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
            >
                {/* Car Icon */}
                <div className={`w-12 h-12 mb-2 flex items-center justify-center ${!isDeliveryMode ? 'text-black' : 'text-gray-400'
                    }`}>
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                </div>
                <span className={`text-[14px] font-semibold ${!isDeliveryMode ? 'text-black' : 'text-gray-600'
                    }`}>
                    Ride
                </span>
            </button>

            {/* Delivery Option */}
            <button
                onClick={() => onModeChange('send')}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${isDeliveryMode
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
            >
                {/* Package Icon */}
                <div className={`w-12 h-12 mb-2 flex items-center justify-center ${isDeliveryMode ? 'text-black' : 'text-gray-400'
                    }`}>
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                    </svg>
                </div>
                <span className={`text-[14px] font-semibold ${isDeliveryMode ? 'text-black' : 'text-gray-600'
                    }`}>
                    Delivery
                </span>
            </button>
        </div>
    );
}
