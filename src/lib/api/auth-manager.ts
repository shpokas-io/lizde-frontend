import { createClient } from '@/lib/supabase';

export class AuthManager {
  private supabase = createClient();
  private cachedSession: any = null;
  private sessionExpiry: number = 0;

  async getAuthHeaders(): Promise<Record<string, string>> {
    if (!this.cachedSession || Date.now() > this.sessionExpiry) {
      const { data: { session } } = await this.supabase.auth.getSession();
      this.cachedSession = session;
      this.sessionExpiry = Date.now() + (5 * 60 * 1000);
    }
    
    if (this.cachedSession?.access_token) {
      return {
        'Authorization': `Bearer ${this.cachedSession.access_token}`,
        'Content-Type': 'application/json',
      };
    }
    
    return {
      'Content-Type': 'application/json',
    };
  }

  async isAuthenticated(): Promise<boolean> {
    if (!this.cachedSession || Date.now() > this.sessionExpiry) {
      const { data: { session } } = await this.supabase.auth.getSession();
      this.cachedSession = session;
      this.sessionExpiry = Date.now() + (5 * 60 * 1000);
    }
    return !!this.cachedSession;
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  async signOut() {
    this.cachedSession = null;
    this.sessionExpiry = 0;
    return this.supabase.auth.signOut();
  }
}

export const authManager = new AuthManager(); 