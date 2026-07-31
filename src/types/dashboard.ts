import { Payment } from "@/types/payment";
import { Product } from "@/types/product";

export interface DashboardLatestOrder {
  id: number;
  status: string | null;
  created_at: string | null;
  profiles: {
    full_name: string | null;
  } | null;
}

export interface DashboardData {
  products: number;
  orders: number;
  payments: number;
  customers: number;

  latestOrders: DashboardLatestOrder[];

  latestPayments: Payment[];

  latestProducts: Product[];
}