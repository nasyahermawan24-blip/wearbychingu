export interface Payment {
  id?: number;

  order_id: number;

  payment_method: string;

  proof_url: string;

  status?: string;

  created_at?: string;

  updated_at?: string;
}

export interface PaymentWithOrder extends Payment {
  id: number;

  status: string;

  orders: {
    id: number;
    total: number;
    status: string;
    receiver_name: string;
    phone: string;
    user_id: string;
    profiles?: {
      full_name: string;
      phone: string;
    };
  } | null;
}
