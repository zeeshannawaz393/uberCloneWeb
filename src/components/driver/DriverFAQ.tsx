'use client';

import { useState } from 'react';
import Link from 'next/link';

export function DriverFAQ() {
    const faqs = [
        {
            question: 'Can I drive with Uber in my city?',
            answer: <span>Uber is available in hundreds of cities worldwide. You can check if Uber is available in your city by visiting our <Link href="/cities" className="underline hover:no-underline">cities page</Link>.</span>
        },
        {
            question: 'What are the requirements to drive with Uber?',
            answer: 'Requirements vary by city, but generally include meeting the minimum age requirement, having a valid driver’s license, and passing a background check.'
        },
        {
            question: 'Is Uber safe?',
            answer: 'Your safety drives us. We are committed to helping you feel safe on the road. Our technology enables us to focus on driver safety before, during, and after every trip.'
        },
        {
            question: 'Do I need my own car?',
            answer: 'No, you don’t need your own car. We can connect you with partners who offer vehicle rentals.'
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12">
                    Frequently asked questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-lg font-medium text-black">
                                    {faq.question}
                                </span>
                                <svg
                                    className={`w-6 h-6 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-600">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
