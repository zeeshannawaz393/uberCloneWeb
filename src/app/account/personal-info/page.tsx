/**
 * Personal Info Page
 * User profile information management
 */

'use client';

import { useState } from 'react';
import { SettingsListItem } from '@/components/account/SettingsListItem';

export default function PersonalInfoPage() {
    const [name] = useState('zeeshan nawaz');
    const [email] = useState('usmanm.9841@gmail.com');

    return (
        <div>
            {/* Page Title */}
            <h1 className="text-[32px] font-bold text-black mb-8">Personal info</h1>

            {/* Profile Avatar */}
            <div className="mb-8 flex justify-center">
                <div className="relative">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <button className="absolute bottom-0 right-0 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Settings List */}
            <div>
                <SettingsListItem
                    title="Name"
                    value={name}
                    onClick={() => console.log('Edit name')}
                />

                <SettingsListItem
                    title="Phone number"
                    value="Add your phone number"
                    onClick={() => console.log('Add phone')}
                />

                <SettingsListItem
                    title="Email"
                    value={email}
                    verified
                    onClick={() => console.log('Edit email')}
                />

                <SettingsListItem
                    title="Language"
                    value="Update device language"
                    badge="12"
                    onClick={() => console.log('Change language')}
                />
            </div>
        </div>
    );
}
