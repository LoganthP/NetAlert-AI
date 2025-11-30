'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { BarChart, Bell, LayoutDashboard, ShieldAlert } from 'lucide-react';
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/flows', label: 'Network Flows', icon: BarChart },
  { href: '/dashboard/alerts', label: 'Alerts', icon: ShieldAlert },
];

export function DashboardSidebarNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarSeparator/>
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="p-2">
          {navItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className="justify-start w-full"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </div>
  );
}
