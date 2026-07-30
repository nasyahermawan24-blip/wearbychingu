export interface Order {
  id?: number;

  user_id: string;

  receiver_name: string;

  phone: string;

  address: string;

  total: number;

  profiles?: {
    full_name?: string;
  };

  status?: string;

  created_at?: string;

  updated_at?: string;
}

export interface OrderItem {
  id?: number;

  order_id?: number;

  product_id: number;

  product_name: string;

  price: number;

  quantity: number;

  subtotal: number;
}

export interface OrderWithItems extends Order {
  order_items?: OrderItem[];
}

