'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LeadForm } from '../../../components/leads/LeadForm'
import { Sidebar } from '../../../components/layout/Sidebar'
import { Header } from '../../../components/layout/Header'
import { useAuth } from '../../../hooks/useAuth'
import { useLeads } from '../../../hooks/useLeads'
import { CreateLeadRequest } from '../../../lib/api'

export default function NewLeadPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { createLead } = useLeads()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const handleSubmit = async (data: CreateLeadRequest) => {
    setIsSubmitting(true)
    try {
      const success = await createLead(data)
      if (success) {
        router.push('/leads')
      }
    } catch (error) {
      console.error('Error creating lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/leads')
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath="/leads"
        onNavigate={handleNavigate}
      />
      
      <div>
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="New Lead"
        />
        
        <main className="p-6">
          <div className="max-w-2xl">
            <LeadForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={isSubmitting}
              title="Create New Lead"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
