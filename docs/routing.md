# Routing Documentation

## Route Structure

### Public Routes
- `/` - Homepage
- `/auth/start` - Auth entry point
- `/auth/phone` - Phone number entry
- `/auth/otp` - OTP verification
- `/auth/profile` - Profile setup
- `/auth/terms` - Terms & conditions
- `/auth/security-choice` - Security method selection

### Protected Routes (Require Authentication)
- `/trip` - Trip booking
- `/account` - Account overview
- `/account/personal-info` - Personal information
- `/account/security` - Security settings
- `/account/privacy-data` - Privacy settings
- `/courier` - Courier dashboard
- `/courier/create` - Create delivery

### Legacy Routes (Backward Compatibility)
- `/login` - Login page
- `/register` - Registration page
- `/rider` - Rider dashboard
- `/driver` - Driver dashboard
- `/track/[id]` - Delivery tracking

## Route Guards

Routes are protected using the access control system:

```typescript
import { requireAuth, requireRole } from '@/access/guards';

// Example middleware
export function middleware(request: NextRequest) {
  const context = getAuthContext(request);
  
  if (request.nextUrl.pathname.startsWith('/trip')) {
    if (!requireAuth(context)) {
      return NextResponse.redirect('/auth/start');
    }
  }
}
```

## Navigation Flow

### Authentication Flow
```
/auth/start → /auth/phone → /auth/otp → /auth/profile → /auth/terms → /auth/security-choice → /trip
```

### Trip Booking Flow
```
/trip (search) → select ride → select rider → payment → confirm → booked
```

## Centralized Routes

All routes are defined in `/src/lib/routes.ts` for type safety and easy refactoring.
