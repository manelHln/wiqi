import useSWR from 'swr';
import { getFollowedWebsites, addFavoriteWebsite, removeFavoriteWebsite } from '../lib/api/favorites';
import type { FollowedWebsite } from '../lib/types/account';

/**
 * Hook to fetch followed websites
 */
export function useFavorites() {
  const { data, error, isLoading, mutate } = useSWR<FollowedWebsite[]>(
    'followed-websites',
    getFollowedWebsites,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    favorites: data || [],
    isLoading,
    isError: error,
    mutate,
    addFavorite: async (websiteName: string, websiteUrl: string, websiteFavicon?: string) => {
      const success = await addFavoriteWebsite(websiteName, websiteUrl, websiteFavicon);
      if (success) {
        mutate(); // Revalidate
      }
      return success;
    },
    removeFavorite: async (websiteId: string) => {
      const success = await removeFavoriteWebsite(websiteId);
      if (success) {
        mutate(); // Revalidate
      }
      return success;
    },
  };
}
