'use client';

import { FilterBar } from './FilterBar';
import { FeaturedTripCard } from './FeaturedTripCard';
import { TripCardGrid } from './TripCardGrid';
import { TripHistory } from '@/types/trip';

interface PastTripsSectionProps {
    trips: TripHistory[];
}

export function PastTripsSection({ trips }: PastTripsSectionProps) {
    // Separate featured trip from regular trips
    const featuredTrip = trips.find(trip => trip.isFeatured);
    const regularTrips = trips.filter(trip => !trip.isFeatured);

    return (
        <section>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 sm:mb-6">
                Past
            </h1>

            <FilterBar />

            {/* Featured Trip */}
            {featuredTrip && <FeaturedTripCard trip={featuredTrip} />}

            {/* Regular Trips Grid */}
            {regularTrips.length > 0 && <TripCardGrid trips={regularTrips} />}

            {/* More Button */}
            {trips.length > 0 && (
                <div className="flex justify-center mt-6">
                    <button className="px-6 py-3 text-sm font-semibold text-black hover:bg-gray-100 rounded-lg transition-colors">
                        More
                    </button>
                </div>
            )}
        </section>
    );
}
