/**
 * Header Component - Auth Aware & Responsive
 * Shows login/signup or user dropdown based on auth state
 * Uses UserDropdown for both mobile menu and desktop dropdown
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

    // Lock body scroll when dropdown/menu is open on mobile
    useEffect(() => {
        if (showDropdown) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showDropdown]);

    return (
        <header className="fixed top-0 left-0 right-0 bg-black z-50 h-[64px] flex items-center">
            <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between">
                <div className="flex items-center gap-4 lg:gap-8">
                    {/* Mobile Menu Button - Opens UserDropdown */}
                    <button
                        onClick={() => setShowDropdown(true)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center text-white hover:bg-gray-800 rounded-full transition-colors"
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Logo */}
                    <Link href="/" className="text-2xl font-normal tracking-tight text-white">
                        Uber
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/trip" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                            Ride
                        </Link>
                        <Link href="/driver" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                            Drive
                        </Link>
                        <Link href="/trips" className="text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                            Activity
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
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                    {/* Language - Hidden on mobile */}
                    <button className="hidden md:flex items-center gap-2 text-[14px] font-medium text-white hover:bg-gray-800 px-3 py-2 rounded-full transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                        </svg>
                        <span className="hidden lg:inline">EN</span>
                    </button>

                    {/* Help - Hidden on mobile */}
                    <Link href="/help" className="hidden md:block text-[14px] font-medium text-white hover:text-gray-300 transition-colors">
                        Help
                    </Link>

                    {/* Auth-aware section */}
                    {!isHydrated ? (
                        /* Show loading state during hydration */
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-6 bg-gray-700 rounded animate-pulse hidden sm:block"></div>
                            <div className="w-16 h-6 bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    ) : isAuthenticated && user ? (
                        /* Logged In: User Dropdown - Hidden on mobile, shown in mobile menu */
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="bg-white text-black px-3 sm:px-4 py-1.5 rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <span>{user.name.split(' ')[0]}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <UserDropdown
                                    userName={user.name}
                                    onClose={() => setShowDropdown(false)}
                                    onSignOut={logout}
                                    isAuthenticated={true}
                                />
                            )}
                        </div>
                    ) : (
                        /* Logged Out: Login + Signup */
                        <>
                            <Link
                                href="/login"
                                className="hidden sm:block text-[14px] font-medium text-white hover:text-gray-300 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-white text-black px-3 sm:px-4 py-1.5 rounded-full text-[14px] font-medium hover:bg-gray-200 transition-colors"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Menu - UserDropdown (when not authenticated or on mobile) */}
            {showDropdown && !isAuthenticated && (
                <UserDropdown
                    userName=""
                    onClose={() => setShowDropdown(false)}
                    onSignOut={logout}
                    isAuthenticated={false}
                />
            )}

            {/* Mobile Menu - UserDropdown (when authenticated on mobile) */}
            {showDropdown && isAuthenticated && user && (
                <div className="lg:hidden">
                    <UserDropdown
                        userName={user.name}
                        onClose={() => setShowDropdown(false)}
                        onSignOut={logout}
                        isAuthenticated={true}
                    />
                </div>
            )}
        </header>
    );
}
