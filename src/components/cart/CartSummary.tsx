"use client";

import Link from "next/link";

interface Props {
  totalItems: number;
  totalPrice: number;
}

export default function CartSummary({
  totalItems,
  totalPrice,
}: Props) {
  const formatPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div
      className="
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      p-6
      sticky
      top-24
      "
    >
      <h2 className="text-2xl font-bold">
        Ringkasan Belanja
      </h2>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-400">
            Total Item
          </span>

          <span className="font-semibold">
            {totalItems}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Total Harga
          </span>

          <span className="text-xl font-bold text-pink-500">
            {formatPrice.format(totalPrice)}
          </span>
        </div>

      </div>

      <Link
        href="/checkout"
        className="
        mt-8
        flex
        justify-center
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
        Checkout
      </Link>

      <Link
        href="/products"
        className="
        mt-4
        flex
        justify-center
        rounded-2xl
        border
        border-pink-700
        px-6
        py-3
        font-semibold
        transition
        hover:bg-pink-700
        "
      >
        Lanjut Belanja
      </Link>
    </div>
  );
}