import useSWR from 'swr';
import { UserProfile } from '@/lib/types/account';
import { getUserProfile, getUserSettings, updateUserProfile, updateUserSettings } from '@/lib/api/profile';

/**
 * Hook to fetch user profile
 */
export function useUserProfile() {
  const { data, error, isLoading, mutate } = useSWR<UserProfile | null>(
    'user-profile',
    getUserProfile,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    profile: data,
    isLoading,
    isError: error,
    mutate,
    updateProfile: async (updates: Parameters<typeof updateUserProfile>[0]) => {
      const result = await updateUserProfile(updates);
      if (result.success) {
        mutate(); // Revalidate the data
      }
      return result;
    },
  };
}

/**
 * Hook to fetch user settings
 */
export function useUserSettings() {
  const { data, error, isLoading, mutate } = useSWR(
    'user-settings',
    getUserSettings,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    settings: data,
    isLoading,
    isError: error,
    mutate,
    updateSettings: async (updates: Parameters<typeof updateUserSettings>[0]) => {
      const result = await updateUserSettings(updates);
      if (result.success) {
        mutate(); // Revalidate the data
      }
      return result;
    },
  };
}
