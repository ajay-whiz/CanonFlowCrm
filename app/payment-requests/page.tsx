'use client'

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { usePayments } from '@/hooks/usePayments';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function PaymentRequestsPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Use the usePayments hook
  const {
    payments,
    loading,
    error,
    getPaymentLists,
    getPaymentById,
  } = usePayments();

  // Handle navigation
  const handleNavigate = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  // Handle view details
  const handleViewDetails = useCallback((paymentId: string | number) => {
    router.push(`/payment-requests/${paymentId}`);
  }, [router]);

  // Handle initial load and authentication
  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      getPaymentLists().catch((err) => {
        console.error('Error fetching payments:', err);
      });
    }
  }, [isAuthenticated, authLoading, router, getPaymentLists]);


  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-secondary-50 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPath="/payment-requests"
        onNavigate={handleNavigate}
      />
      <div className="flex-1 overflow-auto">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="Payment Requests"
        />
        <main className="p-6 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">All Payments</h2>
            {/* <Button onClick={handleCreateNew}>
              <Plus className="mr-2 h-4 w-4" />
              New Payment
            </Button> */}
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-600">Error loading payments: {error}</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No payment requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map((paymentItem: any) => (
                <div key={paymentItem.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">
                        {paymentItem.payer || 'Unknown Payer'}
                      </h3>
                      {paymentItem.created_at && (
                        <p className="text-sm text-gray-500">
                          {new Date(paymentItem.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      paymentItem.status === 'paid' ? 'bg-green-100 text-green-800' :
                      paymentItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {paymentItem.status.charAt(0).toUpperCase() + paymentItem.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-2xl font-semibold">
                      {paymentItem.currency || 'USD'} {paymentItem.amount?.toLocaleString() || '0'}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(paymentItem.id || '')}
                      disabled={!paymentItem.id}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}