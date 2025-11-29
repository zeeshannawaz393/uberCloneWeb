# State Management Model

## Overview

The application uses a multi-layered state management approach:

1. **Session State** - User authentication (Zustand + persist)
2. **Feature State** - Domain-specific state (Zustand)
3. **UI State** - Global UI state (Zustand)
4. **Server State** - API data caching (TanStack Query)

## State Layers

### 1. Session State (`/src/state/session.state.ts`)

Manages user authentication and session:

```typescript
{
  user: User | null,
  token: string | null,
  isAuthenticated: boolean,
  setUser: (user, token) => void,
  clearSession: () => void,
}
```

**Persistence**: localStorage via Zustand persist middleware

### 2. Feature State (`/src/features/*/`)

Domain-specific state for each feature:

**Auth Feature** (`/src/features/auth/auth.state.ts`):
```typescript
{
  step: AuthStep,
  phone: string | null,
  profile: ProfileData | null,
  setStep: (step) => void,
  setPhone: (phone) => void,
}
```

**Trip Feature** (`/src/features/trip/trip.state.ts`):
```typescript
{
  step: TripStep,
  pickup: Location | null,
  dropoff: Location | null,
  selectedRideId: string | null,
  setPickup: (location) => void,
  selectRide: (id) => void,
}
```

### 3. UI State (`/src/state/ui.state.ts`)

Global UI state:

```typescript
{
  modals: Modal[],
  toasts: Toast[],
  isLoading: boolean,
  isSidebarOpen: boolean,
  openModal: (component, props) => void,
  showToast: (message, type) => void,
}
```

### 4. Server State (TanStack Query)

API data caching and synchronization:

```typescript
const { data, isLoading } = useQuery({
  queryKey: ['rides'],
  queryFn: fetchRides,
});
```

## State Machines (Flows)

Complex flows use explicit state machines in `/src/flows/`:

### Auth Flow State Machine

```typescript
States: start → phone → otp → profile → terms → security → complete

Events:
- ENTER_PHONE
- VERIFY_OTP
- COMPLETE_PROFILE
- ACCEPT_TERMS
- SET_SECURITY
- BACK
- RESET
```

### Trip Flow State Machine

```typescript
States: search → select_ride → select_rider → payment → confirm → booked

Events:
- SET_LOCATIONS
- SELECT_RIDE
- SELECT_RIDER
- SELECT_PAYMENT
- CONFIRM
- BACK
- RESET
```

## Best Practices

1. **Use the right state layer**:
   - Session data → Session State
   - Feature-specific → Feature State
   - UI elements → UI State
   - API data → TanStack Query

2. **Keep state minimal**: Only store what's necessary

3. **Use state machines for complex flows**: Explicit states prevent bugs

4. **Persist only session data**: Don't persist feature state

5. **Use selectors**: Extract only needed data from stores

## Example Usage

```typescript
// In a component
import { useSessionState } from '@/state/session.state';
import { useAuthFeature } from '@/features/auth/auth.state';
import { useUIState } from '@/state/ui.state';

function MyComponent() {
  const { user } = useSessionState();
  const { step, setStep } = useAuthFeature();
  const { showToast } = useUIState();

  const handleNext = () => {
    setStep('otp');
    showToast('Code sent!', 'success');
  };
}
```
