import React from 'react'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'

interface DashboardStatsProps {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  qualifiedLeads: number
  lostLeads: number
  totalRevenue?: number
  conversionRate?: number
  onCreateLead?: () => void
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalLeads,
  newLeads,
  contactedLeads,
  qualifiedLeads,
  lostLeads,
  totalRevenue = 0,
  conversionRate = 0,
  onCreateLead,
}) => {
  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'New Leads',
      value: newLeads,
      icon: Plus,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Contacted',
      value: contactedLeads,
      icon: Clock,
      color: 'text-warning-600',
      bgColor: 'bg-warning-100',
      change: '+5%',
      changeType: 'positive' as const,
    },
    {
      title: 'Qualified',
      value: qualifiedLeads,
      icon: CheckCircle,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      change: '+15%',
      changeType: 'positive' as const,
    },
    {
      title: 'Lost',
      value: lostLeads,
      icon: XCircle,
      color: 'text-error-600',
      bgColor: 'bg-error-100',
      change: '-3%',
      changeType: 'negative' as const,
    },
    {
      title: 'Conversion Rate',
      value: `${conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-success-600',
      bgColor: 'bg-success-100',
      change: '+2.1%',
      changeType: 'positive' as const,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
          <p className="text-secondary-600">Overview of your CRM performance</p>
        </div>
        {onCreateLead && (
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
            onClick={onCreateLead}
          >
            New Lead
          </Button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-secondary-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <span
                        className={`text-xs font-medium ${
                          stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-secondary-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Revenue Card */}
      {totalRevenue > 0 && (
        <Card>
          <CardHeader title="Revenue Overview" />
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-secondary-600">Total Revenue</p>
                <p className="text-3xl font-bold text-secondary-900">
                  ${totalRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-success-600 mt-1">+12.5% from last month</p>
              </div>
              <div className="p-4 bg-success-100 rounded-full">
                <DollarSign className="h-8 w-8 text-success-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
