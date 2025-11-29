import useSWR from 'swr';
import { getUserBadges, getUserTier, updateUserTier } from '../lib/api/badges';
import type { UserBadge, UserTier } from '../lib/types/account';

/**
 * Hook to fetch user badges
 */
export function useBadges() {
  const { data, error, isLoading, mutate } = useSWR<UserBadge[]>(
    'user-badges',
    getUserBadges,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    badges: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch user tier
 */
export function useUserTier() {
  const { data, error, isLoading, mutate } = useSWR<UserTier | null>(
    'user-tier',
    getUserTier,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    tier: data,
    isLoading,
    isError: error,
    mutate,
    updateTier: async () => {
      const result = await updateUserTier();
      if (result) {
        mutate(); // Revalidate
      }
      return result;
    },
  };
}
