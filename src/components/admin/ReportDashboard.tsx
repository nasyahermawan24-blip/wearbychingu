"use client";

import {
  DollarSign,
  ShoppingCart,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Download,
} from "lucide-react";

import {
  ReportStats,
  RecentSale,
  RevenueComparison,
} from "@/types/report";

import { exportSalesCSV } from "@/services/report.service";

interface Props {
  stats: ReportStats;
  sales: RecentSale[];
  comparison: RevenueComparison;
}

export default function ReportDashboard({
  stats,
  sales,
  comparison,
}: Props) {

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const isIncrease =
    comparison.percentage >= 0;

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: "text-pink-400",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-cyan-400",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "text-emerald-400",
    },
    {
      title: "Pending",
      value: stats.pendingOrders,
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-violet-400",
    },
    {
      title: "Average Order",
      value: formatCurrency(stats.averageOrder),
      icon: TrendingUp,
      color: "text-orange-400",
    },
  ];

  return (
    <section className="space-y-8">

      {/* Export Button */}

      <div className="flex justify-end">
        <button
         onClick={() => exportSalesCSV("30days")}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-pink-600
            to-fuchsia-600
            px-5
            py-3
            font-semibold
            text-white
            shadow-lg
            transition
            hover:scale-105
            hover:from-pink-500
            hover:to-fuchsia-500
          "
        >

          <Download size={18} />

          Export CSV

        </button>

      </div>

      {/* Revenue Comparison */}

      <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6 shadow-xl">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-400">
              Revenue Comparison
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {formatCurrency(
                comparison.thisMonthRevenue
              )}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Bulan lalu :
              {" "}
              {formatCurrency(
                comparison.lastMonthRevenue
              )}
            </p>

            <div
              className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                isIncrease
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >

              {isIncrease ? "▲" : "▼"}

              <span className="ml-2">
                {Math.abs(
                  comparison.percentage
                ).toFixed(2)}
                %
              </span>

            </div>

          </div>

          <div
            className="
            rounded-2xl
            bg-pink-500/10
            p-4
            "
          >

            <TrendingUp
              size={38}
              className={
                isIncrease
                  ? "text-emerald-400"
                  : "text-red-400"
              }
            />

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6 shadow-xl"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-white">
                    {card.value}
                  </h2>

                </div>

                <div className="rounded-2xl bg-pink-500/10 p-4">

                  <Icon
                    className={card.color}
                    size={30}
                  />

                </div>

              </div>

            </div>

          );

        })}

      </div>

      {/* Recent Sales */}

      <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 overflow-hidden">

        <div className="border-b border-pink-900/30 p-6">

          <h2 className="text-xl font-bold text-white">
            Recent Sales
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Latest customer transactions.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b border-pink-900/30">

                <th className="p-4 text-left text-gray-400">
                  Order
                </th>

                <th className="p-4 text-left text-gray-400">
                  Customer
                </th>

                <th className="p-4 text-left text-gray-400">
                  Product
                </th>

                <th className="p-4 text-left text-gray-400">
                  Payment
                </th>

                <th className="p-4 text-left text-gray-400">
                  Total
                </th>

                <th className="p-4 text-left text-gray-400">
                  Status
                </th>

                <th className="p-4 text-left text-gray-400">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {sales.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="p-8 text-center text-gray-500"
                  >

                    No sales data.

                  </td>

                </tr>

              ) : (

                sales.map((sale) => (

                  <tr
                    key={sale.id}
                    className="border-b border-pink-900/20 hover:bg-pink-950/10"
                  >

                    <td className="p-4 font-semibold text-white">
                      #{sale.id}
                    </td>

                    <td className="p-4">
                      {sale.customer}
                    </td>

                    <td className="p-4">
                      {sale.product}
                    </td>

                    <td className="p-4">
                      {sale.payment}
                    </td>

                    <td className="p-4 text-pink-400 font-bold">
                      {formatCurrency(sale.total)}
                    </td>

                    <td className="p-4">

                      <span className="rounded-full bg-pink-600 px-3 py-1 text-xs">

                        {sale.status}

                      </span>

                    </td>

                    <td className="p-4">

                      {new Date(
                        sale.created_at
                      ).toLocaleDateString("id-ID")}

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  );
}