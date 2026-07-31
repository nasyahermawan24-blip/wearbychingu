"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { StatusChart } from "@/types/chart";

interface Props {
  data: StatusChart[];
}

const COLORS = [
  "#ec4899",
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
];

export default function OrderStatusChart({
  data,
}: Props) {
  return (
    <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6 shadow-xl">

      <h2 className="text-xl font-bold text-white">
        Status Order
      </h2>

      <p className="mt-1 mb-6 text-sm text-gray-400">
        Distribusi status pesanan.
      </p>

      <div className="h-[320px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}