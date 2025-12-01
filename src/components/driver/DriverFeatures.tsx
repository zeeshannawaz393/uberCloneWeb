'use client';

import Image from 'next/image';

export function DriverFeatures() {
    const features = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Set your own schedule',
            description: 'You decide when and how often you drive.'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Make money on your terms',
            description: 'The more you drive, the more you can make.'
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
            ),
            title: 'Let the app lead the way',
            description: 'Just tap and go. You’ll get turn-by-turn directions.'
        }
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12">
                    Make money when you want
                </h2>

                {/* Feature Image */}
                <div className="mb-16 relative aspect-[21/9] w-full bg-blue-50 rounded-2xl overflow-hidden">
                    <Image
                        src="/images/driver/features.png"
                        alt="Drivers in car"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-start">
                            <div className="mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-black mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
