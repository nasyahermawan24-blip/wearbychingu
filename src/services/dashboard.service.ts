import { createSupabaseServerClient } from "@/lib/supabase-server";
import { DashboardData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {

  const supabase =
    await createSupabaseServerClient();

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
      .select("*", {
        count: "exact",
        head: true,
      }),

  ]);

  const { data: latestOrders } =
    await supabase
      .from("orders")
      .select(`
        *,
        profiles (
          full_name
        )
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  const { data: latestPayments } =
    await supabase
      .from("payments")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  const { data: latestProducts } =
    await supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  return {

    products:
      products.count ?? 0,

    orders:
      orders.count ?? 0,

    payments:
      payments.count ?? 0,

    customers:
      customers.count ?? 0,

    latestOrders:
      latestOrders ?? [],

    latestPayments:
      latestPayments ?? [],

    latestProducts:
      latestProducts ?? [],

  };
}