/**
 * User Dropdown Component - Responsive
 * Desktop: Dropdown menu
 * Mobile: Full-screen menu with navigation
 */

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserDropdownProps {
    userName: string;
    onClose: () => void;
    onSignOut: () => void;
    isAuthenticated?: boolean;
}

export function UserDropdown({ userName, onClose, onSignOut, isAuthenticated = true }: UserDropdownProps) {
    const router = useRouter();

    const menuItems = [
        { icon: '👤', label: 'Manage account', href: '/account' },
        { icon: '🚗', label: 'Ride', href: '/trip' },
        { icon: '🚙', label: 'Drive & deliver', href: '/drive' },
        { icon: '🍽️', label: 'Uber Eats', href: '/eats' },
        { icon: '💼', label: 'Uber for Business', href: '/business' },
    ];

    // Mobile navigation links (shown when not authenticated on mobile)
    const mobileNavLinks = [
        { label: 'Ride', href: '/ride' },
        { label: 'Drive', href: '/drive' },
        { label: 'Business', href: '/business' },
        { label: 'Uber Eats', href: '/uber-eats' },
        { label: 'About', href: '/about' },
    ];

    const handleItemClick = (href: string) => {
        router.push(href);
        onClose();
    };

    const handleSignOut = () => {
        onSignOut();
        onClose();
        router.push('/');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black/60 lg:bg-transparent"
                onClick={onClose}
            />

            {/* Dropdown/Menu - Responsive */}
            <div
                className="fixed lg:absolute inset-0 lg:inset-auto lg:right-0 lg:top-[calc(100%+12px)] w-full lg:w-[400px] bg-white lg:rounded-2xl z-50 overflow-y-auto"
                style={{
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
            >
                {/* Mobile Header with Close Button */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-black">Menu</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {isAuthenticated ? (
                    <>
                        {/* Header with User Name */}
                        <div className="h-20 lg:h-28 px-4 lg:px-7 flex items-center gap-3 lg:gap-4 border-b border-[#EEEEEE]">
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#E5E5E5] rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 lg:w-9 lg:h-9 text-[#9E9E9E]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-[20px] lg:text-[24px] font-bold text-black leading-tight">
                                {userName}
                            </span>
                        </div>

                        {/* Icon Buttons Row */}
                        <div className="px-4 lg:px-7 py-4 lg:py-5 grid grid-cols-3 gap-2 lg:gap-3 border-b border-[#EEEEEE]">
                            <button className="h-16 lg:h-20 flex flex-col items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 lg:py-3 rounded-xl bg-[#F6F6F6] hover:bg-[#EEEEEE] transition-colors duration-150">
                                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[12px] lg:text-[13px] text-[#5E5E5E] leading-tight font-medium">Help</span>
                            </button>

                            <button className="h-16 lg:h-20 flex flex-col items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 lg:py-3 rounded-xl bg-[#F6F6F6] hover:bg-[#EEEEEE] transition-colors duration-150">
                                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <span className="text-[12px] lg:text-[13px] text-[#5E5E5E] leading-tight font-medium">Wallet</span>
                            </button>

                            <button className="h-16 lg:h-20 flex flex-col items-center justify-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 lg:py-3 rounded-xl bg-[#F6F6F6] hover:bg-[#EEEEEE] transition-colors duration-150">
                                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-[12px] lg:text-[13px] text-[#5E5E5E] leading-tight font-medium">Activity</span>
                            </button>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2 border-b border-[#EEEEEE]">
                            {menuItems.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => handleItemClick(item.href)}
                                    className="w-full h-[56px] lg:h-[60px] px-4 lg:px-7 flex items-center justify-between hover:bg-[#F6F6F6] transition-colors duration-150"
                                >
                                    <div className="flex items-center gap-3 lg:gap-4">
                                        <span className="text-[20px] lg:text-[24px] leading-none">{item.icon}</span>
                                        <span className="text-[16px] lg:text-[17px] font-medium text-black leading-tight">{item.label}</span>
                                    </div>
                                    <svg className="w-4 h-4 text-[#9E9E9E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>

                        {/* Sign Out */}
                        <div className="h-16 lg:h-20 px-4 lg:px-7 flex items-center">
                            <button
                                onClick={handleSignOut}
                                className="w-full bg-[#F0F0F0] hover:bg-[#E5E5E5] text-black text-[16px] lg:text-[17px] font-semibold py-3 lg:py-3.5 rounded-lg transition-colors duration-150"
                            >
                                Sign out
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Not Authenticated - Show Navigation Links (Mobile) */}
                        <nav className="p-4">
                            <div className="space-y-1 mb-4">
                                {mobileNavLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="block px-4 py-3 text-[16px] font-medium text-black hover:bg-gray-100 rounded-lg transition-colors"
                                        onClick={onClose}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="my-4 border-t border-gray-200"></div>

                            {/* Help */}
                            <Link
                                href="/help"
                                className="block px-4 py-3 text-[16px] font-medium text-black hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={onClose}
                            >
                                Help
                            </Link>

                            {/* Language */}
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-[16px] font-medium text-black hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                                English
                            </button>

                            {/* Divider */}
                            <div className="my-4 border-t border-gray-200"></div>

                            {/* Auth Buttons */}
                            <div className="space-y-2">
                                <Link
                                    href="/signup"
                                    className="block w-full bg-black text-white text-center px-4 py-3 rounded-lg text-[16px] font-semibold hover:bg-gray-800 transition-colors"
                                    onClick={onClose}
                                >
                                    Sign up
                                </Link>
                                <Link
                                    href="/login"
                                    className="block w-full bg-white text-black text-center px-4 py-3 rounded-lg text-[16px] font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
                                    onClick={onClose}
                                >
                                    Log in
                                </Link>
                            </div>
                        </nav>
                    </>
                )}
            </div>
        </>
    );
}
