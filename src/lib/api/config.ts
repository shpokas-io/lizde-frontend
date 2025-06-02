import { ApiConfig } from '@/types/api';

const normalizeApiUrl = (url: string): string => {
  if (!url.endsWith('/api')) {
    const cleanUrl = url.replace(/\/$/, '');
    return `${cleanUrl}/api`;
  }
  return url;
};

export const getApiConfig = (): ApiConfig => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not defined');
    throw new Error('API URL is not configured');
  }

  const normalizedUrl = normalizeApiUrl(apiUrl);
  
  if (normalizedUrl !== apiUrl) {
    console.log('API URL corrected to include /api prefix:', normalizedUrl);
  }

  return {
    baseUrl: normalizedUrl,
    timeout: 30000, // 30 seconds
    maxRetries: 2,
    retryDelay: 1000, // 1 second
  };
};

export const API_CONFIG = getApiConfig(); 