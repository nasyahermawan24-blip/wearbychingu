"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { DownloadProduct } from "@/types/product";

interface DownloadOrder {
  order_items: {
    quantity: number;
    products: DownloadProduct | DownloadProduct[] | null;
  }[];
}

export default function DownloadTable() {
  const [products, setProducts] =
    useState<DownloadProduct[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function loadDownloads() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      /*
        Ambil semua order milik customer
        yang sudah completed
      */

      const { data: orders } =
        await supabase
          .from("orders")
          .select(`
            id,
            order_items(
              quantity,
              products(
                id,
                name,
                file_url
              )
            )
          `)
          .eq("user_id", user.id)
          .eq("status", "completed");

      if (!orders) return;

      const result: DownloadProduct[] = [];

      (orders as unknown as DownloadOrder[]).forEach((order) => {
        order.order_items.forEach(
          (item) => {
            if (item.products) {
              if (Array.isArray(item.products)) {
                result.push(...item.products);
              } else {
                result.push(item.products);
              }
            }
          }
        );
      });

      setProducts(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDownloads();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center">
        Loading...
      </div>
    );
  }

  if (products.length === 0) {
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
        Belum ada produk yang dapat diunduh.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {products.map((product) => (

        <div
          key={product.id}
          className="
          rounded-3xl
          border
          border-pink-900/30
          bg-zinc-950
          p-6
          flex
          items-center
          justify-between
          "
        >

          <div>

            <h2 className="text-xl font-bold">
              {product.name}
            </h2>

            <p className="text-gray-400 mt-2">
              Produk digital siap diunduh.
            </p>

          </div>

          <a
            href={product.file_url}
            target="_blank"
            rel="noreferrer"
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
            Download
          </a>

        </div>

      ))}

    </div>
  );
}
