"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { RevenueChart } from "@/types/chart";

interface Props {
  data: RevenueChart[];
}

export default function SalesRevenueChart({
  data,
}: Props) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6 shadow-xl">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          Revenue Bulanan
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Total pendapatan berdasarkan transaksi setiap bulan.
        </p>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#3f3f46"
            />

            <XAxis
              dataKey="month"
              stroke="#a1a1aa"
            />

            <YAxis
              stroke="#a1a1aa"
              tickFormatter={(value) =>
                `${Math.round(value / 1000000)} Jt`
              }
            />

            <Tooltip
              formatter={(value: number) =>
                formatCurrency(value)
              }
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #ec4899",
                borderRadius: 12,
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ec4899"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#ec4899",
              }}
              activeDot={{
                r: 8,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}