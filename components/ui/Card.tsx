import React from 'react'
import clsx from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ 
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}, ref) => {
  const baseClasses = 'rounded-lg bg-white'
  
  const variantClasses = {
    default: 'shadow-sm',
    elevated: 'shadow-lg',
    outlined: 'border border-secondary-200',
  }
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  
  return (
    <div
      ref={ref}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ 
  title,
  subtitle,
  action,
  children,
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={clsx('flex items-center justify-between', className)} {...props}>
      <div>
        {title && <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>}
        {subtitle && <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>}
        {children}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ 
  children,
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={clsx('mt-4', className)} {...props}>
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ 
  children,
  className,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={clsx('mt-4 pt-4 border-t border-secondary-200', className)} {...props}>
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'
