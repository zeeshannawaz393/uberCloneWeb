'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TripReceiptProps {
    pickup: string;
    destination: string;
    driverName: string;
    rideName: string;
    isDelivery?: boolean; // New prop to indicate delivery mode
}

export function TripReceipt({ pickup, destination, driverName, rideName, isDelivery = false }: TripReceiptProps) {
    const router = useRouter();
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedChips, setSelectedChips] = useState<string[]>([]);
    const [comment, setComment] = useState('');

    const feedbackChips = [
        'Great conversation',
        'Clean car',
        'Safe driving',
        'On time',
        'Friendly',
        'Professional'
    ];

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-hide">
                {/* Header */}
                <div className="p-8 pb-6 text-center border-b border-gray-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-black mb-2">
                        {isDelivery ? 'Delivery complete' : 'Trip complete'}
                    </h2>
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
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                </svg>
                            </button>
                        ))}
                    </div>

                    {/* Feedback Chips */}
                    {rating > 0 && (
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-3">What did you like? (Optional)</p>
                            <div className="flex flex-wrap gap-2">
                                {feedbackChips.map((chip) => (
                                    <button
                                        key={chip}
                                        onClick={() => toggleChip(chip)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedChips.includes(chip)
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comment */}
                    {rating > 0 && (
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Add a comment (Optional)</p>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share more about your experience..."
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black text-sm"
                                rows={3}
                            />
                        </div>
                    )}
                </div>

                {/* Receipt Summary */}
                <div className="p-8 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-black mb-4">
                        {isDelivery ? 'Delivery summary' : 'Trip summary'}
                    </h3>

                    {/* Route */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-1.5 bg-black rounded-full flex-shrink-0"></div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Pickup</p>
                                <p className="text-sm font-medium text-black">{pickup}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-1.5 bg-black rounded-none flex-shrink-0"></div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Dropoff</p>
                                <p className="text-sm font-medium text-black">{destination}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ride Details */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{isDelivery ? 'Delivery type' : 'Ride type'}</span>
                            <span className="font-medium text-black">{rideName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Distance</span>
                            <span className="font-medium text-black">8.4 km</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Time</span>
                            <span className="font-medium text-black">18 min</span>
                        </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">{isDelivery ? 'Delivery fare' : 'Trip fare'}</span>
                            <span className="text-black">£24.50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Service fee</span>
                            <span className="text-black">£2.40</span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-100">
                            <span className="text-black">Total</span>
                            <span className="text-black">£26.90</span>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="p-8 pb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-black">Personal • Cash</p>
                            <p className="text-xs text-gray-500">Charged</p>
                        </div>
                    </div>

                    {/* Done Button */}
                    <button
                        onClick={handleDone}
                        className={`w-full py-4 rounded-xl text-lg font-bold transition-colors ${rating > 0
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
