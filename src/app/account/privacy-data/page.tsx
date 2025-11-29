/**
 * Privacy & Data Page
 * Privacy settings and data management
 */

'use client';

import { SectionHeader } from '@/components/account/SectionHeader';
import { SettingsListItem } from '@/components/account/SettingsListItem';

export default function PrivacyDataPage() {
    return (
        <div>
            {/* Page Title */}
            <h1 className="text-[32px] font-bold text-black mb-10">Privacy & data</h1>

            {/* Privacy Section */}
            <div className="mb-10">
                <SectionHeader title="Privacy" />

                <div>
                    <SettingsListItem
                        title="Privacy Centre"
                        description="Take control of your privacy and learn how we protect it"
                        onClick={() => console.log('Open Privacy Centre')}
                    />

                    <SettingsListItem
                        title="Communication preferences"
                        description="Manage how Uber contacts you"
                        onClick={() => console.log('Manage communications')}
                    />
                </div>
            </div>

            {/* Third-party Apps Section */}
            <div>
                <SectionHeader title="Third-party apps with account access" />

                <p className="text-sm text-[#5E5E5E] mb-2">
                    See the apps linked to your Uber profile. Click the button below to{' '}
                    <a href="#" className="text-blue-600 underline">learn more</a>.
                </p>
            </div>
        </div>
    );
}
