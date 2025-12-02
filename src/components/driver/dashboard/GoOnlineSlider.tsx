'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useDriverJourney } from '@/features/driver/driver-journey.state';

export const GoOnlineSlider = () => {
    const { goOnline } = useDriverJourney();
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderWidth = 60; // Width of the slider button

    const handleStart = (clientX: number) => {
        setIsDragging(true);
    };

    const handleMove = (clientX: number) => {
        if (!isDragging || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const maxPos = containerRect.width - sliderWidth - 8; // 8px padding

        let newPos = clientX - containerRect.left - (sliderWidth / 2);
        newPos = Math.max(0, Math.min(newPos, maxPos));

        setPosition(newPos);

        // Threshold to trigger (90% of width)
        if (newPos >= maxPos * 0.9) {
            setIsDragging(false);
            setPosition(maxPos);
            goOnline();
        }
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        setPosition(0); // Reset if not completed
    };

    // Mouse events
    const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
    const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onMouseLeave = () => handleEnd();

    // Touch events
    const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchend', onTouchEnd);
        } else {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchend', onTouchEnd);
        }
        return () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [isDragging]);

    return (
        <div className="bg-white rounded-xl p-6 shadow-xl mb-4 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-center mb-2">Go Online</h2>
            <p className="text-gray-500 text-center text-sm mb-6">
                You're currently offline. Go online to start receiving requests.
            </p>

            <div
                ref={containerRef}
                className="relative h-16 bg-black rounded-full overflow-hidden cursor-pointer select-none"
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
            >
                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg z-0">
                    Slide to go online
                </div>

                {/* Slider Button */}
                <div
                    className="absolute top-1 bottom-1 left-1 w-14 bg-white rounded-full flex items-center justify-center shadow-lg z-10 transition-transform duration-75"
                    style={{ transform: `translateX(${position}px)` }}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                >
                    <ChevronRight className="w-8 h-8 text-black" />
                </div>
            </div>
        </div>
    );
};
