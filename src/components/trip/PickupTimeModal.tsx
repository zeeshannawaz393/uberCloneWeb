/**
 * Pickup Time Modal Component
 * Allows user to schedule a ride in advance
 * Updated with month navigation and dropdown time picker
 */

'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

interface PickupTimeModalProps {
    onClose: () => void;
    onSchedule: (date: Date, time: string) => void;
    pickupName?: string;
    isOpen?: boolean;
}

export function PickupTimeModal({ onClose, onSchedule, pickupName = "Pickup Location", isOpen = true }: PickupTimeModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [view, setView] = useState<'main' | 'date'>('main');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState('Now');
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

    // Calendar Navigation State
    const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setIsOpening(true);
            const timer = setTimeout(() => {
                setIsOpening(false);
            }, 10); // Small delay to trigger transition
            return () => clearTimeout(timer);
        } else {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setIsClosing(false);
            }, 200); // Match transition duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 200); // Match transition duration
    };

    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const times = [
        'Now', '3:40 AM', '3:50 AM', '4:00 AM', '4:10 AM', '4:20 AM', '4:30 AM', '4:40 AM',
        '4:50 AM', '5:00 AM', '5:10 AM', '5:20 AM', '5:30 AM'
    ];

    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...

        // Adjust for Monday start (Mon=0, Sun=6)
        const startDay = firstDay === 0 ? 6 : firstDay - 1;

        const calendarDays = [];
        // Add empty slots for start padding
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(null);
        }
        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(new Date(year, month, i));
        }
        return calendarDays;
    };

    const calendarDays = getDaysInMonth(currentMonthDate);

    const handlePrevMonth = () => {
        const newDate = new Date(currentMonthDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentMonthDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentMonthDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentMonthDate(newDate);
    };

    const handleNext = () => {
        if (view === 'main') {
            onSchedule(selectedDate, selectedTime);
            handleClose();
        } else {
            setView('main');
        }
    };

    if (!mounted || (!isOpen && !isClosing)) return null;

    return createPortal(
        <>
            {(isOpen || isClosing) && (
                <>
                    {/* Overlay */}
                    <div
                        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-200 ease-in-out ${isOpen && !isClosing && !isOpening ? 'opacity-100' : 'opacity-0'
                            }`}
                        onClick={handleClose}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                        <div className={`bg-white w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] pointer-events-auto transition-all duration-200 ease-in-out ${isOpen && !isClosing && !isOpening ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                            }`}>

                            {/* Header */}
                            <div className="px-4 pt-4 pb-2 flex items-center justify-between flex-shrink-0">
                                <button
                                    onClick={() => view === 'main' ? handleClose() : setView('main')}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>
                                {view === 'main' && (
                                    <button onClick={handleClose} className="text-[14px] font-medium text-black hover:opacity-70 transition-opacity">
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Content */}
                            <div className="px-6 pb-6 overflow-y-auto">

                                {view === 'main' && (
                                    <div>
                                        <h2 className="text-[32px] font-bold text-black leading-tight mb-2">
                                            When do you want to be picked up?
                                        </h2>
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
                                                    onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                                    className={`w-full flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl hover:bg-[#E8E8E8] transition-colors ${isTimeDropdownOpen ? 'ring-2 ring-black bg-white' : ''}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                                        </svg>
                                                        <span className="text-[16px] font-medium text-black">{selectedTime}</span>
                                                    </div>
                                                    <svg className={`w-4 h-4 text-black transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>

                                                {/* Dropdown Menu */}
                                                {isTimeDropdownOpen && (
                                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-[200px] overflow-y-auto z-50">
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
                                                )}
                                            </div>
                                        </div>

                                        {/* Info Items */}
                                        <div className="space-y-6 mb-8">
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
                                                        <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" />
                                                    </svg>
                                                </div>
                                                <p className="text-[14px] text-gray-600 leading-snug">
                                                    Extra wait time included to meet your trip
                                                </p>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="w-6 flex-shrink-0 flex justify-center">
                                                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                                    </svg>
                                                </div>
                                                <p className="text-[14px] text-gray-600 leading-snug">
                                                    Cancel at no charge up to 60 minutes in advance
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {view === 'date' && (
                                    <div>
                                        <div className="flex items-center justify-between mb-6 px-2">
                                            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <h3 className="text-xl font-bold">
                                                {currentMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                            </h3>
                                            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                                            {days.map(day => (
                                                <div key={day} className="text-sm font-medium text-gray-500 py-2">{day}</div>
                                            ))}
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 text-center">
                                            {calendarDays.map((date, i) => (
                                                <div key={i} className="aspect-square flex items-center justify-center">
                                                    {date && (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedDate(date);
                                                                setView('main');
                                                            }}
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${selectedDate.toDateString() === date.toDateString()
                                                                ? 'bg-black text-white'
                                                                : 'hover:bg-gray-100 text-black'
                                                                }`}
                                                        >
                                                            {date.getDate()}
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Footer Button */}
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-black text-white py-3.5 rounded-lg text-[18px] font-bold hover:bg-gray-800 transition-colors mt-4 flex-shrink-0"
                                >
                                    {view === 'main' ? 'Next' : 'Done'}
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>,
        document.body
    );
}
