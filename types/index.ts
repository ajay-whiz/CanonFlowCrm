import { Database } from './database'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Payment Request types
export type PaymentRequest = Tables<'payment_requests'>
export type PaymentRequestInsert = Database['public']['Tables']['payment_requests']['Insert']
export type PaymentRequestUpdate = Database['public']['Tables']['payment_requests']['Update']

// Container types
export type Container = Tables<'containers'>
export type ContainerInsert = Database['public']['Tables']['containers']['Insert']
export type ContainerUpdate = Database['public']['Tables']['containers']['Update']

// Lead types
export type Lead = Tables<'leads'>
export type LeadInsert = Database['public']['Tables']['leads']['Insert']
export type LeadUpdate = Database['public']['Tables']['leads']['Update']

// Audit Log types
export type AuditLog = Tables<'audit_log'>
export type AuditLogInsert = Database['public']['Tables']['audit_log']['Insert']

// Document types
export type Document = Tables<'documents'>
export type DocumentInsert = Database['public']['Tables']['documents']['Insert']

// Status enums
export type PaymentRequestStatus = 'staging' | 'approved' | 'processing' | 'paid' | 'cancelled'
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost'

// UI Component types
export interface DashboardStats {
  totalPaymentRequests: number
  pendingApprovals: number
  totalAmount: number
  totalLeads: number
  qualifiedLeads: number
  conversionRate: number
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface TimelineEvent {
  id: string
  type: 'status_change' | 'comment' | 'document' | 'payment'
  title: string
  description: string
  timestamp: string
  actor?: string
  metadata?: Record<string, any>
}

export interface FilterOptions {
  status?: PaymentRequestStatus | LeadStatus
  dateRange?: {
    from: Date
    to: Date
  }
  assignedTo?: string
  program?: string
}

export interface PaginationOptions {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Integration types
export interface IntegrationStatus {
  name: string
  status: 'connected' | 'disconnected' | 'error'
  lastSync?: string
  error?: string
}

export interface WebhookPayload {
  id: string
  type: string
  data: Record<string, any>
  timestamp: string
  signature: string
}

// Form types
export interface PaymentRequestForm {
  vendor_name: string
  amount: number
  program: string
  due_date: string
  requester_email: string
  notes?: string
  attachments?: File[]
}

export interface LeadForm {
  full_name: string
  emails: string[]
  phone?: string
  assigned_to?: string
  metadata?: Record<string, any>
}

export interface ContainerForm {
  name: string
  tax_id?: string
  email?: string
  phone?: string
  address?: string
}

// Notification types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

// Search types
export interface SearchResult {
  id: string
  type: 'payment_request' | 'lead' | 'container'
  title: string
  description: string
  status?: string
  timestamp: string
  url: string
}
