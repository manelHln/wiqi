import { supabase } from "../supabase";
import type { UserProfile, ApiResponse } from "../types/account";

/**
 * Fetch user profile data
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }

  return data;
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: {
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  address?: string;
  birthdate?: string;
  phone_number?: string;
}): Promise<ApiResponse<UserProfile>> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase.rpc("update_user_profile", {
    p_user_id: user.id,
    p_first_name: updates.first_name || null,
    p_last_name: updates.last_name || null,
    p_avatar_url: updates.avatar_url || null,
    p_address: updates.address || null,
    p_birthdate: updates.birthdate || null,
    p_phone_number: updates.phone_number || null,
  });

  if (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

/**
 * Get user settings
 */
export async function getUserSettings() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching user settings:", error);
    throw error;
  }

  return data;
}

/**
 * Update user settings
 */
export async function updateUserSettings(settings: {
  notifications_enabled?: boolean;
  email_notifications?: boolean;
  price_drop_alerts?: boolean;
  quota_warning_alerts?: boolean;
  language?: string;
  currency?: string;
  auto_apply_coupons?: boolean;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("user_settings")
    .update(settings)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
