export interface ReportStats {
  totalRevenue: number;
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  averageOrder: number;
}

export interface SalesChart {
  label: string;
  revenue: number;
}

export interface TopProduct {
  id: number;
  name: string;
  totalSales: number;
  revenue: number;
}

export interface RecentSale {
  id: number;
  customer: string;
  product: string;
  payment: string;
  total: number;
  status: string;
  created_at: string;
}
export interface RevenueComparison {
  thisMonthRevenue: number;
  lastMonthRevenue: number;
  percentage: number;
}