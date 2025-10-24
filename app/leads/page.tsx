'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LeadList } from '../../components/leads/LeadList'
import { Sidebar } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import { useAuth } from '../../hooks/useAuth'
import { useLeads } from '../../hooks/useLeads'
import { Lead } from '../../lib/api'

export default function LeadsPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { leads, loading: leadsLoading, deleteLead } = useLeads()
  const [sidebarOpen, setSidebarOpen] = useState(false)

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

  const handleCreateLead = () => {
    router.push('/leads/new')
  }

  const handleViewLead = (id: string) => {
    router.push(`/leads/${id}`)
  }

  const handleEditLead = (id: string) => {
    router.push(`/leads/${id}/edit`)
  }

  const handleDeleteLead = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await deleteLead(id)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    // This would typically call an API to update the lead status
    console.log('Status change:', id, status)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath="/leads"
        onNavigate={handleNavigate}
      />
      
      <div className="lg:pl-64">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="Leads"
          showSearch
        />
        
        <main className="p-6">
          <LeadList
            leads={leads}
            loading={leadsLoading}
            onCreate={handleCreateLead}
            onView={handleViewLead}
            onEdit={handleEditLead}
            onDelete={handleDeleteLead}
            onStatusChange={handleStatusChange}
          />
        </main>
      </div>
    </div>
  )
}
