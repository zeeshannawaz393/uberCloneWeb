'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Script from 'next/script';
import { ToastProvider } from '@/components/ui/Toast';
import { ChatProvider } from '@/components/chat/ChatProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minute
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {/* Google Maps Script - Loaded once for entire app */}
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <Script
                    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker&v=beta`}
                    strategy="beforeInteractive"
                />
            ) : (
                <script dangerouslySetInnerHTML={{
                    __html: `console.warn("Google Maps API key is missing. Maps will not load. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local");`
                }} />
            )}
            <ToastProvider>
                {children}
                <ChatProvider />
            </ToastProvider>
        </QueryClientProvider>
    );
}
