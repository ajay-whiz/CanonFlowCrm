'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { LeadDetail } from '../../../components/leads/LeadDetail'
import { Sidebar } from '../../../components/layout/Sidebar'
import { Header } from '../../../components/layout/Header'
import { useAuth } from '../../../hooks/useAuth'
import { useLeads } from '../../../hooks/useLeads'
import { Lead, apiClient } from '../../../lib/api'

export default function LeadDetailByNamePage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { leads, fetchLeads, deleteLead } = useLeads()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)

  const rawName = params.name as string
  const leadName = decodeURIComponent(rawName)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    const resolveByName = async () => {
      setLoading(true)
      try {
        // 1) Try from current state
        let found = leads.find((l: Lead) => (l.name || '').toLowerCase() === leadName.toLowerCase()) || null
        // 2) Fallback to API fetch if not found
        if (!found) {
          const res = await apiClient.getLeads()
          if (res.success && res.data) {
            found = res.data.find((l: Lead) => (l.name || '').toLowerCase() === leadName.toLowerCase()) || null
          }
        }
        if (found) {
          setLead(found)
        } else {
          router.push('/leads')
        }
      } catch (error) {
        console.error('Error resolving lead by name:', error)
        router.push('/leads')
      } finally {
        setLoading(false)
      }
    }

    if (leadName) {
      resolveByName()
    }
  }, [leadName, leads, router])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900">Lead not found</h1>
          <p className="text-secondary-600 mt-2">The lead you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleEdit = () => {
    router.push(`/leads/${encodeURIComponent(lead.name)}/edit`)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this lead?')) {
      const success = await deleteLead(lead.id)
      if (success) {
        router.push('/leads')
      }
    }
  }

  const handleBack = () => {
    router.push('/leads')
  }

  const handleStatusChange = async (status: string) => {
    console.log('Status change:', lead.id, status)
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
          title="Lead Details"
        />
        
        <main className="p-6">
          <LeadDetail
            lead={lead}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBack={handleBack}
            onStatusChange={handleStatusChange}
          />
        </main>
      </div>
    </div>
  )
}
