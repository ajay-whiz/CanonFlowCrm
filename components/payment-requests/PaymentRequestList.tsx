import React, { useState } from 'react'
import { format } from 'date-fns'
import { Search, Filter, Plus, Eye, Edit, Trash2, DollarSign } from 'lucide-react'
import { Table, Pagination } from '../ui/Table'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { StatusBadge } from '../ui/Badge'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { PaymentRequest, PaymentRequestStatus } from '../../types'

interface PaymentRequestListProps {
  paymentRequests: PaymentRequest[]
  loading?: boolean
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onCreate?: () => void
  onStatusChange?: (id: string, status: PaymentRequestStatus) => void
}

export const PaymentRequestList: React.FC<PaymentRequestListProps> = ({
  paymentRequests,
  loading = false,
  onView,
  onEdit,
  onDelete,
  onCreate,
  onStatusChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<PaymentRequestStatus | 'all'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const itemsPerPage = 10

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'staging', label: 'Staging' },
    { value: 'approved', label: 'Approved' },
    { value: 'processing', label: 'Processing' },
    { value: 'paid', label: 'Paid' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const filteredData = paymentRequests.filter((pr) => {
    const matchesSearch = 
      pr.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.requester_email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || pr.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy as keyof PaymentRequest]
    const bValue = b[sortBy as keyof PaymentRequest]
    
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
      key: 'vendor_name',
      title: 'Vendor',
      dataIndex: 'vendor_name' as keyof PaymentRequest,
      sortable: true,
    },
    {
      key: 'amount',
      title: 'Amount',
      dataIndex: 'amount' as keyof PaymentRequest,
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center space-x-1">
          <DollarSign className="h-4 w-4 text-success-600" />
          <span className="font-medium">${value.toLocaleString()}</span>
        </div>
      ),
    },
    {
      key: 'program',
      title: 'Program',
      dataIndex: 'program' as keyof PaymentRequest,
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status' as keyof PaymentRequest,
      render: (value: PaymentRequestStatus) => <StatusBadge status={value} />,
    },
    {
      key: 'due_date',
      title: 'Due Date',
      dataIndex: 'due_date' as keyof PaymentRequest,
      sortable: true,
      render: (value: string) => format(new Date(value), 'MMM dd, yyyy'),
    },
    {
      key: 'requester_email',
      title: 'Requester',
      dataIndex: 'requester_email' as keyof PaymentRequest,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_: any, record: PaymentRequest) => (
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Payment Requests</h1>
          <p className="text-secondary-600">Manage and track payment requests</p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          onClick={onCreate}
        >
          New Payment Request
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
              <Input
                placeholder="Search vendors, programs, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as PaymentRequestStatus | 'all')}
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
          <span>Total Amount: ${paymentRequests.reduce((sum, pr) => sum + pr.amount, 0).toLocaleString()}</span>
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
        emptyText="No payment requests found"
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
