import { supabase } from "@/lib/supabase";
import { CustomerAggregate, CustomerStats, CustomerProfile } from "@/types/customer";

export async function getCustomerStats(): Promise<CustomerStats> {
  const { count: totalCustomers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("role", "customer");

  const { count: totalOrders } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  const { data: revenueData } = await supabase
    .from("orders")
    .select("total")
    .neq("status", "cancelled");

  const totalRevenue =
    revenueData?.reduce((sum, row) => sum + Number(row.total || 0), 0) ?? 0;

  const averageSpending =
    totalCustomers && totalCustomers > 0
      ? Math.round(totalRevenue / totalCustomers)
      : 0;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { count: activeCustomers } = await supabase
    .from("orders")
    .select("user_id", { count: "exact", head: true })
    .gte("created_at", thirtyDaysAgo.toISOString());

  return {
    total_customers: totalCustomers ?? 0,
    active_customers: activeCustomers ?? 0,
    total_orders: totalOrders ?? 0,
    total_revenue: totalRevenue,
    average_spending: averageSpending,
  };
}

export async function getCustomersWithAggregates(
  search?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ customers: CustomerAggregate[]; total: number }> {
  // First get profiles with customer role (with search filter)
  let profileQuery = supabase
    .from("profiles")
    .select("*")
    .eq("role", "customer")
    .order("created_at", { ascending: false });

  if (search) {
    profileQuery = profileQuery.or(
      `full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
    );
  }

  const { count: total } = await profileQuery;
  const totalCount = total ?? 0;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data: profiles, error } = await profileQuery.range(from, to);

  if (error) {
    console.error(error);
    return { customers: [], total: 0 };
  }

  const profilesList = (profiles ?? []) as CustomerProfile[];

  // For each profile, get order aggregates
  const customers: CustomerAggregate[] = await Promise.all(
    profilesList.map(async (profile) => {
      const { data: orders } = await supabase
        .from("orders")
        .select("total")
        .eq("user_id", profile.id)
        .neq("status", "cancelled");

      const totalOrders = orders?.length ?? 0;
      const totalSpending =
        orders?.reduce((sum, o) => sum + Number(o.total || 0), 0) ?? 0;

      return {
        ...profile,
        total_orders: totalOrders,
        total_spending: totalSpending,
      };
    })
  );

  return { customers, total: totalCount };
}

export async function getCustomerById(id: string): Promise<CustomerAggregate | null> {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !profile) return null;

  const { data: orders } = await supabase
    .from("orders")
    .select("total")
    .eq("user_id", profile.id)
    .neq("status", "cancelled");

  const totalOrders = orders?.length ?? 0;
  const totalSpending =
    orders?.reduce((sum, o) => sum + Number(o.total || 0), 0) ?? 0;

  return {
    ...(profile as CustomerProfile),
    total_orders: totalOrders,
    total_spending: totalSpending,
  };
}
