import { supabase } from '../supabase';
import type { SupportTicket, TicketResponse, ApiResponse, RPCResponse } from '../types/account';

/**
 * Create a support ticket
 */
export async function createTicket(
  subject: string,
  category: 'cashback' | 'payment' | 'technical' | 'account' | 'general',
  message: string
): Promise<ApiResponse<{ ticket_id: string }>> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data, error } = await supabase.rpc('create_support_ticket', {
    p_user_id: user.id,
    p_subject: subject,
    p_category: category,
    p_message: message
  }) as { data: RPCResponse | null, error: any };

  if (error) {
    console.error('Error creating ticket:', error);
    return { success: false, error: error.message };
  }

  if (!data?.success) {
    return { success: false, error: data?.error || 'Failed to create ticket' };
  }

  return {
    success: true,
    data: { ticket_id: data.ticket_id },
    message: data.message
  };
}

/**
 * Get user's support tickets
 */
export async function getSupportTickets(): Promise<SupportTicket[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get ticket responses
 */
export async function getTicketResponses(ticketId: string): Promise<TicketResponse[]> {
  const { data, error } = await supabase
    .from('support_ticket_responses')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching ticket responses:', error);
    throw error;
  }

  return data || [];
}

/**
 * Add response to ticket
 */
export async function addTicketResponse(
  ticketId: string,
  message: string
): Promise<ApiResponse<{ response_id: string }>> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data, error } = await supabase.rpc('add_ticket_response', {
    p_ticket_id: ticketId,
    p_user_id: user.id,
    p_message: message,
    p_is_staff: false
  }) as { data: RPCResponse | null, error: any };

  if (error) {
    console.error('Error adding response:', error);
    return { success: false, error: error.message };
  }

  if (!data?.success) {
    return { success: false, error: 'Failed to add response' };
  }

  return {
    success: true,
    data: { response_id: data.response_id }
  };
}
