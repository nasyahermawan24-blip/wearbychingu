import { createSupabaseServerClient } from "@/lib/supabase-server";
import { DashboardData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createSupabaseServerClient();

  const [
    products,
    orders,
    payments,
    customers,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("payments")
      .select("*", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("role", "customer"),
  ]);

  // ==========================
  // Latest Orders
  // ==========================

  const { data: latestOrdersData } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      created_at,
      user_id
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  const latestOrders = await Promise.all(
    (latestOrdersData ?? []).map(async (order) => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", order.user_id)
        .maybeSingle();

      return {
        id: order.id,
        status: order.status,
        created_at: order.created_at,
        profiles: profile,
      };
    })
  );

  // ==========================
  // Latest Payments
  // ==========================

  const { data: latestPayments } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  // ==========================
  // Latest Products
  // ==========================

  const { data: latestProducts } = await supabase
    .from("products")
    .select("*")
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  return {
    products: products.count ?? 0,

    orders: orders.count ?? 0,

    payments: payments.count ?? 0,

    customers: customers.count ?? 0,

    latestOrders,

    latestPayments: latestPayments ?? [],

    latestProducts: latestProducts ?? [],
  };
}