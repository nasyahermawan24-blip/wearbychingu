"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";
import { getMyOrders } from "@/services/order.service";
import { OrderWithItems } from "@/types/order";

export default function CustomerOrderTable() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] =
    useState(true);

  async function loadOrders() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const data =
        await getMyOrders(user.id);

      setOrders(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const price =
    new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }
    );

  if (loading) {
    return (
      <div className="py-16 text-center">
        Loading...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div
        className="
        rounded-3xl
        border
        border-pink-900/30
        bg-zinc-950
        py-16
        text-center
        text-gray-400
        "
      >
        Kamu belum memiliki pesanan.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {orders.map((order) => (

        <div
          key={order.id}
          className="
          rounded-3xl
          border
          border-pink-900/30
          bg-zinc-950
          p-8
          "
        >

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold">
                Order #{order.id}
              </h2>

              <p className="mt-2 text-gray-400">
                {order.created_at
                  ? new Date(order.created_at).toLocaleDateString("id-ID")
                  : "-"}
              </p>

            </div>

            <span
              className={`
                rounded-full
                px-4
                py-2
                text-sm
                font-semibold

                ${
                  order.status ===
                  "completed"
                    ? "bg-green-500/20 text-green-400"

                    : order.status ===
                      "processing"
                    ? "bg-blue-500/20 text-blue-400"

                    : order.status ===
                      "cancelled"
                    ? "bg-red-500/20 text-red-400"

                    : "bg-yellow-500/20 text-yellow-400"
                }
              `}
            >
              {order.status}
            </span>

          </div>

          <div className="mt-8 space-y-5">

            {order.order_items?.map(
              (item) => (

                <div
                  key={item.id}
                  className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-pink-900/20
                  pb-4
                  "
                >

                  <div>

                    <p className="font-semibold">
                      {item.product_name}
                    </p>

                    <p className="text-sm text-gray-400">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <span className="font-semibold">
                    {price.format(
                      item.subtotal
                    )}
                  </span>

                </div>

              )
            )}

          </div>

          <div
            className="
            mt-8
            flex
            items-center
            justify-between
            border-t
            border-pink-900/30
            pt-6
            "
          >

            <div>

              <p className="text-gray-400">
                Total
              </p>

              <h3 className="text-2xl font-bold text-pink-500">
                {price.format(
                  order.total
                )}
              </h3>

            </div>

            {order.status ===
            "completed" ? (

              <Link
                href="/downloads"
                className="
                rounded-2xl
                bg-gradient-to-r
                from-pink-700
                to-pink-500
                px-6
                py-3
                font-semibold
                transition
                hover:scale-105
                "
              >
                Download Produk
              </Link>

            ) : (

              <button
                disabled
                className="
                cursor-not-allowed
                rounded-2xl
                bg-zinc-800
                px-6
                py-3
                text-gray-500
                "
              >
                Belum Tersedia
              </button>

            )}

          </div>

        </div>

      ))}

    </div>
  );
}
