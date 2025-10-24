import React from 'react'
import { Menu, Bell, Search, User } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface HeaderProps {
  onMenuToggle: () => void
  title?: string
  showSearch?: boolean
  onSearch?: (query: string) => void
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  title = 'Dashboard',
  showSearch = false,
  onSearch,
}) => {
  return (
    <header className="bg-white border-b border-secondary-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            icon={<Menu className="h-4 w-4" />}
            onClick={onMenuToggle}
            className="lg:hidden"
          />
          <h1 className="text-xl font-semibold text-secondary-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {showSearch && (
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                  onChange={(e) => onSearch?.(e.target.value)}
                />
              </div>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            icon={<Bell className="h-4 w-4" />}
            className="relative"
          >
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-error-500 rounded-full"></span>
          </Button>

          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary-600" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-secondary-900">Admin</p>
              <p className="text-xs text-secondary-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
