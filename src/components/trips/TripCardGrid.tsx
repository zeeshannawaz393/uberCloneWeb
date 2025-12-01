'use client';

import { TripHistory } from '@/types/trip';
import { TripCard } from './TripCard';

interface TripCardGridProps {
    trips: TripHistory[];
}

export function TripCardGrid({ trips }: TripCardGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
            ))}
        </div>
    );
}
