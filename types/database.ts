export interface Database {
  public: {
    Tables: {
      payment_requests: {
        Row: {
          id: string
          vendor_name: string
          amount: number
          program: string
          due_date: string
          requester_email: string
          notes: string | null
          status: 'staging' | 'approved' | 'processing' | 'paid' | 'cancelled'
          container_id: string | null
          asana_task_id: string | null
          qbo_invoice_id: string | null
          drive_folder_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vendor_name: string
          amount: number
          program: string
          due_date: string
          requester_email: string
          notes?: string | null
          status?: 'staging' | 'approved' | 'processing' | 'paid' | 'cancelled'
          container_id?: string | null
          asana_task_id?: string | null
          qbo_invoice_id?: string | null
          drive_folder_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vendor_name?: string
          amount?: number
          program?: string
          due_date?: string
          requester_email?: string
          notes?: string | null
          status?: 'staging' | 'approved' | 'processing' | 'paid' | 'cancelled'
          container_id?: string | null
          asana_task_id?: string | null
          qbo_invoice_id?: string | null
          drive_folder_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      containers: {
        Row: {
          id: string
          name: string
          tax_id: string | null
          email: string | null
          phone: string | null
          address: string | null
          zenwork_vendor_id: string | null
          melio_vendor_id: string | null
          qbo_vendor_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tax_id?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          zenwork_vendor_id?: string | null
          melio_vendor_id?: string | null
          qbo_vendor_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tax_id?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          zenwork_vendor_id?: string | null
          melio_vendor_id?: string | null
          qbo_vendor_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          full_name: string
          emails: string[]
          phone: string | null
          status: 'New' | 'Contacted' | 'Qualified' | 'Lost'
          assigned_to: string | null
          metadata: Record<string, any> | null
          asana_task_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          emails: string[]
          phone?: string | null
          status?: 'New' | 'Contacted' | 'Qualified' | 'Lost'
          assigned_to?: string | null
          metadata?: Record<string, any> | null
          asana_task_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          emails?: string[]
          phone?: string | null
          status?: 'New' | 'Contacted' | 'Qualified' | 'Lost'
          assigned_to?: string | null
          metadata?: Record<string, any> | null
          asana_task_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      audit_log: {
        Row: {
          id: string
          table_name: string
          record_id: string
          action: 'INSERT' | 'UPDATE' | 'DELETE'
          actor: string
          old_values: Record<string, any> | null
          new_values: Record<string, any> | null
          created_at: string
        }
        Insert: {
          id?: string
          table_name: string
          record_id: string
          action: 'INSERT' | 'UPDATE' | 'DELETE'
          actor: string
          old_values?: Record<string, any> | null
          new_values?: Record<string, any> | null
          created_at?: string
        }
        Update: {
          id?: string
          table_name?: string
          record_id?: string
          action?: 'INSERT' | 'UPDATE' | 'DELETE'
          actor?: string
          old_values?: Record<string, any> | null
          new_values?: Record<string, any> | null
          created_at?: string
        }
      }
      idempotency_keys: {
        Row: {
          id: string
          key: string
          table_name: string
          record_id: string
          created_at: string
        }
        Insert: {
          id?: string
          key: string
          table_name: string
          record_id: string
          created_at?: string
        }
        Update: {
          id?: string
          key?: string
          table_name?: string
          record_id?: string
          created_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          payment_request_id: string | null
          lead_id: string | null
          drive_file_id: string
          filename: string
          file_type: string
          file_size: number
          created_at: string
        }
        Insert: {
          id?: string
          payment_request_id?: string | null
          lead_id?: string | null
          drive_file_id: string
          filename: string
          file_type: string
          file_size: number
          created_at?: string
        }
        Update: {
          id?: string
          payment_request_id?: string | null
          lead_id?: string | null
          drive_file_id?: string
          filename?: string
          file_type?: string
          file_size?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
