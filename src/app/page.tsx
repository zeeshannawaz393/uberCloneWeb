/**
 * Home Page
 * Updated Uber Landing Page
 */

'use client';

import { Header } from '@/components/navigation/Header';
import { HeroSection } from '@/components/landing/HeroSection';
import { BookingSteps } from '@/components/landing/BookingSteps';
import { RideOptions } from '@/components/landing/RideOptions';
import { Footer } from '@/components/navigation/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-16">
                <HeroSection />
                <BookingSteps />
                <RideOptions />
            </main>
            <Footer />
        </div>
    );
}
