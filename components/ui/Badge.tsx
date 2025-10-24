import React from 'react'
import { clsx } from 'clsx'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium'
  
  const variantClasses = {
    default: 'bg-secondary-100 text-secondary-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-200 text-secondary-800',
  }
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm',
  }
  
  return (
    <span
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={clsx(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          variant === 'success' && 'bg-success-600',
          variant === 'warning' && 'bg-warning-600',
          variant === 'error' && 'bg-error-600',
          variant === 'primary' && 'bg-primary-600',
          variant === 'secondary' && 'bg-secondary-600',
          variant === 'default' && 'bg-secondary-600'
        )} />
      )}
      {children}
    </span>
  )
}

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'staging' | 'approved' | 'processing' | 'paid' | 'cancelled' | 'New' | 'Contacted' | 'Qualified' | 'Lost'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
  ...props
}) => {
  const statusConfig = {
    staging: { variant: 'warning' as const, label: 'Staging' },
    approved: { variant: 'success' as const, label: 'Approved' },
    processing: { variant: 'primary' as const, label: 'Processing' },
    paid: { variant: 'success' as const, label: 'Paid' },
    cancelled: { variant: 'error' as const, label: 'Cancelled' },
    New: { variant: 'primary' as const, label: 'New' },
    Contacted: { variant: 'warning' as const, label: 'Contacted' },
    Qualified: { variant: 'success' as const, label: 'Qualified' },
    Lost: { variant: 'error' as const, label: 'Lost' },
  }
  
  const config = statusConfig[status]
  
  return (
    <Badge variant={config.variant} className={className} {...props}>
      {config.label}
    </Badge>
  )
}
