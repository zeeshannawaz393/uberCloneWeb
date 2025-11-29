/**
 * Resend Modal Component
 * Confirmation dialog for resending OTP
 */

'use client';

interface ResendModalProps {
    isOpen: boolean;
    onClose: () => void;
    onResend: () => void;
    emailOrPhone: string;
}

export function ResendModal({ isOpen, onClose, onResend, emailOrPhone }: ResendModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-center">
                    Resend code to:
                </h3>

                <p className="text-center text-gray-700 mb-8">
                    {emailOrPhone}
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => {
                            onResend();
                            onClose();
                        }}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                        Resend
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
