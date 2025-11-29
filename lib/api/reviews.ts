import { supabase } from '../supabase';
import type { MerchantReview, ApiResponse, RPCResponse } from '../types/account';

/**
 * Submit a merchant review
 */
export async function submitReview(
  merchantDomain: string,
  merchantName: string,
  rating: number,
  reviewText: string
): Promise<ApiResponse<{ review_id: string }>> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data, error } = await supabase.rpc('submit_merchant_review', {
    p_user_id: user.id,
    p_merchant_domain: merchantDomain,
    p_merchant_name: merchantName,
    p_rating: rating,
    p_review_text: reviewText
  }) as { data: RPCResponse | null, error: any };

  if (error) {
    console.error('Error submitting review:', error);
    return { success: false, error: error.message };
  }

  if (!data?.success) {
    return { success: false, error: data?.error || 'Failed to submit review' };
  }

  return {
    success: true,
    data: { review_id: data.review_id },
    message: data.message
  };
}

/**
 * Get user's reviews
 */
export async function getUserReviews(): Promise<MerchantReview[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('merchant_reviews')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get pending reviews
 */
export async function getPendingReviews(): Promise<MerchantReview[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('merchant_reviews')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending reviews:', error);
    throw error;
  }

  return data || [];
}
