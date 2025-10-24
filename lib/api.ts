const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081';

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
    debugger;
    const url = `${this.baseURL}${endpoint}`
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      let data: any = null
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        data = await response.json()
      }

      if (!response.ok) {
        return {
          success: false,
          error: (data && (data.message || data.error)) || `HTTP ${response.status}`,
        }
      }

      // Handle backend response format: { status, message, data }
      if (data && data.status !== undefined) {
        return {
          success: data.status,
          data: data.data,
          message: data.message,
        }
      }

      return {
        success: true,
        data: data as any,
      }
    } catch (error) {
      // Handle CORS and network errors gracefully
      // if (error instanceof TypeError && error.message.includes('CORS')) {
      //   return {
      //     success: false,
      //     error: 'CORS policy blocked the request. Please check server configuration.',
      //   }
      // }
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
    debugger;
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
