import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Activity } from '../types';
import { CheckCircle2, FileText, GraduationCap, MessageSquare } from 'lucide-react';

interface RecentActivitiesListProps {
    activities: Activity[];
}

export function RecentActivitiesList({ activities }: RecentActivitiesListProps) {
    const getIcon = (type: Activity['type']) => {
        switch (type) {
            case 'lesson_complete': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'quiz_attempt': return <FileText className="h-5 w-5 text-amber-500" />;
            case 'course_enroll': return <GraduationCap className="h-5 w-5 text-blue-500" />;
            case 'comment': return <MessageSquare className="h-5 w-5 text-slate-500" />;
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <Card className="h-full shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {activities.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No recent activity found.</p>
                    ) : (
                        activities.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                <div className="mt-1 bg-muted/50 p-2 rounded-full">
                                    {getIcon(activity.type)}
                                </div>
                                <div className="flex-1 space-y-1 min-w-0">
                                    <p className="text-sm font-medium leading-none text-slate-900 truncate">
                                        {activity.title}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{formatTime(activity.timestamp)}</span>
                                        {activity.score && (
                                            <Badge variant="outline" className="text-xs h-5 border-amber-200 text-amber-700 bg-amber-50">
                                                Score: {activity.score}%
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
