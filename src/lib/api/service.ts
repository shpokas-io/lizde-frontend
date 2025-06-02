import { httpClient } from './http-client';
import { authManager } from './auth-manager';
import { ApiRequestOptions } from '@/types/api';

export class ApiService {

  async get<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    const response = await httpClient.get(endpoint, options);
    const data = await response.json();
    console.log('API request successful, data received:', data);
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

  async logout(): Promise<any> {
    console.log('Making logout request');
    return this.post('/auth/logout');
  }

  async getSessionStatus(): Promise<any> {
    console.log('Making session status request');
    return this.post('/auth/session/status');
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