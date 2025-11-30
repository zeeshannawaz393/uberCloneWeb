/**
 * BottomSheet Component
 * Draggable bottom sheet for mobile ride options
 */

'use client';

import { useState, useRef, useEffect } from 'react';

interface BottomSheetProps {
    children: React.ReactNode;
    initialHeight?: string;
}

export function BottomSheet({ children, initialHeight = '45vh' }: BottomSheetProps) {
    const [height, setHeight] = useState(initialHeight);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);
    const startHeight = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const isDraggingRef = useRef(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const velocityRef = useRef(0);
    const lastMoveTimeRef = useRef(0);
    const lastMoveYRef = useRef(0);

    // Use native event listeners to properly prevent default
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchStart = (e: TouchEvent) => {
            const content = contentRef.current;
            const isAtTop = content ? content.scrollTop === 0 : true;

            console.log('🔵 Sheet Touch Start', {
                height,
                isFullyExpanded: height === '90vh',
                scrollTop: content?.scrollTop,
                isAtTop,
                willStartDrag: !(height === '90vh' && !isAtTop)
            });

            // If fully expanded and not at top, don't start dragging (allow scrolling)
            if (height === '90vh' && !isAtTop) {
                console.log('⛔ Not starting drag - allow scroll');
                return;
            }

            console.log('✅ Starting drag');
            isDraggingRef.current = true;
            setIsDragging(true);
            startY.current = e.touches[0].clientY;
            lastMoveYRef.current = e.touches[0].clientY;
            lastMoveTimeRef.current = Date.now();
            velocityRef.current = 0;
            const currentHeight = parseInt(height);
            startHeight.current = currentHeight;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDraggingRef.current) return;

            const currentY = e.touches[0].clientY;
            const currentTime = Date.now();
            const diff = startY.current - currentY;

            // If fully expanded and user is trying to scroll content, stop dragging
            const content = contentRef.current;
            if (height === '90vh' && content) {
                const isScrollingDown = diff < 0; // dragging down
                const isAtTop = content.scrollTop === 0;
                const hasScroll = content.scrollHeight > content.clientHeight;

                // If trying to scroll up (content has scroll), allow it
                if (!isScrollingDown && hasScroll) {
                    console.log('⛔ Stopping drag - allow content scroll');
                    isDraggingRef.current = false;
                    setIsDragging(false);
                    return;
                }

                // If trying to drag down but not at top, allow content scroll
                if (isScrollingDown && !isAtTop) {
                    console.log('⛔ Stopping drag - allow content scroll down');
                    isDraggingRef.current = false;
                    setIsDragging(false);
                    return;
                }
            }

            // Calculate velocity for flinging
            const timeDiff = currentTime - lastMoveTimeRef.current;
            if (timeDiff > 0) {
                const yDiff = currentY - lastMoveYRef.current;
                velocityRef.current = yDiff / timeDiff; // pixels per ms
            }
            lastMoveYRef.current = currentY;
            lastMoveTimeRef.current = currentTime;

            console.log('🟡 Sheet Touch Move', { diff, velocity: velocityRef.current });

            // This will now work because listener is not passive
            e.preventDefault();

            const viewportHeight = window.innerHeight;
            const newHeight = startHeight.current + (diff / viewportHeight) * 100;

            // Constrain between 30vh and 95vh - allow any height in between
            const constrainedHeight = Math.max(30, Math.min(95, newHeight));
            setHeight(`${constrainedHeight}vh`);
        };

        const handleTouchEnd = () => {
            console.log('🟢 Sheet Touch End', { height, velocity: velocityRef.current });
            isDraggingRef.current = false;
            setIsDragging(false);

            const currentHeight = parseInt(height);
            const velocity = velocityRef.current;

            // Velocity-based flinging (negative = swiping up, positive = swiping down)
            // If velocity is strong enough, fling to next state
            if (Math.abs(velocity) > 0.5) { // threshold for fling
                if (velocity < 0) {
                    // Swiping up fast - go to next higher state
                    if (currentHeight < 50) {
                        setHeight('50vh');
                    } else {
                        setHeight('90vh');
                    }
                } else {
                    // Swiping down fast - go to next lower state
                    if (currentHeight > 50) {
                        setHeight('50vh');
                    } else {
                        setHeight('35vh');
                    }
                }
            } else {
                // No strong velocity - snap to nearest position
                if (currentHeight < 40) {
                    setHeight('35vh');
                } else if (currentHeight < 65) {
                    setHeight('50vh');
                } else {
                    setHeight('90vh');
                }
            }
        };

        // Add event listeners with passive: false to allow preventDefault
        container.addEventListener('touchstart', handleTouchStart, { passive: false });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, [height]); // Removed isDragging from dependencies

    // Check if sheet is fully expanded (must be at 90vh exactly)
    const isFullyExpanded = height === '90vh';

    return (
        <div
            ref={containerRef}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl"
            style={{
                height,
                transition: isDragging ? 'none' : 'height 0.3s cubic-bezier(0.32, 0.72, 0, 1)' // Spring-like easing
            }}
        >
            {/* Drag Handle */}
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

            {/* Content - Only scrollable when fully expanded */}
            <div
                ref={contentRef}
                className="h-[calc(100%-2rem)]"
                style={{
                    overflowY: isFullyExpanded ? 'auto' : 'hidden',
                    pointerEvents: isFullyExpanded ? 'auto' : 'none',
                    touchAction: isFullyExpanded ? 'auto' : 'none',
                    WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
                }}
                onTouchStart={(e) => {
                    console.log('📱 Content Touch Start', {
                        isFullyExpanded,
                        scrollTop: contentRef.current?.scrollTop,
                        scrollHeight: contentRef.current?.scrollHeight,
                        clientHeight: contentRef.current?.clientHeight
                    });
                    // If fully expanded, stop propagation to allow scrolling
                    if (isFullyExpanded) {
                        e.stopPropagation();
                    }
                }}
            >
                {children}
            </div>
        </div>
    );
}
