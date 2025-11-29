/**
 * Section Header Component
 * Section heading with optional description
 */

'use client';

interface SectionHeaderProps {
    title: string;
    description?: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-2">{title}</h2>
            {description && (
                <p className="text-sm text-[#5E5E5E]">{description}</p>
            )}
        </div>
    );
}
