import OrdersList from "@/components/dashboard/customer/OrdersList";
import { ShoppingBag, Sparkles, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomerDashboardPage() {
  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-pink-900/40 bg-gradient-to-r from-zinc-950 via-zinc-900 to-pink-950/40 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 border border-pink-500/30 px-3.5 py-1 text-xs font-semibold text-pink-400 mb-3">
              <Sparkles size={14} />
              CUSTOMER PORTAL
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Dashboard{" "}
              <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
                Pelanggan
              </span>
            </h1>
            <p className="mt-2 text-gray-400 max-w-xl text-sm leading-relaxed">
              Pantau riwayat transaksi, status verifikasi pesanan, dan unduh file produk digital fashion Korea favorit Anda.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-700 via-pink-600 to-pink-500 px-5 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(212,20,90,0.3)] hover:scale-105 transition-all duration-300"
            >
              <Download size={15} />
              Area Download
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-2xl border border-pink-900/40 bg-zinc-900/80 px-5 py-3 text-xs font-semibold text-pink-300 hover:bg-pink-950/30 hover:border-pink-500/40 transition-all duration-300"
            >
              <ShoppingBag size={15} />
              Belanja Lagi
            </Link>
          </div>
        </div>
      </div>

      {/* Orders List Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag size={20} className="text-pink-500" />
            Riwayat Pesanan Anda
          </h2>
          <Link
            href="/products"
            className="text-xs font-medium text-pink-400 hover:text-pink-300 flex items-center gap-1 transition"
          >
            Jelajahi Produk <ArrowRight size={14} />
          </Link>
        </div>

        <OrdersList />
      </div>
    </section>
  );
}