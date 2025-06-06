import { createClient } from '@/lib/supabase';

export class AuthManager {
  private supabase = createClient();

  async getAuthHeaders(): Promise<Record<string, string>> {
    const { data: { session } } = await this.supabase.auth.getSession();
    
    if (session?.access_token) {
      return {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      };
    }
    
    return {
      'Content-Type': 'application/json',
    };
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await this.supabase.auth.getSession();
    return !!session;
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }
}

export const authManager = new AuthManager(); 