'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BaseModal } from '@/components/common/BaseModal';
import { Button } from '@/components/ui/Button';

interface CancelRideModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripState: 'on_way' | 'arriving' | 'picked_up' | 'in_progress';
}

type CancelStep = 'warning' | 'reason' | 'confirmed';

const CANCELLATION_REASONS = [
    'Changed my mind',
    'Driver is too far away',
    'Driver took too long',
    'Wrong pickup location',
    'Found another ride',
    'Other'
];

export function CancelRideModal({ isOpen, onClose, tripState }: CancelRideModalProps) {
    const router = useRouter();
    const [step, setStep] = useState<CancelStep>('warning');
    const [selectedReason, setSelectedReason] = useState<string>('');
    const [otherReason, setOtherReason] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    // Determine fee based on trip state
    const getFeeInfo = () => {
        if (tripState === 'in_progress') {
            return { canCancel: false, message: 'This trip can no longer be cancelled.' };
        }
        if (tripState === 'picked_up') {
            return { canCancel: true, hasFee: true, amount: 5.00, message: 'A cancellation fee will apply if you cancel this ride.' };
        }
        if (tripState === 'arriving') {
            return { canCancel: true, hasFee: true, amount: 5.00, message: 'You may be charged a cancellation fee if you cancel now.' };
        }
        return { canCancel: true, hasFee: false, message: 'You can cancel now without any fee.' };
    };

    const feeInfo = getFeeInfo();

    const handleConfirmCancellation = () => {
        if (!selectedReason) return;

        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setStep('confirmed');
        }, 1500);
    };

    const handleDone = () => {
        onClose();
        router.push('/');
    };

    // Step 1: Warning
    if (step === 'warning') {
        return (
            <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
                <div className="bg-white rounded-2xl shadow-2xl w-[480px] mx-4 p-8" onClick={(e) => e.stopPropagation()}>
                    {/* Warning Icon */}
                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-black text-center mb-2">Cancel your ride?</h2>

                    {/* Dynamic message */}
                    <p className="text-center text-gray-600 mb-8">
                        {feeInfo.message}
                    </p>

                    {/* Actions */}
                    {feeInfo.canCancel ? (
                        <div className="space-y-3">
                            <Button
                                variant="solid"
                                size="lg"
                                onClick={onClose}
                                className="w-full"
                            >
                                Keep ride
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => setStep('reason')}
                                className="w-full border-2 border-red-600 text-red-600 hover:bg-red-50"
                            >
                                Cancel ride
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="solid"
                            size="lg"
                            onClick={onClose}
                            className="w-full"
                        >
                            Close
                        </Button>
                    )}
                </div>
            </div>
        );
    }

    // Step 2: Reason Selection
    if (step === 'reason') {
        const footer = (
            <Button
                variant="solid"
                size="lg"
                onClick={handleConfirmCancellation}
                disabled={!selectedReason}
                isLoading={isProcessing}
                className="w-full"
            >
                {isProcessing ? 'Cancelling...' : 'Confirm cancellation'}
            </Button>
        );

        return (
            <BaseModal
                isOpen={true}
                onClose={() => setStep('warning')}
                title="Why are you cancelling?"
                showHeaderBorder={true}
                showFooterBorder={true}
                footer={footer}
                size="md"
            >
                <div className="p-6 space-y-2">
                    {CANCELLATION_REASONS.map((reason) => (
                        <button
                            key={reason}
                            onClick={() => setSelectedReason(reason)}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedReason === reason
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-black">{reason}</span>
                                {selectedReason === reason && (
                                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}

                    {/* Other reason input */}
                    {selectedReason === 'Other' && (
                        <textarea
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                            placeholder="Tell us what happened (optional)"
                            className="w-full mt-4 px-4 py-3 bg-gray-50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black text-sm"
                            rows={3}
                        />
                    )}
                </div>
            </BaseModal>
        );
    }

    // Step 3: Confirmation
    if (step === 'confirmed') {
        return (
            <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl w-[480px] mx-4 p-8">
                    {/* Success Icon */}
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-black text-center mb-2">Ride cancelled</h2>

                    {/* Fee/Refund Message */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        {feeInfo.hasFee ? (
                            <div className="text-center">
                                <p className="text-gray-600 mb-2">A cancellation fee was charged</p>
                                <p className="text-2xl font-bold text-black">£{feeInfo.amount?.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 mt-2">This charge will appear on your payment method</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <p className="text-green-600 font-medium">✓ You were not charged for this ride</p>
                            </div>
                        )}
                    </div>

                    {/* Done Button */}
                    <Button
                        variant="solid"
                        size="lg"
                        onClick={handleDone}
                        className="w-full"
                    >
                        Done
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}
