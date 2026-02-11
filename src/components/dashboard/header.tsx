import { Search, Moon, Sun, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

import { useDashboardData } from '@/hooks/use-dashboard-data';
import { useTheme } from '@/components/theme-provider';
import { useAuth } from '@/hooks/use-auth';
import { NotificationsPopover } from '@/components/dashboard/notifications-popover';
import { cn } from '@/lib/utils';

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const { timeRange, setTimeRange, searchQuery, setSearchQuery } = useDashboardData();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 glass-header px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="System-wide search..."
            className="w-full bg-secondary/50 border-transparent focus:border-primary pl-10 md:w-[300px] lg:w-[400px] rounded-full focus:ring-primary/20 transition-all placeholder:text-muted-foreground text-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Time Range Selector */}
        <div className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-md p-1 text-xs font-medium">
          <button
            onClick={() => setTimeRange('1h')}
            className={cn(
              "px-2 py-1 rounded transition-colors",
              timeRange === '1h' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"
            )}
          >
            1h
          </button>
          <button
            onClick={() => setTimeRange('24h')}
            className={cn(
              "px-2 py-1 rounded transition-colors",
              timeRange === '24h' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"
            )}
          >
            24h
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={cn(
              "px-2 py-1 rounded transition-colors",
              timeRange === '7d' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:bg-background/50"
            )}
          >
            7d
          </button>
        </div>

        {/* Action Buttons */}
        <NotificationsPopover />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full ring-2 ring-border hover:ring-primary/50 transition-all">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="@admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass-card" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">
                  admin@netalert.ai
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile" className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
