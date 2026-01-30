import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { UserProfile } from '../types';

interface ProfileCardProps {
    profile: UserProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
    const initials = profile.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <Card className="h-full border-t-4 border-t-primary shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-muted-foreground">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center pt-4">
                <div className="relative mb-4">
                    <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-primary/10">
                        <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <Badge 
                        variant="secondary" 
                        className="absolute -bottom-2 -right-2 px-3 py-1 capitalize bg-sky-100 text-sky-800 hover:bg-sky-200"
                    >
                        {profile.role}
                    </Badge>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-1">{profile.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{profile.email}</p>
                
                <div className="w-full grid grid-cols-2 gap-2 mt-2 pt-4 border-t">
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Joined</p>
                        <p className="font-medium text-slate-700">{new Date(profile.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                        <div className="flex items-center justify-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <p className="font-medium text-slate-700">Active</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
