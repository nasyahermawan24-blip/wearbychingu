"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, PackageX } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { getMyOrders } from "@/services/order.service";
import { OrderWithItems } from "@/types/order";

import OrderCard from "./OrderCard";

export default function OrdersList() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const data = await getMyOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 py-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-pink-900/20 bg-zinc-950/60 p-6 animate-pulse space-y-4"
          >
            <div className="flex justify-between items-center">
              <div className="h-5 w-32 bg-zinc-800 rounded-lg" />
              <div className="h-6 w-24 bg-pink-900/30 rounded-full" />
            </div>
            <div className="space-y-2 py-2">
              <div className="h-4 w-3/4 bg-zinc-900 rounded-md" />
              <div className="h-4 w-1/2 bg-zinc-900 rounded-md" />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-pink-900/10">
              <div className="h-4 w-24 bg-zinc-800 rounded-md" />
              <div className="h-6 w-28 bg-pink-900/40 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-12 text-center shadow-xl">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-4">
          <PackageX size={32} />
        </div>

        <h3 className="text-xl font-bold text-white">
          Belum Ada Pesanan
        </h3>

        <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
          Anda belum pernah melakukan pemesanan produk digital fashion Korea. Jelajahi katalog e-book, outfit guide, dan template eksklusif kami.
        </p>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 mt-6 rounded-2xl bg-gradient-to-r from-pink-700 via-pink-600 to-pink-500 px-6 py-3.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(212,20,90,0.3)] hover:scale-105 transition-all duration-300"
        >
          <ShoppingBag size={16} />
          Mulai Belanja Produk Digital
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}