/**
 * Security Page
 * Security settings and login methods
 */

'use client';

import { SectionHeader } from '@/components/account/SectionHeader';
import { SettingsListItem } from '@/components/account/SettingsListItem';
import { SocialLoginItem } from '@/components/account/SocialLoginItem';

export default function SecurityPage() {
    return (
        <div>
            {/* Page Title */}
            <h1 className="text-[32px] font-bold text-black mb-10">Security</h1>

            {/* Logging in to Uber Section */}
            <div className="mb-10">
                <SectionHeader title="Logging in to Uber" />

                <div>
                    <SettingsListItem
                        title="Passkeys"
                        description="Passkeys are easier and more secure than passwords"
                        onClick={() => console.log('Manage passkeys')}
                    />

                    <SettingsListItem
                        title="Password"
                        onClick={() => console.log('Change password')}
                    />

                    <SettingsListItem
                        title="Authenticator app"
                        description="Set up your authenticator app to add an extra layer of security"
                        onClick={() => console.log('Setup authenticator')}
                    />

                    <SettingsListItem
                        title="2-step verification"
                        description="Add additional security to your account with 2-step verification"
                        onClick={() => console.log('Setup 2FA')}
                    />

                    <SettingsListItem
                        title="Recovery phone"
                        description="Add a backup phone number to access your account"
                        onClick={() => console.log('Add recovery phone')}
                    />
                </div>
            </div>

            {/* Connected Social Apps Section */}
            <div className="mb-10">
                <SectionHeader
                    title="Connected social apps"
                    description="Manage your connected social apps to sign in to your Uber account here"
                />

                <div>
                    <SocialLoginItem
                        provider="google"
                        connected={false}
                        onConnect={() => console.log('Connect Google')}
                    />

                    <SocialLoginItem
                        provider="apple"
                        connected={false}
                        onConnect={() => console.log('Connect Apple')}
                    />
                </div>
            </div>

            {/* Login Activity Section */}
            <div>
                <SectionHeader title="Login activity" />
                {/* Login activity content would go here */}
            </div>
        </div>
    );
}
