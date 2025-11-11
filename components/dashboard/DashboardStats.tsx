import React from 'react'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Timer
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Button } from '../ui/Button'

interface DashboardStatsProps {
  // Lead related props
  totalLeads: number
  newLeads: number
  contactedLeads: number
  qualifiedLeads: number
  lostLeads: number
  totalRevenue?: number
  conversionRate?: number
  
  // Payment related props
  pendingPayments?: number
  overduePayments?: number
  monthlyRevenue?: number
  averagePaymentTime?: number
  paymentSuccessRate?: number
  
  onCreateLead?: () => void
}

// Reusable StatCard component
const StatCard: React.FC<{
  stat: {
    title: string
    value: string | number
    icon: any
    color: string
    bgColor: string
    change: string
    changeType: 'positive' | 'negative' | 'warning'
  }
}> = ({ stat }) => {
  const Icon = stat.icon
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-secondary-600">{stat.title}</p>
            <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium ${
                  stat.changeType === 'positive' 
                    ? 'text-success-600' 
                    : stat.changeType === 'negative' 
                      ? 'text-error-600' 
                      : 'text-warning-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-secondary-500 ml-1">
                {stat.changeType === 'warning' ? 'pending' : 'vs last month'}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${stat.bgColor}`}>
            <Icon className={`h-6 w-6 ${stat.color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalLeads,
  newLeads,
  contactedLeads,
  qualifiedLeads,
  lostLeads,
  totalRevenue = 0,
  conversionRate = 0,
  pendingPayments = 0,
  overduePayments = 0,
  monthlyRevenue = 0,
  averagePaymentTime = 0,
  paymentSuccessRate = 0,
  onCreateLead,
}) => {
  const leadStats = [
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

  const paymentStats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+12.5%',
      changeType: 'positive' as const,
    },
    {
      title: 'This Month',
      value: `$${monthlyRevenue.toLocaleString()}`,
      icon: Clock3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: '+8.2%',
      changeType: 'positive' as const,
    },
    {
      title: 'Pending Payments',
      value: pendingPayments,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: pendingPayments > 0 ? `+${pendingPayments}` : '0',
      changeType: pendingPayments > 0 ? 'warning' as const : 'positive' as const,
    },
    {
      title: 'Failed',
      value: overduePayments,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      change: overduePayments > 0 ? `+${overduePayments}` : '0',
      changeType: overduePayments > 0 ? 'negative' as const : 'positive' as const,
    },
    {
      title: 'Avg. Payment Time',
      value: `${averagePaymentTime} days`,
      icon: Timer,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '-2 days',
      changeType: 'positive' as const,
    },
    {
      title: 'Success Rate',
      value: `${paymentSuccessRate}%`,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: '+3.2%',
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

      {/* Lead Stats */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-secondary-900">Lead Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadStats.map((stat, index) => (
            <StatCard key={`lead-${index}`} stat={stat} />
          ))}
        </div>
      </div>

      {/* Payment Stats */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-secondary-900">Payment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentStats.map((stat, index) => (
            <StatCard key={`payment-${index}`} stat={stat} />
          ))}
        </div>
      </div>

    </div>
  )
}
