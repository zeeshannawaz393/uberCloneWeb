'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { registerSchema, RegisterInput } from '@/schemas/auth.schema';

export default function RegisterPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState<RegisterInput>({
        username: '',
        email: '',
        phone: '',
        countryCode: '+1',
        password: '',
        confirmPassword: '',
        role: 'rider',
        walletAddress: '',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validate with Zod
        const result = registerSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof RegisterInput, string>> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as keyof RegisterInput] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await api.post('/auth/register', formData);

            // Mock registration for demo
            const mockUser = {
                id: '1',
                username: formData.username,
                email: formData.email,
                phone: `${formData.countryCode}${formData.phone}`,
                role: formData.role,
                walletAddress: formData.walletAddress,
            };
            const mockToken = 'mock-jwt-token';

            login(mockUser, mockToken);

            // Redirect based on role
            const roleRoutes = {
                rider: '/rider',
                driver: '/driver',
                courier: '/courier',
                customer: '/track/demo',
            };
            router.push(roleRoutes[formData.role]);
        } catch (error) {
            setErrors({ email: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Create Account</CardTitle>
                    <p className="text-center text-dark-600 mt-2">
                        Join our mobility platform
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Username"
                                type="text"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                                error={errors.username}
                            />

                            <Input
                                label="Email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                error={errors.email}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-dark-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="flex gap-2">
                                    <select
                                        value={formData.countryCode}
                                        onChange={(e) =>
                                            setFormData({ ...formData, countryCode: e.target.value })
                                        }
                                        className="px-3 py-3 rounded-xl border-2 border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    >
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+91">+91</option>
                                    </select>
                                    <Input
                                        type="tel"
                                        placeholder="1234567890"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        error={errors.phone}
                                    />
                                </div>
                            </div>

                            <Input
                                label="Wallet Address (Optional)"
                                type="text"
                                placeholder="0x..."
                                value={formData.walletAddress}
                                onChange={(e) =>
                                    setFormData({ ...formData, walletAddress: e.target.value })
                                }
                                error={errors.walletAddress}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                error={errors.password}
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                error={errors.confirmPassword}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-2">
                                I want to be a
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['rider', 'driver', 'courier', 'customer'] as const).map((role) => (
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
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Create Account
                        </Button>

                        <p className="text-center text-sm text-dark-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
