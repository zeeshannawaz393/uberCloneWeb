'use client';

import { Header } from '@/components/navigation/Header';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pt-[100px]">
                <h1 className="text-3xl font-bold text-black mb-6">Help Center</h1>

                <div className="grid gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Common Issues</h2>
                        <ul className="space-y-3">
                            <li>
                                <button className="text-left text-gray-700 hover:text-black hover:underline">
                                    I lost an item
                                </button>
                            </li>
                            <li>
                                <button className="text-left text-gray-700 hover:text-black hover:underline">
                                    Review my fare or fees
                                </button>
                            </li>
                            <li>
                                <button className="text-left text-gray-700 hover:text-black hover:underline">
                                    I had a different issue with my charge
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
                        <p className="text-gray-600 mb-4">
                            Can't find what you're looking for? Our support team is here to help.
                        </p>
                        <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                            Chat with Support
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
