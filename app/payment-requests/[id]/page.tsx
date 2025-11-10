'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { usePayments } from '@/hooks/usePayments';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function PaymentRequestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { getPaymentById } = usePayments();

  const paymentId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated && paymentId) {
      loadPayment();
    }
  }, [isAuthenticated, authLoading, paymentId]);

  const loadPayment = async () => {
    try {
      setLoading(true);
      const paymentData = await getPaymentById(paymentId);
      if (paymentData) {
        setPayment(paymentData);
      } else {
        setError('Payment not found');
      }
    } catch (err) {
      console.error('Error loading payment:', err);
      setError('Failed to load payment details');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/payment-requests');
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (error) {
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
            title="Payment Request"
          />
          <main className="p-6 max-w-4xl mx-auto">
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-600">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Payments
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
          title="Payment Request"
        />
        <main className="p-6 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Payments
          </Button>
          
          {payment && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold">Payment Details</h2>
                  <p className="text-sm text-gray-500">
                    ID: {payment.id}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1) || 'Unknown'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Payer:</dt>
                      <dd className="font-medium">{payment.payer || 'N/A'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Amount:</dt>
                      <dd className="font-medium">
                        {payment.currency} {payment.amount?.toLocaleString() || '0'}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Created At:</dt>
                      <dd className="font-medium">
                        {payment.created_at ? new Date(payment.created_at).toLocaleString() : 'N/A'}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Additional Details</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Status:</dt>
                      <dd className="font-medium">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {payment.status || 'N/A'}
                        </span>
                      </dd>
                    </div>
                    {/* Add more payment details as needed */}
                  </dl>
                </div>
              </div>
              
              {/* Add more sections as needed */}
              
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
