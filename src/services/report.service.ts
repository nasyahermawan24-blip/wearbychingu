import { supabase } from "@/lib/supabase";

import {
  RecentSale,
  ReportStats,
} from "@/types/report";

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

export async function getReportStats(
  filter: string = "30days"
): Promise<ReportStats> {

  let orderQuery = supabase
    .from("orders")
    .select("*");

  const date = getDateFilter(filter);

  if (date) {
    orderQuery = orderQuery.gte(
      "created_at",
      date
    );
  }

  const {
    data: orders,
    error,
  } = await orderQuery;

  if (error) {
    throw new Error(error.message);
  }

  const list = orders ?? [];

  const totalRevenue = list.reduce(
    (sum, item) => sum + Number(item.total),
    0
  );

  const completedOrders = list.filter(
    (item) => item.status === "completed"
  ).length;

  const pendingOrders = list.filter(
    (item) => item.status === "pending"
  ).length;

  const totalOrders = list.length;

  const customerIds = new Set(
    list.map((item) => item.user_id)
  );

  return {
    totalRevenue,
    totalOrders,
    completedOrders,
    pendingOrders,
    totalCustomers: customerIds.size,
    averageOrder:
      totalOrders > 0
        ? totalRevenue / totalOrders
        : 0,
  };
}

export async function getRecentSales(
  filter: string = "30days"
): Promise<RecentSale[]> {

  let query = supabase
    .from("orders")
    .select(`
      id,
      total,
      status,
      created_at,
      receiver_name,
      payments (
        payment_method
      ),
      order_items (
        product_name
      )
    `);

  const date = getDateFilter(filter);

  if (date) {
    query = query.gte(
      "created_at",
      date
    );
  }

  const {
    data,
    error,
  } = await query
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item: any) => ({
    id: item.id,
    customer:
      item.receiver_name ?? "-",
    product:
      item.order_items?.[0]?.product_name ??
      "-",
    payment:
      item.payments?.[0]?.payment_method ??
      "-",
    total: Number(item.total),
    status: item.status,
    created_at: item.created_at,
  }));
}

export async function exportSalesCSV(
  filter: string = "30days"
) {

  let query = supabase
    .from("orders")
    .select(`
      id,
      receiver_name,
      phone,
      address,
      total,
      status,
      created_at
    `);

  const date = getDateFilter(filter);

  if (date) {
    query = query.gte(
      "created_at",
      date
    );
  }

  const {
    data,
    error,
  } = await query.order(
    "created_at",
    {
      ascending: false,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.length) return;

  const headers = [
    "Order ID",
    "Customer",
    "Phone",
    "Address",
    "Total",
    "Status",
    "Date",
  ];

  const rows = data.map((item) => [
    item.id,
    item.receiver_name ?? "",
    item.phone ?? "",
    item.address ?? "",
    item.total,
    item.status,
    new Date(
      item.created_at
    ).toLocaleString("id-ID"),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((cell) =>
          `"${String(cell).replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = `sales-report-${filter}.csv`;

  link.click();

  window.URL.revokeObjectURL(url);
}
export async function getRevenueComparison() {

  const now = new Date();

  const firstDayThisMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const firstDayLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const lastDayLastMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    0,
    23,
    59,
    59
  );

  const { data: thisMonth } =
    await supabase
      .from("orders")
      .select("total,status")
      .gte(
        "created_at",
        firstDayThisMonth.toISOString()
      )
      .neq("status", "cancelled");

  const { data: lastMonth } =
    await supabase
      .from("orders")
      .select("total,status")
      .gte(
        "created_at",
        firstDayLastMonth.toISOString()
      )
      .lte(
        "created_at",
        lastDayLastMonth.toISOString()
      )
      .neq("status", "cancelled");

  const revenueThisMonth =
    (thisMonth ?? []).reduce(
      (sum, item) =>
        sum + Number(item.total),
      0
    );

  const revenueLastMonth =
    (lastMonth ?? []).reduce(
      (sum, item) =>
        sum + Number(item.total),
      0
    );

  const percentage =
    revenueLastMonth === 0
      ? 100
      : (
          ((revenueThisMonth -
            revenueLastMonth) /
            revenueLastMonth) *
          100
        );

  return {

    thisMonthRevenue:
      revenueThisMonth,

    lastMonthRevenue:
      revenueLastMonth,

    percentage,

  };

}