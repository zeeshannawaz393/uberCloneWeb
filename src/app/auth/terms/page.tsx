'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/routes';
import { useAuthFeature } from '@/features/auth/auth.state';

export default function TermsPage() {
    const router = useRouter();
    const { acceptTerms, setStep } = useAuthFeature();
    const [agreed, setAgreed] = useState(false);

    const handleContinue = () => {
        if (!agreed) return;

        acceptTerms();
        setStep('security');
        router.push(routes.auth.security);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Terms & Conditions</CardTitle>
                    <p className="text-dark-600 mt-2">
                        Please review and accept our terms
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-dark-50 rounded-xl p-6 max-h-96 overflow-y-auto">
                        <h3 className="font-bold mb-2">1. Acceptance of Terms</h3>
                        <p className="text-sm text-dark-600 mb-4">
                            By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>

                        <h3 className="font-bold mb-2">2. Use License</h3>
                        <p className="text-sm text-dark-600 mb-4">
                            Permission is granted to temporarily use this service for personal, non-commercial transitory viewing only.
                        </p>

                        <h3 className="font-bold mb-2">3. Privacy Policy</h3>
                        <p className="text-sm text-dark-600 mb-4">
                            Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy.
                        </p>

                        <h3 className="font-bold mb-2">4. Service Terms</h3>
                        <p className="text-sm text-dark-600">
                            We reserve the right to modify or discontinue the service at any time without notice.
                        </p>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-dark-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
                        />
                        <span className="text-sm text-dark-700">
                            I agree to the Terms & Conditions and Privacy Policy
                        </span>
                    </label>

                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleContinue}
                        disabled={!agreed}
                    >
                        Continue
                    </Button>

                    <button
                        onClick={() => router.back()}
                        className="w-full text-center text-sm text-dark-600 hover:text-dark-700"
                    >
                        Back
                    </button>
                </CardContent>
            </Card>
        </main>
    );
}
