'use client';

import { RideStatus } from '@/store/rideStore';
import { DeliveryStatus } from '@/store/deliveryStore';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
    status: RideStatus | DeliveryStatus;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const statusConfig: Record<
        RideStatus | DeliveryStatus,
        { label: string; color: string }
    > = {
        pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        accepted: { label: 'Accepted', color: 'bg-blue-100 text-blue-800' },
        driver_arriving: {
            label: 'Driver Arriving',
            color: 'bg-blue-100 text-blue-800',
        },
        courier_arriving: {
            label: 'Courier Arriving',
            color: 'bg-blue-100 text-blue-800',
        },
        arrived: { label: 'Arrived', color: 'bg-purple-100 text-purple-800' },
        picked_up: { label: 'Picked Up', color: 'bg-indigo-100 text-indigo-800' },
        in_progress: {
            label: 'In Progress',
            color: 'bg-primary-100 text-primary-800',
        },
        in_transit: { label: 'In Transit', color: 'bg-primary-100 text-primary-800' },
        completed: { label: 'Completed', color: 'bg-success-100 text-success-800' },
        delivered: { label: 'Delivered', color: 'bg-success-100 text-success-800' },
        cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800' },
    };

    const config = statusConfig[status];

    return (
        <span
            className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                config.color,
                className
            )}
        >
            {config.label}
        </span>
    );
}
