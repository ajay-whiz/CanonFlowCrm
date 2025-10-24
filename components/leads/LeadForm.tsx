import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Phone, Building, FileText } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Input'
import { Select } from '../ui/Select'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { CreateLeadRequest, UpdateLeadRequest } from '../../lib/api'

const leadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'lost']).optional(),
  notes: z.string().optional(),
})

type LeadFormData = z.infer<typeof leadSchema>

interface LeadFormProps {
  initialData?: Partial<LeadFormData>
  onSubmit: (data: LeadFormData) => void
  onCancel: () => void
  loading?: boolean
  title?: string
}

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'lost', label: 'Lost' },
]

export const LeadForm: React.FC<LeadFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  title = 'Lead',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      company: initialData?.company || '',
      status: initialData?.status || 'new',
      notes: initialData?.notes || '',
    },
  })

  const handleFormSubmit = (data: LeadFormData) => {
    onSubmit(data)
  }

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Input
                label="Full Name"
                placeholder="Enter full name"
                leftIcon={<User className="h-4 w-4" />}
                error={errors.name?.message}
                {...register('name')}
              />
            </div>

            {/* Email */}
            <div>
              <Input
                label="Email Address"
                type="email"
                placeholder="lead@example.com"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            {/* Phone */}
            <div>
              <Input
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
                leftIcon={<Phone className="h-4 w-4" />}
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>

            {/* Company */}
            <div>
              <Input
                label="Company"
                placeholder="Company name"
                leftIcon={<Building className="h-4 w-4" />}
                error={errors.company?.message}
                {...register('company')}
              />
            </div>

            {/* Status */}
            <div>
              <Select
                label="Status"
                options={statusOptions}
                value={watch('status')}
                onChange={(value) => setValue('status', value as any)}
                placeholder="Select status"
                error={errors.status?.message}
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <Textarea
                label="Notes"
                placeholder="Additional notes about this lead..."
                leftIcon={<FileText className="h-4 w-4" />}
                error={errors.notes?.message}
                {...register('notes')}
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-secondary-200">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              {initialData ? 'Update' : 'Create'} Lead
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
