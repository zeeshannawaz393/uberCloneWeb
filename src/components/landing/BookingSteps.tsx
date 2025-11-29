/**
 * Booking Steps - Responsive
 * 3-step booking process with vertical timeline (desktop only)
 */

'use client';

export function BookingSteps() {
    const steps = [
        {
            title: '1. Add your trip details',
            description: 'Enter your pickup spot and destination, and check prices for your trip.',
            image: '/images/step-1.webp',
        },
        {
            title: '2. Pay easily',
            description: 'Add your preferred payment method, then choose among the ride options available in your location.',
            image: '/images/step-2.webp',
        },
        {
            title: '3. Meet your driver',
            description: 'Uber will match you with a driver nearby, and you\'ll get updates on your phone or computer about when to meet them.',
            note: 'Book your first ride',
            image: '/images/step-3.webp',
        },
    ];

    return (
        <section className="bg-white py-12 sm:py-16 md:py-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
                {/* Section Heading */}
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] leading-tight font-bold tracking-tight mb-12 sm:mb-16 md:mb-20 text-black">
                    Book your trip on your phone or computer
                </h2>

                {/* Steps */}
                <div className="relative">
                    {/* Vertical Line - Desktop only */}
                    <div className="absolute left-[45%] top-8 bottom-24 w-[1px] bg-black hidden lg:block"></div>

                    <div className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
                        {steps.map((step, index) => (
                            <div key={index} className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
                                {/* Image */}
                                <div className="relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-[200px] w-full max-w-[350px] mx-auto lg:mx-0">
                                    <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                                        {/* Placeholder for actual illustration */}
                                        <img
                                            src={step.image}
                                            alt={`Step ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200');
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Timeline Marker (Center) - Desktop only */}
                                <div className="hidden lg:flex justify-center pt-2 relative z-10">
                                    <div className="w-[8px] h-[8px] bg-black"></div>
                                </div>

                                {/* Content */}
                                <div className="pt-0 max-w-[400px] mx-auto lg:mx-0 text-center lg:text-left">
                                    <h3 className="text-[17px] sm:text-[18px] leading-[24px] font-bold mb-2 text-black">
                                        {step.title}
                                    </h3>
                                    <p className="text-[15px] sm:text-[16px] leading-[24px] text-gray-600 font-normal">
                                        {step.description}
                                    </p>
                                    {step.note && (
                                        <p className="text-[15px] sm:text-[16px] text-black underline mt-3 sm:mt-4 cursor-pointer hover:text-gray-600">
                                            {step.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
