import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats } from '../types';
import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';

interface StatisticsGridProps {
    stats: DashboardStats;
}

export function StatisticsGrid({ stats }: StatisticsGridProps) {
    const items = [
        {
            title: 'Enrolled Courses',
            value: stats.totalCourses,
            icon: BookOpen,
            desc: '+2 from last month'
        },
        {
            title: 'Lessons Completed',
            value: stats.completedLessons,
            icon: CheckCircle,
            desc: '+15% from last month'
        },
        {
            title: 'Hours Spent',
            value: stats.hoursSpent,
            icon: Clock,
            desc: '+4 hours this week'
        },
        {
            title: 'Average Score',
            value: `${stats.averageScore}%`,
            icon: Trophy,
            desc: '+2.5% from last month'
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, idx) => (
                <Card key={idx}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {item.title}
                        </CardTitle>
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {item.desc}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
