import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24 text-center">

      <CircleCheckBig
        size={90}
        className="mx-auto text-green-500"
      />

      <h1 className="mt-8 text-5xl font-bold">
        Pesanan Berhasil
      </h1>

      <p className="mt-6 text-gray-400">
        Terima kasih telah berbelanja di WearByChingu.
        Pesanan Anda telah berhasil dibuat dan sedang menunggu konfirmasi admin.
      </p>

      <div className="mt-12 flex justify-center gap-4">

        <Link
          href="/dashboard/customer"
          className="
          rounded-2xl
          bg-gradient-to-r
          from-pink-700
          to-pink-500
          px-8
          py-3
          font-semibold
          "
        >
          Dashboard Saya
        </Link>

        <Link
          href="/products"
          className="
          rounded-2xl
          border
          border-pink-700
          px-8
          py-3
          font-semibold
          "
        >
          Belanja Lagi
        </Link>

      </div>

    </section>
  );
}