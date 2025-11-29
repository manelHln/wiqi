import { supabase } from '../supabase';
import type { FollowedWebsite } from '../types/account';

/**
 * Get followed websites
 */
export async function getFollowedWebsites(): Promise<FollowedWebsite[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('followed_websites')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching followed websites:', error);
    throw error;
  }

  return data || [];
}

/**
 * Add website to favorites
 */
export async function addFavoriteWebsite(
  websiteName: string,
  websiteUrl: string,
  websiteFavicon?: string
): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('followed_websites')
    .insert({
      user_id: user.id,
      website_name: websiteName,
      website_url: websiteUrl,
      website_favicon: websiteFavicon || null
    });

  if (error) {
    console.error('Error adding favorite:', error);
    return false;
  }

  return true;
}

/**
 * Remove website from favorites
 */
export async function removeFavoriteWebsite(websiteId: string): Promise<boolean> {
  const { error } = await supabase
    .from('followed_websites')
    .update({ is_active: false })
    .eq('id', websiteId);

  if (error) {
    console.error('Error removing favorite:', error);
    return false;
  }

  return true;
}
