'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/routes';

export default function AuthStartPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Welcome to RideShare</CardTitle>
                    <p className="text-center text-dark-600 mt-2">
                        Your journey starts here
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => router.push(routes.auth.phone)}
                    >
                        Get Started
                    </Button>

                    <div className="text-center text-sm text-dark-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => router.push(routes.login)}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Sign In
                        </button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
