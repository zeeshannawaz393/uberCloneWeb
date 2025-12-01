'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BaseModal } from '@/components/common/BaseModal';
import { Button } from '@/components/ui/Button';

interface TripReceiptProps {
    pickup: string;
    destination: string;
    driverName: string;
    rideName: string;
    isDelivery?: boolean;
}

export function TripReceipt({ pickup, destination, driverName, rideName, isDelivery = false }: TripReceiptProps) {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedChips, setSelectedChips] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const [showHeaderTitle, setShowHeaderTitle] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const feedbackChips = [
        'Great conversation',
        'Clean car',
        'Safe driving',
        'On time',
        'Friendly',
        'Professional'
    ];

    // Detect scroll to show/hide header title
    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const scrollTop = contentRef.current.scrollTop;
                // Show title in header when scrolled past the icon section (approx 150px)
                setShowHeaderTitle(scrollTop > 150);
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
            return () => contentElement.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const toggleChip = (chip: string) => {
        setSelectedChips(prev =>
            prev.includes(chip) ? prev.filter(c => c !== chip) : [...prev, chip]
        );
    };

    const handleDone = () => {
        if (rating === 0) {
            alert('Please rate your driver before continuing');
            return;
        }
        // In a real app, submit rating and feedback here
        router.push('/');
    };

    const footer = (
        <div className="flex gap-3">
            <Button
                variant="ghost"
                size="lg"
                onClick={() => router.push('/')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-black"
            >
                Skip
            </Button>
            <Button
                variant="solid"
                size="lg"
                onClick={handleDone}
                disabled={rating === 0}
                className="flex-[2]"
            >
                Done
            </Button>
        </div>
    );

    return (
        <BaseModal
            isOpen={true}
            onClose={() => router.push('/')}
            title={showHeaderTitle ? (isDelivery ? 'Delivery complete' : 'Trip complete') : ''}
            hideCloseButton={true}
            showHeaderBorder={showHeaderTitle}
            showFooterBorder={true}
            footer={footer}
            size="md"
            contentRef={contentRef}
        >
            {/* Success Icon & Message */}
            <div className="p-8 pb-6 text-center border-b border-gray-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                {/* Show title here when not scrolled */}
                {!showHeaderTitle && (
                    <h2 className="text-3xl font-bold text-black mb-2">
                        {isDelivery ? 'Delivery complete' : 'Trip complete'}
                    </h2>
                )}
                <p className="text-gray-500">
                    {isDelivery ? 'Thank you for using Uber' : 'Thank you for riding with Uber'}
                </p>
            </div>

            {/* Rating Section */}
            <div className="p-8 border-b border-gray-100">
                <h3 className="text-lg font-bold text-black mb-2 text-center">
                    {isDelivery ? 'Rate your courier' : 'Rate your driver'}
                </h3>
                <p className="text-sm text-gray-500 mb-6 text-center">{driverName}</p>

                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110"
                        >
                            <svg
                                className={`w-12 h-12 ${star <= (hoveredRating || rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                    }`}
                                fill={star <= (hoveredRating || rating) ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* Feedback Chips */}
                {rating > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {feedbackChips.map((chip) => (
                            <button
                                key={chip}
                                onClick={() => toggleChip(chip)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedChips.includes(chip)
                                    ? 'bg-black text-white'
                                    : 'bg-gray-100 text-black hover:bg-gray-200'
                                    }`}
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                )}

                {/* Comment */}
                {rating > 0 && (
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Add a comment (optional)"
                        className="w-full px-4 py-3 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black text-sm"
                        rows={3}
                    />
                )}
            </div>

            {/* Trip Details */}
            <div className="p-8 space-y-6">
                <div>
                    <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Trip fare</span>
                        <span className="text-sm font-bold text-black">£12.45</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="text-lg font-bold text-black">£12.45</span>
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Route */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-full bg-black mt-1 flex-shrink-0"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-black">{pickup}</p>
                            <p className="text-xs text-gray-500">Pickup</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-3 h-3 rounded-sm bg-black mt-1 flex-shrink-0"></div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-black">{destination}</p>
                            <p className="text-xs text-gray-500">Drop-off</p>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Driver & Ride */}
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">{isDelivery ? 'Courier' : 'Driver'}</span>
                        <span className="text-sm font-medium text-black">{driverName}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">{isDelivery ? 'Service' : 'Ride'}</span>
                        <span className="text-sm font-medium text-black">{rideName}</span>
                    </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                {/* Payment */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-black">Personal • Cash</p>
                        <p className="text-xs text-gray-500">Charged</p>
                    </div>
                </div>
            </div>
        </BaseModal>
    );
}
