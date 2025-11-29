import useSWR from 'swr';
import { getSupportTickets, getTicketResponses, createTicket, addTicketResponse } from '@/lib/api/support';
import type { SupportTicket, TicketResponse } from '@/lib/types/account';

/**
 * Hook to fetch support tickets
 */
export function useSupportTickets() {
  const { data, error, isLoading, mutate } = useSWR<SupportTicket[]>(
    'support-tickets',
    getSupportTickets,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    tickets: data || [],
    isLoading,
    isError: error,
    mutate,
    createTicket: async (
      subject: string,
      category: 'cashback' | 'payment' | 'technical' | 'account' | 'general',
      message: string
    ) => {
      const result = await createTicket(subject, category, message);
      if (result.success) {
        mutate(); // Revalidate
      }
      return result;
    },
  };
}

/**
 * Hook to fetch ticket responses
 */
export function useTicketResponses(ticketId: string | null) {
  const { data, error, isLoading, mutate } = useSWR<TicketResponse[]>(
    ticketId ? ['ticket-responses', ticketId] : null,
    () => ticketId ? getTicketResponses(ticketId) : Promise.resolve([]),
    {
      refreshInterval: 10000, // Refresh every 10 seconds for real-time updates
      revalidateOnFocus: true,
    }
  );

  return {
    responses: data || [],
    isLoading,
    isError: error,
    mutate,
    addResponse: async (message: string) => {
      if (!ticketId) return { success: false, error: 'No ticket ID' };
      const result = await addTicketResponse(ticketId, message);
      if (result.success) {
        mutate(); // Revalidate
      }
      return result;
    },
  };
}
