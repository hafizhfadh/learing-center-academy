import { useDashboardData } from '../../features/dashboard/hooks/useDashboard';
import { DashboardLayout } from '../../features/dashboard/components/DashboardLayout';
import { StatisticsGrid } from '../../features/dashboard/components/StatisticsGrid';
import { RecentActivitiesList } from '../../features/dashboard/components/RecentActivitiesList';
import { Overview } from '../../features/dashboard/components/Overview';
import { DashboardSkeleton } from '../../features/dashboard/components/DashboardSkeleton';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from '@tanstack/react-router';
import { removeToken } from '../../features/auth/auth.utils';
import { RefreshCcw } from 'lucide-react';

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
        <DashboardLayout userProfile={profile} onLogout={handleLogout}>
             <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Button>Download Report</Button>
                </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
                    <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
                    <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <StatisticsGrid stats={stats} />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview />
                            </CardContent>
                        </Card>
                        <RecentActivitiesList activities={activities} />
                    </div>
                </TabsContent>
            </Tabs>
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
