import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.mapbox.com',
            },
            {
                protocol: 'https',
                hostname: '*.mapbox.com',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['framer-motion', 'mapbox-gl', 'react-map-gl'],
    },
};

export default nextConfig;
