import useSWR from 'swr';
import { getPaymentRequests, getPaymentRequestsByStatus, createPaymentRequest } from '../lib/api/payments';
import type { PaymentRequest } from '../lib/types/account';

/**
 * Hook to fetch payment requests
 */
export function usePaymentRequests() {
  const { data, error, isLoading, mutate } = useSWR<PaymentRequest[]>(
    'payment-requests',
    getPaymentRequests,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    requests: data || [],
    isLoading,
    isError: error,
    mutate,
    createRequest: async (
      amount: number,
      paymentMethod: 'bank_transfer' | 'paypal' | 'gift_voucher',
      paymentDetails: Record<string, any>
    ) => {
      const result = await createPaymentRequest(amount, paymentMethod, paymentDetails);
      if (result.success) {
        mutate(); // Revalidate the data
      }
      return result;
    },
  };
}

/**
 * Hook to fetch payment requests by status
 */
export function usePaymentRequestsByStatus(status: 'pending' | 'processing' | 'completed' | 'rejected') {
  const { data, error, isLoading, mutate } = useSWR<PaymentRequest[]>(
    ['payment-requests-by-status', status],
    () => getPaymentRequestsByStatus(status),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    requests: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
