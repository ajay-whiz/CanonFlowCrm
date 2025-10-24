import React from 'react'
import { format } from 'date-fns'
import { 
  Calendar, 
  DollarSign, 
  User, 
  Mail, 
  FileText, 
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowLeft,
  Edit,
  Trash2
} from 'lucide-react'
import { Button } from '../ui/Button'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { StatusBadge } from '../ui/Badge'
import { TimelineEvent } from '../../types'
import { PaymentRequest } from '../../types'

interface PaymentRequestDetailProps {
  paymentRequest: PaymentRequest
  timeline?: TimelineEvent[]
  onEdit?: () => void
  onDelete?: () => void
  onBack?: () => void
  onStatusChange?: (status: string) => void
}

export const PaymentRequestDetail: React.FC<PaymentRequestDetailProps> = ({
  paymentRequest,
  timeline = [],
  onEdit,
  onDelete,
  onBack,
  onStatusChange,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'staging':
        return <Clock className="h-5 w-5 text-warning-600" />
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'processing':
        return <AlertCircle className="h-5 w-5 text-primary-600" />
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-error-600" />
      default:
        return <Clock className="h-5 w-5 text-secondary-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'staging':
        return 'text-warning-600'
      case 'approved':
        return 'text-success-600'
      case 'processing':
        return 'text-primary-600'
      case 'paid':
        return 'text-success-600'
      case 'cancelled':
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
            <h1 className="text-2xl font-bold text-secondary-900">
              Payment Request #{paymentRequest.id.slice(-8)}
            </h1>
            <p className="text-secondary-600">
              Created on {format(new Date(paymentRequest.created_at), 'MMM dd, yyyy')}
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
          {/* Basic Information */}
          <Card>
            <CardHeader title="Payment Details" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Vendor Name</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="h-4 w-4 text-secondary-400" />
                      <span className="text-secondary-900">{paymentRequest.vendor_name}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Amount</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <DollarSign className="h-4 w-4 text-success-600" />
                      <span className="text-lg font-semibold text-secondary-900">
                        ${paymentRequest.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Program</label>
                    <p className="text-secondary-900 mt-1">{paymentRequest.program}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Due Date</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-secondary-400" />
                      <span className="text-secondary-900">
                        {format(new Date(paymentRequest.due_date), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Requester</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Mail className="h-4 w-4 text-secondary-400" />
                      <span className="text-secondary-900">{paymentRequest.requester_email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-secondary-500">Status</label>
                    <div className="flex items-center space-x-2 mt-1">
                      {getStatusIcon(paymentRequest.status)}
                      <StatusBadge status={paymentRequest.status} />
                    </div>
                  </div>
                </div>
              </div>
              
              {paymentRequest.notes && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-secondary-500">Notes</label>
                  <div className="flex items-start space-x-2 mt-1">
                    <FileText className="h-4 w-4 text-secondary-400 mt-0.5" />
                    <p className="text-secondary-900">{paymentRequest.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Integration Details */}
          <Card>
            <CardHeader title="Integration Details" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-secondary-500">Asana Task</label>
                  {paymentRequest.asana_task_id ? (
                    <div className="flex items-center space-x-2 mt-1">
                      <ExternalLink className="h-4 w-4 text-primary-600" />
                      <a
                        href={`https://app.asana.com/0/0/${paymentRequest.asana_task_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        View in Asana
                      </a>
                    </div>
                  ) : (
                    <p className="text-secondary-500 mt-1">Not linked</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-secondary-500">QBO Invoice</label>
                  {paymentRequest.qbo_invoice_id ? (
                    <p className="text-secondary-900 mt-1">{paymentRequest.qbo_invoice_id}</p>
                  ) : (
                    <p className="text-secondary-500 mt-1">Not created</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-secondary-500">Drive Folder</label>
                  {paymentRequest.drive_folder_id ? (
                    <div className="flex items-center space-x-2 mt-1">
                      <ExternalLink className="h-4 w-4 text-primary-600" />
                      <a
                        href={`https://drive.google.com/drive/folders/${paymentRequest.drive_folder_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        View in Drive
                      </a>
                    </div>
                  ) : (
                    <p className="text-secondary-500 mt-1">Not created</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-secondary-500">Container</label>
                  {paymentRequest.container_id ? (
                    <p className="text-secondary-900 mt-1">{paymentRequest.container_id}</p>
                  ) : (
                    <p className="text-secondary-500 mt-1">Not assigned</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader title="Timeline" />
            <CardContent>
              <div className="space-y-4">
                {timeline.length === 0 ? (
                  <p className="text-secondary-500 text-sm">No timeline events</p>
                ) : (
                  timeline.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900">{event.title}</p>
                        <p className="text-sm text-secondary-600">{event.description}</p>
                        <p className="text-xs text-secondary-500 mt-1">
                          {format(new Date(event.timestamp), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <div className="space-y-3">
                {paymentRequest.status === 'staging' && (
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={() => onStatusChange?.('approved')}
                  >
                    Approve Request
                  </Button>
                )}
                
                {paymentRequest.status === 'approved' && (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => onStatusChange?.('processing')}
                  >
                    Start Processing
                  </Button>
                )}
                
                {paymentRequest.status === 'processing' && (
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={() => onStatusChange?.('paid')}
                  >
                    Mark as Paid
                  </Button>
                )}
                
                {paymentRequest.status !== 'cancelled' && (
                  <Button
                    variant="error"
                    className="w-full"
                    onClick={() => onStatusChange?.('cancelled')}
                  >
                    Cancel Request
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
