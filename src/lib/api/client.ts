import { httpClient } from './http-client';
import { ApiRequestOptions } from '@/types/api';

export class ApiClient {
  async get<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    try {
      const response = await httpClient.get(endpoint, options);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async post<T = any>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    try {
      const response = await httpClient.post(endpoint, data, options);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async put<T = any>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    try {
      const response = await httpClient.put(endpoint, data, options);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async delete<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    try {
      const response = await httpClient.delete(endpoint, options);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  async patch<T = any>(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<T> {
    try {
      const response = await httpClient.patch(endpoint, data, options);
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

export const apiClient = new ApiClient(); 