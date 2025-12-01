/**
 * Pickup Time Modal Component
 * Allows user to schedule a ride in advance
 * Now using BaseModal and Calendar components
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BaseModal } from '@/components/common/BaseModal';
import { Calendar } from '@/components/ui/Calendar';
import { Button } from '@/components/ui/Button';

interface PickupTimeModalProps {
    onClose: () => void;
    onSchedule: (date: Date, time: string) => void;
    pickupName?: string;
    isOpen?: boolean;
}

export function PickupTimeModal({ onClose, onSchedule, pickupName = "Pickup Location", isOpen = true }: PickupTimeModalProps) {
    const [view, setView] = useState<'main' | 'date'>('main');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('Now');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const timeButtonRef = useRef<HTMLButtonElement>(null);

    const times = [
        'Now', '3:40 AM', '3:50 AM', '4:00 AM', '4:10 AM', '4:20 AM', '4:30 AM', '4:40 AM',
        '4:50 AM', '5:00 AM', '5:10 AM', '5:20 AM', '5:30 AM'
    ];

    // Update dropdown position when opened
    useEffect(() => {
        if (isTimeDropdownOpen && timeButtonRef.current) {
            const rect = timeButtonRef.current.getBoundingClientRect();
            const position = {
                top: rect.bottom + 8,
                left: rect.left,
                width: rect.width
            };
            setDropdownPosition(position);
        }
    }, [isTimeDropdownOpen]);

    const handleSchedule = () => {
        onSchedule(selectedDate, selectedTime);
        onClose();
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setView('main');
    };

    const footer = view === 'main' ? (
        <Button
            variant="solid"
            size="lg"
            onClick={handleSchedule}
            className="w-full"
        >
            Schedule ride
        </Button>
    ) : null;

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={view === 'main' ? 'When do you want to be picked up?' : 'Select date'}
            showBackButton={view === 'date'}
            onBack={() => setView('main')}
            showHeaderBorder={false}
            showFooterBorder={view === 'main'}
            footer={footer}
            size="sm"
        >
            {view === 'main' ? (
                <div className="p-6">
                    <p className="text-gray-500 mb-6">From {pickupName}</p>

                    {/* Selectors */}
                    <div className="space-y-2 mb-8">
                        {/* Date Selector */}
                        <button
                            onClick={() => setView('date')}
                            className="w-full flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl hover:bg-[#E8E8E8] transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                                </svg>
                                <span className="text-[16px] font-medium text-black">
                                    {selectedDate.toDateString() === new Date().toDateString() ? 'Today' : selectedDate.toLocaleDateString()}
                                </span>
                            </div>
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Time Selector (Dropdown) */}
                        <div className="relative">
                            <button
                                ref={timeButtonRef}
                                onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                className={`w-full flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl hover:bg-[#E8E8E8] transition-colors ${isTimeDropdownOpen ? 'ring-2 ring-black bg-white' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                    </svg>
                                    <span className="text-[16px] font-medium text-black">{selectedTime}</span>
                                </div>
                                <svg className={`w-4 h-4 text-black transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Dropdown Menu - Rendered via Portal */}
                        {isTimeDropdownOpen && typeof document !== 'undefined' && dropdownPosition.width > 0 && createPortal(
                            <>
                                {/* Backdrop to close dropdown */}
                                <div
                                    className="fixed inset-0 z-[9998]"
                                    onClick={() => setIsTimeDropdownOpen(false)}
                                />
                                {/* Dropdown */}
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: `${dropdownPosition.top}px`,
                                        left: `${dropdownPosition.left}px`,
                                        width: `${dropdownPosition.width}px`
                                    }}
                                    className="bg-white rounded-xl shadow-xl border border-gray-100 max-h-[200px] overflow-y-auto z-[9999]"
                                >
                                    {times.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => {
                                                setSelectedTime(time);
                                                setIsTimeDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 hover:bg-gray-50 text-[16px] font-medium text-black ${selectedTime === time ? 'bg-gray-50' : ''
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </>,
                            document.body
                        )}
                    </div>

                    {/* Info Items */}
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-6 flex-shrink-0 flex justify-center">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                                </svg>
                            </div>
                            <p className="text-[14px] text-gray-600 leading-snug">
                                Choose your pick-up time up to 30 days in advance
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-6 flex-shrink-0 flex justify-center">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <p className="text-[14px] text-gray-600 leading-snug">
                                Your driver will be notified 30 minutes before pickup
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <Calendar
                    selected={selectedDate}
                    onSelectDate={handleDateSelect}
                />
            )}
        </BaseModal>
    );
}
