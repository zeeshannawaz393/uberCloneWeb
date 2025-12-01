'use client';

import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-black text-white py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                {/* Logo */}
                <div className="mb-12">
                    <Link href="/" className="text-2xl font-normal tracking-tight">
                        Uber
                    </Link>
                    <div className="mt-4">
                        <Link href="/help" className="text-sm hover:underline">
                            Visit Help Center
                        </Link>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    <div>
                        <h3 className="font-bold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white">About us</Link></li>
                            <li><Link href="#" className="hover:text-white">Our offerings</Link></li>
                            <li><Link href="#" className="hover:text-white">Newsroom</Link></li>
                            <li><Link href="#" className="hover:text-white">Investors</Link></li>
                            <li><Link href="#" className="hover:text-white">Blog</Link></li>
                            <li><Link href="#" className="hover:text-white">Careers</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Products</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/ride" className="hover:text-white">Ride</Link></li>
                            <li><Link href="/drive" className="hover:text-white">Drive</Link></li>
                            <li><Link href="#" className="hover:text-white">Deliver</Link></li>
                            <li><Link href="#" className="hover:text-white">Eat</Link></li>
                            <li><Link href="#" className="hover:text-white">Uber for Business</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Global citizenship</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white">Safety</Link></li>
                            <li><Link href="#" className="hover:text-white">Diversity and Inclusion</Link></li>
                            <li><Link href="#" className="hover:text-white">Sustainability</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-4">Travel</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white">Reserve</Link></li>
                            <li><Link href="#" className="hover:text-white">Airports</Link></li>
                            <li><Link href="#" className="hover:text-white">Cities</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Social & App Links */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-800 pt-12">
                    <div className="flex gap-6">
                        {/* Social Icons Placeholder */}
                        <div className="w-6 h-6 bg-gray-700 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-700 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-700 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-700 rounded-sm"></div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400">
                        <Link href="#" className="hover:text-white flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            English
                        </Link>
                        <Link href="#" className="hover:text-white flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            San Francisco Bay Area
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
