/**
 * Settings List Item Component
 * Reusable list item for settings pages
 */

'use client';

interface SettingsListItemProps {
    title: string;
    value?: string;
    description?: string;
    verified?: boolean;
    badge?: string;
    onClick?: () => void;
}

export function SettingsListItem({
    title,
    value,
    description,
    verified = false,
    badge,
    onClick,
}: SettingsListItemProps) {
    return (
        <div
            onClick={onClick}
            className={`
        flex items-center justify-between py-5 border-b border-[#E5E5E5]
        ${onClick ? 'cursor-pointer hover:bg-gray-50 -mx-4 px-4 transition-colors' : ''}
      `}
        >
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-black">{title}</h3>
                    {verified && (
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                {value && (
                    <p className="text-sm text-[#5E5E5E]">{value}</p>
                )}
                {description && (
                    <p className="text-[13px] text-[#8A8A8A] mt-1">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-3">
                {badge && (
                    <div className="flex items-center gap-1 bg-[#F3F3F3] px-3 py-1 rounded-full">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium">{badge}</span>
                    </div>
                )}
                {onClick && (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </div>
        </div>
    );
}
