'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export interface User {
  email: string;
  name: string;
  role: 'admin' | 'tester';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, _password?: string) => Promise<void>;
  signup: (data: { email: string; name: string; role: 'admin' | 'tester'; password?: string }) => Promise<void>;
  logout: () => void;
}

export interface AuthHistoryItem {
  type: 'LOGIN' | 'LOGOUT';
  timestamp: string;
  user: string;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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

  const trackAuthEvent = (type: 'LOGIN' | 'LOGOUT', email: string) => {
    try {
      const history = JSON.parse(localStorage.getItem('netalert-auth-history') || '[]');
      const newEvent: AuthHistoryItem = {
        type,
        timestamp: new Date().toISOString(),
        user: email
      };
      localStorage.setItem('netalert-auth-history', JSON.stringify([newEvent, ...history]));
    } catch (e) {
      console.error("Failed to track auth event", e);
    }
  };

  const login = async (email: string, _password?: string) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    let userToLogin: User;

    try {
      // Check our "mock database" for this user
      const mockDb = JSON.parse(localStorage.getItem('netalert-users-db') || '{}');
      if (mockDb[email]) {
        userToLogin = mockDb[email];
      } else {
        // Default fallback if not found (or for demo auto-login)
        userToLogin = { email, name: 'Admin User', role: 'admin' };
      }

      localStorage.setItem('netalert-user', JSON.stringify(userToLogin));
      trackAuthEvent('LOGIN', email);
    } catch (error) {
      // Fallback for non-browser env or errors
      userToLogin = { email, name: 'Admin User', role: 'admin' };
    }

    setUser(userToLogin);
    setLoading(false);
    navigate('/dashboard');
  };

  const signup = async (data: { email: string; name: string; role: 'admin' | 'tester'; password?: string }) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser: User = {
      email: data.email,
      name: data.name,
      role: data.role
    };

    try {
      // Save to our "mock database"
      const mockDb = JSON.parse(localStorage.getItem('netalert-users-db') || '{}');
      mockDb[data.email] = newUser;
      localStorage.setItem('netalert-users-db', JSON.stringify(mockDb));

      // Set as current session
      localStorage.setItem('netalert-user', JSON.stringify(newUser));
      trackAuthEvent('LOGIN', data.email);
    } catch (error) {
      // Server environment
    }
    setUser(newUser);
    setLoading(false);
    navigate('/dashboard');
  }

  const logout = () => {
    if (user) {
      trackAuthEvent('LOGOUT', user.email);
    }
    try {
      localStorage.removeItem('netalert-user');
    } catch (error) {
      // Server environment
    }
    setUser(null);
    navigate('/login');
  };

  const value = { user, loading, login, signup, logout };

  if (loading && location.pathname !== '/login') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
