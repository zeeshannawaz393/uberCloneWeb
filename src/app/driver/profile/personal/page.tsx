'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function PersonalInformationPage() {
    const router = useRouter();

    // Mock driver data
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Driver',
        email: 'john.driver@email.com',
        phone: '+44 7123 456789',
        address: '123 London Street',
        city: 'London',
        postcode: 'SW1A 1AA',
        dateOfBirth: '1990-05-15'
    });

    const handleSave = () => {
        alert('Personal information updated!\n\nIn production, this would save to the database.');
    };

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
                        <h1 className="text-xl font-bold text-gray-900">Personal Information</h1>
                        <p className="text-sm text-gray-500">Update your personal details</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Profile Photo */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-900 mb-4">Profile Photo</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            <User className="w-10 h-10 text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <Button variant="outline" size="sm">
                                Change Photo
                            </Button>
                            <p className="text-xs text-gray-500 mt-2">JPG or PNG. Max size 5MB.</p>
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-900 mb-4">Basic Information</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="First Name"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                variant="onboarding"
                                required
                            />
                            <Input
                                label="Last Name"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                variant="onboarding"
                                required
                            />
                        </div>

                        <Input
                            label="Date of Birth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            variant="onboarding"
                            icon={<Calendar className="w-5 h-5" />}
                            required
                        />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-900 mb-4">Contact Information</h2>
                    <div className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            variant="onboarding"
                            icon={<Mail className="w-5 h-5" />}
                            required
                        />

                        <Input
                            label="Phone Number"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            variant="onboarding"
                            icon={<Phone className="w-5 h-5" />}
                            required
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="font-bold text-gray-900 mb-4">Address</h2>
                    <div className="space-y-4">
                        <Input
                            label="Street Address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            variant="onboarding"
                            icon={<MapPin className="w-5 h-5" />}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="City"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                variant="onboarding"
                                required
                            />
                            <Input
                                label="Postcode"
                                value={formData.postcode}
                                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                variant="onboarding"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4">
                    <div className="max-w-2xl mx-auto">
                        <Button
                            onClick={handleSave}
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
