'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function DriverExtras() {
    const extras = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            title: 'Get support',
            description: 'Let’s make every Uber trip hassle-free. Our support pages can help you set up your account, get started with the app, adjust fares, and more.',
            link: 'Get help',
            href: '/help'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            ),
            title: 'Contact us',
            description: 'Got questions? We’ve got answers. Contact us for any questions you might have.',
            link: 'Contact us',
            href: '/contact'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'Get started',
            description: 'Start making money. Sign up to drive with Uber today.',
            link: 'Sign up now',
            href: '/driver/onboarding/resume'
        }
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12">
                    Driver extras
                </h2>
                <p className="text-lg text-gray-600 mb-12">
                    More resources to help you
                </p>

                <div className="grid md:grid-cols-3 gap-12">
                    {extras.map((extra, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <div className="mb-4 text-black">
                                {extra.icon}
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">
                                {extra.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {extra.description}
                            </p>
                            <Link href={extra.href} className="inline-block">
                                <Button
                                    variant="ghost"
                                    className="text-black font-medium hover:underline hover:bg-transparent p-0 h-auto"
                                >
                                    {extra.link}
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
