# Project Architecture

## Overview

This is a domain-driven architecture for an on-demand mobility platform supporting ride-hailing and courier delivery services.

## Core Principles

1. **Domain-Driven Design**: Features are organized by business domain (auth, trip, ride, payment, courier)
2. **Explicit State Machines**: All flows use explicit state machines in the `flows/` directory
3. **Separation of Concerns**: Clear boundaries between UI, logic, and data
4. **Type Safety**: Comprehensive TypeScript types for all domains
5. **Access Control**: Role-based permissions (rider, driver, courier, admin)

## Directory Structure

### `/src/app/` - Routes Only
Next.js App Router pages. Contains NO business logic, only routing and page composition.

### `/src/features/` - Domain Logic
Core business logic organized by domain:
- `auth/` - Authentication flow
- `trip/` - Trip booking
- `ride/` - Ride selection and management
- `rider/` - Rider management
- `payment/` - Payment processing
- `account/` - Account management
- `courier/` - Courier delivery

Each feature contains:
- `*.types.ts` - Type definitions
- `*.state.ts` - State management (Zustand)
- `*.flow.ts` - Business logic
- `*.logic.ts` - Utility functions

### `/src/flows/` - State Machines
Explicit state machines for complex flows:
- `auth.flow.ts` - Authentication state machine
- `trip.flow.ts` - Trip booking state machine
- `payment.flow.ts` - Payment flow state machine

### `/src/access/` - Access Control
Role-based access control:
- `roles.ts` - Role definitions
- `permissions.ts` - Permission mappings
- `guards.ts` - Route guards

### `/src/design-system/` - Design Tokens
Centralized design system:
- `tokens/` - Colors, spacing, typography, etc.
- `themes/` - Light and dark themes

### `/src/components/` - Pure UI
Reusable UI components with NO business logic:
- `ui/` - Base components (Button, Input, Card)
- `navigation/` - Navigation components
- `map/` - Map components
- `trip/`, `rider/`, `payment/` - Domain-specific UI

### `/src/state/` - Global State
Application-wide state:
- `session.state.ts` - User session
- `ui.state.ts` - UI state (modals, toasts)
- `app.state.ts` - App configuration

### `/src/services/` - Data Boundary
External service integrations:
- `api/` - HTTP client
- `socket/` - WebSocket client
- `mock/` - Mock data services

## Data Flow

```
User Action → Component → Hook → Feature State → Flow Logic → Service → API
                                      ↓
                                  UI Update
```

## State Management Strategy

1. **Session State** (Zustand + persist): User authentication
2. **Feature State** (Zustand): Domain-specific state
3. **UI State** (Zustand): Modals, toasts, loading
4. **Server State** (TanStack Query): API data caching

## Adding New Features

1. Create feature directory in `/src/features/[feature-name]/`
2. Define types in `[feature].types.ts`
3. Create state in `[feature].state.ts`
4. Add flow logic if complex in `/src/flows/[feature].flow.ts`
5. Create UI components in `/src/components/[feature]/`
6. Add routes in `/src/app/[feature]/`
