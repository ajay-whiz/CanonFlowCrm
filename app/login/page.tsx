'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '../../components/auth/LoginForm'
import { useAuth } from '../../hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return <LoginForm onSuccess={() => router.push('/')} />
}
