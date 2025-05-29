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

  async get(endpoint: string) {
    try {
      const API_URL = getApiUrl()
      console.log(`Making GET request to: ${API_URL}${endpoint}`)
      
      const headers = await this.getAuthHeaders()
      console.log('Request headers prepared:', { ...headers, Authorization: 'Bearer [REDACTED]' })
      
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers,
      })

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
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: data ? JSON.stringify(data) : undefined,
      })

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
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers,
        body: data ? JSON.stringify(data) : undefined,
      })

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
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers,
      })

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