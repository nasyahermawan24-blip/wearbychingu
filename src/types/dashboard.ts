import { Order } from "@/types/order";
import { Payment } from "@/types/payment";
import { Product } from "@/types/product";

export interface DashboardData {
  products: number;
  orders: number;
  payments: number;
  customers: number;
  latestOrders: (Order & { profiles?: { full_name?: string } })[];
  latestPayments: Payment[];
  latestProducts: Product[];
}
