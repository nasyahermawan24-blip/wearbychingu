import Link from "next/link";
import {
  Package,
  ShoppingCart,
  CreditCard,
  Users,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { getDashboardData } from "@/services/dashboard.service";

export default async function AdminDashboard() {
  const stats = await getDashboardData();

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "approved":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "rejected":
      case "cancelled":
        return "bg-rose-500/20 text-rose-400 border border-rose-500/30";
      default:
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    }
  };

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section className="space-y-10 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-pink-900/40 bg-gradient-to-r from-zinc-950 via-zinc-900 to-pink-950/40 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-500/30 px-3.5 py-1 text-xs font-semibold text-pink-400 mb-3">
              <Sparkles size={14} />
              ADMIN DASHBOARD OVERVIEW
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Selamat Datang di{" "}
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                WearByChingu
              </span>
            </h1>
            <p className="mt-2 text-gray-400 max-w-xl text-sm leading-relaxed">
              Pantau performa penjualan produk digital, verifikasi transaksi pembayaran customer, dan kelola katalog fashion dalam satu sistem terpusat.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard/admin/products"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-700 via-pink-600 to-pink-500 px-5 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(212,20,90,0.3)] hover:scale-105 transition-all duration-300"
            >
              + Tambah Produk
            </Link>
            <Link
              href="/dashboard/admin/payments"
              className="inline-flex items-center gap-2 rounded-2xl border border-pink-900/40 bg-zinc-900/80 px-5 py-3 text-xs font-semibold text-pink-300 hover:bg-pink-950/30 hover:border-pink-500/40 transition-all duration-300"
            >
              Cek Pembayaran
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Produk */}
        <div className="group rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-[0_0_35px_rgba(212,20,90,0.25)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total Produk
              </p>
              <h2 className="mt-3 text-4xl font-extrabold text-white tracking-tight">
                {stats.products}
              </h2>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-pink-400 font-medium">
                <TrendingUp size={14} />
                <span>Katalog Aktif</span>
              </div>
            </div>
            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-3.5 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
              <Package size={26} />
            </div>
          </div>
        </div>

        {/* Total Order */}
        <div className="group rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-[0_0_35px_rgba(212,20,90,0.25)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total Order
              </p>
              <h2 className="mt-3 text-4xl font-extrabold text-white tracking-tight">
                {stats.orders}
              </h2>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-pink-400 font-medium">
                <ArrowUpRight size={14} />
                <span>Pesanan Masuk</span>
              </div>
            </div>
            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-3.5 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
              <ShoppingCart size={26} />
            </div>
          </div>
        </div>

        {/* Total Pembayaran */}
        <div className="group rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-[0_0_35px_rgba(212,20,90,0.25)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total Pembayaran
              </p>
              <h2 className="mt-3 text-4xl font-extrabold text-white tracking-tight">
                {stats.payments}
              </h2>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-pink-400 font-medium">
                <Clock size={14} />
                <span>Bukti Verifikasi</span>
              </div>
            </div>
            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-3.5 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
              <CreditCard size={26} />
            </div>
          </div>
        </div>

        {/* Total Customer */}
        <div className="group rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/50 hover:shadow-[0_0_35px_rgba(212,20,90,0.25)]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Total Customer
              </p>
              <h2 className="mt-3 text-4xl font-extrabold text-white tracking-tight">
                {stats.customers}
              </h2>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-pink-400 font-medium">
                <Users size={14} />
                <span>Pengguna Terdaftar</span>
              </div>
            </div>
            <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-3.5 text-pink-400 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
              <Users size={26} />
            </div>
          </div>
        </div>
      </div>

      {/* Latest Activity Sections */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* ORDER TERBARU */}
        <div className="rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-900/20">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShoppingCart size={18} className="text-pink-500" />
                Order Terbaru
              </h2>
              <Link
                href="/dashboard/admin/orders"
                className="text-xs font-medium text-pink-400 hover:text-pink-300 flex items-center gap-1 transition"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>

            <div className="space-y-3.5">
              {stats.latestOrders.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  Belum ada pesanan masuk.
                </div>
              ) : (
                stats.latestOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/50 border border-pink-900/20 hover:border-pink-500/30 transition-all"
                  >
                    <div>
                      <p className="font-bold text-sm text-white">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {order.profiles?.full_name ?? "Customer"}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${getStatusBadge(
                        order.status ?? "pending"
                      )}`}
                    >
                      {order.status ?? "pending"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* PEMBAYARAN TERBARU */}
        <div className="rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-900/20">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard size={18} className="text-pink-500" />
                Pembayaran Terbaru
              </h2>
              <Link
                href="/dashboard/admin/payments"
                className="text-xs font-medium text-pink-400 hover:text-pink-300 flex items-center gap-1 transition"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>

            <div className="space-y-3.5">
              {stats.latestPayments.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  Belum ada pembayaran masuk.
                </div>
              ) : (
                stats.latestPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/50 border border-pink-900/20 hover:border-pink-500/30 transition-all"
                  >
                    <div>
                      <p className="font-bold text-sm text-white">
                        Payment #{payment.id}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 uppercase font-medium">
                        Order #{payment.order_id} • {payment.payment_method}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${getStatusBadge(
                        payment.status ?? "pending"
                      )}`}
                    >
                      {payment.status ?? "pending"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* PRODUK TERBARU */}
        <div className="rounded-3xl border border-pink-900/30 bg-zinc-950/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-900/20">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Package size={18} className="text-pink-500" />
                Produk Terbaru
              </h2>
              <Link
                href="/dashboard/admin/products"
                className="text-xs font-medium text-pink-400 hover:text-pink-300 flex items-center gap-1 transition"
              >
                Lihat Semua <ChevronRight size={14} />
              </Link>
            </div>

            <div className="space-y-3.5">
              {stats.latestProducts.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500">
                  Belum ada produk terdaftar.
                </div>
              ) : (
                stats.latestProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900/50 border border-pink-900/20 hover:border-pink-500/30 transition-all"
                  >
                    <div className="flex-1 pr-3">
                      <p className="font-bold text-sm text-white truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-pink-400 font-semibold mt-0.5">
                        {formatCurrency(Number(product.price || 0))}
                      </p>
                    </div>
                    <span className="rounded-lg bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-gray-300 border border-pink-900/20 shrink-0">
                      {product.category || "Digital"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}