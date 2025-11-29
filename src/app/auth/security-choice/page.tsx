'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/routes';
import { useAuthFeature } from '@/features/auth/auth.state';
import { useSessionState } from '@/state/session.state';

export default function SecurityChoicePage() {
    const router = useRouter();
    const { setSecurityMethod, phone, profile } = useAuthFeature();
    const { setUser } = useSessionState();
    const [selected, setSelected] = useState<'pin' | 'biometric' | 'none' | null>(null);

    const handleComplete = () => {
        if (!selected) return;

        setSecurityMethod(selected);

        // Mock user creation
        if (profile && phone) {
            const mockUser = {
                id: Date.now().toString(),
                username: profile.username,
                email: profile.email,
                phone: phone,
                countryCode: '+1',
                role: profile.role,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'mock-jwt-token-' + Date.now();
            setUser(mockUser, mockToken);

            // Redirect based on role
            const roleRoutes = {
                rider: routes.trip,
                driver: routes.driver,
                courier: routes.courier.root,
            };
            router.push(roleRoutes[profile.role]);
        }
    };

    const securityOptions = [
        {
            id: 'pin' as const,
            icon: '🔢',
            title: 'PIN Code',
            description: 'Set a 4-digit PIN for quick access',
        },
        {
            id: 'biometric' as const,
            icon: '👆',
            title: 'Biometric',
            description: 'Use fingerprint or face recognition',
        },
        {
            id: 'none' as const,
            icon: '⏭️',
            title: 'Skip for Now',
            description: 'You can set this up later in settings',
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Secure Your Account</CardTitle>
                    <p className="text-dark-600 mt-2">
                        Choose how you&apos;d like to protect your account
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        {securityOptions.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => setSelected(option.id)}
                                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${selected === option.id
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-dark-200 hover:border-dark-300'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-3xl">{option.icon}</span>
                                    <div>
                                        <div className="font-medium">{option.title}</div>
                                        <div className="text-sm text-dark-600">{option.description}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleComplete}
                        disabled={!selected}
                    >
                        Complete Setup
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
