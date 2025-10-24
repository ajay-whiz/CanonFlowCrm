import React from 'react'
import clsx from 'clsx'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = 'full',
  padding = 'md',
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6',
  }

  return (
    <div
      className={clsx(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

interface MobileFirstProps {
  children: React.ReactNode
  className?: string
  showOn?: 'mobile' | 'tablet' | 'desktop'
  hideOn?: 'mobile' | 'tablet' | 'desktop'
}

export const MobileFirst: React.FC<MobileFirstProps> = ({
  children,
  className,
  showOn,
  hideOn,
}) => {
  const visibilityClasses = {
    showOn: {
      mobile: 'block md:hidden lg:hidden',
      tablet: 'hidden md:block lg:hidden',
      desktop: 'hidden md:hidden lg:block',
    },
    hideOn: {
      mobile: 'hidden md:block',
      tablet: 'block md:hidden lg:block',
      desktop: 'block md:block lg:hidden',
    },
  }

  const getVisibilityClass = () => {
    if (showOn) {
      return visibilityClasses.showOn[showOn]
    }
    if (hideOn) {
      return visibilityClasses.hideOn[hideOn]
    }
    return ''
  }

  return (
    <div className={clsx(getVisibilityClass(), className)}>
      {children}
    </div>
  )
}

interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    mobile: number
    tablet: number
    desktop: number
  }
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className,
}) => {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }

  const gridClasses = `grid grid-cols-${cols.mobile} md:grid-cols-${cols.tablet} lg:grid-cols-${cols.desktop}`

  return (
    <div className={clsx(gridClasses, gapClasses[gap], className)}>
      {children}
    </div>
  )
}
