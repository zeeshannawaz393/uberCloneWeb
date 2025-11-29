/**
 * Signup Layout
 * Black header with centered auth card
 */

'use client';

import Link from 'next/link';

export default function SignupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Black Header */}
            <header className="bg-black text-white h-16 flex items-center">
                <div className="container mx-auto px-4">
                    <Link href="/" className="text-2xl font-normal">
                        Uber
                    </Link>
                </div>
            </header>

            {/* Main Content - Centered Card */}
            <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>
        </div>
    );
}
