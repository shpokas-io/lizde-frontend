const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const apiClient = {
  get: async (url: string, config?: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      ...config,
    });
    return response;
  },
  post: async (url: string, data?: any, config?: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
      ...config,
    });
    return response;
  },
  put: async (url: string, data?: any, config?: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      body: JSON.stringify(data),
      ...config,
    });
    return response;
  },
  delete: async (url: string, config?: any) => {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
      ...config,
    });
    return response;
  },
  interceptors: {
    response: {
      use: (onFulfilled?: any, onRejected?: any) => {
        // This is a simplified implementation for compatibility
        // You may need to implement proper interceptor logic based on your needs
      }
    }
  }
};

// Create a wrapper to maintain axios-like interface
const createClient = () => ({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling interceptor
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
); 