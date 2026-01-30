import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/dashboard.api';
import type { Activity, DashboardStats, UserProfile } from '../types';

export const DASHBOARD_KEYS = {
    all: ['dashboard'] as const,
    profile: ['dashboard', 'profile'] as const,
    stats: ['dashboard', 'stats'] as const,
    activities: ['dashboard', 'activities'] as const,
};

export function useDashboardProfile() {
    return useQuery<UserProfile>({
        queryKey: DASHBOARD_KEYS.profile,
        queryFn: dashboardApi.getProfile,
        staleTime: 1000 * 60 * 60, // 1 hour - profile doesn't change often
    });
}

export function useDashboardStats() {
    return useQuery<DashboardStats>({
        queryKey: DASHBOARD_KEYS.stats,
        queryFn: dashboardApi.getStats,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export function useRecentActivities() {
    return useQuery<Activity[]>({
        queryKey: DASHBOARD_KEYS.activities,
        queryFn: dashboardApi.getActivities,
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 60 * 2, // Auto-refetch every 2 minutes for "real-time" feel
    });
}

export function useDashboardData() {
    const profile = useDashboardProfile();
    const stats = useDashboardStats();
    const activities = useRecentActivities();

    const isLoading = profile.isLoading || stats.isLoading || activities.isLoading;
    const isError = profile.isError || stats.isError || activities.isError;
    const error = profile.error || stats.error || activities.error;

    return {
        profile: profile.data,
        stats: stats.data,
        activities: activities.data,
        isLoading,
        isError,
        error,
        refetchAll: () => {
            profile.refetch();
            stats.refetch();
            activities.refetch();
        }
    };
}

// Hook pattern for filtering/sorting (client-side for now as per mock)
export function useFilteredActivities(filterType?: Activity['type']) {
    const { data: activities, isLoading } = useRecentActivities();

    if (!activities) return { filteredData: [], isLoading };

    const filteredData = filterType
        ? activities.filter(a => a.type === filterType)
        : activities;

    return { filteredData, isLoading };
}
