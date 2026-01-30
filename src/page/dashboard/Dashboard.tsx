import { useDashboardData } from '../../features/dashboard/hooks/useDashboard';
import { DashboardLayout } from '../../features/dashboard/components/DashboardLayout';
import { StatisticsGrid } from '../../features/dashboard/components/StatisticsGrid';
import { RecentActivitiesList } from '../../features/dashboard/components/RecentActivitiesList';
import { ProfileCard } from '../../features/dashboard/components/ProfileCard';
import { DashboardSkeleton } from '../../features/dashboard/components/DashboardSkeleton';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { LogOut, RefreshCcw } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';
import { removeToken } from '../../features/auth/auth.utils';

function DashboardContent() {
    const { 
        profile, 
        stats, 
        activities, 
        isLoading, 
        isError, 
        refetchAll 
    } = useDashboardData();
    
    const router = useRouter();

    const handleLogout = () => {
        removeToken();
        router.navigate({ to: '/login' });
    };

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (isError || !profile || !stats || !activities) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <p className="text-destructive font-medium">Failed to load dashboard data</p>
                <Button onClick={refetchAll} variant="outline" className="gap-2">
                    <RefreshCcw className="h-4 w-4" />
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <DashboardLayout 
            headerAction={
                <Button variant="ghost" onClick={handleLogout} className="gap-2 text-muted-foreground hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            }
        >
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                        <p className="text-muted-foreground">Welcome back, {profile.name.split(' ')[0]}!</p>
                    </div>
                    <Button onClick={refetchAll} variant="outline" size="sm" className="gap-2">
                        <RefreshCcw className="h-4 w-4" />
                        Refresh
                    </Button>
                </div>

                <StatisticsGrid stats={stats} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <RecentActivitiesList activities={activities} />
                    </div>
                    <div>
                        <ProfileCard profile={profile} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default function Dashboard() {
    return (
        <ErrorBoundary>
            <DashboardContent />
        </ErrorBoundary>
    );
}
