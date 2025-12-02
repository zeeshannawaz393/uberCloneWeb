'use client';

interface DriverMapProps {
    className?: string;
}

export const DriverMap = ({ className = '' }: DriverMapProps) => {
    return (
        <div className={`w-full h-full bg-[#e5e7eb] relative overflow-hidden ${className}`}>
            {/* CSS Map Pattern (Roads) */}
            <div className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `
                        linear-gradient(#fff 2px, transparent 2px),
                        linear-gradient(90deg, #fff 2px, transparent 2px),
                        linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
                    backgroundPosition: '-2px -2px, -2px -2px, -1px -1px, -1px -1px'
                }}
            />

            {/* Mock Parks */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-100/50 rounded-full blur-xl" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-green-100/50 rounded-full blur-xl" />

            {/* Mock Water */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-blue-100/30 skew-y-3" />

            {/* Current Location Puck */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-ping absolute -top-6 -left-6" />
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg relative z-10" />
                    {/* Direction Cone */}
                    <div className="absolute -top-8 -left-4 w-12 h-12 bg-gradient-to-t from-blue-500/20 to-transparent transform -rotate-45 clip-path-triangle"
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                    />
                </div>
            </div>

            <div className="absolute bottom-24 right-4 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
                Map Simulation Mode
            </div>
        </div>
    );
};
