import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/navigation/Header';
import { Footer } from '@/components/navigation/Footer';
import { Button } from '@/components/ui/Button';
import { VehicleOptionsList } from '@/components/driver/VehicleOptionsList';

export default function VehicleRequirementsPage() {
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
                                    Vehicle requirements in the UK
                                </h1>
                                <p className="text-lg text-gray-600 mb-8">
                                    Most cars can drive with us, but requirements vary by category. See what options are available for your vehicle.
                                </p>
                            </div>
                            <div className="flex-1 w-full max-w-lg lg:max-w-xl flex justify-center">
                                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                                    <Image
                                        src="/images/driver/vehicles/hero.png"
                                        alt="Vehicle requirements"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Must Haves Section */}
                <section className="bg-gray-50 py-16">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-black mb-8">
                                    Your vehicle must-haves
                                </h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">Valid Private Hire Vehicle (PHV) licence</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">4-door vehicle in good condition</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">No commercial branding or cosmetic damage</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700">Registered in the UK</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 flex justify-center">
                                {/* Illustration of basic car requirements */}
                                <div className="relative w-full max-w-md aspect-video bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
                                    <div className="text-center">
                                        <p className="text-gray-500 text-sm mb-2">Example Vehicle</p>
                                        <div className="relative w-48 h-32 mx-auto">
                                            <Image
                                                src="/images/driver/vehicles/nanox.png"
                                                alt="Standard vehicle"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Vehicle Options List */}
                <section className="bg-white py-16 lg:py-24">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                        <h2 className="text-3xl font-bold text-black mb-4">
                            Vehicle options in the UK
                        </h2>
                        <p className="text-gray-600 mb-12 max-w-2xl">
                            From everyday rides to premium experiences, see which category your vehicle fits into.
                        </p>

                        <VehicleOptionsList />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-black py-16">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-16 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            Ready to hit the road?
                        </h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            Sign up today and start earning with us.
                        </p>
                        <Link href="/auth/signup?type=driver">
                            <Button variant="primary" size="lg" className="bg-white text-black hover:bg-gray-100 rounded-lg text-lg px-8 py-6 border-0">
                                Sign up to drive
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
