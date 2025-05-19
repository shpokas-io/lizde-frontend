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
    if (!user) {
      console.log('No user found when checking course access');
      return false;
    }
    
    try {
      console.log('Checking course access for user:', user.id);
      const response = await fetch(`${API_URL}/auth/access/${user.id}`);
      if (!response.ok) {
        console.error('Error checking course access:', response.statusText);
        return false;
      }
      const data = await response.json();
      console.log('Course access response:', data);
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
      const response = await fetch(`${API_URL}/auth/access/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hasAccess }),
      });

      if (!response.ok) {
        throw new Error('Failed to update course access');
      }
    } catch (error) {
      console.error('Error in updateCourseAccess:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session:', session);
        
        if (session?.user) {
          console.log('User found in session:', session.user);
          const user = {
            id: session.user.id,
            email: session.user.email!,
            hasCourseAccess: false
          };
          setUser(user);
          
          const hasAccess = await checkCourseAccess();
          console.log('Course access:', hasAccess);
          
          setUser(prev => prev ? { ...prev, hasCourseAccess: hasAccess } : null);
        } else {
          console.log('No session found');
          setUser(null);
        }
        setLoading(false);

        if (!session?.user && pathname.startsWith('/courses')) {
          console.log('No session, redirecting to login');
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
      console.log('Auth state changed:', _event, session);
      
      if (session?.user) {
        console.log('User authenticated:', session.user);
        const hasAccess = await checkCourseAccess();
        console.log('Course access:', hasAccess);
        
        setUser({
          id: session.user.id,
          email: session.user.email!,
          hasCourseAccess: hasAccess
        });
        
        if (pathname === '/auth/login') {
          console.log('Redirecting to courses after login');
          router.push('/courses');
        }
      } else {
        console.log('User signed out');
        setUser(null);
        if (pathname.startsWith('/courses')) {
          console.log('Redirecting to login after sign out');
          router.push('/auth/login');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

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