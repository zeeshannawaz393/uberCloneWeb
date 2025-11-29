/**
 * Footer - Pixel Perfect
 * Exact replica of Uber footer based on screenshot
 */

'use client';

import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-20">
            <div className="max-w-[1280px] mx-auto px-4 lg:px-16">
                {/* Top Section */}
                <div className="mb-16">
                    <h3 className="text-[24px] font-normal mb-8">Uber</h3>
                    <Link href="/help" className="text-[16px] text-white hover:text-gray-300 transition-colors">
                        Visit Help Center
                    </Link>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-20">
                    {/* Company */}
                    <div>
                        <h4 className="text-[18px] font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-[14px] text-gray-300 hover:text-white transition-colors">About us</Link></li>
                            <li><Link href="/offerings" className="text-[14px] text-gray-300 hover:text-white transition-colors">Our offerings</Link></li>
                            <li><Link href="/newsroom" className="text-[14px] text-gray-300 hover:text-white transition-colors">Newsroom</Link></li>
                            <li><Link href="/investors" className="text-[14px] text-gray-300 hover:text-white transition-colors">Investors</Link></li>
                            <li><Link href="/blog" className="text-[14px] text-gray-300 hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/careers" className="text-[14px] text-gray-300 hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="text-[18px] font-bold mb-6">Products</h4>
                        <ul className="space-y-4">
                            <li><Link href="/ride" className="text-[14px] text-gray-300 hover:text-white transition-colors">Ride</Link></li>
                            <li><Link href="/drive" className="text-[14px] text-gray-300 hover:text-white transition-colors">Drive</Link></li>
                            <li><Link href="/eat" className="text-[14px] text-gray-300 hover:text-white transition-colors">Eat</Link></li>
                            <li><Link href="/business" className="text-[14px] text-gray-300 hover:text-white transition-colors">Uber for Business</Link></li>
                            <li><Link href="/freight" className="text-[14px] text-gray-300 hover:text-white transition-colors">Uber Freight</Link></li>
                            <li><Link href="/gift-cards" className="text-[14px] text-gray-300 hover:text-white transition-colors">Gift cards</Link></li>
                            <li><Link href="/health" className="text-[14px] text-gray-300 hover:text-white transition-colors">Uber Health</Link></li>
                        </ul>
                    </div>

                    {/* Global citizenship */}
                    <div>
                        <h4 className="text-[18px] font-bold mb-6">Global citizenship</h4>
                        <ul className="space-y-4">
                            <li><Link href="/safety" className="text-[14px] text-gray-300 hover:text-white transition-colors">Safety</Link></li>
                            <li><Link href="/diversity" className="text-[14px] text-gray-300 hover:text-white transition-colors">Diversity</Link></li>
                            <li><Link href="/sustainability" className="text-[14px] text-gray-300 hover:text-white transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>

                    {/* Travel */}
                    <div>
                        <h4 className="text-[18px] font-bold mb-6">Travel</h4>
                        <ul className="space-y-4">
                            <li><Link href="/reserve" className="text-[14px] text-gray-300 hover:text-white transition-colors">Reserve</Link></li>
                            <li><Link href="/airports" className="text-[14px] text-gray-300 hover:text-white transition-colors">Airports</Link></li>
                            <li><Link href="/cities" className="text-[14px] text-gray-300 hover:text-white transition-colors">Cities</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Social Links & App Stores */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    {/* Social Icons */}
                    <div className="flex gap-6">
                        {['facebook', 'twitter', 'youtube', 'linkedin', 'instagram'].map((social) => (
                            <a
                                key={social}
                                href={`#${social}`}
                                className="text-white hover:text-gray-300 transition-colors"
                                aria-label={social}
                            >
                                <div className="w-6 h-6 bg-current rounded-sm"></div>
                            </a>
                        ))}
                    </div>

                    {/* Language & Location */}
                    <div className="flex gap-6 text-[14px] font-medium">
                        <button className="flex items-center gap-2 hover:text-gray-300">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                            English
                        </button>
                        <button className="flex items-center gap-2 hover:text-gray-300">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                            San Francisco Bay Area
                        </button>
                    </div>
                </div>

                {/* App Store Badges */}
                <div className="flex gap-4 mb-12">
                    <img src="/images/google-play-badge.png" alt="Get it on Google Play" className="h-10 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML += '<div class="h-10 w-32 bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-xs">Google Play</div>' }} />
                    <img src="/images/app-store-badge.png" alt="Download on the App Store" className="h-10 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML += '<div class="h-10 w-32 bg-gray-800 rounded border border-gray-700 flex items-center justify-center text-xs">App Store</div>' }} />
                </div>

                {/* Bottom Links */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-400 pt-8 mt-8">
                    <span>© 2025 Uber Technologies Inc.</span>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
