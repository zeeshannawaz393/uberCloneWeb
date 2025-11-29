/**
 * Test Utilities
 */

export function mockUser(overrides = {}) {
    return {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        phone: '+1234567890',
        countryCode: '+1',
        role: 'rider',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides,
    };
}

export function mockTrip(overrides = {}) {
    return {
        id: '1',
        userId: '1',
        pickup: {
            latitude: 40.7128,
            longitude: -74.0060,
            address: '123 Main St, New York, NY',
        },
        dropoff: {
            latitude: 40.7580,
            longitude: -73.9855,
            address: '456 Park Ave, New York, NY',
        },
        status: 'searching',
        estimatedPrice: 15.50,
        estimatedDuration: 15,
        distance: 5000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...overrides,
    };
}
