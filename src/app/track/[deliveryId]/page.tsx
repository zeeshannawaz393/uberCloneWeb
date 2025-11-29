'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function TrackingPage() {
    const params = useParams();
    const deliveryId = params.deliveryId as string;

    // Mock delivery data
    const delivery = {
        id: deliveryId,
        status: 'in_transit' as const,
        courier: {
            name: 'John Doe',
            phone: '+1 (555) 123-4567',
            rating: 4.8,
        },
        package: {
            description: 'Electronics Package',
            fragile: true,
        },
        pickup: {
            address: '123 Main St, New York, NY',
        },
        dropoff: {
            address: '456 Park Ave, New York, NY',
        },
        eta: '15 minutes',
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-dark-900 mb-2">
                        Track Your Delivery
                    </h1>
                    <p className="text-dark-600">Delivery ID: {deliveryId}</p>
                </div>

                <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-6">
                    {/* Map Placeholder */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-0">
                                <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl h-96 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🗺️</div>
                                        <p className="text-dark-600">
                                            Map view will be displayed here
                                        </p>
                                        <p className="text-sm text-dark-500 mt-2">
                                            (Requires Mapbox API key)
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Delivery Timeline */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Delivery Timeline</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center text-white flex-shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <div className="font-medium">Order Placed</div>
                                            <div className="text-sm text-dark-600">10:30 AM</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center text-white flex-shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <div className="font-medium">Courier Assigned</div>
                                            <div className="text-sm text-dark-600">10:35 AM</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center text-white flex-shrink-0">
                                            ✓
                                        </div>
                                        <div>
                                            <div className="font-medium">Package Picked Up</div>
                                            <div className="text-sm text-dark-600">10:45 AM</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
                                            📦
                                        </div>
                                        <div>
                                            <div className="font-medium">In Transit</div>
                                            <div className="text-sm text-dark-600">Current</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center text-dark-600 flex-shrink-0">
                                            ○
                                        </div>
                                        <div>
                                            <div className="font-medium text-dark-500">Delivered</div>
                                            <div className="text-sm text-dark-400">Pending</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Delivery Info Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Delivery Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <StatusBadge status={delivery.status} className="w-full justify-center" />

                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-primary-600">
                                            {delivery.eta}
                                        </div>
                                        <div className="text-sm text-dark-600">Estimated Arrival</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Courier Info</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
                                            👤
                                        </div>
                                        <div>
                                            <div className="font-medium">{delivery.courier.name}</div>
                                            <div className="text-sm text-dark-600">
                                                ⭐ {delivery.courier.rating}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t">
                                        <a
                                            href={`tel:${delivery.courier.phone}`}
                                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                        >
                                            📞 {delivery.courier.phone}
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Package Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="text-dark-600">Description:</span>
                                        <div className="font-medium">{delivery.package.description}</div>
                                    </div>
                                    {delivery.package.fragile && (
                                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                                            ⚠️ Fragile
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Locations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="text-dark-600 mb-1">📍 Pickup</div>
                                        <div className="font-medium">{delivery.pickup.address}</div>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="text-dark-600 mb-1">🎯 Dropoff</div>
                                        <div className="font-medium">{delivery.dropoff.address}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
