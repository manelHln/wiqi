import useSWR from 'swr';
import { getUserReviews, getPendingReviews, submitReview } from '../lib/api/reviews';
import type { MerchantReview } from '../lib/types/account';

/**
 * Hook to fetch user reviews
 */
export function useReviews() {
  const { data, error, isLoading, mutate } = useSWR<MerchantReview[]>(
    'user-reviews',
    getUserReviews,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    reviews: data || [],
    isLoading,
    isError: error,
    mutate,
    submitReview: async (
      merchantDomain: string,
      merchantName: string,
      rating: number,
      reviewText: string
    ) => {
      const result = await submitReview(merchantDomain, merchantName, rating, reviewText);
      if (result.success) {
        mutate(); // Revalidate
      }
      return result;
    },
  };
}

/**
 * Hook to fetch pending reviews
 */
export function usePendingReviews() {
  const { data, error, isLoading, mutate } = useSWR<MerchantReview[]>(
    'pending-reviews',
    getPendingReviews,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    pendingReviews: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
