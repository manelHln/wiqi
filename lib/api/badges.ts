import { supabase } from '../supabase';
import type { UserBadge, UserTier } from '../types/account';

/**
 * Get user badges
 */
export async function getUserBadges(): Promise<UserBadge[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', user.id)
    .order('earned_at', { ascending: false });

  if (error) {
    console.error('Error fetching badges:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get user tier
 */
export async function getUserTier(): Promise<UserTier | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_tiers')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching tier:', error);
    return null;
  }

  return data;
}

/**
 * Update user tier (recalculate points and tier)
 */
export async function updateUserTier(): Promise<{ tier: string; points: number } | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase.rpc('update_user_tier', {
    p_user_id: user.id
  });

  if (error) {
    console.error('Error updating tier:', error);
    return null;
  }

  return data;
}
