import type { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
    headerAction?: ReactNode;
}

export function DashboardLayout({ children, headerAction }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50/50">
            <header className="bg-white border-b sticky top-0 z-30">
                <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-primary">Learning Center</h1>
                    {headerAction}
                </div>
            </header>
            <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
