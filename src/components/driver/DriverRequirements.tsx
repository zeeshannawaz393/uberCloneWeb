'use client';

import { Button } from '@/components/ui/Button';

export function DriverRequirements() {
    const requirements = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            title: 'Sign up requirements',
            description: 'Drivers must meet the minimum age requirements, have the legal right to work in their country, and pass a background check.',
            link: 'Sign up to drive'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'Driver requirements',
            description: 'You need a valid driver’s license, proof of residency in your city, state, or province, and insurance if you plan to drive your own car.',
            link: 'See details'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            title: 'Vehicle requirements',
            description: 'You can sign up even if you don’t have a car. We can help you get one.',
            link: 'See vehicle options'
        }
    ];

    return (
        <section className="bg-gray-50 py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12">
                    Requirements
                </h2>

                <div className="grid md:grid-cols-3 gap-12">
                    {requirements.map((req, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <div className="mb-4">
                                {req.icon}
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">
                                {req.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {req.description}
                            </p>
                            <Button
                                variant="ghost"
                                className="text-black font-medium hover:underline hover:bg-transparent p-0 h-auto"
                            >
                                {req.link}
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
