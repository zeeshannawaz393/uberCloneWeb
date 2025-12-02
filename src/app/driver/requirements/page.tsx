import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { Button } from '@/components/ui/Button';
import { DriverRegistrationSteps } from '@/components/driver/DriverRegistrationSteps';

export default function DriverRequirementsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-16">
                {/* Hero Section */}
                <section className="bg-white pt-12 pb-12 lg:pt-24 lg:pb-24">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                            <div className="flex-1 max-w-xl">
                                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-black">
                                    Driver requirements
                                </h1>
                                <h2 className="text-xl lg:text-2xl font-medium text-black mb-6">
                                    How to drive with us
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    Make money driving people around your city. Sign up now to get more information about driving in your city.
                                </p>
                                <Link href="/auth/signup?type=driver">
                                    <Button variant="solid" size="lg" className="rounded-lg text-lg px-8 py-6">
                                        Start driving with us
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex-1 w-full max-w-lg lg:max-w-xl">
                                <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                        src="/images/driver/requirements-illustration.png"
                                        alt="Driver requirements"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Section */}
                <DriverRegistrationSteps />

                {/* What else do you need Section */}
                <section className="bg-white py-16 lg:py-24">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                        <div className="mb-12">
                            <h2 className="text-lg text-gray-600 mb-2">
                                What else do you need?
                            </h2>
                            <h3 className="text-3xl lg:text-4xl font-bold text-black">
                                Get more from our platform
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Get Support */}
                            <Link href="/help" className="group block p-8 border border-gray-200 hover:border-gray-300 transition-colors rounded-xl">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xl font-bold text-black mb-2">Get support</h4>
                                        <p className="text-gray-600">
                                            Let's make every trip hassle-free. We can help you with account setup, fare adjustments, and more — whatever you need.
                                        </p>
                                    </div>
                                    <svg className="w-6 h-6 text-black transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </Link>

                            {/* Contact Us */}
                            <Link href="/contact" className="group block p-8 border border-gray-200 hover:border-gray-300 transition-colors rounded-xl">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xl font-bold text-black mb-2">Contact Us</h4>
                                        <p className="text-gray-600">
                                            Have questions? Get in-person support at a Greenlight Hub in the city you drive in. We're here for whatever you need.
                                        </p>
                                    </div>
                                    <svg className="w-6 h-6 text-black transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </Link>

                            {/* Partner Protection */}
                            <Link href="#" className="group block p-8 border border-gray-200 hover:border-gray-300 transition-colors rounded-xl">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-xl font-bold text-black mb-2">Partner Protection</h4>
                                        <p className="text-gray-600">
                                            Partner Protection helps protect you from the cost of accidents or life events, and is provided at no cost to all eligible independent driver partners.
                                        </p>
                                    </div>
                                    <svg className="w-6 h-6 text-black transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Ready to make money Section */}
                <section className="bg-gray-50 py-16 lg:py-24">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                            Ready to make money?
                        </h2>
                        <p className="text-xl text-black mb-8">
                            The first step is to sign up
                        </p>
                        <Link href="/auth/signup?type=driver" className="inline-block">
                            <span className="text-black font-medium underline hover:no-underline text-lg">Sign up to drive</span>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
