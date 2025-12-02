'use client';

import { DriverMap } from '@/components/driver/dashboard/DriverMap';
import { DriverHeader } from '@/components/driver/dashboard/DriverHeader';
import { GoOnlineSlider } from '@/components/driver/dashboard/GoOnlineSlider';
import { RequestFeed } from '@/components/driver/dashboard/RequestFeed';
import { TripControls } from '@/components/driver/dashboard/TripControls';
import { DashboardTabs } from '@/components/driver/dashboard/DashboardTabs';
import { ReserveNotifications } from '@/components/driver/reserve/ReserveNotifications';
import { useDriverJourney } from '@/features/driver/driver-journey.state';
import { useReserveStore } from '@/features/driver/reserve.state';
import { useReserveSimulator } from '@/hooks/useReserveSimulator';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DriverDashboardPage() {
    const router = useRouter();
    const { status } = useDriverJourney();
    const { scheduledRides, loadAvailableReserves } = useReserveStore();
    const { generateMockReserves, generateAvailableReserves } = useReserveSimulator();

    // Protect route - ensure driver is logged in (mock check for now)
    useEffect(() => {
        // In real app, check auth state here
    }, []);

    // Load mock Reserve data on mount
    useEffect(() => {
        if (scheduledRides.length === 0) {
            const mockReserves = generateMockReserves();
            // Add them to the store
            mockReserves.forEach(reserve => {
                useReserveStore.setState((state) => ({
                    scheduledRides: [...state.scheduledRides, reserve]
                }));
            });
        }

        // Load available reserves
        loadAvailableReserves(generateAvailableReserves());
    }, []);

    // Demo Mode Logic
    const [demoMode, setDemoMode] = useState(false);

    useEffect(() => {
        if (!demoMode) return;

        const journey = useDriverJourney.getState();
        let step = 0;

        const runStep = () => {
            switch (step) {
                case 0:
                    console.log('Demo: Going Online');
                    journey.goOnline();
                    break;
                case 1:
                    console.log('Demo: Incoming Request');
                    journey.setIncomingRequest({
                        id: 'demo-123',
                        riderName: 'Demo Rider',
                        riderRating: 5.0,
                        pickupAddress: '123 Demo St',
                        dropoffAddress: '456 Test Ave',
                        distance: '1.5 km',
                        duration: '5 min',
                        price: 15.00,
                        type: 'Standard'
                    });
                    break;
                case 2:
                    console.log('Demo: Accepting Request');
                    journey.acceptRequest();
                    break;
                case 3:
                    console.log('Demo: Arrived at Pickup');
                    journey.arriveAtPickup();
                    break;
                case 4:
                    console.log('Demo: Verifying PIN & Starting Trip');
                    journey.verifyPin('1234');
                    journey.startTrip();
                    break;
                case 5:
                    console.log('Demo: Arrived at Dropoff');
                    journey.arriveAtDropoff();

                    // Simulate Back-to-Back Request
                    setTimeout(() => {
                        console.log('Demo: Simulating Back-to-Back Request');
                        journey.setIncomingRequest({
                            id: 'demo-456',
                            riderName: 'Next Rider (Bob)',
                            riderRating: 4.9,
                            pickupAddress: '789 Next St',
                            dropoffAddress: '101 End Rd',
                            distance: '0.5 km',
                            duration: '2 min',
                            price: 8.50,
                            type: 'Standard'
                        });
                    }, 1000);
                    break;
                case 6:
                    console.log('Demo: Completing Trip');
                    // If we have a request, accept it first for the demo
                    if (journey.incomingRequest) {
                        journey.acceptRequest();
                    }
                    journey.completeTrip();

                    // If we had a queued ride, we continue the demo
                    if (journey.activeRide?.riderName === 'Next Rider (Bob)') {
                        console.log('Demo: Started Back-to-Back Trip!');
                        // Reset step to 3 (Arrived at Pickup) to continue loop for new rider
                        step = 2;
                    } else {
                        setDemoMode(false);
                    }
                    return;
            }
            step++;
        };

        const interval = setInterval(runStep, 3000);
        runStep(); // Run first step immediately

        return () => clearInterval(interval);
    }, [demoMode]);

    // Simulate incoming requests when online (and not in demo mode)
    useEffect(() => {
        if (status !== 'online' || demoMode) return;

        const interval = setInterval(() => {
            const journey = useDriverJourney.getState();
            if (journey.status === 'online') {
                journey.setIncomingRequest({
                    id: Math.random().toString(36).substr(2, 9),
                    riderName: ['Alice', 'Bob', 'Charlie', 'Diana'][Math.floor(Math.random() * 4)],
                    riderRating: 4.5 + Math.random() * 0.5,
                    pickupAddress: '123 Main St',
                    dropoffAddress: '456 Oak Ave',
                    distance: `${(Math.random() * 5 + 1).toFixed(1)} km`,
                    duration: `${Math.floor(Math.random() * 20 + 5)} min`,
                    price: Math.random() * 20 + 10,
                    type: ['Standard', 'XL', 'Executive'][Math.floor(Math.random() * 3)] as any
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [status, demoMode]);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-gray-100">
            {/* Map Layer */}
            <div className="absolute inset-0 z-0">
                <DriverMap />
            </div>

            {/* Header Layer */}
            <DriverHeader />

            {/* Reserve Notifications */}
            <ReserveNotifications />

            {/* Demo Controls */}
            <div className="absolute top-20 right-4 z-20">
                <button
                    onClick={() => setDemoMode(!demoMode)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm shadow-lg transition-colors ${demoMode
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                >
                    {demoMode ? '⏸ Stop Demo' : '▶ Auto-Run Demo (3s)'}
                </button>
            </div>

            {/* Action Sheet Layer (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
                <div className="pointer-events-auto relative">
                    {/* Always show RequestFeed if there is an incoming request (handles both idle and back-to-back) */}
                    {useDriverJourney.getState().incomingRequest && <RequestFeed />}

                    {/* Show other controls based on status */}
                    {status === 'offline' && <GoOnlineSlider />}
                    {['pickup', 'arrived', 'in_progress', 'dropping_off'].includes(status) && <TripControls />}
                </div>
            </div>

            {/* Tab Navigation */}
            <DashboardTabs />
        </main>
    );
}
