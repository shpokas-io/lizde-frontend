import { createClient } from '@/lib/supabase';
import { AuthHeaders } from '@/types/api';

export class AuthManager {
  private supabase = createClient();

  async getAuthHeaders(): Promise<AuthHeaders> {
    const { data: { session } } = await this.supabase.auth.getSession();
    
    if (!session?.access_token) {
      console.error('No authentication token available');
      throw new Error('No authentication token available');
    }

    console.log('Auth token available, making authenticated request');
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    };
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await this.supabase.auth.getSession();
      return !!session?.access_token;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }
}

export const authManager = new AuthManager(); 