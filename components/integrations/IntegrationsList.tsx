import React from 'react'
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Settings, 
  ExternalLink,
  RefreshCw,
  Database,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'
import { StatusBadge } from '../ui/Badge'

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

interface IntegrationsListProps {
  integrations: Integration[]
  onConnect?: (id: string) => void
  onDisconnect?: (id: string) => void
  onSync?: (id: string) => void
  onConfigure?: (id: string) => void
}

export const IntegrationsList: React.FC<IntegrationsListProps> = ({
  integrations,
  onConnect,
  onDisconnect,
  onSync,
  onConfigure,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-success-600" />
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-secondary-400" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-error-600" />
      default:
        return <XCircle className="h-5 w-5 text-secondary-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <StatusBadge variant="success">Connected</StatusBadge>
      case 'disconnected':
        return <StatusBadge variant="secondary">Disconnected</StatusBadge>
      case 'error':
        return <StatusBadge variant="error">Error</StatusBadge>
      default:
        return <StatusBadge variant="secondary">Unknown</StatusBadge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Integrations</h1>
        <p className="text-secondary-600">Manage your third-party service connections</p>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon
          return (
            <Card key={integration.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${integration.bgColor}`}>
                      <Icon className={`h-6 w-6 ${integration.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {integration.name}
                      </h3>
                      <p className="text-sm text-secondary-600">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  {getStatusIcon(integration.status)}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-secondary-500">Status</span>
                    {getStatusBadge(integration.status)}
                  </div>

                  {/* Last Sync */}
                  {integration.lastSync && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary-500">Last Sync</span>
                      <span className="text-sm text-secondary-900">
                        {new Date(integration.lastSync).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {/* Error Message */}
                  {integration.error && (
                    <div className="bg-error-50 border border-error-200 rounded-md p-3">
                      <p className="text-sm text-error-600">{integration.error}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-4 border-t border-secondary-200">
                    {integration.status === 'connected' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<RefreshCw className="h-4 w-4" />}
                          onClick={() => onSync?.(integration.id)}
                        >
                          Sync
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Settings className="h-4 w-4" />}
                          onClick={() => onConfigure?.(integration.id)}
                        >
                          Configure
                        </Button>
                        <Button
                          variant="error"
                          size="sm"
                          onClick={() => onDisconnect?.(integration.id)}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onConnect?.(integration.id)}
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Integration Status Summary */}
      <Card>
        <CardHeader title="Integration Status" />
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">
                {integrations.filter(i => i.status === 'connected').length}
              </div>
              <p className="text-sm text-secondary-600">Connected</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning-600">
                {integrations.filter(i => i.status === 'error').length}
              </div>
              <p className="text-sm text-secondary-600">Errors</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">
                {integrations.filter(i => i.status === 'disconnected').length}
              </div>
              <p className="text-sm text-secondary-600">Disconnected</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
