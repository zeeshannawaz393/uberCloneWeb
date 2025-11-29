/**
 * ServiceModeToggle Component
 * Toggle between Send and Receive modes for delivery
 */

'use client';

interface ServiceModeToggleProps {
    mode: 'send' | 'receive';
    onChange: (mode: 'send' | 'receive') => void;
}

export function ServiceModeToggle({ mode, onChange }: ServiceModeToggleProps) {
    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={() => onChange('send')}
                className={`flex-1 py-3 px-4 rounded-xl text-[15px] font-semibold transition-all ${mode === 'send'
                        ? 'bg-black text-white'
                        : 'bg-[#F3F3F3] text-black hover:bg-[#E8E8E8]'
                    }`}
            >
                Send
            </button>
            <button
                onClick={() => onChange('receive')}
                className={`flex-1 py-3 px-4 rounded-xl text-[15px] font-semibold transition-all ${mode === 'receive'
                        ? 'bg-black text-white'
                        : 'bg-[#F3F3F3] text-black hover:bg-[#E8E8E8]'
                    }`}
            >
                Receive
            </button>
        </div>
    );
}
