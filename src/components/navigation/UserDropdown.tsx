/**
 * User Dropdown Component
 * Optimized size - all options visible
 */

'use client';

import { useRouter } from 'next/navigation';

interface UserDropdownProps {
    userName: string;
    onClose: () => void;
    onSignOut: () => void;
}

export function UserDropdown({ userName, onClose, onSignOut }: UserDropdownProps) {
    const router = useRouter();

    const menuItems = [
        { icon: '👤', label: 'Manage account', href: '/account' },
        { icon: '🚗', label: 'Ride', href: '/trip' },
        { icon: '🚙', label: 'Drive & deliver', href: '/drive' },
        { icon: '🍽️', label: 'Uber Eats', href: '/eats' },
        { icon: '💼', label: 'Uber for Business', href: '/business' },
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
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Dropdown Card - All options visible */}
            <div
                className="absolute right-0 top-[calc(100%+12px)] w-[400px] bg-white rounded-2xl z-50"
                style={{
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
            >
                {/* Header with User Name */}
                <div className="h-28 px-7 flex items-center gap-4 border-b border-[#EEEEEE]">
                    <div className="w-16 h-16 bg-[#E5E5E5] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-9 h-9 text-[#9E9E9E]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-[24px] font-bold text-black leading-tight">
                        {userName}
                    </span>
                </div>

                {/* Icon Buttons Row */}
                <div className="px-7 py-5 grid grid-cols-3 gap-3 border-b border-[#EEEEEE]">
                    <button className="h-20 flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-xl bg-[#F6F6F6] hover:bg-[#EEEEEE] transition-colors duration-150">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-[13px] text-[#5E5E5E] leading-tight font-medium">Help</span>
                    </button>

                    <button className="h-20 flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-xl bg-[#F6F6F6] hover:bg-[#EEEEEE] transition-colors duration-150">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="text-[13px] text-[#5E5E5E] leading-tight font-medium">Wallet</span>
                    </button>

                    <button className="h-20 flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-xl bg-[#F6F6F6] hover:bg-[#EEEEEE] transition-colors duration-150">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="text-[13px] text-[#5E5E5E] leading-tight font-medium">Activity</span>
                    </button>
                </div>

                {/* Menu Items */}
                <div className="py-2 border-b border-[#EEEEEE]">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleItemClick(item.href)}
                            className="w-full h-[60px] px-7 flex items-center justify-between hover:bg-[#F6F6F6] transition-colors duration-150"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-[24px] leading-none">{item.icon}</span>
                                <span className="text-[17px] font-medium text-black leading-tight">{item.label}</span>
                            </div>
                            <svg className="w-4 h-4 text-[#9E9E9E]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* Sign Out */}
                <div className="h-20 px-7 flex items-center">
                    <button
                        onClick={handleSignOut}
                        className="w-full bg-[#F0F0F0] hover:bg-[#E5E5E5] text-black text-[17px] font-semibold py-3.5 rounded-lg transition-colors duration-150"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </>
    );
}
