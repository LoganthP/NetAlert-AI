'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { LogOut, User as UserIcon, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export function UserNav() {
  const { user, logout } = useAuth();
  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-secondary/50 transition-colors">
          <Avatar className="h-10 w-10 border-2 border-border/50">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
            <AvatarFallback className="bg-secondary text-secondary-foreground font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 glass-card border-border/50" align="end" forceMount>
        <DropdownMenuLabel className="font-normal p-4 pb-2">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-base font-semibold leading-none text-foreground">{user.name}</p>
              {user.role === 'admin' ? (
                <Badge variant="default" className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 shadow-none border-cyan-500/20 text-[10px] uppercase">
                  Admin
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[10px] uppercase">
                  Tester
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground truncate font-mono bg-secondary/50 p-1 rounded-sm">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem className="cursor-pointer focus:bg-secondary/50" asChild>
          <Link to="/dashboard/profile">
            <UserIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer focus:bg-secondary/50" asChild>
          <Link to="/dashboard/settings">
            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Security Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/50" />
        <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
