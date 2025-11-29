# On-Demand Mobility Platform

A high-performance ride-hailing and courier delivery platform built with Next.js 16, React 19, and real-time features.

## Tech Stack

- **Framework**: Next.js 16 (Canary) with React 19
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 4.5
- **Data Fetching**: TanStack Query 5
- **Real-time**: Socket.io Client 4.7
- **Validation**: Zod 3.23
- **Maps**: Mapbox GL JS 3 with react-map-gl 8.1
- **Animations**: Framer Motion 12

## Features

- 🚗 **Ride Hailing**: Book rides, track drivers in real-time
- 📦 **Courier Delivery**: On-demand package delivery
- 📍 **Live Tracking**: Real-time location updates via Socket.io
- 💰 **Pricing Estimates**: Dynamic pricing based on distance and demand
- ⏱️ **ETA Calculations**: Accurate arrival time estimates
- 👥 **Multi-Role Support**: Riders, Drivers, Couriers, Customers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Mapbox API key (for maps functionality)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Add your Mapbox API key to .env.local
# NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here
NEXT_PUBLIC_APP_NAME=RideShare Platform
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── courier/           # Courier dashboard
│   ├── driver/            # Driver dashboard
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── rider/             # Rider dashboard
│   └── track/             # Public tracking pages
├── components/            # React components
│   ├── providers/         # Context providers
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── api.ts            # Axios instance
│   ├── socket.ts         # Socket.io client
│   └── utils.ts          # Helper functions
├── schemas/               # Zod validation schemas
│   ├── auth.schema.ts
│   ├── delivery.schema.ts
│   └── ride.schema.ts
└── store/                 # Zustand stores
    ├── authStore.ts
    ├── deliveryStore.ts
    └── rideStore.ts
```

## User Roles

### Rider
- Book rides with pickup/dropoff locations
- Select vehicle type (Economy, Comfort, Premium, XL)
- Track driver location in real-time
- View ride history and pricing

### Driver
- Go online/offline to receive ride requests
- Accept or decline ride requests
- Navigate to pickup and dropoff locations
- Track earnings and statistics

### Courier
- Accept delivery requests
- Update delivery status (picked up, in transit, delivered)
- Manage active deliveries
- Track earnings

### Customer
- Track deliveries in real-time (no login required)
- View courier location and ETA
- See delivery timeline and status updates

## Backend Requirements

This frontend requires a backend API with:

- RESTful endpoints for rides, deliveries, pricing, ETAs
- Socket.io server for real-time updates
- Authentication endpoints (login, register)
- User management with role-based access

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## License

MIT
