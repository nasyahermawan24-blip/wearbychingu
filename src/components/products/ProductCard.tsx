"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const formatPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      transition-all
      duration-300
      hover:-translate-y-2
      hover:border-pink-500
      hover:shadow-[0_0_35px_rgba(212,20,90,0.35)]
    "
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),_transparent_55%)]" />
      {/* IMAGE */}

      <Link href={`/product/${product.id}`}>
        <div className="relative h-80 overflow-hidden">
          <Image
  src={
    product.image_url ||
    "https://placehold.co/600x800/png"
  }
            alt={product.name}
            fill
            className="
            object-cover
            transition-all
            duration-500
            group-hover:scale-110
            "
          />
        </div>
      </Link>

      {/* CONTENT */}

      <div className="p-5">

        <p className="text-sm text-pink-400">
          {product.category ?? "Premium Sweater"}
        </p>

        <h2
          className="
          mt-2
          text-xl
          font-bold
          line-clamp-2
        "
        >
          {product.name}
        </h2>

        <p
          className="
          mt-3
          text-sm
          text-gray-400
          line-clamp-3
        "
        >
         {product.description ??
  "Premium Sweater WearByChingu"}
        </p>

        <div
          className="
          mt-6
          flex
          items-center
          justify-between
        "
        >
          <span
            className="
            text-2xl
            font-bold
            text-pink-500
          "
          >
            {formatPrice.format(product.price)}
          </span>

          <Link
            href={`/product/${product.id}`}
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-pink-700
            to-pink-500
            px-4
            py-2
            font-semibold
            transition
            hover:scale-105
          "
          >
            <ShoppingBag size={18} />
            Detail
          </Link>
        </div>

      </div>

    </div>
  );
}