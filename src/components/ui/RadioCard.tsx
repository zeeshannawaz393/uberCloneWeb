/**
 * Radio Card Component
 * Radio button with card styling
 */

'use client';

interface RadioCardProps {
    id: string;
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    title: string;
    description: string;
    recommended?: boolean;
}

export function RadioCard({
    id,
    name,
    value,
    checked,
    onChange,
    title,
    description,
    recommended = false,
}: RadioCardProps) {
    return (
        <label
            htmlFor={id}
            className={`
        relative flex items-start gap-4 p-6 rounded-lg border-2 cursor-pointer
        transition-all
        ${checked
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300 hover:border-gray-400'
                }
      `}
        >
            {/* Radio Button */}
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-5 h-5 text-black border-gray-300 focus:ring-black"
            />

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-black">{title}</span>
                    {recommended && (
                        <span className="text-xs text-blue-600 font-medium">
                            (Recommended)
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-600">
                    {description}
                </p>
            </div>
        </label>
    );
}
