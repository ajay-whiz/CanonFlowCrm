import { useState, useEffect } from 'react'
import { apiClient, Lead, CreateLeadRequest, UpdateLeadRequest } from '../lib/api'

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.getLeads()
      if (response.success && response.data) {
        setLeads(response.data)
      } else {
        // If backend is not available, use mock data
        setLeads([
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            company: 'Acme Corp',
            status: 'new' as const,
            notes: 'Interested in our premium package',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1234567891',
            company: 'Tech Solutions',
            status: 'contacted' as const,
            notes: 'Follow up next week',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
      }
    } catch (err) {
      // If backend is not available, use mock data
      setLeads([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          company: 'Acme Corp',
          status: 'new' as const,
          notes: 'Interested in our premium package',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+1234567891',
          company: 'Tech Solutions',
          status: 'contacted' as const,
          notes: 'Follow up next week',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const createLead = async (leadData: CreateLeadRequest): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.createLead(leadData)
      if (response.success && response.data) {
        setLeads(prev => [...prev, response.data!])
        return true
      } else {
        setError(response.error || 'Failed to create lead')
        return false
      }
    } catch (err) {
      setError('Network error')
      return false
    } finally {
      setLoading(false)
    }
  }

  const updateLead = async (id: string, leadData: UpdateLeadRequest): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.updateLead(id, leadData)
      if (response.success && response.data) {
        setLeads(prev => prev.map(lead => lead.id === id ? response.data! : lead))
        return true
      } else {
        setError(response.error || 'Failed to update lead')
        return false
      }
    } catch (err) {
      setError('Network error')
      return false
    } finally {
      setLoading(false)
    }
  }

  const deleteLead = async (id: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.deleteLead(id)
      if (response.success) {
        setLeads(prev => prev.filter(lead => lead.id !== id))
        return true
      } else {
        setError(response.error || 'Failed to delete lead')
        return false
      }
    } catch (err) {
      setError('Network error')
      return false
    } finally {
      setLoading(false)
    }
  }

  const getLeadById = async (id: string): Promise<Lead | null> => {
    try {
      const response = await apiClient.getLeadById(id)
      if (response.success && response.data) {
        return response.data
      }
      return null
    } catch (err) {
      return null
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
    getLeadById,
  }
}
