/**
 * App Layout
 * Main application wrapper
 */

'use client';

import { useSessionState } from '@/state/session.state';

export function AppLayout({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useSessionState();

    return (
        <div className="min-h-screen">
            {isAuthenticated && (
                <header className="bg-white border-b border-dark-200">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold">RideShare</h1>
                            <nav className="flex gap-4">
                                <a href="/trip" className="text-dark-600 hover:text-dark-900">
                                    Book Ride
                                </a>
                                <a href="/account" className="text-dark-600 hover:text-dark-900">
                                    Account
                                </a>
                            </nav>
                        </div>
                    </div>
                </header>
            )}
            <main>{children}</main>
        </div>
    );
}
