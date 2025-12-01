'use client';

import { useState } from 'react';

interface CalendarProps {
    selected: Date;
    onSelectDate: (date: Date) => void;
}

export function Calendar({ selected, onSelectDate }: CalendarProps) {
    const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

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

    const isToday = (date: Date | null) => {
        if (!date) return false;
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (date: Date | null) => {
        if (!date) return false;
        return date.toDateString() === selected.toDateString();
    };

    return (
        <div className="p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h3 className="text-lg font-bold text-black">
                    {currentMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => (
                    <button
                        key={index}
                        onClick={() => date && onSelectDate(date)}
                        disabled={!date}
                        className={`h-11 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${!date
                            ? 'invisible'
                            : isSelected(date)
                                ? 'bg-black text-white'
                                : isToday(date)
                                    ? 'bg-gray-100 text-black font-bold'
                                    : 'hover:bg-gray-50 text-black'
                            }`}
                    >
                        {date?.getDate()}
                    </button>
                ))}
            </div>
        </div>
    );
}
