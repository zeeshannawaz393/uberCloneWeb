'use client';

import { Header } from '@/components/navigation/Header';
import { OngoingSection } from '@/components/trips/OngoingSection';
import { PromotionalCard } from '@/components/trips/PromotionalCard';
import { PastTripsSection } from '@/components/trips/PastTripsSection';
import { mockTrips } from '@/mocks/trips';

export default function TripsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-8 pt-24">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Ongoing Section */}
                        <OngoingSection hasOngoingTrips={false} />

                        {/* Past Trips Section */}
                        <PastTripsSection trips={mockTrips} />
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:w-80 lg:flex-shrink-0">
                        <PromotionalCard />
                    </aside>
                </div>
            </div>
        </div>
    );
}
