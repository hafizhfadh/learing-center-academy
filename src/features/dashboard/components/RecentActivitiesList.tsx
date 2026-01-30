import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Activity } from '../types';
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface RecentActivitiesListProps {
    activities: Activity[];
}

export function RecentActivitiesList({ activities }: RecentActivitiesListProps) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                    You completed {activities.length} activities this month.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.length === 0 ? (
                         <p className="text-sm text-muted-foreground">No recent activity.</p>
                    ) : (
                        activities.map((activity) => (
                            <div key={activity.id} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{activity.title.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(activity.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">
                                    {activity.score ? `+${activity.score} pts` : ''}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
