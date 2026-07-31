"use client";

import Link from "next/link";
import { Download, CreditCard, Clock, CheckCircle2, AlertCircle, XCircle, ChevronRight, FileText } from "lucide-react";
import { OrderWithItems } from "@/types/order";

interface Props {
  order: OrderWithItems;
}

export default function OrderCard({ order }: Props) {
  const formatPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          label: "Selesai (Siap Unduh)",
          className: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
          icon: CheckCircle2,
        };
      case "processing":
        return {
          label: "Sedang Diproses Admin",
          className: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
          icon: Clock,
        };
      case "cancelled":
        return {
          label: "Dibatalkan",
          className: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
          icon: XCircle,
        };
      default:
        return {
          label: "Menunggu Pembayaran",
          className: "bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse-subtle",
          icon: AlertCircle,
        };
    }
  };

  const statusInfo = getStatusBadge(order.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div
      className="
      group
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950/80
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:border-pink-500/40
      hover:shadow-[0_8px_30px_rgba(212,20,90,0.15)]
      "
    >
      {/* Top Bar: Order ID & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-pink-900/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white tracking-wide">
              Order #{order.id}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {order.created_at
                ? new Date(order.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Tanggal tidak tersedia"}
            </p>
          </div>
        </div>

        <span
          className={`
          inline-flex
          items-center
          gap-1.5
          rounded-full
          px-3.5
          py-1.5
          text-xs
          font-semibold
          uppercase
          tracking-wider
          ${statusInfo.className}
          `}
        >
          <StatusIcon size={14} />
          {statusInfo.label}
        </span>
      </div>

      {/* Order Items List */}
      <div className="my-5 space-y-3">
        {order.order_items?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900/40 border border-pink-900/10"
          >
            <div>
              <p className="text-sm font-bold text-white">
                {item.product_name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Jumlah: {item.quantity} × {formatPrice.format(item.price)}
              </p>
            </div>
            <p className="text-sm font-bold text-pink-400">
              {formatPrice.format(item.subtotal)}
            </p>
          </div>
        ))}
      </div>

      {/* Footer: Total & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-pink-900/20">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
            Total Pembayaran
          </span>
          <p className="text-2xl font-black text-pink-500 mt-0.5">
            {formatPrice.format(order.total)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {order.status === "completed" && (
            <Link
              href="/downloads"
              className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-emerald-600
              to-emerald-500
              px-5
              py-2.5
              text-xs
              font-bold
              text-white
              shadow-[0_0_20px_rgba(16,185,129,0.3)]
              hover:scale-105
              transition-all
              duration-300
              "
            >
              <Download size={16} />
              Unduh Produk Digital
            </Link>
          )}

          {order.status === "pending" && (
            <Link
              href={`/payment?order=${order.id}`}
              className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-pink-700
              via-pink-600
              to-pink-500
              px-5
              py-2.5
              text-xs
              font-bold
              text-white
              shadow-[0_0_20px_rgba(212,20,90,0.3)]
              hover:scale-105
              transition-all
              duration-300
              "
            >
              <CreditCard size={16} />
              Upload Bukti Bayar
            </Link>
          )}

          <Link
            href="/downloads"
            className="
            inline-flex
            items-center
            gap-1
            rounded-2xl
            border
            border-pink-900/40
            bg-zinc-900/80
            px-4
            py-2.5
            text-xs
            font-semibold
            text-gray-300
            hover:text-pink-300
            hover:border-pink-500/40
            transition-all
            "
          >
            Detail <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}