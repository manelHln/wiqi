import useSWR from 'swr';
import { getUserReferrals, getReferralCode } from '../lib/api/referrals';
import type { ReferralData } from '../lib/types/account';

/**
 * Hook to fetch user referrals
 */
export function useReferrals() {
  const { data, error, isLoading, mutate } = useSWR<ReferralData | null>(
    'user-referrals',
    getUserReferrals,
    {
      revalidateOnFocus: false,
      refreshInterval: 60000, // Refresh every minute
    }
  );

  return {
    referralData: data,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook to fetch referral code
 */
export function useReferralCode() {
  const { data, error, isLoading } = useSWR<string | null>(
    'referral-code',
    getReferralCode,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    referralCode: data,
    isLoading,
    isError: error,
  };
}
