'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IntegrationsList } from '../../components/integrations/IntegrationsList'
import { Sidebar } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import { useAuth } from '../../hooks/useAuth'
import { 
  Database, 
  Mail, 
  Calendar, 
  DollarSign,
  ExternalLink,
  Settings
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  description: string
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
  error?: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
}

export default function IntegrationsPage() {
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'asana',
      name: 'Asana',
      description: 'Task and project management',
      status: 'connected',
      lastSync: '2024-01-15T10:30:00Z',
      icon: ExternalLink,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      id: 'qbo',
      name: 'QuickBooks Online',
      description: 'Accounting and invoicing',
      status: 'connected',
      lastSync: '2024-01-15T09:15:00Z',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 'drive',
      name: 'Google Drive',
      description: 'File storage and collaboration',
      status: 'connected',
      lastSync: '2024-01-15T08:45:00Z',
      icon: Database,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      id: 'zenwork',
      name: 'ZenWork',
      description: 'Vendor onboarding and payments',
      status: 'error',
      error: 'Authentication failed. Please reconnect.',
      icon: Settings,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      id: 'melio',
      name: 'Melio',
      description: 'Payment processing',
      status: 'disconnected',
      icon: DollarSign,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      id: 'clockify',
      name: 'Clockify',
      description: 'Time tracking and reporting',
      status: 'disconnected',
      icon: Calendar,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ])

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

  const handleConnect = (id: string) => {
    // Simulate connection process
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'connected' as const, lastSync: new Date().toISOString() }
          : integration
      )
    )
  }

  const handleDisconnect = (id: string) => {
    // Simulate disconnection process
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, status: 'disconnected' as const, lastSync: undefined, error: undefined }
          : integration
      )
    )
  }

  const handleSync = (id: string) => {
    // Simulate sync process
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, lastSync: new Date().toISOString() }
          : integration
      )
    )
  }

  const handleConfigure = (id: string) => {
    // Navigate to configuration page or open modal
    console.log('Configure integration:', id)
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath="/integrations"
        onNavigate={handleNavigate}
      />
      
      <div>
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="Integrations"
        />
        
        <main className="p-6">
          <IntegrationsList
            integrations={integrations}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onSync={handleSync}
            onConfigure={handleConfigure}
          />
        </main>
      </div>
    </div>
  )
}
