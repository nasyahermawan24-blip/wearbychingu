import Link from "next/link";
import {
  CheckCircle2,
  Package,
} from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">

      <div
        className="
        rounded-3xl
        border
        border-green-600/30
        bg-zinc-950
        p-12
        text-center
        "
      >
        <CheckCircle2
          className="
          mx-auto
          h-24
          w-24
          text-green-500
          "
        />

        <h1 className="mt-8 text-5xl font-bold">
          Pembayaran Berhasil Dikirim
        </h1>

        <p className="mt-6 text-lg text-gray-400">
          Bukti pembayaran berhasil diupload.
          Admin akan melakukan verifikasi
          terlebih dahulu sebelum pesanan
          diproses.
        </p>

        <div
          className="
          mt-10
          rounded-2xl
          bg-zinc-900
          p-6
          "
        >
          <Package
            className="
            mx-auto
            mb-4
            h-12
            w-12
            text-pink-500
            "
          />

          <p className="text-gray-300">
            Estimasi verifikasi pembayaran
          </p>

          <h2 className="mt-3 text-3xl font-bold text-pink-500">
            1 × 24 Jam
          </h2>
        </div>

        <div
          className="
          mt-12
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:justify-center
          "
        >
          <Link
            href="/dashboard/customer"
            className="
            rounded-2xl
            bg-gradient-to-r
            from-pink-700
            to-pink-500
            px-8
            py-4
            font-semibold
            transition
            hover:scale-105
            "
          >
            Dashboard Saya
          </Link>

          <Link
            href="/products"
            className="
            rounded-2xl
            border
            border-pink-900/40
            px-8
            py-4
            font-semibold
            hover:bg-pink-900/20
            "
          >
            Belanja Lagi
          </Link>
        </div>

      </div>

    </section>
  );
}