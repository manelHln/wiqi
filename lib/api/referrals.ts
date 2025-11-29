import { supabase } from '../supabase';
import type { ReferralData } from '../types/account';

/**
 * Get user referral data
 */
export async function getUserReferrals(): Promise<ReferralData | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase.rpc('get_user_referrals', {
    p_user_id: user.id
  });

  if (error) {
    console.error('Error fetching referrals:', error);
    throw error;
  }

  return data;
}

/**
 * Get referral code for user
 */
export async function getReferralCode(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('referral_codes')
    .select('referral_code')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching referral code:', error);
    return null;
  }

  return data?.referral_code || null;
}
