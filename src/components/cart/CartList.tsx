"use client";

import { useEffect, useState } from "react";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

import {
  getCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "@/services/cart.service";

import { CartItem as CartProduct } from "@/types/cart";

export default function CartList() {
  const [cart, setCart] = useState<CartProduct[]>([]);

  function loadCart() {
    setCart(getCart());
  }

  useEffect(() => {
    loadCart();
  }, []);

  function handleIncrease(id: number) {
    increaseQty(id);
    loadCart();
  }

  function handleDecrease(id: number) {
    decreaseQty(id);
    loadCart();
  }

  function handleRemove(id: number) {
    removeFromCart(id);
    loadCart();
  }

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold">
          Keranjang Belanja
        </h1>

        <p className="mt-10 text-gray-400">
          Keranjang masih kosong.
        </p>

      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="mb-10 text-4xl font-bold">
        Keranjang Belanja
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">

        <div className="space-y-6 lg:col-span-2">

          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          ))}

        </div>

        <CartSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
        />

      </div>

    </section>
  );
}