import { supabase } from "@/lib/supabase";
import {
  RevenueChart,
  StatusChart,
  ProductChart,
} from "@/types/chart";

function getDateFilter(filter: string): string | null {
  const now = new Date();

  switch (filter) {
    case "today":
      now.setHours(0, 0, 0, 0);
      return now.toISOString();

    case "7days":
      now.setDate(now.getDate() - 7);
      return now.toISOString();

    case "30days":
      now.setDate(now.getDate() - 30);
      return now.toISOString();

    case "year":
      return new Date(
        now.getFullYear(),
        0,
        1
      ).toISOString();

    default:
      return null;
  }
}

export async function getRevenueChart(
  filter: string = "30days"
): Promise<RevenueChart[]> {

  let query = supabase
    .from("orders")
    .select("total,created_at")
    .order("created_at", {
      ascending: true,
    });

  const date = getDateFilter(filter);

  if (date) {
    query = query.gte("created_at", date);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const map = new Map<string, number>();

  data?.forEach((item) => {
    const month =
      months[new Date(item.created_at).getMonth()];

    map.set(
      month,
      (map.get(month) ?? 0) +
        Number(item.total)
    );
  });

  return Array.from(map.entries()).map(
    ([month, revenue]) => ({
      month,
      revenue,
    })
  );
}

export async function getStatusChart(
  filter: string = "30days"
): Promise<StatusChart[]> {

  let query = supabase
    .from("orders")
    .select("status");

  const date = getDateFilter(filter);

  if (date) {
    query = query.gte("created_at", date);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const map = new Map<string, number>();

  data?.forEach((item) => {
    map.set(
      item.status,
      (map.get(item.status) ?? 0) + 1
    );
  });

  return Array.from(map.entries()).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
}

type ProductRow = {
  quantity: number;
  products:
    | {
        name: string;
      }
    | {
        name: string;
      }[]
    | null;
};

export async function getTopProducts(
  filter: string = "30days"
): Promise<ProductChart[]> {

  let query = supabase
    .from("order_items")
    .select(`
      quantity,
      orders!inner(created_at),
      products(name)
    `);

  const date = getDateFilter(filter);

  if (date) {
    query = query.gte(
      "orders.created_at",
      date
    );
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const map = new Map<string, number>();

  (data as ProductRow[] | null)?.forEach(
    (item) => {

      let product = "Unknown Product";

      if (Array.isArray(item.products)) {
        product =
          item.products[0]?.name ??
          "Unknown Product";
      } else if (item.products) {
        product = item.products.name;
      }

      map.set(
        product,
        (map.get(product) ?? 0) +
          Number(item.quantity)
      );
    }
  );

  return Array.from(map.entries())
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}