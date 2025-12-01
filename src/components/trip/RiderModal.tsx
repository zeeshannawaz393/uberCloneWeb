/**
 * Rider Modal Component
 * Modal to select who the ride is for
 */

'use client';

import { useState } from 'react';
import { BaseModal } from '@/components/common/BaseModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Rider } from './TripSidebar';

interface RiderModalProps {
    selectedRider: Rider;
    onSelect: (rider: Rider) => void;
    onClose: () => void;
    isOpen: boolean;
}

export function RiderModal({ selectedRider, onSelect, onClose, isOpen }: RiderModalProps) {
    const [view, setView] = useState<'list' | 'form'>('list');
    const [riders, setRiders] = useState<Rider[]>([
        { id: 'me', name: 'Me', type: 'me' }
    ]);

    // Form State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const handleAddRider = () => {
        if (!firstName || !lastName || !phone) return;

        const newRider: Rider = {
            id: `guest-${Date.now()}`,
            name: `${firstName} ${lastName}`,
            type: 'guest',
            phoneNumber: phone
        };

        setRiders([...riders, newRider]);
        onSelect(newRider);
        setView('list');
        onClose();

        // Reset form
        setFirstName('');
        setLastName('');
        setPhone('');
    };

    const handleClose = () => {
        setView('list');
        onClose();
    };

    const footer = view === 'list' ? (
        <Button
            variant="solid"
            size="lg"
            onClick={handleClose}
            className="w-full"
        >
            Done
        </Button>
    ) : (
        <div className="space-y-2">
            <div className="text-xs text-gray-500 leading-relaxed">
                Uber won't share this phone number with drivers.
                <br /><br />
                By tapping "Add rider", you confirm that your friend agreed to share their contact information with Uber and to receive SMS about this trip.
            </div>
            <Button
                variant="solid"
                size="lg"
                onClick={handleAddRider}
                disabled={!firstName || !lastName || !phone}
                className="w-full"
            >
                Add rider
            </Button>
        </div>
    );

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleClose}
            title={view === 'list' ? 'Choose a rider' : 'New rider'}
            showHeaderBorder={false}
            showFooterBorder={false}
            footer={footer}
            size="md"
        >
            {view === 'list' ? (
                /* List View */
                <div className="p-6">
                    {/* Options */}
                    <div className="space-y-3 mb-6">
                        {riders.map((rider) => (
                            <button
                                key={rider.id}
                                onClick={() => {
                                    onSelect(rider);
                                    handleClose();
                                }}
                                className="w-full flex items-center justify-between px-5 py-4 bg-[#F6F6F6] rounded-lg hover:bg-[#EEEEEE] transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {rider.type === 'me' ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    ) : (
                                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">
                                            {rider.name.charAt(0).toUpperCase()}{rider.name.split(' ')[1]?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="text-[16px] font-medium text-black">{rider.name}</span>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 ${selectedRider.id === rider.id ? 'border-black bg-black' : 'border-gray-400'} flex items-center justify-center`}>
                                    {selectedRider.id === rider.id && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    )}
                                </div>
                            </button>
                        ))}

                        {/* Someone Else Option */}
                        <button
                            onClick={() => setView('form')}
                            className="w-full flex items-center justify-between px-5 py-4 bg-[#F6F6F6] rounded-lg hover:bg-[#EEEEEE] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                <span className="text-[16px] font-medium text-black">Order a trip for someone else</span>
                            </div>
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                /* Form View */
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-6">Drivers will see this name.</p>

                    {/* Form Inputs */}
                    <div className="space-y-4 mb-6">
                        <Input
                            label="First name"
                            variant="filled"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Input
                            label="Last name"
                            variant="filled"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <div>
                            <label className="block text-sm font-medium text-dark-700 mb-2">Phone number</label>
                            <div className="flex gap-2">
                                <div className="flex items-center px-3 py-3 bg-gray-100 rounded-lg min-w-[80px]">
                                    <span className="text-xl mr-2">🇵🇰</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+92 300 0000000"
                                    className="flex-1 px-4 py-3 bg-gray-100 rounded-lg text-[15px] text-black placeholder-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </BaseModal>
    );
}
