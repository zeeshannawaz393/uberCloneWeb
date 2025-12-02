'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, BellOff, Volume2, VolumeX, Smartphone } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
    const router = useRouter();

    const [settings, setSettings] = useState({
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false,
        tripRequests: true,
        tripUpdates: true,
        earnings: true,
        promotions: false,
        soundEnabled: true,
        vibrationEnabled: true
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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
                        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-sm text-gray-500">Manage your notification preferences</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Notification Channels */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-900">Notification Channels</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-gray-600" />
                                <div>
                                    <div className="font-medium text-gray-900">Push Notifications</div>
                                    <div className="text-xs text-gray-500">Receive alerts on your device</div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('pushNotifications')}
                                className={`relative w-12 h-6 rounded-full transition-colors ${settings.pushNotifications ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-gray-600" />
                                <div>
                                    <div className="font-medium text-gray-900">SMS Notifications</div>
                                    <div className="text-xs text-gray-500">Receive text messages</div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('smsNotifications')}
                                className={`relative w-12 h-6 rounded-full transition-colors ${settings.smsNotifications ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.smsNotifications ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notification Types */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-900">Notification Types</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {[
                            { key: 'tripRequests', label: 'Trip Requests', desc: 'New ride requests' },
                            { key: 'tripUpdates', label: 'Trip Updates', desc: 'Changes to active trips' },
                            { key: 'earnings', label: 'Earnings', desc: 'Daily and weekly summaries' },
                            { key: 'promotions', label: 'Promotions', desc: 'Special offers and bonuses' }
                        ].map(({ key, label, desc }) => (
                            <div key={key} className="p-4 flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-gray-900">{label}</div>
                                    <div className="text-xs text-gray-500">{desc}</div>
                                </div>
                                <button
                                    onClick={() => toggleSetting(key as any)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${settings[key as keyof typeof settings] ? 'bg-green-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings[key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-0'
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sound & Vibration */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-900">Sound & Vibration</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-gray-600" /> : <VolumeX className="w-5 h-5 text-gray-600" />}
                                <div>
                                    <div className="font-medium text-gray-900">Sound</div>
                                    <div className="text-xs text-gray-500">Play notification sounds</div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('soundEnabled')}
                                className={`relative w-12 h-6 rounded-full transition-colors ${settings.soundEnabled ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Smartphone className="w-5 h-5 text-gray-600" />
                                <div>
                                    <div className="font-medium text-gray-900">Vibration</div>
                                    <div className="text-xs text-gray-500">Vibrate on notifications</div>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('vibrationEnabled')}
                                className={`relative w-12 h-6 rounded-full transition-colors ${settings.vibrationEnabled ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.vibrationEnabled ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
