/**
 * Rider Modal Component
 * Modal to select who the ride is for
 */

'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rider } from './TripSidebar';

interface RiderModalProps {
    selectedRider: Rider;
    onSelect: (rider: Rider) => void;
    onClose: () => void;
    isOpen: boolean;
}

export function RiderModal({ selectedRider, onSelect, onClose, isOpen }: RiderModalProps) {
    const [mounted, setMounted] = useState(false);
    const [view, setView] = useState<'list' | 'form'>('list');
    const [riders, setRiders] = useState<Rider[]>([
        { id: 'me', name: 'Me', type: 'me' }
    ]);

    // Form State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

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

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                            className="w-[480px] bg-white rounded-2xl shadow-2xl p-6 pointer-events-auto overflow-hidden"
                        >
                            {view === 'list' ? (
                                <>
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-black">Choose a rider</h3>
                                        <button
                                            onClick={onClose}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Options */}
                                    <div className="space-y-3 mb-6">
                                        {riders.map((rider) => (
                                            <button
                                                key={rider.id}
                                                onClick={() => {
                                                    onSelect(rider);
                                                    onClose();
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

                                    {/* Done Button */}
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-black text-white py-3.5 rounded-lg text-[16px] font-semibold hover:bg-gray-800 transition-colors"
                                    >
                                        Done
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Form Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-black">New rider</h3>
                                        <button
                                            onClick={() => setView('list')}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-6">Drivers will see this name.</p>

                                    {/* Form Inputs */}
                                    <div className="space-y-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">First name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full px-4 py-3 bg-[#F3F3F3] rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Last name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full px-4 py-3 bg-[#F3F3F3] rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black mb-1">Phone number</label>
                                            <div className="flex gap-2">
                                                <div className="flex items-center px-3 py-3 bg-[#F3F3F3] rounded-lg min-w-[80px]">
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
                                                    className="flex-1 px-4 py-3 bg-[#F3F3F3] rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 mb-6 leading-relaxed">
                                        Uber won't share this phone number with drivers.
                                        <br /><br />
                                        By tapping "Add rider", you confirm that your friend agreed to share their contact information with Uber and to receive SMS about this trip.
                                    </div>

                                    {/* Add Rider Button */}
                                    <button
                                        onClick={handleAddRider}
                                        disabled={!firstName || !lastName || !phone}
                                        className={`w-full py-3.5 rounded-lg text-[16px] font-semibold transition-colors ${firstName && lastName && phone
                                            ? 'bg-black text-white hover:bg-gray-800'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Add rider
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
