import { supabase } from '../supabase';
import type { EarningsSummary, CashbackEarning, ApiResponse } from '../types/account';

/**
 * Get user earnings summary
 */
export async function getUserEarnings(): Promise<EarningsSummary | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase.rpc('get_user_earnings', {
    p_user_id: user.id
  });

  if (error) {
    console.error('Error fetching earnings:', error);
    throw error;
  }

  return data;
}

/**
 * Get earnings history
 */
export async function getEarningsHistory(): Promise<CashbackEarning[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('cashback_earnings')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching earnings history:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get earnings by status
 */
export async function getEarningsByStatus(
  status: 'pending' | 'confirmed' | 'available' | 'paid' | 'rejected'
): Promise<CashbackEarning[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('cashback_earnings')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching earnings by status:', error);
    throw error;
  }

  return data || [];
}
