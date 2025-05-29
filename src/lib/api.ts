import { createClient } from './supabase'

const API_URL = process.env.NEXT_PUBLIC_API_URL

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
      console.log(`Making GET request to: ${API_URL}${endpoint}`)
      
      if (!API_URL) {
        console.error('API_URL is not defined. Current env:', {
          NODE_ENV: process.env.NODE_ENV,
          API_URL: process.env.NEXT_PUBLIC_API_URL
        })
        throw new Error('API URL is not configured')
      }

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
      console.log(`Making POST request to: ${API_URL}${endpoint}`)
      
      if (!API_URL) {
        throw new Error('API URL is not configured')
      }

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
      if (!API_URL) {
        throw new Error('API URL is not configured')
      }

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
      if (!API_URL) {
        throw new Error('API URL is not configured')
      }

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