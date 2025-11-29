'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/routes';
import { useAuthFeature } from '@/features/auth/auth.state';

export default function ProfilePage() {
    const router = useRouter();
    const { setProfile, setStep } = useAuthFeature();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'rider' as 'rider' | 'driver' | 'courier',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleContinue = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setProfile(formData);
        setStep('terms');
        router.push(routes.auth.terms);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <p className="text-dark-600 mt-2">
                        Tell us a bit about yourself
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        label="Username"
                        type="text"
                        placeholder="johndoe"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        error={errors.username}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                    />

                    <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                            I want to be a
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {(['rider', 'driver', 'courier'] as const).map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role })}
                                    className={`px-4 py-2 rounded-lg border-2 transition-all capitalize ${formData.role === role
                                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                                            : 'border-dark-200 hover:border-dark-300'
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button variant="primary" className="w-full" onClick={handleContinue}>
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
