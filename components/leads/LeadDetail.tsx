import React from 'react'
import { format } from 'date-fns'
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  ArrowLeft,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { StatusBadge } from '../ui/Badge'
import { Lead } from '../../lib/api'

interface LeadDetailProps {
  lead: Lead
  onEdit?: () => void
  onDelete?: () => void
  onBack?: () => void
  onStatusChange?: (status: string) => void
}

export const LeadDetail: React.FC<LeadDetailProps> = ({
  lead,
  onEdit,
  onDelete,
  onBack,
  onStatusChange,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="h-5 w-5 text-primary-600" />
      case 'contacted':
        return <AlertCircle className="h-5 w-5 text-warning-600" />
      case 'qualified':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'lost':
        return <XCircle className="h-5 w-5 text-error-600" />
      default:
        return <Clock className="h-5 w-5 text-secondary-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-primary-600'
      case 'contacted':
        return 'text-warning-600'
      case 'qualified':
        return 'text-success-600'
      case 'lost':
        return 'text-error-600'
      default:
        return 'text-secondary-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowLeft className="h-4 w-4" />}
              onClick={onBack}
            >
              Back
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">{lead.name}</h1>
            <p className="text-secondary-600">
              Created on {format(new Date(lead.created_at), 'MMM dd, yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            icon={<Edit className="h-4 w-4" />}
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader title="Contact Information" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Full Name</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="h-4 w-4 text-secondary-400" />
                      <span className="text-secondary-900">{lead.name}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Email Address</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-secondary-400" />
                      <a 
                        href={`mailto:${lead.email}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {lead.email}
                      </a>
                    </div>
                  </div>
                  
                  {lead.phone && (
                    <div>
                      <label className="text-sm font-medium text-secondary-500">Phone Number</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Phone className="h-4 w-4 text-secondary-400" />
                        <a 
                          href={`tel:${lead.phone}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {lead.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  {lead.company && (
                    <div>
                      <label className="text-sm font-medium text-secondary-500">Company</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Building className="h-4 w-4 text-secondary-400" />
                        <span className="text-secondary-900">{lead.company}</span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Status</label>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(lead.status)}
                      <StatusBadge status={lead.status as any} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Last Updated</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-secondary-400" />
                      <span className="text-secondary-900">
                        {format(new Date(lead.updated_at), 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {lead.notes && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-secondary-500">Notes</label>
                  <div className="mt-1 p-3 bg-secondary-50 rounded-md">
                    <p className="text-secondary-900 whitespace-pre-wrap">{lead.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Actions */}
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <div className="space-y-3">
                {lead.status === 'new' && (
                  <Button
                    variant="warning"
                    className="w-full"
                    onClick={() => onStatusChange?.('contacted')}
                  >
                    Mark as Contacted
                  </Button>
                )}
                
                {lead.status === 'contacted' && (
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={() => onStatusChange?.('qualified')}
                  >
                    Mark as Qualified
                  </Button>
                )}
                
                {lead.status !== 'lost' && (
                  <Button
                    variant="error"
                    className="w-full"
                    onClick={() => onStatusChange?.('lost')}
                  >
                    Mark as Lost
                  </Button>
                )}
                
                {lead.status === 'lost' && (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => onStatusChange?.('new')}
                  >
                    Reactivate Lead
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lead Information */}
          <Card>
            <CardHeader title="Lead Information" />
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-secondary-500">Lead ID</label>
                  <p className="text-sm text-secondary-900 font-mono">{lead.id}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-secondary-500">Created</label>
                  <p className="text-sm text-secondary-900">
                    {format(new Date(lead.created_at), 'MMM dd, yyyy')}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-secondary-500">Last Updated</label>
                  <p className="text-sm text-secondary-900">
                    {format(new Date(lead.updated_at), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
