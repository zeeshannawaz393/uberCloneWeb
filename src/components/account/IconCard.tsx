/**
 * Icon Card Component
 * Card with icon and label for account home
 */

'use client';

interface IconCardProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

export function IconCard({ icon, label, onClick }: IconCardProps) {
    return (
        <div
            onClick={onClick}
            className={`
        flex flex-col items-center justify-center p-6 bg-[#F6F6F6] rounded-lg
        ${onClick ? 'cursor-pointer hover:bg-gray-200 transition-colors' : ''}
      `}
        >
            <div className="mb-3 text-gray-700">
                {icon}
            </div>
            <span className="text-sm font-medium text-black text-center">{label}</span>
        </div>
    );
}
