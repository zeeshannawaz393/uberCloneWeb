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
}

declare global {
    interface Window {
        google: any;
    }
}

export function TripMap({ pickup, destination, stops = [], isServiceAvailable }: TripMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const directionsServiceRef = useRef<any>(null);
    const directionsRendererRef = useRef<any>(null);

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
