"use client"

import { useState, useEffect, createContext, useContext } from 'react'
import { apiClient, LoginRequest, LoginResponse } from '../lib/api'

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
  const [user, setUser] = useState<LoginResponse['user'] | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      setToken(storedToken)
      apiClient.setToken(storedToken)
      // You might want to validate the token here
      setUser({ id: '1', email: 'admin@example.com' }) // Mock user for now
    }
    setLoading(false)
  }, [])

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const response = await apiClient.login(credentials)
      if (response.success && response.data) {
        setUser(response.data.user)
        setToken(response.data.token)
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
