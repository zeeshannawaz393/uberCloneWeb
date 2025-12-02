'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, Phone, Users, AlertTriangle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SafetyPage() {
    const router = useRouter();

    const emergencyContacts = [
        { name: 'Emergency Services', number: '999', type: 'emergency' },
        { name: 'Safety Line', number: '0800 123 4567', type: 'support' }
    ];

    const safetyFeatures = [
        {
            icon: Phone,
            title: 'Emergency Assistance',
            description: 'Quick access to emergency services',
            action: 'Call 999'
        },
        {
            icon: Users,
            title: 'Share Trip Status',
            description: 'Let friends/family track your trips',
            action: 'Manage Contacts'
        },
        {
            icon: AlertTriangle,
            title: 'Report Safety Issue',
            description: 'Report incidents or concerns',
            action: 'Report Issue'
        },
        {
            icon: MapPin,
            title: 'Trusted Contacts',
            description: 'Add people who can see your location',
            action: 'Add Contact'
        }
    ];

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
                        <h1 className="text-xl font-bold text-gray-900">Safety & Security</h1>
                        <p className="text-sm text-gray-500">Your safety is our priority</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Emergency Contacts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-900">Emergency Contacts</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {emergencyContacts.map((contact, index) => (
                            <div key={index} className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${contact.type === 'emergency' ? 'bg-red-100' : 'bg-gray-100'
                                        }`}>
                                        <Phone className={`w-5 h-5 ${contact.type === 'emergency' ? 'text-red-600' : 'text-gray-600'
                                            }`} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">{contact.name}</div>
                                        <div className="text-sm text-gray-500">{contact.number}</div>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => alert(`Calling ${contact.number}...`)}
                                >
                                    Call
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Safety Features */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-900">Safety Features</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {safetyFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="p-4">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{feature.title}</h3>
                                            <p className="text-sm text-gray-500 mt-0.5">{feature.description}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => alert(`${feature.action} - Coming soon!`)}
                                    >
                                        {feature.action}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Safety Tips */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-gray-900 text-sm">Safety Tips</p>
                            <ul className="text-xs text-gray-700 mt-2 space-y-1 list-disc list-inside">
                                <li>Always verify rider details before starting trip</li>
                                <li>Trust your instincts - cancel if you feel unsafe</li>
                                <li>Keep doors locked until rider is verified</li>
                                <li>Share trip status with trusted contacts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
