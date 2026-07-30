"use client";

import { useState } from "react";

import {
  uploadDigitalProduct,
} from "@/services/product.service";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function UploadDigitalProduct({
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

    try {
      setLoading(true);

      const url =
        await uploadDigitalProduct(file);

      onChange(url);

      alert(
        "File berhasil diupload."
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

  return (
    <div className="space-y-4">

      <label className="font-semibold">
        File Produk Digital
      </label>

      <input
        type="file"
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
          Mengupload file...
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
            File berhasil diupload
          </p>

          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="
            break-all
            text-green-400
            underline
            "
          >
            Lihat File
          </a>

        </div>

      )}

    </div>
  );
}
