'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/dashboard/user-nav';
import { usePathname } from 'next/navigation';

export function DashboardHeader() {
  const pathname = usePathname();
  const title = pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard';
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex items-center gap-2">
         <h1 className="text-lg font-semibold text-foreground">{capitalizedTitle}</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
