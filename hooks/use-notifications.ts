import useSWR from 'swr';
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead, deleteNotification } from '../lib/api/notifications';
import type { Notification } from '../lib/types/account';

/**
 * Hook to fetch notifications
 */
export function useNotifications() {
  const { data, error, isLoading, mutate } = useSWR<Notification[]>(
    'notifications',
    getNotifications,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    notifications: data || [],
    isLoading,
    isError: error,
    mutate,
    markAsRead: async (notificationId: string) => {
      const success = await markAsRead(notificationId);
      if (success) {
        mutate(); // Revalidate
      }
      return success;
    },
    markAllAsRead: async () => {
      const success = await markAllAsRead();
      if (success) {
        mutate(); // Revalidate
      }
      return success;
    },
    deleteNotification: async (notificationId: string) => {
      const success = await deleteNotification(notificationId);
      if (success) {
        mutate(); // Revalidate
      }
      return success;
    },
  };
}

/**
 * Hook to fetch unread count
 */
export function useUnreadCount() {
  const { data, error, isLoading, mutate } = useSWR<number>(
    'unread-count',
    getUnreadCount,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    unreadCount: data || 0,
    isLoading,
    isError: error,
    mutate,
  };
}
