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
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            desc: 'Active learning paths'
        },
        {
            title: 'Lessons Completed',
            value: stats.completedLessons,
            icon: CheckCircle,
            color: 'text-green-600',
            bg: 'bg-green-50',
            desc: 'Total finished units'
        },
        {
            title: 'Hours Spent',
            value: stats.hoursSpent,
            icon: Clock,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            desc: 'Time dedicated to study'
        },
        {
            title: 'Average Score',
            value: `${stats.averageScore}%`,
            icon: Trophy,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            desc: 'Performance metric'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item, idx) => (
                <Card key={idx} className="shadow-sm hover:shadow-md transition-all duration-200 border-l-4" style={{ borderLeftColor: item.color.includes('blue') ? '#1E40AF' : item.color.includes('green') ? '#10B981' : item.color.includes('amber') ? '#F59E0B' : '#7C3AED' }}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            {item.title}
                        </CardTitle>
                        <div className={`p-2 rounded-full ${item.bg}`}>
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {item.desc}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
