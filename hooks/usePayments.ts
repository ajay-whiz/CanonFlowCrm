import { useState, useCallback, useEffect } from 'react';
import { apiClient, Payment, PaymentList } from '../lib/api';

type CreatePaymentRequest = Omit<Payment, 'id' | 'created_at'>;
type UpdatePaymentRequest = Partial<CreatePaymentRequest>;

export const usePayments = (autoFetch: boolean = true) => {
    const [payments, setPayments] = useState<PaymentList[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPaymentLists = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.getPaymentLists();
            if (response.success && response.data) {
                // Assuming response.data is an array of Payment objects
                setPayments(response.data);
            } else {
                setPayments([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch payments');
            setPayments([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const getPaymentById = async (id: string): Promise<Payment | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.getPaymentById(id);
            if (response.success && response.data && response.data.length > 0) {
                // return response.data || []; // Return the first payment if array
                if (!Array.isArray(response.data)) {
                    return response.data as Payment;
                }
            }

            setError('Payment not found');
            return null;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Network error';
            setError(errorMessage);
            console.error('Error fetching payment:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch payments on component mount if autoFetch is true
    useEffect(() => {
        if (autoFetch) {
            getPaymentLists().catch(console.error);
        }
    }, [autoFetch, getPaymentLists]);

    return {
        payments,
        loading,
        error,
        getPaymentLists,
        getPaymentById,
        setPayments, // Export setPayments in case it's needed for optimistic updates
    };
};

export default usePayments;
