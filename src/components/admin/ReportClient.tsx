"use client";

import { useMemo, useState } from "react";

import ReportDashboard from "@/components/admin/ReportDashboard";
import SalesRevenueChart from "@/components/admin/SalesRevenueChart";
import OrderStatusChart from "@/components/admin/OrderStatusChart";
import TopProductChart from "@/components/admin/TopProductChart";
import ReportFilter from "@/components/admin/ReportFilter";

import {
  RevenueChart,
  StatusChart,
  ProductChart,
} from "@/types/chart";

import {
  ReportStats,
  RecentSale,
  RevenueComparison,
} from "@/types/report";

import { ReportFilter as FilterType } from "@/types/filter";

interface Props {
  stats: ReportStats;
  sales: RecentSale[];
  comparison: RevenueComparison;
  revenueChart: RevenueChart[];
  statusChart: StatusChart[];
  topProducts: ProductChart[];
}

export default function ReportClient({
  stats,
  sales,
  comparison,
  revenueChart,
  statusChart,
  topProducts,
}: Props) {
  const [filter, setFilter] =
    useState<FilterType>("30days");

  const filteredSales = useMemo(() => {
    const now = new Date();

    return sales.filter((sale) => {
      const date = new Date(sale.created_at);

      switch (filter) {
        case "today":
          return (
            date.toDateString() ===
            now.toDateString()
          );

        case "7days": {
          const start = new Date();
          start.setDate(start.getDate() - 7);
          return date >= start;
        }

        case "30days": {
          const start = new Date();
          start.setDate(start.getDate() - 30);
          return date >= start;
        }

        case "year":
          return (
            date.getFullYear() ===
            now.getFullYear()
          );

        default:
          return true;
      }
    });
  }, [sales, filter]);

  const filteredRevenueChart = useMemo(() => {
    return revenueChart;
  }, [revenueChart, filter]);

  const filteredStatusChart = useMemo(() => {
    return statusChart;
  }, [statusChart, filter]);

  const filteredTopProducts = useMemo(() => {
    return topProducts;
  }, [topProducts, filter]);

  const filteredStats = useMemo((): ReportStats => {
    const totalRevenue = filteredSales.reduce(
      (sum, sale) => sum + sale.total,
      0
    );

    const totalOrders = filteredSales.length;

    const completedOrders = filteredSales.filter(
      (sale) =>
        sale.status.toLowerCase() === "completed" ||
        sale.status.toLowerCase() === "approved"
    ).length;

    const pendingOrders = filteredSales.filter(
      (sale) =>
        sale.status.toLowerCase() === "pending"
    ).length;

    const totalCustomers = new Set(
      filteredSales.map((sale) => sale.customer)
    ).size;

    return {
      totalRevenue,
      totalOrders,
      completedOrders,
      pendingOrders,
      totalCustomers,
      averageOrder:
        totalOrders > 0
          ? totalRevenue / totalOrders
          : 0,
    };
  }, [filteredSales]);

  return (
    <section className="space-y-8">

      <ReportFilter
        value={filter}
        onChange={setFilter}
      />

      <SalesRevenueChart
        data={filteredRevenueChart}
      />

      <div className="grid gap-8 lg:grid-cols-2">

        <OrderStatusChart
          data={filteredStatusChart}
        />

        <TopProductChart
          data={filteredTopProducts}
        />

      </div>

      <ReportDashboard
        stats={filteredStats}
        sales={filteredSales}
        comparison={comparison}
      />

    </section>
  );
}