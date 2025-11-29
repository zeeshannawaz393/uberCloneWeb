/**
 * Ride Options - Responsive
 * "Ways to ride and more" section
 */

'use client';

import Image from 'next/image';

export function RideOptions() {
    return (
        <section className="bg-white py-12 sm:py-16 md:py-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
                {/* Section Heading */}
                <h2 className="text-[28px] sm:text-[32px] md:text-[36px] leading-tight font-bold tracking-tight mb-8 sm:mb-10 md:mb-12 text-black">
                    Ways to ride and more
                </h2>

                {/* Cards Grid - 2 Columns on tablet+, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Reserve Card */}
                    <div className="bg-[#F3F3F3] rounded-xl p-6 sm:p-8 flex justify-between items-center h-[200px] sm:h-[220px] md:h-[240px] relative overflow-hidden group cursor-pointer">
                        <div className="z-10 flex flex-col justify-between h-full items-start">
                            <div>
                                <h3 className="text-[22px] sm:text-[24px] font-bold mb-2 text-black">Reserve</h3>
                                <p className="text-[15px] sm:text-[16px] text-black max-w-[200px]">
                                    Reserve your ride in advance so you can relax on the day of your trip.
                                </p>
                            </div>
                            <button className="bg-white text-black px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium shadow-sm hover:bg-gray-50 transition-colors mt-3 sm:mt-4">
                                Details
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 w-[140px] sm:w-[160px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px]">
                            {/* Placeholder for Calendar/Clock Illustration */}
                            <div className="w-full h-full bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: 'url(/images/reserve-graphic.png)' }}></div>
                        </div>
                    </div>

                    {/* Ride Card */}
                    <div className="bg-[#F3F3F3] rounded-xl p-6 sm:p-8 flex justify-between items-center h-[200px] sm:h-[220px] md:h-[240px] relative overflow-hidden group cursor-pointer">
                        <div className="z-10 flex flex-col justify-between h-full items-start">
                            <div>
                                <h3 className="text-[22px] sm:text-[24px] font-bold mb-2 text-black">Ride</h3>
                                <p className="text-[15px] sm:text-[16px] text-black max-w-[200px]">
                                    Go anywhere with Uber. Request a ride, hop in, and go.
                                </p>
                            </div>
                            <button className="bg-white text-black px-4 sm:px-5 py-2 rounded-full text-[13px] sm:text-[14px] font-medium shadow-sm hover:bg-gray-50 transition-colors mt-3 sm:mt-4">
                                Details
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 w-[140px] sm:w-[160px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px]">
                            {/* Placeholder for Car Illustration */}
                            <div className="w-full h-full bg-contain bg-no-repeat bg-bottom" style={{ backgroundImage: 'url(/images/ride-graphic.png)' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
