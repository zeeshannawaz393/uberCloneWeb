/**
 * Trip Map Component
 * Right column: Map view with route visualization using Google Maps
 */

'use client';

import { useEffect, useRef } from 'react';

interface TripMapProps {
    pickup: string;
    destination: string;
    stops?: string[]; // Optional array of intermediate stops
    isServiceAvailable: boolean;
    onEditPickup?: () => void;
    onEditDestination?: () => void;
    onEditStop?: (index: number) => void;
    showLocationCards?: boolean; // Whether to show location cards (mobile only)
}

declare global {
    interface Window {
        google: any;
    }
}

export function TripMap({
    pickup,
    destination,
    stops = [],
    isServiceAvailable,
    onEditPickup,
    onEditDestination,
    onEditStop,
    showLocationCards = false
}: TripMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const directionsServiceRef = useRef<any>(null);
    const directionsRendererRef = useRef<any>(null);
    const pickupOverlayRef = useRef<any>(null);
    const destinationOverlayRef = useRef<any>(null);

    useEffect(() => {
        // Wait for Google Maps to be loaded (loaded globally in Providers)
        const initializeMap = () => {
            if (!mapRef.current || !window.google) {
                // Google Maps not loaded yet, wait and retry
                setTimeout(initializeMap, 100);
                return;
            }

            // Initialize map centered on Pakistan
            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 30.3753, lng: 69.3451 }, // Pakistan center
                zoom: 6,
                mapId: 'DEMO_MAP_ID', // Required for AdvancedMarkerElement
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });

            mapInstanceRef.current = map;

            // Initialize directions service and renderer
            directionsServiceRef.current = new window.google.maps.DirectionsService();
            directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
                map: map,
                suppressMarkers: true, // We'll add custom markers
                polylineOptions: {
                    strokeColor: '#000000',
                    strokeWeight: 6,
                    strokeOpacity: 1.0,
                },
            });

            // Calculate and display route
            if (pickup && destination && isServiceAvailable) {
                calculateRoute();
            }
        };

        // Helper function to create custom marker content
        const createMarkerContent = (label: string, size: number = 32, fontSize: string = '14px') => {
            const content = document.createElement('div');
            content.style.width = `${size}px`;
            content.style.height = `${size}px`;
            content.style.position = 'relative';
            content.style.display = 'flex';
            content.style.alignItems = 'center';
            content.style.justifyContent = 'center';

            // Create SVG circle
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', String(size));
            svg.setAttribute('height', String(size));
            svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', String(size / 2));
            circle.setAttribute('cy', String(size / 2));
            circle.setAttribute('r', String(size / 2 - 3));
            circle.setAttribute('fill', '#000000');
            circle.setAttribute('stroke', '#FFFFFF');
            circle.setAttribute('stroke-width', '3');

            svg.appendChild(circle);
            content.appendChild(svg);

            // Create label
            const labelEl = document.createElement('div');
            labelEl.textContent = label;
            labelEl.style.color = '#FFFFFF';
            labelEl.style.fontSize = fontSize;
            labelEl.style.fontWeight = 'bold';
            labelEl.style.position = 'relative';
            labelEl.style.zIndex = '1';

            content.appendChild(labelEl);
            return content;
        };

        // Create custom overlay for location cards
        const createLocationCardOverlay = (
            position: any,
            label: string,
            address: string,
            onClick: () => void,
            hasETA: boolean
        ) => {
            class LocationCardOverlay extends window.google.maps.OverlayView {
                position: any;
                containerDiv: HTMLDivElement | null = null;

                constructor(pos: any) {
                    super();
                    this.position = pos;
                }

                onAdd() {
                    const panes = this.getPanes();
                    if (!panes) return;

                    // Create container
                    this.containerDiv = document.createElement('div');
                    this.containerDiv.style.position = 'absolute';
                    this.containerDiv.style.cursor = 'pointer';

                    // Create card content
                    if (hasETA) {
                        // Pickup card with ETA badge
                        this.containerDiv.innerHTML = `
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <div style="background: black; color: white; padding: 6px 10px; border-radius: 9999px; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                                    <svg style="width: 12px; height: 12px;" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                    </svg>
                                    <span style="font-size: 12px; font-weight: 600;">3 min</span>
                                </div>
                                <div style="background: white; padding: 10px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                                    <div>
                                        <div style="font-size: 11px; color: #666; line-height: 1.2; margin-bottom: 2px;">${label}</div>
                                        <div style="font-size: 14px; font-weight: 500; line-height: 1.2; white-space: nowrap;">${address}</div>
                                    </div>
                                    <svg style="width: 16px; height: 16px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </div>
                        `;
                    } else {
                        // Destination card
                        this.containerDiv.innerHTML = `
                            <div style="background: white; padding: 10px 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: space-between; gap: 8px; max-width: 240px;">
                                <div style="flex: 1; min-width: 0;">
                                    <div style="font-size: 11px; color: #666; line-height: 1.2; margin-bottom: 2px;">${label}</div>
                                    <div style="font-size: 14px; font-weight: 500; line-height: 1.2;">${address}</div>
                                </div>
                                <svg style="width: 16px; height: 16px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                        `;
                    }

                    this.containerDiv.addEventListener('click', onClick);
                    panes.floatPane.appendChild(this.containerDiv);
                }

                draw() {
                    if (!this.containerDiv) return;

                    const projection = this.getProjection();
                    if (!projection) return;

                    const point = projection.fromLatLngToDivPixel(this.position);
                    if (!point) return;

                    // Position the card above the marker
                    this.containerDiv.style.left = point.x + 'px';
                    this.containerDiv.style.top = (point.y - 60) + 'px'; // Offset above marker
                }

                onRemove() {
                    if (this.containerDiv) {
                        this.containerDiv.parentNode?.removeChild(this.containerDiv);
                        this.containerDiv = null;
                    }
                }
            }

            return new LocationCardOverlay(position);
        };

        const calculateRoute = () => {
            if (!directionsServiceRef.current || !directionsRendererRef.current) {
                console.log('Directions service not ready');
                return;
            }

            // Clear previous route
            directionsRendererRef.current.setDirections({ routes: [] });

            console.log('Calculating route from', pickup, 'to', destination);

            const request = {
                origin: pickup,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
            };

            directionsServiceRef.current.route(request, (result: any, status: string) => {
                console.log('Directions status:', status);
                if (status === 'OK') {
                    directionsRendererRef.current.setDirections(result);

                    // Add custom markers for all waypoints
                    const route = result.routes[0];

                    // Pickup marker (A) - Black
                    new window.google.maps.marker.AdvancedMarkerElement({
                        position: route.legs[0].start_location,
                        map: mapInstanceRef.current,
                        content: createMarkerContent('A', 32, '14px'),
                        title: 'Pickup: ' + pickup,
                    });

                    // Intermediate stop markers (if any)
                    route.legs.forEach((leg: any, index: number) => {
                        if (index > 0 && index < route.legs.length) {
                            // This is an intermediate stop
                            new window.google.maps.marker.AdvancedMarkerElement({
                                position: leg.start_location,
                                map: mapInstanceRef.current,
                                content: createMarkerContent(String(index + 1), 28, '12px'),
                                title: 'Stop ' + (index + 1),
                            });
                        }
                    });

                    // Destination marker (B) - Black
                    const lastLeg = route.legs[route.legs.length - 1];
                    new window.google.maps.marker.AdvancedMarkerElement({
                        position: lastLeg.end_location,
                        map: mapInstanceRef.current,
                        content: createMarkerContent('B', 32, '14px'),
                        title: 'Destination: ' + destination,
                    });

                    // Create location card overlays if enabled (mobile)
                    if (showLocationCards && onEditPickup && onEditDestination) {
                        console.log('Creating location card overlays...');

                        // Clean up old overlays
                        if (pickupOverlayRef.current) {
                            pickupOverlayRef.current.setMap(null);
                        }
                        if (destinationOverlayRef.current) {
                            destinationOverlayRef.current.setMap(null);
                        }

                        // Helper to get first 2 words
                        const getShortAddress = (addr: string) => {
                            const parts = addr.split(',')[0].trim();
                            return parts.split(' ').slice(0, 2).join(' ');
                        };

                        // Create pickup card overlay
                        const pickupPosition = route.legs[0].start_location;
                        console.log('Creating pickup overlay at:', pickupPosition);
                        pickupOverlayRef.current = createLocationCardOverlay(
                            pickupPosition,
                            'From',
                            getShortAddress(pickup),
                            onEditPickup,
                            true // has ETA badge
                        );
                        pickupOverlayRef.current.setMap(mapInstanceRef.current);

                        // Create destination card overlay
                        const destPosition = lastLeg.end_location;
                        console.log('Creating destination overlay at:', destPosition);
                        destinationOverlayRef.current = createLocationCardOverlay(
                            destPosition,
                            'To',
                            getShortAddress(destination) + '...',
                            onEditDestination,
                            false // no ETA badge
                        );
                        destinationOverlayRef.current.setMap(mapInstanceRef.current);

                        console.log('Location card overlays created successfully');
                    } else {
                        console.log('Location cards not enabled. showLocationCards:', showLocationCards, 'onEditPickup:', !!onEditPickup, 'onEditDestination:', !!onEditDestination);
                    }

                    // Fit map bounds to show entire route
                    const bounds = new window.google.maps.LatLngBounds();

                    // Add all points in the route to bounds
                    route.legs.forEach((leg: any) => {
                        leg.steps.forEach((step: any) => {
                            step.path.forEach((point: any) => {
                                bounds.extend(point);
                            });
                        });
                    });

                    // Fit the map to show all markers with padding
                    mapInstanceRef.current.fitBounds(bounds, {
                        padding: { top: 50, right: 50, bottom: 50, left: 50 }
                    });

                    console.log('Route rendered successfully with black markers');
                } else {
                    console.error('Directions request failed:', status);
                    // Add fallback markers if directions fail
                    addFallbackMarkers();
                }
            });
        };

        const addFallbackMarkers = () => {
            if (!mapInstanceRef.current || !window.google) {
                console.error('Map instance or Google Maps not available for fallback');
                return;
            }

            console.log('DirectionsService failed - using fallback with markers and straight line');
            console.log('Map instance:', mapInstanceRef.current);
            console.log('Pickup:', pickup, 'Stops:', stops, 'Destination:', destination);

            const bounds = new window.google.maps.LatLngBounds();
            const geocoder = new window.google.maps.Geocoder();
            const allLocations: any[] = [];
            let completedGeocodes = 0;
            const totalGeocodes = 2 + stops.length; // pickup + stops + destination

            // Helper to check if all geocoding is done and draw lines
            const checkAndDrawLines = () => {
                if (completedGeocodes === totalGeocodes && allLocations.length > 1) {
                    // Draw lines connecting all waypoints
                    for (let i = 0; i < allLocations.length - 1; i++) {
                        if (allLocations[i] && allLocations[i + 1]) {
                            drawFallbackLine(allLocations[i], allLocations[i + 1]);
                        }
                    }

                    // Create location card overlays after all geocoding is complete (mobile)
                    if (showLocationCards && onEditPickup && onEditDestination && allLocations[0] && allLocations[allLocations.length - 1]) {
                        console.log('Creating location card overlays in fallback mode...');

                        // Clean up old overlays
                        if (pickupOverlayRef.current) {
                            pickupOverlayRef.current.setMap(null);
                        }
                        if (destinationOverlayRef.current) {
                            destinationOverlayRef.current.setMap(null);
                        }

                        // Helper to get first 2 words
                        const getShortAddress = (addr: string) => {
                            const parts = addr.split(',')[0].trim();
                            return parts.split(' ').slice(0, 2).join(' ');
                        };

                        // Create pickup card overlay
                        const pickupPos = allLocations[0];
                        console.log('Creating pickup overlay at:', pickupPos);
                        pickupOverlayRef.current = createLocationCardOverlay(
                            pickupPos,
                            'From',
                            getShortAddress(pickup),
                            onEditPickup,
                            true // has ETA badge
                        );
                        pickupOverlayRef.current.setMap(mapInstanceRef.current);

                        // Create destination card overlay
                        const destPos = allLocations[allLocations.length - 1];
                        console.log('Creating destination overlay at:', destPos);
                        destinationOverlayRef.current = createLocationCardOverlay(
                            destPos,
                            'To',
                            getShortAddress(destination) + '...',
                            onEditDestination,
                            false // no ETA badge
                        );
                        destinationOverlayRef.current.setMap(mapInstanceRef.current);

                        console.log('Location card overlays created successfully in fallback mode');
                    }
                }
            };

            // Geocode pickup location
            geocoder.geocode({ address: pickup }, (results: any[], status: string) => {
                console.log('Pickup geocode status:', status);

                if (status === 'OK' && results[0]) {
                    const pickupLocation = results[0].geometry.location;
                    allLocations[0] = pickupLocation;

                    try {
                        const markerContent = createMarkerContent('A', 32, '14px');
                        new window.google.maps.marker.AdvancedMarkerElement({
                            position: pickupLocation,
                            map: mapInstanceRef.current,
                            content: markerContent,
                            title: 'Pickup: ' + pickup,
                        });

                        bounds.extend(pickupLocation);
                        mapInstanceRef.current.fitBounds(bounds);
                        console.log('Created pickup marker A');
                    } catch (error) {
                        console.error('Error creating pickup marker:', error);
                    }
                } else {
                    console.error('Geocoding failed for pickup:', status);
                }

                completedGeocodes++;
                checkAndDrawLines();
            });

            // Geocode each stop
            stops.forEach((stop, index) => {
                if (!stop || stop.trim() === '') {
                    completedGeocodes++;
                    checkAndDrawLines();
                    return;
                }

                geocoder.geocode({ address: stop }, (results: any[], status: string) => {
                    console.log(`Stop ${index + 1} geocode status:`, status);

                    if (status === 'OK' && results[0]) {
                        const stopLocation = results[0].geometry.location;
                        allLocations[index + 1] = stopLocation;

                        try {
                            const markerContent = createMarkerContent(String(index + 1), 28, '12px');
                            new window.google.maps.marker.AdvancedMarkerElement({
                                position: stopLocation,
                                map: mapInstanceRef.current,
                                content: markerContent,
                                title: `Stop ${index + 1}: ` + stop,
                            });

                            bounds.extend(stopLocation);
                            mapInstanceRef.current.fitBounds(bounds);
                            console.log(`Created stop marker ${index + 1}`);
                        } catch (error) {
                            console.error(`Error creating stop ${index + 1} marker:`, error);
                        }
                    } else {
                        console.error(`Geocoding failed for stop ${index + 1}:`, status);
                    }

                    completedGeocodes++;
                    checkAndDrawLines();
                });
            });

            // Geocode destination location
            geocoder.geocode({ address: destination }, (results: any[], status: string) => {
                console.log('Destination geocode status:', status);

                if (status === 'OK' && results[0]) {
                    const destinationLocation = results[0].geometry.location;
                    allLocations[stops.length + 1] = destinationLocation;

                    try {
                        const markerContent = createMarkerContent('B', 32, '14px');
                        new window.google.maps.marker.AdvancedMarkerElement({
                            position: destinationLocation,
                            map: mapInstanceRef.current,
                            content: markerContent,
                            title: 'Destination: ' + destination,
                        });

                        bounds.extend(destinationLocation);
                        mapInstanceRef.current.fitBounds(bounds);
                        console.log('Created destination marker B');
                    } catch (error) {
                        console.error('Error creating destination marker:', error);
                    }
                } else {
                    console.error('Geocoding failed for destination:', status);
                }

                completedGeocodes++;
                checkAndDrawLines();
            });
        };

        const drawFallbackLine = (start: any, end: any) => {
            try {
                console.log('Drawing fallback line from', start.toString(), 'to', end.toString());

                // Draw a simple straight line between pickup and destination
                const lineSymbol = {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: 1,
                    scale: 3
                };

                const polyline = new window.google.maps.Polyline({
                    path: [start, end],
                    strokeColor: '#000000',
                    strokeOpacity: 0,
                    strokeWeight: 0,
                    icons: [{
                        icon: lineSymbol,
                        offset: '0',
                        repeat: '15px'
                    }],
                    map: mapInstanceRef.current,
                });

                console.log('Drew fallback dashed line:', polyline);
            } catch (error) {
                console.error('Error drawing fallback line:', error);
            }
        };

        initializeMap();

        // Cleanup
        return () => {
            if (directionsRendererRef.current) {
                directionsRendererRef.current.setMap(null);
            }
        };
    }, [pickup, destination, stops, isServiceAvailable]); // Re-run when locations or stops change

    return (
        <div className="h-full w-full relative bg-gray-100 overflow-hidden rounded-2xl">
            {/* Google Map Container */}
            <div ref={mapRef} className="absolute inset-0"></div>

            {/* Map Attribution */}
            <div className="absolute right-0 bottom-0 bg-white/90 px-2 py-0.5 text-[10px] text-gray-500 pointer-events-none z-10">
                Map Data ©2025 Google
            </div>
        </div>
    );
}
