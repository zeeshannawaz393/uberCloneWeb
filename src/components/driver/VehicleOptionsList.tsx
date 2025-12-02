'use client';

import Image from 'next/image';
import { useState } from 'react';

interface VehicleOption {
    id: string;
    title: string;
    description: string;
    image: string;
    requirements: string[];
}

export function VehicleOptionsList() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const vehicles: VehicleOption[] = [
        {
            id: 'standard',
            title: 'Standard',
            description: 'The standard option for everyday rides.',
            image: '/images/driver/vehicles/nanox.png',
            requirements: [
                '4-door vehicle in good condition',
                'No cosmetic damage or commercial branding',
                'Licensed to carry 4 passengers',
                'Vehicle year 2008 or newer (London), 2006 or newer (rest of UK)',
                'Meets Euro 6 emissions standards (ZEC required for new London licenses)',
                'Passes local authority PHV inspection'
            ]
        },
        {
            id: 'xl',
            title: 'XL',
            description: 'For larger groups and extra luggage.',
            image: '/images/driver/vehicles/nanoxl.png',
            requirements: [
                'SUV or Minivan',
                'Seats at least 6 passengers',
                '4-door vehicle in good condition',
                'No cosmetic damage or commercial branding',
                'Vehicle year 2008 or newer (London), 2006 or newer (rest of UK)',
                'Meets Euro 6 emissions standards'
            ]
        },
        {
            id: 'green',
            title: 'Green',
            description: 'Eco-friendly rides in electric or hybrid vehicles.',
            image: '/images/driver/vehicles/nanogreen.png',
            requirements: [
                'Fully electric or hybrid vehicle',
                'Zero Emission Capable (ZEC) in London',
                'Euro 6 emissions compliant',
                'Seats at least 4 passengers',
                'No cosmetic damage or commercial branding'
            ]
        },
        {
            id: 'executive',
            title: 'Executive',
            description: 'Premium rides for business and comfort.',
            image: '/images/driver/vehicles/nanoexec.png',
            requirements: [
                'Premium model (e.g., Mercedes E-Class, BMW 5 Series, Tesla Model S)',
                'Under 6 years old',
                'Leather interior',
                'Excellent mechanical and cosmetic condition',
                'Professional driver rating'
            ]
        },
        {
            id: 'lux',
            title: 'Lux',
            description: 'The ultimate luxury experience.',
            image: '/images/driver/vehicles/nanolux.png',
            requirements: [
                'High-end luxury vehicle (e.g., Mercedes S-Class, BMW 7 Series, Audi A8)',
                'Under 6 years old',
                'Immaculate condition',
                'Top-rated drivers only',
                'Seats at least 4 passengers'
            ]
        }
    ];

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="space-y-8">
            {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border-b border-gray-200 pb-8 last:border-0">
                    <div
                        className="flex flex-col md:flex-row items-center gap-8 cursor-pointer group"
                        onClick={() => toggleExpand(vehicle.id)}
                    >
                        <div className="w-full md:w-1/3 max-w-[280px]">
                            <div className="relative aspect-[16/9] w-full">
                                <Image
                                    src={vehicle.image}
                                    alt={vehicle.title}
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-between mb-2">
                                <h3 className="text-2xl font-bold text-black">{vehicle.title}</h3>
                                <svg
                                    className={`w-6 h-6 transform transition-transform duration-300 hidden md:block ${expandedId === vehicle.id ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-4">{vehicle.description}</p>

                            {/* Mobile expand indicator */}
                            <div className="md:hidden flex justify-center">
                                <svg
                                    className={`w-6 h-6 transform transition-transform duration-300 ${expandedId === vehicle.id ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            <div className={`overflow-hidden transition-all duration-300 ${expandedId === vehicle.id ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                <h4 className="font-medium text-black mb-2">Vehicle Requirements:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
                                    {vehicle.requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
