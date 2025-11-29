/**
 * Signup Layout - Responsive
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
            {/* Black Header - Responsive */}
            <header className="bg-black text-white h-14 sm:h-16 flex items-center">
                <div className="container mx-auto px-4 sm:px-6">
                    <Link href="/" className="text-xl sm:text-2xl font-normal">
                        Uber
                    </Link>
                </div>
            </header>

            {/* Main Content - Centered Card with Responsive Padding */}
            <main className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-4 sm:p-6">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </main>
        </div>
    );
}
