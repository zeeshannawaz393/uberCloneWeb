/**
 * Suggestion Card Component
 * Card for recommendations and suggestions
 */

'use client';

interface SuggestionCardProps {
    title: string;
    description: string;
    linkText: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

export function SuggestionCard({
    title,
    description,
    linkText,
    onClick,
    icon,
}: SuggestionCardProps) {
    return (
        <div className="flex items-start gap-4 p-6 border border-[#E5E5E5] rounded-lg hover:border-gray-300 transition-colors">
            <div className="flex-1">
                <h3 className="text-base font-bold text-black mb-2">{title}</h3>
                <p className="text-sm text-[#5E5E5E] mb-3">{description}</p>
                <button
                    onClick={onClick}
                    className="text-sm text-black underline hover:text-gray-700"
                >
                    {linkText}
                </button>
            </div>
            {icon && (
                <div className="flex-shrink-0">
                    {icon}
                </div>
            )}
        </div>
    );
}
