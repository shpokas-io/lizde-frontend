import { User, AuthError } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase";
import { sessionService } from "./session.service";
import { apiService } from "@/lib/api";
import {
  AuthCredentials,
  RegisterCredentials,
  AuthResult,
  AuthEvent,
  AuthEventHandler,
} from "@/types/auth";

class AuthService {
  private supabase = createClient();
  private eventHandlers: AuthEventHandler[] = [];

  async signIn({ email, password }: AuthCredentials): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return { error };

      if (data.user) {
        sessionService.initializeSession();
        this.notifyHandlers("SIGNED_IN", data.user);
      }

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async signUp({ email, password }: RegisterCredentials): Promise<AuthResult> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) return { error };

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async signOut(): Promise<void> {
    try {
      sessionService.endSession();

      try {
        await apiService.logout();
      } catch (error) {}

      this.clearStorageData();

      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;

      this.notifyHandlers("SIGNED_OUT", null);
    } catch (error) {
      throw error;
    }
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  addEventListener(handler: AuthEventHandler): () => void {
    this.eventHandlers.push(handler);
    return () => {
      const index = this.eventHandlers.indexOf(handler);
      if (index > -1) {
        this.eventHandlers.splice(index, 1);
      }
    };
  }

  private notifyHandlers(event: AuthEvent, user: User | null): void {
    this.eventHandlers.forEach((handler) => handler(event, user));
  }

  private clearStorageData(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  async updatePassword(newPassword: string): Promise<AuthResult> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password: newPassword
      });

      if (error) return { error };

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async updateEmail(newEmail: string): Promise<AuthResult> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        email: newEmail
      });

      if (error) return { error };

      return { error: null };
    } catch (error) {
      return { error: error as AuthError };
    }
  }

  async deleteAccount(): Promise<AuthResult> {
    try {
      // First sign out to clear session
      await this.signOut();
      
      // Note: Supabase doesn't have a direct deleteUser method in the client
      // This would typically require a server-side function or admin API call
      // For now, we'll return an error indicating this needs backend implementation
      return { 
        error: { 
          message: "Account deletion requires backend implementation",
          name: "NotImplementedError"
        } as AuthError 
      };
    } catch (error) {
      return { error: error as AuthError };
    }
  }
}

export const authService = new AuthService();
