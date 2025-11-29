/**
 * DeliveryDetailsForm Component
 * Complete delivery details form with pickup, recipient, and dropoff sections
 */

'use client';

import { useState } from 'react';
import { DeliveryDetails, MeetingOption } from '@/types/delivery';

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
                        <div className="p-4 pt-0 space-y-4">
                            {/* Pickup Address */}
                            <div className="flex items-start gap-2 text-[14px] text-gray-600">
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span>{pickupAddress}</span>
                            </div>

                            {/* Business/Building Name */}
                            <input
                                type="text"
                                value={pickupBusinessName}
                                onChange={(e) => setPickupBusinessName(e.target.value)}
                                placeholder="Business/building name"
                                className="w-full px-4 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                            />

                            {/* Meeting Options */}
                            <div className="space-y-2">
                                {[
                                    { value: 'meet_at_curb' as MeetingOption, label: 'Meet at curb' },
                                    { value: 'meet_at_door' as MeetingOption, label: 'Meet at door' },
                                    { value: 'pickup_at_door' as MeetingOption, label: 'Pickup at door' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setPickupMeetingOption(option.value)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${pickupMeetingOption === option.value
                                                ? 'bg-black text-white'
                                                : 'bg-[#F3F3F3] text-black hover:bg-[#E8E8E8]'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${pickupMeetingOption === option.value ? 'border-white' : 'border-gray-400'
                                            }`}>
                                            {pickupMeetingOption === option.value && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-[15px] font-medium">{option.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Pickup Note */}
                            <textarea
                                value={pickupNote}
                                onChange={(e) => setPickupNote(e.target.value)}
                                placeholder="Add a pickup note"
                                rows={3}
                                className="w-full px-4 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all resize-none"
                            />
                        </div>
                    )}
                </div>

                {/* Recipient Details Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <h3 className="text-[16px] font-bold text-black">Recipient</h3>
                    </div>

                    {/* Recipient Name */}
                    <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Recipient name"
                        className="w-full px-4 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                    />

                    {/* Recipient Phone */}
                    <div className="flex gap-2">
                        <select
                            value={recipientCountryCode}
                            onChange={(e) => setRecipientCountryCode(e.target.value)}
                            className="px-3 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                        >
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+92">🇵🇰 +92</option>
                        </select>
                        <input
                            type="tel"
                            value={recipientPhone}
                            onChange={(e) => setRecipientPhone(e.target.value)}
                            placeholder="(555) 555-5555"
                            className="flex-1 px-4 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                        />
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
                        <div className="p-4 pt-0 space-y-4">
                            {/* Dropoff Address */}
                            <div className="flex items-start gap-2 text-[14px] text-gray-600">
                                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span>{dropoffAddress}</span>
                            </div>

                            {/* Business/Building Name */}
                            <input
                                type="text"
                                value={dropoffBusinessName}
                                onChange={(e) => setDropoffBusinessName(e.target.value)}
                                placeholder="Business/building name"
                                className="w-full px-4 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                            />

                            {/* Apt/Suite/Floor */}
                            <input
                                type="text"
                                value={dropoffAptSuiteFloor}
                                onChange={(e) => setDropoffAptSuiteFloor(e.target.value)}
                                placeholder="Apt/Suite/Floor"
                                className="w-full px-4 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all"
                            />

                            {/* Meeting Options */}
                            <div className="space-y-2">
                                {[
                                    { value: 'meet_at_curb' as MeetingOption, label: 'Meet at curb' },
                                    { value: 'meet_at_door' as MeetingOption, label: 'Meet at door' },
                                    { value: 'leave_at_door' as MeetingOption, label: 'Leave at door' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setDropoffMeetingOption(option.value)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${dropoffMeetingOption === option.value
                                                ? 'bg-black text-white'
                                                : 'bg-[#F3F3F3] text-black hover:bg-[#E8E8E8]'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${dropoffMeetingOption === option.value ? 'border-white' : 'border-gray-400'
                                            }`}>
                                            {dropoffMeetingOption === option.value && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                            )}
                                        </div>
                                        <span className="text-[15px] font-medium">{option.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Dropoff Note */}
                            <textarea
                                value={dropoffNote}
                                onChange={(e) => setDropoffNote(e.target.value)}
                                placeholder="Add a dropoff note"
                                rows={3}
                                className="w-full px-4 py-3 bg-[#F3F3F3] rounded-xl text-[15px] outline-none focus:bg-white focus:ring-2 focus:ring-black transition-all resize-none"
                            />
                        </div>
                    )}
                </div>

                {/* PIN Requirement Section */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
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
