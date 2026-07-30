"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

import {
  getPayments,
  verifyPayment,
} from "@/services/payment.service";

import { supabase } from "@/lib/supabase";
import { PaymentWithOrder } from "@/types/payment";

export default function PaymentTable() {
  const [payments, setPayments] =
    useState<PaymentWithOrder[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [previewImage, setPreviewImage] =
    useState<string | null>(null);

  async function loadPayments() {
    try {
      const data =
        await getPayments();

      setPayments(data ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function changeStatus(
    paymentId: number,
    orderId: number,
    status: string
  ) {
    try {
      await verifyPayment(
        paymentId,
        status
      );

      await supabase
        .from("orders")
        .update({
          status:
            status === "approved"
              ? "processing"
              : "cancelled",
          updated_at:
            new Date(),
        })
        .eq("id", orderId);

      await loadPayments();

      alert(
        "Status pembayaran berhasil diperbarui."
      );
    } catch (error) {
      console.error(error);

      alert(
        "Terjadi kesalahan."
      );
    }
  }

  const price =
    new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }
    );

  if (loading) {
    return (
      <div className="py-16 text-center">
        Loading...
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 py-16 text-center text-gray-400">
        Belum ada pembayaran.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-3xl border border-pink-900/30 bg-zinc-950">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-pink-900/30">

              <th className="px-5 py-4 text-left">
                Order
              </th>

              <th className="px-5 py-4 text-left">
                Customer
              </th>

              <th className="px-5 py-4 text-left">
                Metode
              </th>

              <th className="px-5 py-4 text-left">
                Total
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Bukti
              </th>

              <th className="px-5 py-4 text-center">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr
                key={payment.id}
                className="border-b border-pink-900/20"
              >

                <td className="px-5 py-4">
                  #{payment.order_id}
                </td>

                <td className="px-5 py-4">

                  <p className="font-semibold">
                    {payment.orders
                      ?.receiver_name ??
                      payment.orders
                        ?.profiles
                        ?.full_name ??
                      "-"}
                  </p>

                  <p className="text-sm text-gray-400">
                    {payment.orders
                      ?.phone ??
                      payment.orders
                        ?.profiles
                        ?.phone ??
                      "-"}
                  </p>

                </td>

                <td className="px-5 py-4">
                  {payment.payment_method}
                </td>

                <td className="px-5 py-4">
                  {price.format(
                    payment.orders
                      ?.total ?? 0
                  )}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-semibold

                    ${
                      payment.status ===
                      "approved"
                        ? "bg-green-500/20 text-green-400"

                        : payment.status ===
                          "rejected"
                        ? "bg-red-500/20 text-red-400"

                        : "bg-yellow-500/20 text-yellow-400"
                    }
                  `}
                  >
                    {payment.status}
                  </span>

                </td>

                <td className="px-5 py-4 text-center">

                  <button
                    onClick={() =>
                      setPreviewImage(
                        payment.proof_url
                      )
                    }
                    className="text-pink-400 hover:text-pink-300"
                  >
                    <Eye />
                  </button>

                </td>

                <td className="px-5 py-4">

                  <div className="flex gap-3 justify-center">

                    <button
                      onClick={() =>
                        changeStatus(
                          payment.id,
                          payment.order_id,
                          "approved"
                        )
                      }
                      className="rounded-xl bg-green-600 p-2 hover:bg-green-500"
                    >
                      <CheckCircle
                        size={18}
                      />
                    </button>

                    <button
                      onClick={() =>
                        changeStatus(
                          payment.id,
                          payment.order_id,
                          "rejected"
                        )
                      }
                      className="rounded-xl bg-red-600 p-2 hover:bg-red-500"
                    >
                      <XCircle
                        size={18}
                      />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {previewImage && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8"
          onClick={() =>
            setPreviewImage(null)
          }
        >

          <div
            className="relative h-[80vh] w-full max-w-3xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <Image
              src={previewImage}
              alt="Bukti Pembayaran"
              fill
              className="object-contain rounded-2xl"
            />

          </div>

        </div>

      )}

    </>
  );
}
