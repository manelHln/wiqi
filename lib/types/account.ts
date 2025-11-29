// API Types for Account Features
export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  address: string | null;
  birthdate: string | null;
  phone_number: string | null;
  subscription_tier: "free" | "pro" | "premium";
  total_savings: number;
  created_at: string;
  updated_at: string;
}

export interface CashbackEarning {
  id: string;
  user_id: string;
  merchant_name: string;
  merchant_domain: string;
  order_id: string | null;
  order_amount: number;
  cashback_amount: number;
  cashback_percentage: number | null;
  status: "pending" | "confirmed" | "available" | "paid" | "rejected";
  purchase_date: string;
  confirmation_date: string | null;
  available_date: string | null;
  payment_date: string | null;
  rejection_reason: string | null;
  created_at: string;
  updated_at: string;
}

export interface EarningsSummary {
  available: number;
  pending: number;
  confirmed: number;
  total_earned: number;
  total_paid: number;
}

export interface PaymentRequest {
  id: string;
  user_id: string;
  amount: number;
  payment_method: "bank_transfer" | "paypal" | "gift_voucher";
  payment_details: Record<string, any> | null;
  status: "pending" | "processing" | "completed" | "rejected";
  requested_at: string;
  processed_at: string | null;
  completed_at: string | null;
  rejection_reason: string | null;
  transaction_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface Referral {
  id: string;
  user_email: string;
  user_name: string | null;
  status: "pending" | "completed" | "expired";
  reward_amount: number;
  reward_claimed: boolean;
  created_at: string;
  completed_at: string | null;
}

export interface ReferralData {
  referral_code: string;
  total_referrals: number;
  successful_referrals: number;
  bonus_earned: number;
  referrals: Referral[];
}

export interface MerchantReview {
  id: string;
  user_id: string;
  merchant_domain: string;
  merchant_name: string;
  rating: number;
  review_text: string;
  purchase_verified: boolean;
  status: "pending" | "approved" | "rejected";
  reward_amount: number;
  reward_paid: boolean;
  moderation_notes: string | null;
  created_at: string;
  approved_at: string | null;
  rejected_at: string | null;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  category: "cashback" | "payment" | "technical" | "account" | "other";
  message: string;
  status: "pending" | "in_progress" | "completed" | "closed";
  priority: "low" | "normal" | "high" | "urgent";
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

export interface TicketResponse {
  id: string;
  ticket_id: string;
  user_id: string | null;
  is_staff: boolean;
  message: string;
  attachments: Record<string, any> | null;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_type:
    | "profile"
    | "purchases"
    | "earnings"
    | "referral"
    | "reviews"
    | "extension"
    | "seniority";
  badge_level: number;
  badge_name: string;
  badge_description: string | null;
  earned_at: string;
}

export interface UserTier {
  id: string;
  user_id: string;
  current_tier: "beginner" | "bronze" | "silver" | "gold" | "platinum";
  points: number;
  tier_updated_at: string;
  created_at: string;
}

export interface FollowedWebsite {
  id: string;
  user_id: string;
  website_name: string;
  website_url: string;
  website_favicon: string | null;
  last_searched_at: string | null;
  coupon_count_last_search: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type:
    | "price_drop"
    | "quota_limit"
    | "subscription_expiry"
    | "coupon_found"
    | "savings_milestone";
  title: string;
  message: string;
  related_id: string | null;
  is_read: boolean;
  created_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface RPCResponse {
  success: boolean;
  message?: string;
  error?: string;
  [key: string]: any;
}
