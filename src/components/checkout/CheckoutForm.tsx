"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  getCart,
  clearCart,
} from "@/services/cart.service";

import {
  createOrder,
} from "@/services/order.service";

import { CartItem } from "@/types/cart";
import { OrderItem } from "@/types/order";

export default function CheckoutForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [receiverName, setReceiverName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  async function handleCheckout(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Keranjang masih kosong.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error(
          "Silakan login terlebih dahulu."
        );
      }

      const items: OrderItem[] =
        cart.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal:
            item.price * item.quantity,
        }));

      const order =
        await createOrder(
          {
            user_id: user.id,
            receiver_name:
              receiverName,
            phone,
            address,
            total,
          },
          items
        );

      clearCart();

      router.push(
        `/payment?order=${order.id}`
      );
    } catch (error: unknown) {
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  const formatPrice =
    new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }
    );

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-10 mt-10 lg:grid-cols-2">

        {/* FORM */}

        <form
          onSubmit={handleCheckout}
          className="space-y-5"
        >
          <input
            required
            placeholder="Nama Penerima"
            value={receiverName}
            onChange={(e) =>
              setReceiverName(
                e.target.value
              )
            }
            className="input-auth"
          />

          <input
            required
            placeholder="Nomor HP"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="input-auth"
          />

          <textarea
            required
            rows={5}
            placeholder="Alamat Lengkap"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            className="input-auth resize-none"
          />

          <button
            disabled={loading}
            className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-pink-700
            to-pink-500
            py-4
            font-semibold
            transition
            hover:scale-105
            disabled:opacity-60
            disabled:hover:scale-100
            "
          >
            {loading
              ? "Memproses..."
              : "Buat Pesanan"}
          </button>
        </form>

        {/* RINGKASAN */}

        <div
          className="
          rounded-3xl
          border
          border-pink-900/30
          bg-zinc-950
          p-6
          "
        >
          <h2 className="text-2xl font-bold">
            Ringkasan Pesanan
          </h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <div>
                  <p>{item.name}</p>

                  <span className="text-sm text-gray-400">
                    x{item.quantity}
                  </span>
                </div>

                <span>
                  {formatPrice.format(
                    item.price *
                      item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>

          <div
            className="
            mt-8
            flex
            justify-between
            border-t
            border-pink-900/30
            pt-6
            text-xl
            font-bold
            "
          >
            <span>Total</span>

            <span className="text-pink-500">
              {formatPrice.format(
                total
              )}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
