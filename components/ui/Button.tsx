import React from 'react'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
    secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus-visible:ring-secondary-500',
    success: 'bg-success-600 text-white hover:bg-success-700 focus-visible:ring-success-500',
    warning: 'bg-warning-600 text-white hover:bg-warning-700 focus-visible:ring-warning-500',
    error: 'bg-error-600 text-white hover:bg-error-700 focus-visible:ring-error-500',
    outline: 'border border-secondary-300 bg-transparent text-secondary-700 hover:bg-secondary-50 focus-visible:ring-secondary-500',
  }
  
  const sizeClasses = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  }
  
  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }
  
  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Loader2 className={clsx('animate-spin', iconSizeClasses[size], 'mr-2')} />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className={clsx(iconSizeClasses[size], 'mr-2')}>
          {icon}
        </span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span className={clsx(iconSizeClasses[size], 'ml-2')}>
          {icon}
        </span>
      )}
    </button>
  )
}
