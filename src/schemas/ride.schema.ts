import { z } from 'zod';

export const locationSchema = z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    address: z.string().optional(),
});

export const rideBookingSchema = z.object({
    pickup: locationSchema,
    dropoff: locationSchema,
    vehicleType: z.enum(['economy', 'comfort', 'premium', 'xl']),
    scheduledTime: z.string().datetime().optional(),
    notes: z.string().max(500).optional(),
});

export const ridePricingSchema = z.object({
    basePrice: z.number().positive(),
    distancePrice: z.number().positive(),
    timePrice: z.number().positive(),
    surgeMultiplier: z.number().min(1),
    totalPrice: z.number().positive(),
    estimatedDuration: z.number().positive(),
    distance: z.number().positive(),
});

export const rideResponseSchema = z.object({
    id: z.string(),
    riderId: z.string(),
    driverId: z.string().optional(),
    pickup: locationSchema,
    dropoff: locationSchema,
    status: z.enum([
        'pending',
        'accepted',
        'driver_arriving',
        'arrived',
        'in_progress',
        'completed',
        'cancelled',
    ]),
    vehicleType: z.string(),
    estimatedPrice: z.number(),
    actualPrice: z.number().optional(),
    estimatedDuration: z.number().optional(),
    eta: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type LocationInput = z.infer<typeof locationSchema>;
export type RideBookingInput = z.infer<typeof rideBookingSchema>;
export type RidePricing = z.infer<typeof ridePricingSchema>;
export type RideResponse = z.infer<typeof rideResponseSchema>;
