import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDashboardData, useDashboardProfile, useDashboardStats, useRecentActivities } from '../useDashboard';
import { dashboardApi } from '../../api/dashboard.api';
import type { ReactNode } from 'react';

// Mock the API
vi.mock('../../api/dashboard.api', () => ({
    dashboardApi: {
        getProfile: vi.fn(),
        getStats: vi.fn(),
        getActivities: vi.fn(),
    }
}));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Dashboard Hooks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        queryClient.clear();
    });

    describe('useDashboardProfile', () => {
        it('should fetch profile data', async () => {
            const mockProfile = { id: '1', name: 'Test User', role: 'student' };
            (dashboardApi.getProfile as any).mockResolvedValue(mockProfile);

            const { result } = renderHook(() => useDashboardProfile(), { wrapper });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(mockProfile);
        });
    });

    describe('useDashboardStats', () => {
        it('should fetch stats data', async () => {
            const mockStats = { totalCourses: 5 };
            (dashboardApi.getStats as any).mockResolvedValue(mockStats);

            const { result } = renderHook(() => useDashboardStats(), { wrapper });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(mockStats);
        });
    });

    describe('useRecentActivities', () => {
        it('should fetch activities', async () => {
            const mockActivities = [{ id: '1', title: 'Activity 1' }];
            (dashboardApi.getActivities as any).mockResolvedValue(mockActivities);

            const { result } = renderHook(() => useRecentActivities(), { wrapper });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(mockActivities);
        });
    });

    describe('useDashboardData (Combined Hook)', () => {
        it('should fetch all data', async () => {
            const mockProfile = { id: '1', name: 'Test User' };
            const mockStats = { totalCourses: 5 };
            const mockActivities = [{ id: '1', title: 'Activity 1' }];

            (dashboardApi.getProfile as any).mockResolvedValue(mockProfile);
            (dashboardApi.getStats as any).mockResolvedValue(mockStats);
            (dashboardApi.getActivities as any).mockResolvedValue(mockActivities);

            const { result } = renderHook(() => useDashboardData(), { wrapper });

            // Initially loading
            expect(result.current.isLoading).toBe(true);

            // Wait for all to resolve
            await waitFor(() => expect(result.current.isLoading).toBe(false));

            expect(result.current.profile).toEqual(mockProfile);
            expect(result.current.stats).toEqual(mockStats);
            expect(result.current.activities).toEqual(mockActivities);
            expect(result.current.isError).toBe(false);
        });

        it('should handle errors', async () => {
             (dashboardApi.getProfile as any).mockRejectedValue(new Error('Failed'));
             // Others resolve
             (dashboardApi.getStats as any).mockResolvedValue({});
             (dashboardApi.getActivities as any).mockResolvedValue([]);

             const { result } = renderHook(() => useDashboardData(), { wrapper });

             await waitFor(() => expect(result.current.isError).toBe(true));
        });
    });
});
