'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { LeadForm } from '../../../../components/leads/LeadForm'
import { Sidebar } from '../../../../components/layout/Sidebar'
import { Header } from '../../../../components/layout/Header'
import { useAuth } from '../../../../hooks/useAuth'
import { useLeads } from '../../../../hooks/useLeads'
import { UpdateLeadRequest } from '../../../../lib/api'

export default function EditLeadPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { leads, getLeadById, updateLead } = useLeads()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lead, setLead] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const leadId = params.id as string

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true)
      try {
        const leadData = await getLeadById(leadId)
        if (leadData) {
          setLead(leadData)
        } else {
          // If not found in cache, try to find in leads array
          const foundLead = leads.find(l => l.id === leadId)
          if (foundLead) {
            setLead(foundLead)
          } else {
            router.push('/leads')
          }
        }
      } catch (error) {
        console.error('Error fetching lead:', error)
        router.push('/leads')
      } finally {
        setLoading(false)
      }
    }

    if (leadId) {
      fetchLead()
    }
  }, [leadId, getLeadById, leads, router])

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

  const handleSubmit = async (data: UpdateLeadRequest) => {
    setIsSubmitting(true)
    try {
      const success = await updateLead(leadId, data)
      if (success) {
        router.push(`/leads/${leadId}`)
      }
    } catch (error) {
      console.error('Error updating lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push(`/leads/${leadId}`)
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
          title="Edit Lead"
        />
        
        <main className="p-6">
          <div className="max-w-2xl">
            <LeadForm
              initialData={lead}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              loading={isSubmitting}
              title="Edit Lead"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
