import React from 'react'
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../hooks/useAuth'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentPath: string
  onNavigate: (path: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  currentPath,
  onNavigate,
}) => {
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Payment Requests', path: '/payment-requests', icon: DollarSign },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    onNavigate('/login')
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-secondary-900">Canon Flow</h1>
                <p className="text-xs text-secondary-500">CRM System</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<X className="h-4 w-4" />}
              onClick={onToggle}
              className="lg:hidden"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.path
              
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.path)
                    onToggle()
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' 
                      : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-secondary-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 bg-secondary-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-secondary-600">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {user?.email || 'User'}
                </p>
                <p className="text-xs text-secondary-500">Administrator</p>
              </div>
            </div>
            
            <Button
              variant="outline"
              className="w-full"
              icon={<LogOut className="h-4 w-4" />}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
