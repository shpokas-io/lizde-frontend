import { createClient } from './supabase'

// Ensure API URL always has the /api prefix
const getApiUrl = () => {
  let apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  if (!apiUrl) {
    console.error('NEXT_PUBLIC_API_URL is not defined')
    throw new Error('API URL is not configured')
  }
  
  // Ensure the URL ends with /api
  if (!apiUrl.endsWith('/api')) {
    apiUrl = apiUrl.replace(/\/$/, '') + '/api'
    console.log('API URL corrected to include /api prefix:', apiUrl)
  }
  
  return apiUrl
}

class ApiService {
  private async getAuthHeaders() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.access_token) {
      console.error('No authentication token available')
      throw new Error('No authentication token available')
    }

    console.log('Auth token available, making authenticated request')
    return {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    }
  }

  private async makeRequest(url: string, options: RequestInit, retryCount = 0): Promise<Response> {
    const maxRetries = 2;
    
    try {
      const response = await fetch(url, options);
      
      // If we get a 401 and haven't retried yet, wait a bit and try again
      if (response.status === 401 && retryCount < maxRetries) {
        console.log(`API request got 401, retrying... (attempt ${retryCount + 1}/${maxRetries})`);
        
        // Wait a bit for auth state to settle
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get fresh headers and retry
        const freshHeaders = await this.getAuthHeaders();
        const newOptions = {
          ...options,
          headers: {
            ...options.headers,
            ...freshHeaders
          }
        };
        
        return this.makeRequest(url, newOptions, retryCount + 1);
      }
      
      return response;
    } catch (error) {
      if (retryCount < maxRetries) {
        console.log(`API request failed, retrying... (attempt ${retryCount + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.makeRequest(url, options, retryCount + 1);
      }
      throw error;
    }
  }

  async get(endpoint: string) {
    try {
      const API_URL = getApiUrl()
      console.log(`Making GET request to: ${API_URL}${endpoint}`)
      
      const headers = await this.getAuthHeaders()
      console.log('Request headers prepared:', { ...headers, Authorization: 'Bearer [REDACTED]' })
      
      const response = await this.makeRequest(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers,
      });

      console.log(`Response status: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API request failed:`, {
          status: response.status,
          statusText: response.statusText,
          url: `${API_URL}${endpoint}`,
          errorText
        })
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('API request successful, data received:', data)
      return data
    } catch (error) {
      console.error('API GET request error:', error)
      throw error
    }
  }

  async post(endpoint: string, data?: any) {
    try {
      const API_URL = getApiUrl()
      console.log(`Making POST request to: ${API_URL}${endpoint}`)
      
      const headers = await this.getAuthHeaders()
      const response = await this.makeRequest(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      console.log(`Response status: ${response.status} ${response.statusText}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API POST request failed:`, {
          status: response.status,
          statusText: response.statusText,
          errorText
        })
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('API POST request error:', error)
      throw error
    }
  }

  async put(endpoint: string, data?: any) {
    try {
      const API_URL = getApiUrl()
      
      const headers = await this.getAuthHeaders()
      const response = await this.makeRequest(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API PUT request failed:`, {
          status: response.status,
          statusText: response.statusText,
          errorText
        })
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('API PUT request error:', error)
      throw error
    }
  }

  async delete(endpoint: string) {
    try {
      const API_URL = getApiUrl()
      
      const headers = await this.getAuthHeaders()
      const response = await this.makeRequest(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API DELETE request failed:`, {
          status: response.status,
          statusText: response.statusText,
          errorText
        })
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('API DELETE request error:', error)
      throw error
    }
  }
}

export const apiService = new ApiService() 