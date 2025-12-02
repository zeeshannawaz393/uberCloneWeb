'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Car, Calendar, FileText } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function VehicleDetailsPage() {
    const router = useRouter();

    const [vehicleData, setVehicleData] = useState({
        make: 'Toyota',
        model: 'Prius',
        year: '2022',
        color: 'Silver',
        plate: 'AB12 CDE',
        vin: 'JT2BF18K1X0123456',
        seats: '4'
    });

    return (
        <main className="min-h-screen bg-gray-50 pb-6">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Vehicle Details</h1>
                        <p className="text-sm text-gray-500">Manage your vehicle information</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Vehicle Photo */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-900 mb-4">Vehicle Photo</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            <Car className="w-12 h-12 text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <Button variant="outline" size="sm">
                                Upload Photo
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">Clear photo of your vehicle</p>
                        </div>
                    </div>
                </div>

                {/* Vehicle Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-900 mb-4">Vehicle Information</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Make"
                                value={vehicleData.make}
                                onChange={(e) => setVehicleData({ ...vehicleData, make: e.target.value })}
                                variant="onboarding"
                                required
                            />
                            <Input
                                label="Model"
                                value={vehicleData.model}
                                onChange={(e) => setVehicleData({ ...vehicleData, model: e.target.value })}
                                variant="onboarding"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Year"
                                value={vehicleData.year}
                                onChange={(e) => setVehicleData({ ...vehicleData, year: e.target.value })}
                                variant="onboarding"
                                icon={<Calendar className="w-5 h-5" />}
                                required
                            />
                            <Input
                                label="Color"
                                value={vehicleData.color}
                                onChange={(e) => setVehicleData({ ...vehicleData, color: e.target.value })}
                                variant="onboarding"
                                required
                            />
                        </div>

                        <Input
                            label="License Plate"
                            value={vehicleData.plate}
                            onChange={(e) => setVehicleData({ ...vehicleData, plate: e.target.value })}
                            variant="onboarding"
                            required
                        />

                        <Input
                            label="VIN Number"
                            value={vehicleData.vin}
                            onChange={(e) => setVehicleData({ ...vehicleData, vin: e.target.value })}
                            variant="onboarding"
                            icon={<FileText className="w-5 h-5" />}
                            required
                        />

                        <Input
                            label="Number of Seats"
                            type="number"
                            value={vehicleData.seats}
                            onChange={(e) => setVehicleData({ ...vehicleData, seats: e.target.value })}
                            variant="onboarding"
                            required
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
                    <div className="max-w-2xl mx-auto">
                        <Button
                            onClick={() => alert('Vehicle details updated!')}
                            className="w-full"
                            size="lg"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
