import React, { useState } from 'react'
import { format } from 'date-fns'
import { Search, Filter, Plus, Eye, Edit, Trash2, Phone, Mail, Building } from 'lucide-react'
import { Table, Pagination } from '../ui/Table'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { StatusBadge } from '../ui/Badge'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { Lead } from '../../lib/api'

interface LeadListProps {
  leads: Lead[]
  loading?: boolean
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onCreate?: () => void
  onStatusChange?: (id: string, status: string) => void
}

export const LeadList: React.FC<LeadListProps> = ({
  leads,
  loading = false,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onStatusChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const itemsPerPage = 10

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'lost', label: 'Lost' },
  ]

  const filteredData = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy as keyof Lead]
    const bValue = b[sortBy as keyof Lead]
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name' as keyof Lead,
      sortable: true,
      render: (value: string, record: Lead) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-600">
                {record.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-secondary-900">{value}</p>
            {record.company && (
              <p className="text-xs text-secondary-500">{record.company}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'email',
      title: 'Contact',
      dataIndex: 'email' as keyof Lead,
      render: (value: string, record: Lead) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Mail className="h-3 w-3 text-secondary-400" />
            <span className="text-sm text-secondary-900">{value}</span>
          </div>
          {record.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3 text-secondary-400" />
              <span className="text-xs text-secondary-600">{record.phone}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status' as keyof Lead,
      render: (value: string) => <StatusBadge status={value as any} />,
    },
    {
      key: 'created_at',
      title: 'Created',
      dataIndex: 'created_at' as keyof Lead,
      sortable: true,
      render: (value: string) => format(new Date(value), 'MMM dd, yyyy'),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, record: Lead) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Eye className="h-4 w-4" />}
            onClick={() => onView?.(record.id)}
          />
          <Button
            variant="outline"
            size="sm"
            icon={<Edit className="h-4 w-4" />}
            onClick={() => onEdit?.(record.id)}
          />
          <Button
            variant="outline"
            size="sm"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => onDelete?.(record.id)}
          />
        </div>
      ),
    },
  ]

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('asc')
    }
  }

  const getStatusCounts = () => {
    const counts = leads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return counts
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Leads</h1>
          <p className="text-secondary-600">Manage and track potential customers</p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={onCreate}
        >
          New Lead
        </Button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {statusCounts.new || 0}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary-900">New</p>
                <p className="text-xs text-secondary-500">Recently added</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-warning-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-warning-600">
                    {statusCounts.contacted || 0}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary-900">Contacted</p>
                <p className="text-xs text-secondary-500">In progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-success-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-success-600">
                    {statusCounts.qualified || 0}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary-900">Qualified</p>
                <p className="text-xs text-secondary-500">Ready to convert</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-error-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-error-600">
                    {statusCounts.lost || 0}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary-900">Lost</p>
                <p className="text-xs text-secondary-500">No longer interested</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as string)}
              placeholder="Filter by status"
            />
            <Button variant="outline" icon={<Filter className="h-4 w-4" />}>
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-secondary-600">
        <span>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
        </span>
        <div className="flex items-center space-x-4">
          <span>Total Leads: {leads.length}</span>
        </div>
      </div>

      {/* Table */}
      <Table
        data={paginatedData}
        columns={columns}
        loading={loading}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
        emptyText="No leads found"
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
