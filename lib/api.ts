const API_BASE_URL = 'http://localhost:8081'

export interface ApiResponse<T> {
  data?: T
  success: boolean
  message?: string
  error?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name?: string
  }
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: 'new' | 'contacted' | 'qualified' | 'lost'
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateLeadRequest {
  name: string
  email: string
  phone?: string
  company?: string
  status?: 'new' | 'contacted' | 'qualified' | 'lost'
  notes?: string
}

export interface UpdateLeadRequest {
  name?: string
  email?: string
  phone?: string
  company?: string
  status?: 'new' | 'contacted' | 'qualified' | 'lost'
  notes?: string
}

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'An error occurred',
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      }
    }
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    if (response.success && response.data) {
      this.token = response.data.token
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token)
      }
    }

    return response
  }

  logout() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  // Leads API
  async getLeads(): Promise<ApiResponse<Lead[]>> {
    return this.request<Lead[]>('/leads')
  }

  async getLeadById(id: string): Promise<ApiResponse<Lead>> {
    return this.request<Lead>(`/leads/${id}`)
  }

  async createLead(lead: CreateLeadRequest): Promise<ApiResponse<Lead>> {
    return this.request<Lead>('/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    })
  }

  async updateLead(id: string, lead: UpdateLeadRequest): Promise<ApiResponse<Lead>> {
    return this.request<Lead>(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lead),
    })
  }

  async deleteLead(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/leads/${id}`, {
      method: 'DELETE',
    })
  }
}

export const apiClient = new ApiClient()
