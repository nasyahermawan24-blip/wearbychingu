"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ProductChart } from "@/types/chart";

interface Props {
  data: ProductChart[];
}

export default function TopProductChart({
  data,
}: Props) {

  return (
    <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6 shadow-xl">

      <h2 className="text-xl font-bold text-white">
        Top Product
      </h2>

      <p className="mt-1 mb-6 text-sm text-gray-400">
        Produk paling banyak terjual.
      </p>

      <div className="h-[320px]">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid stroke="#3f3f46" />

            <XAxis
              dataKey="name"
              stroke="#a1a1aa"
            />

            <YAxis stroke="#a1a1aa" />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#ec4899"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}