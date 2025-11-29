/**
 * Header Component - Auth Aware
 * Shows login/signup or user dropdown based on auth state
 */

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSessionState } from '@/state/session.state';
import { UserDropdown } from './UserDropdown';

export function Header() {
    const { isAuthenticated, user, logout } = useSessionState();
    const [showDropdown, setShowDropdown] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    // Prevent hydration mismatch by only showing auth state after client hydration
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 bg-black z-50 h-[64px] flex items-center">
            <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-normal tracking-tight text-white">
                        Uber
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/ride" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                            Ride
                        </Link>
                        <Link href="/drive" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                            Drive
                        </Link>
                        <Link href="/business" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                            Business
                        </Link>
                        <Link href="/uber-eats" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                            Uber Eats
                        </Link>
                        <div className="relative group">
                            <button className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors flex items-center gap-1">
                                About
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-6">
                    {/* Language */}
                    <button className="flex items-center gap-2 text-[14px] font-medium text-white hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        EN
                    </button>

                    {/* Help */}
                    <Link href="/help" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                        Help
                    </Link>

                    {/* Auth-aware section */}
                    {!isHydrated ? (
                        /* Show loading state during hydration */
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-6 bg-gray-700 rounded animate-pulse"></div>
                            <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    ) : isAuthenticated && user ? (
                        /* Logged In: User Dropdown */
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="bg-white text-black px-4 py-1.5 rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                {user.name.split(' ')[0]}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <UserDropdown
                                    userName={user.name}
                                    onClose={() => setShowDropdown(false)}
                                    onSignOut={logout}
                                />
                            )}
                        </div>
                    ) : (
                        /* Logged Out: Login + Signup */
                        <>
                            <Link
                                href="/login"
                                className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-white text-black px-4 py-1.5 rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
