import type { ReactNode } from 'react';
import { MainNav } from './MainNav';
import { UserNav } from './UserNav';
import { Search } from './Search';
import type { UserProfile } from '../types';

interface DashboardLayoutProps {
    children: ReactNode;
    userProfile?: UserProfile;
    onLogout?: () => void;
}

export function DashboardLayout({ children, userProfile, onLogout }: DashboardLayoutProps) {
    return (
        <div className="flex-col md:flex min-h-screen bg-background">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                   <div className="font-bold text-xl mr-4 text-primary">Learning Center</div> 
                    <MainNav className="mx-6" />
                    <div className="ml-auto flex items-center space-x-4">
                        <Search />
                        {userProfile && onLogout && (
                            <UserNav user={userProfile} onLogout={onLogout} />
                        )}
                    </div>
                </div>
            </div>
            <main className="flex-1 space-y-4 p-8 pt-6">
                {children}
            </main>
        </div>
    );
}
