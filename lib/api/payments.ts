import { supabase } from '../supabase';
import type { PaymentRequest, ApiResponse, RPCResponse } from '../types/account';

/**
 * Create a payment request
 */
export async function createPaymentRequest(
  amount: number,
  paymentMethod: 'bank_transfer' | 'paypal' | 'gift_voucher',
  paymentDetails: Record<string, any>
): Promise<ApiResponse<{ request_id: string }>> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data, error } = await supabase.rpc('create_payment_request', {
    p_user_id: user.id,
    p_amount: amount,
    p_payment_method: paymentMethod,
    p_payment_details: paymentDetails
  }) as { data: RPCResponse | null, error: any };

  if (error) {
    console.error('Error creating payment request:', error);
    return { success: false, error: error.message };
  }

  if (!data?.success) {
    return { success: false, error: data?.error || 'Failed to create payment request' };
  }

  return {
    success: true,
    data: { request_id: data.request_id },
    message: data.message
  };
}

/**
 * Get payment requests history
 */
export async function getPaymentRequests(): Promise<PaymentRequest[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('payment_requests')
    .select('*')
    .eq('user_id', user.id)
    .order('requested_at', { ascending: false });

  if (error) {
    console.error('Error fetching payment requests:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get payment requests by status
 */
export async function getPaymentRequestsByStatus(
  status: 'pending' | 'processing' | 'completed' | 'rejected'
): Promise<PaymentRequest[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('payment_requests')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', status)
    .order('requested_at', { ascending: false});

  if (error) {
    console.error('Error fetching payment requests by status:', error);
    throw error;
  }

  return data || [];
}
