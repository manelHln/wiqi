import useSWR from 'swr';
import { getUserEarnings, getEarningsHistory, getEarningsByStatus } from '../lib/api/earnings';
import type { EarningsSummary, CashbackEarning } from '../lib/types/account';

/**
 * Hook to fetch earnings summary
 */
export function useEarnings() {
  const { data, error, isLoading, mutate } = useSWR<EarningsSummary | null>(
    'user-earnings',
    getUserEarnings,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    earnings: data,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch earnings history
 */
export function useEarningsHistory() {
  const { data, error, isLoading, mutate } = useSWR<CashbackEarning[]>(
    'earnings-history',
    getEarningsHistory,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    history: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch earnings by status
 */
export function useEarningsByStatus(status: 'pending' | 'confirmed' | 'available' | 'paid' | 'rejected') {
  const { data, error, isLoading, mutate } = useSWR<CashbackEarning[]>(
    ['earnings-by-status', status],
    () => getEarningsByStatus(status),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    earnings: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
