'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';
import { loginSchema, LoginInput } from '@/schemas/auth.schema';

export default function LoginPage() {
    const router = useRouter();
    const login = useAuthStore((state) => state.login);
    const [formData, setFormData] = useState<LoginInput>({
        email: '',
        password: '',
        role: 'rider',
    });
    const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validate with Zod
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as keyof LoginInput] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await api.post('/auth/login', formData);

            // Mock login for demo
            const mockUser = {
                id: '1',
                username: 'Demo User',
                email: formData.email,
                phone: '+1234567890',
                role: formData.role,
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
            setErrors({ email: 'Invalid credentials. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Welcome Back</CardTitle>
                    <p className="text-center text-dark-600 mt-2">
                        Sign in to your account
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            error={errors.email}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            }
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            error={errors.password}
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                        />

                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-2">
                                I am a
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
                            Sign In
                        </Button>

                        <p className="text-center text-sm text-dark-600">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
