import { ApiRequestOptions, ApiError, HttpMethod } from '@/types/api';
import { API_CONFIG } from './config';
import { authManager } from './auth-manager';

export class HttpClient {
  private config = API_CONFIG;

  private createApiError(message: string, response?: Response): ApiError {
    const error = new Error(message) as ApiError;
    error.status = response?.status;
    error.statusText = response?.statusText;
    error.response = response;
    return error;
  }

  private withTimeout(promise: Promise<Response>, timeoutMs: number): Promise<Response> {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
    });

    return Promise.race([promise, timeout]);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async request(
    method: HttpMethod,
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<Response> {
    const {
      timeout = this.config.timeout,
      retries = this.config.maxRetries,
      body,
      headers: customHeaders,
      ...restOptions
    } = options;

    const url = `${this.config.baseUrl}${endpoint}`;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const authHeaders = await authManager.getAuthHeaders();
        
        const requestOptions: RequestInit = {
          method,
          headers: {
            ...authHeaders,
            ...customHeaders,
          },
          body: body ? JSON.stringify(body) : undefined,
          ...restOptions,
        };

        const fetchPromise = fetch(url, requestOptions);
        const response = await this.withTimeout(fetchPromise, timeout);

        if (response.status === 401 && attempt < retries) {
          await this.delay(this.config.retryDelay);
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw this.createApiError(
            `API request failed: ${response.status} ${response.statusText}`,
            response
          );
        }

        return response;

      } catch (error) {
        lastError = error as Error;
        
        if (attempt >= retries || (error as ApiError).status) {
          break;
        }

        await this.delay(this.config.retryDelay);
      }
    }

    throw lastError || new Error('Request failed after all retries');
  }

  async get(endpoint: string, options?: ApiRequestOptions): Promise<Response> {
    return this.request('GET', endpoint, options);
  }

  async post(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<Response> {
    return this.request('POST', endpoint, { ...options, body: data });
  }

  async put(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<Response> {
    return this.request('PUT', endpoint, { ...options, body: data });
  }

  async delete(endpoint: string, options?: ApiRequestOptions): Promise<Response> {
    return this.request('DELETE', endpoint, options);
  }

  async patch(endpoint: string, data?: any, options?: ApiRequestOptions): Promise<Response> {
    return this.request('PATCH', endpoint, { ...options, body: data });
  }
}

export const httpClient = new HttpClient(); 