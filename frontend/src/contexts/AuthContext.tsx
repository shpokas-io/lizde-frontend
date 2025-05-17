'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

const supabase = createClient<Database>(
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
      const { data: userCourse, error } = await supabase
        .from('user_courses')
        .select('has_access')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error checking course access:', error);
        return false;
      }

      return userCourse?.has_access ?? false;
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
      console.log(`Updating course access for user ${user.id} to ${hasAccess}`);
      
      // First check if the user has a record in user_courses
      const { data: existingRecord, error: checkError } = await supabase
        .from('user_courses')
        .select('id, has_access')
        .eq('user_id', user.id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Error checking existing record:', checkError);
        throw checkError;
      }

      let updateError;
      if (!existingRecord) {
        console.log('No existing record found, creating new one');
        const { data, error } = await supabase
          .from('user_courses')
          .insert([{ user_id: user.id, has_access: hasAccess }])
          .select()
          .single();
        updateError = error;
        console.log('Insert result:', data);
      } else {
        console.log(`Updating existing record (current access: ${existingRecord.has_access})`);
        const { data, error } = await supabase
          .from('user_courses')
          .update({ has_access: hasAccess })
          .eq('user_id', user.id)
          .select()
          .single();
        updateError = error;
        console.log('Update result:', data);
      }

      if (updateError) {
        console.error('Error updating course access:', updateError);
        throw updateError;
      }

      // Update local state
      console.log('Updating local state with new access value');
      setUser(prev => prev ? { ...prev, hasCourseAccess: hasAccess } : null);
      
      // Verify the update
      const { data: verifyData, error: verifyError } = await supabase
        .from('user_courses')
        .select('has_access')
        .eq('user_id', user.id)
        .single();
        
      if (verifyError) {
        console.error('Error verifying update:', verifyError);
      } else {
        console.log('Verified access status:', verifyData.has_access);
      }
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

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut,
    checkCourseAccess,
    updateCourseAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 