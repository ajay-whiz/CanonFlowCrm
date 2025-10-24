'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardStats } from '../components/dashboard/DashboardStats'
import { RecentLeads } from '../components/dashboard/RecentLeads'
import { LeadChart, LeadTrend } from '../components/dashboard/LeadChart'
import { Sidebar } from '../components/layout/Sidebar'
import { Header } from '../components/layout/Header'
import { useAuth } from '../hooks/useAuth'
import { useLeads } from '../hooks/useLeads'
import { Lead } from '../lib/api'

export default function Dashboard() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { leads, loading: leadsLoading } = useLeads()
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

  // Calculate stats
  const totalLeads = leads.length
  const newLeads = leads.filter(lead => lead.status === 'new').length
  const contactedLeads = leads.filter(lead => lead.status === 'contacted').length
  const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length
  const lostLeads = leads.filter(lead => lead.status === 'lost').length
  const conversionRate = totalLeads > 0 ? (qualifiedLeads / totalLeads) * 100 : 0

  // Chart data
  const statusData = [
    { name: 'New', value: newLeads, color: '#3B82F6' },
    { name: 'Contacted', value: contactedLeads, color: '#F59E0B' },
    { name: 'Qualified', value: qualifiedLeads, color: '#10B981' },
    { name: 'Lost', value: lostLeads, color: '#EF4444' },
  ]

  const trendData = [
    { date: 'Jan', leads: 12, contacted: 8, qualified: 3 },
    { date: 'Feb', leads: 15, contacted: 10, qualified: 5 },
    { date: 'Mar', leads: 18, contacted: 12, qualified: 7 },
    { date: 'Apr', leads: 22, contacted: 15, qualified: 9 },
    { date: 'May', leads: 25, contacted: 18, qualified: 12 },
    { date: 'Jun', leads: 28, contacted: 20, qualified: 15 },
  ]

  const handleCreateLead = () => {
    router.push('/leads/new')
  }

  const handleViewLead = (id: string) => {
    router.push(`/leads/${id}`)
  }

  const handleEditLead = (id: string) => {
    router.push(`/leads/${id}/edit`)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath="/"
        onNavigate={handleNavigate}
      />
      
      <div>
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="Dashboard"
        />
        
        <main className="p-6">
          <div className="space-y-6">
            <DashboardStats
              totalLeads={totalLeads}
              newLeads={newLeads}
              contactedLeads={contactedLeads}
              qualifiedLeads={qualifiedLeads}
              lostLeads={lostLeads}
              conversionRate={conversionRate}
              onCreateLead={handleCreateLead}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentLeads
                leads={leads}
                onViewLead={handleViewLead}
                onEditLead={handleEditLead}
                loading={leadsLoading}
              />
              
              <LeadChart
                data={statusData}
                type="pie"
                title="Lead Status Distribution"
                height={300}
              />
            </div>

            <LeadTrend
              data={trendData}
              title="Lead Trends (Last 6 Months)"
              height={300}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
