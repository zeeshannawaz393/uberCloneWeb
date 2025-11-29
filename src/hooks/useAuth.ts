/**
 * useAuth Hook
 * Authentication hook with session management
 */

'use client';

import { useSessionState } from '@/state/session.state';
import { apiClient } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';

export function useAuth() {
    const { user, token, isAuthenticated, setUser, clearSession, updateUser } = useSessionState();
    const router = useRouter();

    const login = async (email: string, password: string, role: string) => {
        try {
            const response = await apiClient.post(endpoints.auth.login, { email, password, role });
            const { user: userData, token: authToken } = response.data;
            setUser(userData, authToken);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        clearSession();
        router.push(routes.auth.start);
    };

    const sendOTP = async (phone: string) => {
        try {
            await apiClient.post(endpoints.auth.sendOTP, { phone });
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.response?.data?.message || 'Failed to send OTP' };
        }
    };

    const verifyOTP = async (phone: string, otp: string) => {
        try {
            const response = await apiClient.post(endpoints.auth.verifyOTP, { phone, otp });
            return { success: true, data: response.data };
        } catch (error: any) {
            return { success: false, error: error.response?.data?.message || 'Invalid OTP' };
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        sendOTP,
        verifyOTP,
        updateUser,
    };
}
