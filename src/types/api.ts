export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
}

export interface AuthHeaders {
  'Authorization': string;
  'Content-Type': string;
}

export interface ApiRequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
  response?: Response;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; 