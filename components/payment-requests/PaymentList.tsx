import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';

type Payment = {
  id: number;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed' | string;
  payer: string;
  created_at?: string;
};

interface PaymentListProps {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  onViewDetails: (paymentId: number) => void;
}

export function PaymentList({ payments, loading, error, onViewDetails }: PaymentListProps) {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">Error loading payments: {error}</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No payment requests found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <Card key={payment.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">
                  {payment.payer}
                </h3>
                {payment.created_at && (
                  <p className="text-sm text-gray-500">
                    {format(new Date(payment.created_at), 'MMM d, yyyy')}
                  </p>
                )}
              </div>
              <Badge variant={getStatusVariant(payment.status)}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-semibold">
                {payment.currency} {payment.amount.toLocaleString()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(payment.id)}
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
