"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  uploadPaymentProof,
  createPayment,
} from "@/services/payment.service";
import { OrderWithItems } from "@/types/order";

interface Props {
  order: OrderWithItems;
}

export default function UploadProof({
  order,
}: Props) {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] =
    useState("transfer");

  const [file, setFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {
    if (!file) {
      alert(
        "Silakan pilih bukti pembayaran."
      );
      return;
    }

    try {
      setLoading(true);

      // Upload ke Storage
      const filePath =
        await uploadPaymentProof(file);

      // Simpan ke tabel payments
    await createPayment({
    order_id: Number(order.id),
    payment_method: paymentMethod,
    proof_url: filePath,
});

      alert(
        "Bukti pembayaran berhasil dikirim."
      );

      router.push("/payment-success");
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

  return (
    <div
      className="
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      p-8
      "
    >
      <h2 className="text-2xl font-bold">
        Upload Bukti Pembayaran
      </h2>

      <p className="mt-2 text-gray-400">
        Upload bukti pembayaran untuk
        pesanan berikut.
      </p>

      <div className="mt-8 rounded-2xl bg-zinc-900 p-5">

        <p className="text-sm text-gray-400">
          Order ID
        </p>

        <p className="mt-1 break-all font-semibold">
          {order.id}
        </p>

        <div className="mt-5 flex justify-between">

          <span>Total</span>

          <span className="font-bold text-pink-500">
            Rp{" "}
            {Number(order.total).toLocaleString(
              "id-ID"
            )}
          </span>

        </div>

      </div>

      <div className="mt-8">

        <label className="font-semibold">
          Metode Pembayaran
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
          className="
          mt-3
          w-full
          rounded-xl
          border
          border-pink-900/30
          bg-zinc-900
          px-4
          py-3
          "
        >
          <option value="transfer">
            Transfer Bank
          </option>

          <option value="qris">
            QRIS
          </option>

          <option value="ewallet">
            E-Wallet
          </option>

        </select>

      </div>

      <div className="mt-8">

        <label className="font-semibold">
          Bukti Pembayaran
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selected =
              e.target.files?.[0];

            if (!selected) return;

            if (selected.size > 5 * 1024 * 1024) {
            alert("Ukuran gambar maksimal 5 MB.");
            return;
        }

        const allowed = [
        "image/jpeg",
        "image/png",
        "image/webp",
        ];

    if (!allowed.includes(selected.type)) {
    alert(
    "Format harus JPG, PNG, atau WEBP."
    );
    return;
    }

            setFile(selected);

            setPreview(
              URL.createObjectURL(selected)
            );
          }}
          className="
          mt-3
          block
          w-full
          rounded-xl
          border
          border-pink-900/30
          bg-zinc-900
          p-3
          "
        />

      </div>

      {preview && (

        <div className="mt-6">

          <p className="mb-3 font-semibold">
            Preview
          </p>

          {/* Preview berasal dari URL.createObjectURL(), sehingga harus memakai elemen img native. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview"
            className="
            h-72
            w-full
            rounded-2xl
            object-cover
            border
            border-pink-900/30
            "
          />

        </div>

      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
        mt-8
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-pink-700
        to-pink-500
        py-4
        font-semibold
        transition
        hover:scale-105
        disabled:opacity-50
        "
      >
        {loading
          ? "Mengupload..."
          : "Kirim Bukti Pembayaran"}
      </button>

    </div>
  );
}
