/**
 * DeliveryDetailsForm Component
 * Complete delivery details form with pickup, recipient, and dropoff sections
 */

'use client';

import { useState } from 'react';
import { DeliveryDetails, MeetingOption } from '@/types/delivery';
import { Input } from '@/components/ui/Input';

interface DeliveryDetailsFormProps {
    pickupAddress: string;
    dropoffAddress: string;
    onSubmit: (details: DeliveryDetails) => void;
}

export function DeliveryDetailsForm({ pickupAddress, dropoffAddress, onSubmit }: DeliveryDetailsFormProps) {
    const [pickupExpanded, setPickupExpanded] = useState(true);
    const [dropoffExpanded, setDropoffExpanded] = useState(true);

    // Pickup Details
    const [pickupBusinessName, setPickupBusinessName] = useState('');
    const [pickupAptSuite, setPickupAptSuite] = useState('');
    const [pickupContactName, setPickupContactName] = useState('');
    const [pickupPhone, setPickupPhone] = useState('');
    const [pickupMeetingOption, setPickupMeetingOption] = useState<MeetingOption>('meet_at_curb');
    const [pickupNote, setPickupNote] = useState('');

    // Recipient Details
    const [recipientName, setRecipientName] = useState('');
    const [recipientPhone, setRecipientPhone] = useState('');
    const [recipientCountryCode, setRecipientCountryCode] = useState('+1');

    // Dropoff Details
    const [dropoffBusinessName, setDropoffBusinessName] = useState('');
    const [dropoffAptSuiteFloor, setDropoffAptSuiteFloor] = useState('');
    const [dropoffMeetingOption, setDropoffMeetingOption] = useState<MeetingOption>('meet_at_curb');
    const [dropoffNote, setDropoffNote] = useState('');

    // Additional
    const [requirePIN, setRequirePIN] = useState(false);

    const handleSubmit = () => {
        const details: DeliveryDetails = {
            pickupBusinessName,
            pickupMeetingOption,
            pickupNote,
            recipientName,
            recipientPhone,
            recipientCountryCode,
            dropoffBusinessName,
            dropoffAptSuiteFloor,
            dropoffMeetingOption,
            dropoffNote,
            requirePIN,
        };
        onSubmit(details);
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header */}
            <div className="px-8 pt-8 pb-4 flex-shrink-0">
                <h2 className="text-[36px] font-bold text-black mb-2 tracking-tight leading-none">Delivery details</h2>
                <p className="text-[18px] text-black font-bold">Complete your delivery information</p>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4 pb-32">
                {/* Pickup Details Section */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                        onClick={() => setPickupExpanded(!pickupExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                        <h3 className="text-[16px] font-bold text-black">Pickup details</h3>
                        <svg
                            className={`w-5 h-5 text-gray-600 transition-transform ${pickupExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {pickupExpanded && (
                        <div className="p-6 pt-0 space-y-4">
                            {/* Address Display */}
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[15px] font-semibold text-black">{pickupAddress.split(',')[0]}</p>
                                    <p className="text-[13px] text-gray-600">{pickupAddress.split(',').slice(1).join(',').trim()}</p>
                                </div>
                            </div>

                            {/* Building Name */}
                            <Input
                                type="text"
                                value={pickupBusinessName}
                                onChange={(e) => setPickupBusinessName(e.target.value)}
                                placeholder="building gnine"
                                variant="filled"
                            />

                            {/* Apt/Suite/Floor */}
                            <Input
                                type="text"
                                value={pickupAptSuite}
                                onChange={(e) => setPickupAptSuite(e.target.value)}
                                placeholder="Apt / Suite / Floor"
                                variant="filled"
                            />

                            {/* Contact Name Header */}
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                <h3 className="text-[16px] font-bold text-black">Contact name</h3>
                            </div>

                            {/* Contact Name Input */}
                            <Input
                                type="text"
                                value={pickupContactName}
                                onChange={(e) => setPickupContactName(e.target.value)}
                                placeholder="zeeshan"
                                variant="filled"
                            />

                            {/* Phone Number with Country Selector */}
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 px-3 py-3 bg-gray-100 rounded-lg">
                                    <span className="text-xl">🇺🇸</span>
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <Input
                                    type="tel"
                                    value={pickupPhone}
                                    onChange={(e) => setPickupPhone(e.target.value)}
                                    placeholder="+1 (999) 999-9999"
                                    variant="filled"
                                    className="flex-1"
                                />
                            </div>

                            {/* Meet Location Section */}
                            <div className="flex items-start gap-3 pt-2">
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[15px] font-semibold text-black">
                                        {pickupMeetingOption === 'meet_at_curb' ? 'Meet at curb' : pickupMeetingOption === 'meet_at_door' ? 'Meet at door' : 'Pickup at door'}
                                    </p>
                                    <p className="text-[13px] text-gray-600 mb-3">Add a pickup note</p>

                                    {/* Where should your driver meet you? */}
                                    <p className="text-[15px] font-medium text-black mb-3">Where should your driver meet you?</p>

                                    {/* Meet Location Pills */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <button
                                            onClick={() => setPickupMeetingOption('meet_at_curb')}
                                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2 ${pickupMeetingOption === 'meet_at_curb'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                            </svg>
                                            Meet at curb
                                        </button>
                                        <button
                                            onClick={() => setPickupMeetingOption('meet_at_door')}
                                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2 ${pickupMeetingOption === 'meet_at_door'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                            Meet at door
                                        </button>
                                        <button
                                            onClick={() => setPickupMeetingOption('pickup_at_door')}
                                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2 ${pickupMeetingOption === 'pickup_at_door'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                            Pickup at door
                                        </button>
                                    </div>

                                    {/* Pickup Note Textarea */}
                                    <textarea
                                        value={pickupNote}
                                        onChange={(e) => setPickupNote(e.target.value)}
                                        placeholder="Add a pickup note"
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-100 rounded-lg text-[15px] text-black placeholder-gray-500 outline-none focus:bg-gray-200 transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recipient Details Section */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <h3 className="text-[16px] font-bold text-black">Recipient</h3>
                        </div>

                        {/* Recipient Name */}
                        <Input
                            type="text"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            placeholder="Recipient name"
                            variant="filled"
                        />

                        {/* Recipient Phone */}
                        <div className="flex gap-2">
                            <div className="flex items-center gap-2 px-3 py-3 bg-gray-100 rounded-lg">
                                <span className="text-xl">🇺🇸</span>
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <Input
                                type="tel"
                                value={recipientPhone}
                                onChange={(e) => setRecipientPhone(e.target.value)}
                                placeholder="(555) 555-5555"
                                variant="filled"
                                className="flex-1"
                            />
                        </div>
                    </div>
                </div>

                {/* Dropoff Details Section */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                        onClick={() => setDropoffExpanded(!dropoffExpanded)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                        <h3 className="text-[16px] font-bold text-black">Dropoff details</h3>
                        <svg
                            className={`w-5 h-5 text-gray-600 transition-transform ${dropoffExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropoffExpanded && (
                        <div className="p-6 pt-0 space-y-4">
                            {/* Address Display */}
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[15px] font-semibold text-black">{dropoffAddress.split(',')[0]}</p>
                                    <p className="text-[13px] text-gray-600">{dropoffAddress.split(',').slice(1).join(',').trim()}</p>
                                </div>
                            </div>

                            {/* Business/Building Name */}
                            <Input
                                type="text"
                                value={dropoffBusinessName}
                                onChange={(e) => setDropoffBusinessName(e.target.value)}
                                placeholder="Business/building name"
                                variant="filled"
                            />

                            {/* Apt/Suite/Floor */}
                            <Input
                                type="text"
                                value={dropoffAptSuiteFloor}
                                onChange={(e) => setDropoffAptSuiteFloor(e.target.value)}
                                placeholder="Apt/Suite/Floor"
                                variant="filled"
                            />

                            {/* Meet Location Section */}
                            <div className="flex items-start gap-3 pt-2">
                                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[15px] font-semibold text-black">
                                        {dropoffMeetingOption === 'meet_at_curb' ? 'Meet at curb' : dropoffMeetingOption === 'meet_at_door' ? 'Meet at door' : 'Leave at door'}
                                    </p>
                                    <p className="text-[13px] text-gray-600 mb-3">Add a dropoff note</p>

                                    {/* Where should your driver meet you? */}
                                    <p className="text-[15px] font-medium text-black mb-3">Where should your driver meet you?</p>

                                    {/* Meet Location Pills */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <button
                                            onClick={() => setDropoffMeetingOption('meet_at_curb')}
                                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2 ${dropoffMeetingOption === 'meet_at_curb'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                            </svg>
                                            Meet at curb
                                        </button>
                                        <button
                                            onClick={() => setDropoffMeetingOption('meet_at_door')}
                                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2 ${dropoffMeetingOption === 'meet_at_door'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                            Meet at door
                                        </button>
                                        <button
                                            onClick={() => setDropoffMeetingOption('leave_at_door')}
                                            className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors flex items-center gap-2 ${dropoffMeetingOption === 'leave_at_door'
                                                ? 'bg-black text-white'
                                                : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                            Leave at door
                                        </button>
                                    </div>

                                    {/* Dropoff Note Textarea */}
                                    <textarea
                                        value={dropoffNote}
                                        onChange={(e) => setDropoffNote(e.target.value)}
                                        placeholder="Add a dropoff note"
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-100 rounded-lg text-[15px] text-black placeholder-gray-500 outline-none focus:bg-gray-200 transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* PIN Requirement Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={requirePIN}
                            onChange={(e) => setRequirePIN(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded border-2 border-gray-300 checked:bg-black checked:border-black cursor-pointer"
                        />
                        <div>
                            <div className="text-[15px] font-semibold text-black">Require PIN upon delivery</div>
                            {requirePIN && (
                                <div className="text-[13px] text-gray-600 mt-1">
                                    Turn on to confirm delivery with a 4-digit PIN
                                </div>
                            )}
                        </div>
                    </label>
                </div>
            </div>

            {/* Sticky Footer with Submit Button */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] transition-shadow duration-300 z-20 rounded-2xl border border-gray-100">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white py-4 rounded-xl text-[20px] font-bold hover:bg-gray-800 transition-colors shadow-lg"
                >
                    Request delivery
                </button>
            </div>
        </div>
    );
}
