export interface CustomerProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  avatar_url: string | null;
  created_at: string | null;
}

export interface CustomerAggregate extends CustomerProfile {
  total_orders: number;
  total_spending: number;
}

export interface CustomerStats {
  total_customers: number;
  active_customers: number;
  total_orders: number;
  total_revenue: number;
  average_spending: number;
}
