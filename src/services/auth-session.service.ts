import { createClient } from '@/lib/supabase';

export class AuthSessionService {
  private supabase = createClient();

  async refreshSession(): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }

      return !!data.session;
    } catch {
      return false;
    }
  }
} 