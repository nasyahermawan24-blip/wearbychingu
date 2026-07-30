"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { CartItem as CartProduct } from "@/types/cart";

interface Props {
  item: CartProduct;

  onIncrease: (id: number) => void;

  onDecrease: (id: number) => void;

  onRemove: (id: number) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  const formatPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <div
      className="
      flex
      flex-col
      md:flex-row
      gap-6
      items-center
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      p-5
      "
    >
      {/* IMAGE */}

      <div className="relative h-36 w-28 overflow-hidden rounded-2xl">
        <Image
          src={
            item.image_url ||
            "https://placehold.co/600x800/png"
          }
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* CONTENT */}

      <div className="flex-1 w-full">

        <p className="text-sm text-pink-400">
          {item.category}
        </p>

        <h2 className="mt-2 text-xl font-bold">
          {item.name}
        </h2>

        <p className="mt-3 text-gray-400">
          {formatPrice.format(item.price)}
        </p>

        {/* QTY */}

        <div className="mt-6 flex items-center gap-3">

          <button
            onClick={() => onDecrease(item.id)}
            className="
            rounded-xl
            border
            border-pink-700
            p-2
            hover:bg-pink-700
            transition
            "
          >
            <Minus size={18} />
          </button>

          <span
            className="
            w-10
            text-center
            font-semibold
            "
          >
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item.id)}
            className="
            rounded-xl
            border
            border-pink-700
            p-2
            hover:bg-pink-700
            transition
            "
          >
            <Plus size={18} />
          </button>

        </div>
      </div>

      {/* SUBTOTAL */}

      <div
        className="
        flex
        flex-col
        items-end
        gap-5
        "
      >
        <h3
          className="
          text-xl
          font-bold
          text-pink-500
          "
        >
          {formatPrice.format(
            item.price * item.quantity
          )}
        </h3>

        <button
          onClick={() => onRemove(item.id)}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-red-600
          px-4
          py-2
          text-red-400
          hover:bg-red-600
          hover:text-white
          transition
          "
        >
          <Trash2 size={18} />

          Hapus
        </button>
      </div>
    </div>
  );
}