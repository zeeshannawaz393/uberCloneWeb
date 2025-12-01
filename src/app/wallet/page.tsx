'use client';

import Link from 'next/link';
import { Header } from '@/components/navigation/Header';

export default function WalletPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8 pt-24">
                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 sm:mb-8">
                    {/* PKR Balance Card */}
                    <div className="bg-gray-100 rounded-2xl p-5 sm:p-6">
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">Balance</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-black mb-3 sm:mb-4">PKR 0</h2>
                        <p className="text-xs sm:text-sm text-black mb-4 sm:mb-6">
                            Add the bank account where you want to receive payouts
                        </p>
                        <button className="bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center sm:justify-start">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add bank account
                        </button>
                    </div>

                    {/* Uber Cash Card */}
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/20 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
                        <p className="text-xs sm:text-sm text-gray-700 mb-2">Uber Cash</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-black">PKR 0.00</h2>
                    </div>
                </div>

                {/* Payment Methods */}
                <section className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Payment Methods</h3>

                    {/* Cash Card */}
                    <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 sm:p-6 mb-4 relative overflow-hidden">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-white font-semibold text-sm sm:text-base">Cash</span>
                                    <span className="bg-white/30 text-white text-xs px-2 py-0.5 rounded-full">
                                        Preferred
                                    </span>
                                </div>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Add Payment Method */}
                    <button className="flex items-center gap-2 text-black font-medium hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors text-sm sm:text-base">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Payment Method
                    </button>
                </section>

                {/* Profiles */}
                <section className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Profiles</h3>

                    <div className="bg-white rounded-xl divide-y divide-gray-100 shadow-sm">
                        {/* Personal Profile */}
                        <button className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-black text-sm sm:text-base">Personal</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Cash</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Business Profile */}
                        <button className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-black text-sm sm:text-base">Business</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Cash</p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Shared with you */}
                        <button className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <p className="font-semibold text-black text-sm sm:text-base">Shared with you</p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Manage business rides for others
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Request access to their business profile
                                    </p>
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* Vouchers */}
                <section className="mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">Vouchers</h3>
                    <button className="flex items-center gap-2 text-black font-medium hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors text-sm sm:text-base">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add voucher
                    </button>
                </section>

                {/* In-Store Offers */}
                <section>
                    <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-4">In-Store Offers</h3>
                    <p className="text-sm sm:text-base text-gray-600">Offers</p>
                </section>
            </main>
        </div>
    );
}
