'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  email: string;
  hasCourseAccess: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  checkCourseAccess: () => Promise<boolean>;
  updateCourseAccess: (hasAccess: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const checkCourseAccess = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const response = await fetch(`${API_URL}/auth/check-access/${user.id}`);
      if (!response.ok) {
        console.error('Error checking course access:', response.statusText);
        return false;
      }
      const data = await response.json();
      return data.hasAccess ?? false;
    } catch (error) {
      console.error('Error checking course access:', error);
      return false;
    }
  };

  const updateCourseAccess = async (hasAccess: boolean): Promise<void> => {
    if (!user) {
      console.error('Cannot update course access: No user found');
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/auth/update-access/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hasAccess }),
      });

      if (!response.ok) {
        throw new Error('Failed to update course access');
      }

      setUser(prev => prev ? { ...prev, hasCourseAccess: hasAccess } : null);
    } catch (error) {
      console.error('Error in updateCourseAccess:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const hasAccess = await checkCourseAccess();
          setUser({
            id: session.user.id,
            email: session.user.email!,
            hasCourseAccess: hasAccess
          });
        } else {
          setUser(null);
        }
        setLoading(false);

        if (!session?.user && pathname.startsWith('/courses')) {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const hasAccess = await checkCourseAccess();
        setUser({
          id: session.user.id,
          email: session.user.email!,
          hasCourseAccess: hasAccess
        });
        if (!isDevelopment && pathname === '/auth/login') {
          router.push('/courses');
        }
      } else {
        setUser(null);
        if (pathname.startsWith('/courses')) {
          router.push('/auth/login');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, isDevelopment]);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOut,
        checkCourseAccess,
        updateCourseAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 