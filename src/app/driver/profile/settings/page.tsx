'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Globe, Moon, MapPin, DollarSign, Lock, HelpCircle, ChevronRight, X, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function SettingsPage() {
    const router = useRouter();

    // State
    const [settings, setSettings] = useState({
        language: 'English (UK)',
        currency: 'GBP (£)',
        preferredAreas: ['Central London'],
        darkMode: false,
        locationAccess: true,
        biometricId: false,
        notifications: true
    });

    // Modal States
    const [activeModal, setActiveModal] = useState<string | null>(null);

    // Options Data
    const languages = ['English (UK)', 'English (US)', 'Spanish', 'French', 'German', 'Portuguese'];
    const currencies = ['GBP (£)', 'USD ($)', 'EUR (€)'];
    const areas = ['Central London', 'North London', 'South London', 'East London', 'West London', 'Heathrow Airport', 'Gatwick Airport'];

    // Handlers
    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleLanguageSelect = (lang: string) => {
        setSettings(prev => ({ ...prev, language: lang }));
        setActiveModal(null);
    };

    const handleCurrencySelect = (curr: string) => {
        setSettings(prev => ({ ...prev, currency: curr }));
        setActiveModal(null);
    };

    const toggleArea = (area: string) => {
        setSettings(prev => {
            const current = prev.preferredAreas;
            const updated = current.includes(area)
                ? current.filter(a => a !== area)
                : [...current, area];
            return { ...prev, preferredAreas: updated };
        });
    };

    const settingsSections = [
        {
            title: 'Preferences',
            items: [
                {
                    icon: Globe,
                    label: 'Language',
                    value: settings.language,
                    action: () => setActiveModal('language')
                },
                {
                    icon: DollarSign,
                    label: 'Currency',
                    value: settings.currency,
                    action: () => setActiveModal('currency')
                },
                {
                    icon: MapPin,
                    label: 'Preferred Areas',
                    value: `${settings.preferredAreas.length} selected`,
                    action: () => setActiveModal('areas')
                }
            ]
        },
        {
            title: 'App Settings',
            items: [
                {
                    icon: Moon,
                    label: 'Dark Mode',
                    value: settings.darkMode ? 'On' : 'Off',
                    isToggle: true,
                    toggleValue: settings.darkMode,
                    action: () => toggleSetting('darkMode')
                }
            ]
        },
        {
            title: 'Privacy & Security',
            items: [
                {
                    icon: MapPin,
                    label: 'Location Access',
                    value: settings.locationAccess ? 'Always' : 'While Using',
                    isToggle: true,
                    toggleValue: settings.locationAccess,
                    action: () => toggleSetting('locationAccess')
                },
                {
                    icon: Lock,
                    label: 'Biometric ID',
                    value: settings.biometricId ? 'Enabled' : 'Disabled',
                    isToggle: true,
                    toggleValue: settings.biometricId,
                    action: () => toggleSetting('biometricId')
                },
                {
                    icon: Lock,
                    label: 'Change Password',
                    value: null,
                    action: () => setActiveModal('password')
                }
            ]
        },
        {
            title: 'Support',
            items: [
                {
                    icon: HelpCircle,
                    label: 'Help Center',
                    value: null,
                    action: () => setActiveModal('help')
                },
                {
                    icon: HelpCircle,
                    label: 'Contact Support',
                    value: null,
                    action: () => setActiveModal('contact')
                }
            ]
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
                        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                        <p className="text-sm text-gray-500">Customize your app experience</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {settingsSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="font-bold text-gray-900">{section.title}</h2>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {section.items.map((item, itemIndex) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={itemIndex}
                                        onClick={item.action}
                                        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <div className="text-left">
                                                <div className="font-medium text-gray-900">{item.label}</div>
                                                {item.value && (
                                                    <div className="text-sm text-gray-500">{item.value}</div>
                                                )}
                                            </div>
                                        </div>
                                        {item.isToggle ? (
                                            <div className={`relative w-12 h-6 rounded-full transition-colors ${item.toggleValue ? 'bg-black' : 'bg-gray-300'
                                                }`}>
                                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${item.toggleValue ? 'translate-x-6' : 'translate-x-0'
                                                    }`} />
                                            </div>
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Logout Button */}
                <div className="pt-4">
                    <button
                        onClick={() => setActiveModal('logout')}
                        className="w-full p-4 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
                    >
                        Log Out
                    </button>
                </div>

                {/* App Version */}
                <div className="text-center text-xs text-gray-400 pb-8">
                    App Version 1.0.0 • Build 2024.12.02
                </div>
            </div>

            {/* Modals */}

            {/* Language Modal */}
            <Modal isOpen={activeModal === 'language'} onClose={() => setActiveModal(null)} title="Select Language">
                <div className="space-y-1">
                    {languages.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageSelect(lang)}
                            className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">{lang}</span>
                            {settings.language === lang && <Check className="w-5 h-5 text-black" />}
                        </button>
                    ))}
                </div>
            </Modal>

            {/* Currency Modal */}
            <Modal isOpen={activeModal === 'currency'} onClose={() => setActiveModal(null)} title="Select Currency">
                <div className="space-y-1">
                    {currencies.map((curr) => (
                        <button
                            key={curr}
                            onClick={() => handleCurrencySelect(curr)}
                            className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">{curr}</span>
                            {settings.currency === curr && <Check className="w-5 h-5 text-black" />}
                        </button>
                    ))}
                </div>
            </Modal>

            {/* Areas Modal */}
            <Modal isOpen={activeModal === 'areas'} onClose={() => setActiveModal(null)} title="Preferred Areas">
                <div className="space-y-1 mb-4">
                    {areas.map((area) => (
                        <button
                            key={area}
                            onClick={() => toggleArea(area)}
                            className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium text-gray-900">{area}</span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${settings.preferredAreas.includes(area) ? 'border-black bg-black text-white' : 'border-gray-300'
                                }`}>
                                {settings.preferredAreas.includes(area) && <Check className="w-4 h-4" />}
                            </div>
                        </button>
                    ))}
                </div>
                <Button onClick={() => setActiveModal(null)} className="w-full">Done</Button>
            </Modal>

            {/* Password Modal */}
            <Modal isOpen={activeModal === 'password'} onClose={() => setActiveModal(null)} title="Change Password">
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">We'll send a verification code to your email address to reset your password.</p>
                    <Button onClick={() => {
                        alert('Reset link sent!');
                        setActiveModal(null);
                    }} className="w-full">
                        Send Reset Link
                    </Button>
                </div>
            </Modal>

            {/* Help Modal */}
            <Modal isOpen={activeModal === 'help'} onClose={() => setActiveModal(null)} title="Help Center">
                <div className="space-y-2">
                    {['Account Issues', 'Payment Questions', 'Trip Issues', 'Safety Concerns'].map((topic) => (
                        <button key={topic} className="w-full p-3 text-left rounded-lg hover:bg-gray-50 font-medium text-gray-900 flex justify-between items-center">
                            {topic}
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                    ))}
                </div>
            </Modal>

            {/* Contact Modal */}
            <Modal isOpen={activeModal === 'contact'} onClose={() => setActiveModal(null)} title="Contact Support">
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-1">Phone Support</h4>
                        <p className="text-sm text-gray-600 mb-3">Available 24/7 for urgent issues</p>
                        <Button variant="outline" size="sm" className="w-full">Call Support</Button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-1">Message Support</h4>
                        <p className="text-sm text-gray-600 mb-3">Typical response time: 2 hours</p>
                        <Button variant="outline" size="sm" className="w-full">Start Chat</Button>
                    </div>
                </div>
            </Modal>

            {/* Logout Modal */}
            <Modal isOpen={activeModal === 'logout'} onClose={() => setActiveModal(null)} title="Log Out">
                <div className="space-y-4">
                    <p className="text-gray-600">Are you sure you want to log out of your account?</p>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setActiveModal(null)} className="flex-1">Cancel</Button>
                        <Button
                            onClick={() => {
                                router.push('/driver/onboarding/city');
                            }}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white border-transparent"
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </Modal>
        </main>
    );
}
