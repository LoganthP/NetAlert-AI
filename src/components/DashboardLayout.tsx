import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardSidebarNav } from '@/components/dashboard/sidebar-nav';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background transition-colors duration-300">
                <Sidebar className="border-r border-border/50 bg-background/95 backdrop-blur-xl dark:bg-slate-950/50">
                    <SidebarContent>
                        <DashboardSidebarNav />
                    </SidebarContent>
                </Sidebar>
                <SidebarInset className="bg-transparent">
                    <div className="fixed inset-0 z-[-1] bg-background pointer-events-none transition-colors duration-300">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(14,165,233,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(14,165,233,0.15),transparent_50%)]"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.15),transparent_50%)]"></div>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/grid-pattern.svg')] invert dark:invert-0"></div>
                    </div>
                    <DashboardHeader />
                    <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
