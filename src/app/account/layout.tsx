/**
 * Account Layout
 * Black header with sidebar navigation
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Home', href: '/account' },
        { label: 'Personal info', href: '/account/personal-info' },
        { label: 'Security', href: '/account/security' },
        { label: 'Privacy & data', href: '/account/privacy-data' },
    ];

    return (
        <div className="min-h-screen bg-[#F6F6F6]">
            {/* Black Header */}
            <header className="bg-black text-white h-16 flex items-center fixed top-0 left-0 right-0 z-10">
                <div className="container mx-auto px-6">
                    <Link href="/" className="text-base font-medium">
                        Uber account
                    </Link>
                </div>
            </header>

            {/* Main Layout Container */}
            <div className="pt-16 flex">
                {/* Sidebar */}
                <aside className="w-[220px] bg-white min-h-screen p-4 fixed left-0 top-16">
                    <nav>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                    block px-4 py-3 rounded text-sm transition-colors
                    ${isActive
                                            ? 'bg-[#F6F6F6] font-medium text-black'
                                            : 'text-[#5E5E5E] hover:bg-gray-50'
                                        }
                  `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="ml-[220px] flex-1 p-10 max-w-[1020px]">
                    <div className="bg-white rounded-lg p-10 shadow-sm min-h-[calc(100vh-200px)]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
