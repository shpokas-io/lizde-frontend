export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  maxRetries: number;
  retryDelay: number;
}

const getBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is required');
  }

  const normalizedUrl = apiUrl.endsWith('/api') ? apiUrl : `${apiUrl}/api`;
  return normalizedUrl;
};

export const API_CONFIG: ApiConfig = {
  baseUrl: getBaseUrl(),
  timeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
};

export const getApiConfig = (): ApiConfig => API_CONFIG; 