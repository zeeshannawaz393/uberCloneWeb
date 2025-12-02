'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function DriverRegistrationSteps() {
    const steps = [
        {
            title: 'Sign up online',
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Got an email address and a smartphone? Great, now tell us a bit more about yourself and we'll get you started.
                    </p>
                    <Link href="/auth/signup?type=driver" className="inline-block">
                        <span className="text-black font-medium underline hover:no-underline">Sign up now</span>
                    </Link>
                </div>
            )
        },
        {
            title: 'Upload your documents',
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Time for some paperwork. Here are the documents we need to see:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>
                            <strong>UK Driving Licence</strong> (Must be a valid full UK driving licence)
                        </li>
                        <li>
                            <strong>Private Hire Driver Licence (PCO)</strong> (Required for London and many other cities)
                        </li>
                        <li>
                            <strong>Bank Statement</strong> (For payments)
                        </li>
                        <li>
                            <strong>Profile Photo</strong> (A clear photo of yourself)
                        </li>
                    </ul>
                </div>
            )
        },
        {
            title: 'Get a vehicle',
            content: (
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Which car is right for you? Make sure it meets our standards in the UK.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>
                            <strong>Vehicle Logbook (V5C)</strong>
                        </li>
                        <li>
                            <strong>Private Hire Vehicle Licence (PHV)</strong>
                        </li>
                        <li>
                            <strong>Private Hire Insurance Certificate</strong>
                        </li>
                        <li>
                            <strong>MOT Certificate</strong> (If applicable)
                        </li>
                    </ul>
                    <Link href="/driver/vehicles" className="inline-block pt-2">
                        <span className="text-black font-medium underline hover:no-underline">Vehicle requirements</span>
                    </Link>
                </div>
            )
        },
        {
            title: 'Activate your account',
            content: (
                <p className="text-gray-600">
                    If you've completed all the above steps, congratulations! You're ready to activate your account and hit the road.
                </p>
            )
        }
    ];

    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12">
                    Get started
                </h2>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[10px] top-2 bottom-2 w-[2px] bg-black" />

                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div key={index} className="relative pl-12">
                                {/* Dot */}
                                <div className="absolute left-0 top-2 w-4 h-4 bg-black rounded-full border-4 border-white box-content -ml-[1px]" />

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-black">
                                        {index + 1}. {step.title}
                                    </h3>
                                    {step.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
