'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('netalert-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      // Server environment
    } finally {
        setLoading(false);
    }
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser = { email, name: 'Admin User' };
    try {
      localStorage.setItem('netalert-user', JSON.stringify(newUser));
    } catch (error) {
      // Server environment
    }
    setUser(newUser);
    setLoading(false);
    router.push('/dashboard');
  };

  const logout = () => {
    try {
      localStorage.removeItem('netalert-user');
    } catch (error) {
       // Server environment
    }
    setUser(null);
    router.push('/login');
  };
  
  const value = { user, loading, login, logout };

  if (loading && pathname !== '/login') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
