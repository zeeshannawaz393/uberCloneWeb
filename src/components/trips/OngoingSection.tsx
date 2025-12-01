'use client';

import { EmptyStateCard } from './EmptyStateCard';

interface OngoingSectionProps {
    hasOngoingTrips?: boolean;
}

export function OngoingSection({ hasOngoingTrips = false }: OngoingSectionProps) {
    return (
        <section className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 sm:mb-6">
                Ongoing
            </h1>

            {hasOngoingTrips ? (
                <div className="space-y-4">
                    {/* TODO: Add ongoing trip cards here */}
                    <p className="text-gray-600">Ongoing trips will appear here</p>
                </div>
            ) : (
                <EmptyStateCard />
            )}
        </section>
    );
}
