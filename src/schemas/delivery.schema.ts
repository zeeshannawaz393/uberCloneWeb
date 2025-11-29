import { z } from 'zod';
import { locationSchema } from './ride.schema';

export const packageDetailsSchema = z.object({
    description: z.string().min(1).max(500),
    weight: z.number().positive().optional(),
    dimensions: z
        .object({
            length: z.number().positive(),
            width: z.number().positive(),
            height: z.number().positive(),
        })
        .optional(),
    fragile: z.boolean().default(false),
});

export const deliveryRequestSchema = z.object({
    pickup: locationSchema,
    dropoff: locationSchema,
    recipient: z.object({
        name: z.string().min(1),
        phone: z.string().min(10),
    }),
    package: packageDetailsSchema,
    scheduledTime: z.string().datetime().optional(),
    notes: z.string().max(500).optional(),
});

export const deliveryResponseSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    courierId: z.string().optional(),
    pickup: locationSchema,
    dropoff: locationSchema,
    recipient: z.object({
        name: z.string(),
        phone: z.string(),
    }),
    package: packageDetailsSchema,
    status: z.enum([
        'pending',
        'accepted',
        'courier_arriving',
        'picked_up',
        'in_transit',
        'delivered',
        'cancelled',
    ]),
    estimatedPrice: z.number(),
    actualPrice: z.number().optional(),
    eta: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type PackageDetails = z.infer<typeof packageDetailsSchema>;
export type DeliveryRequestInput = z.infer<typeof deliveryRequestSchema>;
export type DeliveryResponse = z.infer<typeof deliveryResponseSchema>;
