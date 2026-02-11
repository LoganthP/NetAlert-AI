import { Link, useLocation } from 'react-router-dom';
import { Logo } from '@/components/logo';
import { BarChart3, LayoutDashboard, ShieldAlert, Activity, FileText } from 'lucide-react';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/flows', label: 'Network Flows', icon: Activity },
  { href: '/dashboard/alerts', label: 'Alerts', icon: ShieldAlert },

  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
];

export function DashboardSidebarNav() {
  const location = useLocation();

  return (
    <div className="flex h-full flex-col">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarSeparator />
      <div className="flex-1 overflow-y-auto">
        <SidebarMenu className="p-2">
          {navItems.map(item => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.href}
                className="justify-start w-full"
              >
                <Link to={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </div>
  );
}

