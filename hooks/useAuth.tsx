"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import { apiClient, LoginRequest, LoginResponse } from '../lib/api'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: LoginResponse['user'] | null
  token: string | null
  login: (credentials: LoginRequest) => Promise<boolean>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')
    if (storedToken) {
      setToken(storedToken)
      apiClient.setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {}
    }

    // Register a global 401 handler
    apiClient.setUnauthorizedHandler(() => {
      try { localStorage.removeItem('auth_user') } catch {}
      try { localStorage.removeItem('auth_token') } catch {}
      setUser(null)
      setToken(null)
      // Ensure api client token cleared
      try { apiClient.logout() } catch {}
      // Redirect to login
      router.push('/login')
    })

    setLoading(false)
  }, [])

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const response = await apiClient.login(credentials)
      if (response.success && response.data) {
        setUser(response.data.user)
        setToken(response.data.token)
        try { localStorage.setItem('auth_user', JSON.stringify(response.data.user)) } catch {}
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    apiClient.logout()
    try { localStorage.removeItem('auth_user') } catch {}
  }

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthContext }
