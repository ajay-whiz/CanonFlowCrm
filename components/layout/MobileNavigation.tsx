import React from 'react'
import { 
  LayoutDashboard, 
  Users, 
  DollarSign, 
  Settings,
  Menu,
  X
} from 'lucide-react'
import { Button } from '../ui/Button'

interface MobileNavigationProps {
  isOpen: boolean
  onToggle: () => void
  currentPath: string
  onNavigate: (path: string) => void
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onToggle,
  currentPath,
  onNavigate,
}) => {
  const navigation = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Payment Requests', path: '/payment-requests', icon: DollarSign },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const handleNavigate = (path: string) => {
    onNavigate(path)
    onToggle()
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="sm"
        icon={<Menu className="h-4 w-4" />}
        onClick={onToggle}
        className="lg:hidden"
      />

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onToggle} />
          
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-secondary-200">
                <h2 className="text-lg font-semibold text-secondary-900">Menu</h2>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<X className="h-4 w-4" />}
                  onClick={onToggle}
                />
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = currentPath === item.path
                  
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigate(item.path)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
