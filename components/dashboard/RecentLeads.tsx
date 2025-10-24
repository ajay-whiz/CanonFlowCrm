import React from 'react'
import { format } from 'date-fns'
import { Mail, Phone, Building, Eye, Edit } from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/Badge'
import { Lead } from '../../lib/api'

interface RecentLeadsProps {
  leads: Lead[]
  onViewLead?: (id: string) => void
  onEditLead?: (id: string) => void
  loading?: boolean
}

export const RecentLeads: React.FC<RecentLeadsProps> = ({
  leads,
  onViewLead,
  onEditLead,
  loading = false,
}) => {
  const recentLeads = leads.slice(0, 5) // Show only the 5 most recent leads

  if (loading) {
    return (
      <Card>
        <CardHeader title="Recent Leads" />
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-secondary-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-secondary-200 rounded w-1/4"></div>
                    <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader 
        title="Recent Leads" 
        action={
          <Button variant="outline" size="sm">
            View All
          </Button>
        }
      />
      <CardContent>
        {recentLeads.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-secondary-400 mb-2">
              <Mail className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-secondary-500">No leads yet</p>
            <p className="text-sm text-secondary-400">Create your first lead to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 hover:bg-secondary-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">
                        {lead.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-secondary-900 truncate">
                      {lead.name}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3 text-secondary-400" />
                        <span className="text-xs text-secondary-600">{lead.email}</span>
                      </div>
                      {lead.company && (
                        <div className="flex items-center space-x-1">
                          <Building className="h-3 w-3 text-secondary-400" />
                          <span className="text-xs text-secondary-600">{lead.company}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-secondary-500 mt-1">
                      {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <StatusBadge status={lead.status as any} />
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Eye className="h-3 w-3" />}
                      onClick={() => onViewLead?.(lead.id)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit className="h-3 w-3" />}
                      onClick={() => onEditLead?.(lead.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
