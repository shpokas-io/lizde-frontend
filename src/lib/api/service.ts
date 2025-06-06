import { httpClient } from './http-client';
import { authManager } from './auth-manager';
import { ApiRequestOptions } from '@/types/api';

export class ApiService {

  async get<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const response = await httpClient.get(endpoint, options);
    const data = await response.json();
    return data;
  }

  async post<T = any>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    const response = await httpClient.post(endpoint, data, options);
    return response.json();
  }

  async put<T = any>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    const response = await httpClient.put(endpoint, data, options);
    return response.json();
  }

  async delete<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const response = await httpClient.delete(endpoint, options);
    return response.json();
  }

  async patch<T = any>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    const response = await httpClient.patch(endpoint, data, options);
    return response.json();
  }

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
  }

  async getSessionStatus(): Promise<any> {
    const response = await httpClient.get('/auth/session');
    return response.json();
  }

  async isAuthenticated(): Promise<boolean> {
    return authManager.isAuthenticated();
  }

  async getSession() {
    return authManager.getSession();
  }

  async signOut() {
    return authManager.signOut();
  }
}

export const apiService = new ApiService(); 