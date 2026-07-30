"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/order.service";
import { OrderWithItems } from "@/types/order";

import OrderStats from "./OrderStats";
import OrderSearch from "./OrderSearch";
import OrderFilter from "./OrderFilter";

export default function OrderTable() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);

  // ============================
  // TAMBAHAN
  // ============================

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  // ============================

  async function loadOrders() {
    try {
      const data = await getAllOrders();
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

  async function changeStatus(
    id: number,
    status: string
  ) {
    try {
      await updateOrderStatus(id, status);
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status.");
    }
  }

  const price = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  // ============================
  // TAMBAHAN FILTER
  // ============================

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        String(order.id)
          .toLowerCase()
          .includes(keyword) ||
        (order.profiles?.full_name ?? "")
          .toLowerCase()
          .includes(keyword);

      const matchStatus =
        filter === "all" ||
        order.status === filter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, filter]);

  // ============================

  if (loading) {
    return (
      <div className="py-10 text-center">
        Loading...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="py-10 text-center text-gray-400">
        Belum ada pesanan.
      </div>
    );
  }

  return (
    <>

      {/* ============================
          TAMBAHAN
      ============================ */}

      <OrderStats orders={orders} />

      <div
        className="
        mt-8
        mb-8
        flex
        flex-col
        gap-4
        lg:flex-row
      "
      >
        <div className="flex-1">

          <OrderSearch
            value={search}
            onChange={setSearch}
          />

        </div>

        <OrderFilter
          value={filter}
          onChange={setFilter}
        />

      </div>

      {/* ============================ */}

      <div
        className="
        overflow-x-auto
        rounded-3xl
        border
        border-pink-900/30
        bg-zinc-950
      "
      >
        <table className="min-w-full">

          <thead>

            <tr className="border-b border-pink-900/30">

              <th className="px-5 py-4 text-left">
                Order
              </th>

              <th className="px-5 py-4 text-left">
                Customer
              </th>

              <th className="px-5 py-4 text-left">
                Total
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-left">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className="
                border-b
                border-pink-900/20
              "
              >

                <td className="px-5 py-4">
                  #{String(order.id).slice(0, 8)}
                </td>

                <td className="px-5 py-4">
                  {order.profiles?.full_name ?? "-"}
                </td>

                <td className="px-5 py-4">
                  {price.format(order.total)}
                </td>

                <td className="px-5 py-4">
                  {order.status}
                </td>

                <td className="px-5 py-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      changeStatus(
                        order.id!,
                        e.target.value
                      )
                    }
                    className="
                    rounded-lg
                    border
                    border-pink-800
                    bg-zinc-900
                    px-3
                    py-2
                  "
                  >

                    <option value="pending">
                      Pending
                    </option>

                    <option value="processing">
                      Processing
                    </option>

                    <option value="completed">
                      Completed
                    </option>

                    <option value="cancelled">
                      Cancelled
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>
  );
}
