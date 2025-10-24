import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, DollarSign, User, Mail, FileText, Upload } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Textarea } from '../ui/Input'
import { Select } from '../ui/Select'
import { Card, CardHeader, CardContent } from '../ui/Card'
import { PaymentRequestForm as PaymentRequestFormType } from '../../types'

const paymentRequestSchema = z.object({
  vendor_name: z.string().min(1, 'Vendor name is required'),
  amount: z.number().min(0.01, 'Amount must be greater than 0'),
  program: z.string().min(1, 'Program is required'),
  due_date: z.string().min(1, 'Due date is required'),
  requester_email: z.string().email('Invalid email address'),
  notes: z.string().optional(),
})

interface PaymentRequestFormProps {
  initialData?: Partial<PaymentRequestFormType>
  onSubmit: (data: PaymentRequestFormType) => void
  onCancel: () => void
  loading?: boolean
  title?: string
}

const programOptions = [
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Operations', label: 'Operations' },
  { value: 'IT', label: 'IT' },
  { value: 'HR', label: 'HR' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Legal', label: 'Legal' },
  { value: 'Other', label: 'Other' },
]

export const PaymentRequestForm: React.FC<PaymentRequestFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  title = 'Payment Request',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PaymentRequestFormType>({
    resolver: zodResolver(paymentRequestSchema),
    defaultValues: {
      vendor_name: initialData?.vendor_name || '',
      amount: initialData?.amount || 0,
      program: initialData?.program || '',
      due_date: initialData?.due_date || '',
      requester_email: initialData?.requester_email || '',
      notes: initialData?.notes || '',
    },
  })

  const handleFormSubmit = (data: PaymentRequestFormType) => {
    onSubmit(data)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      // Handle file upload logic here
      console.log('Files selected:', files)
    }
  }

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vendor Name */}
            <div>
              <Input
                label="Vendor Name"
                placeholder="Enter vendor name"
                leftIcon={<User className="h-4 w-4" />}
                error={errors.vendor_name?.message}
                {...register('vendor_name')}
              />
            </div>

            {/* Amount */}
            <div>
              <Input
                label="Amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                leftIcon={<DollarSign className="h-4 w-4" />}
                error={errors.amount?.message}
                {...register('amount', { valueAsNumber: true })}
              />
            </div>

            {/* Program */}
            <div>
              <Select
                label="Program"
                options={programOptions}
                value={watch('program')}
                onChange={(value) => setValue('program', value as string)}
                placeholder="Select program"
                error={errors.program?.message}
              />
            </div>

            {/* Due Date */}
            <div>
              <Input
                label="Due Date"
                type="date"
                leftIcon={<Calendar className="h-4 w-4" />}
                error={errors.due_date?.message}
                {...register('due_date')}
              />
            </div>

            {/* Requester Email */}
            <div className="md:col-span-2">
              <Input
                label="Requester Email"
                type="email"
                placeholder="requester@company.com"
                leftIcon={<Mail className="h-4 w-4" />}
                error={errors.requester_email?.message}
                {...register('requester_email')}
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <Textarea
                label="Notes"
                placeholder="Additional notes or comments..."
                leftIcon={<FileText className="h-4 w-4" />}
                error={errors.notes?.message}
                {...register('notes')}
                rows={3}
              />
            </div>

            {/* File Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Attachments
              </label>
              <div className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                <Upload className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
                <p className="text-sm text-secondary-600 mb-2">
                  Drag and drop files here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="btn btn-outline cursor-pointer"
                >
                  Choose Files
                </label>
              </div>
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
              {initialData ? 'Update' : 'Create'} Payment Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
