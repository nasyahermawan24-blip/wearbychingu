"use client";

import { useState } from "react";
import Image from "next/image";

import { uploadProductImage } from "@/services/product.service";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function UploadProductImage({
  value,
  onChange,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }

    try {
      setLoading(true);

      const url =
        await uploadProductImage(file);

      onChange(url);

      alert("Gambar berhasil diupload.");

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
    <div className="space-y-4">

      <label className="font-semibold">
        Gambar Produk
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        className="
        block
        w-full
        rounded-xl
        border
        border-pink-900/30
        bg-zinc-900
        p-3
        disabled:opacity-50
        "
      />

      {loading && (

        <p className="text-pink-500">
          Mengupload gambar...
        </p>

      )}

      {value && (

        <div
          className="
          rounded-xl
          border
          border-green-700/30
          bg-green-900/20
          p-4
          "
        >

          <p className="font-semibold">
            Preview Gambar
          </p>

          <Image
            src={value}
            alt="Preview Product"
            width={640}
            height={160}
            className="
            mt-4
            h-40
            w-full
            rounded-xl
            object-cover
            "
          />

        </div>

      )}

    </div>
  );
}
