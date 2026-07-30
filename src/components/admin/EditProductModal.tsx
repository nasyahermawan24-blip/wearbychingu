"use client";

import { useState } from "react";
import Image from "next/image";

import { Product } from "@/types/product";
import { updateProduct } from "@/services/product.service";

import UploadProductImage from "./UploadProductImage";
import UploadDigitalProduct from "./UploadDigitalProduct";

interface Props {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditProductModal({
  product,
  onClose,
  onSuccess,
}: Props) {
  const [name, setName] =
    useState(product.name);

  const [description, setDescription] =
    useState(product.description);

  const [price, setPrice] =
    useState<number>(product.price);

  const [stock, setStock] =
    useState<number>(product.stock);

  const [category, setCategory] =
    useState(product.category);

  const [imageUrl, setImageUrl] =
    useState(product.image_url);

  const [fileUrl, setFileUrl] =
    useState(product.file_url ?? "");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama produk wajib diisi.");
      return;
    }

    if (!description.trim()) {
      alert("Deskripsi wajib diisi.");
      return;
    }

    if (!category.trim()) {
      alert("Kategori wajib diisi.");
      return;
    }

    if (!imageUrl) {
      alert("Silakan upload gambar produk.");
      return;
    }

    if (!fileUrl) {
      alert("Silakan upload file digital.");
      return;
    }

    try {
      setLoading(true);

      await updateProduct(
        product.id,
        {
          name,
          description,
          category,
          price,
          stock,
          image_url: imageUrl,
          file_url: fileUrl,
        }
      );

      alert(
        "Produk berhasil diperbarui."
      );

      onSuccess();
      onClose();

    } catch (error) {

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Terjadi kesalahan.");
      }

    } finally {

      setLoading(false);

    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      p-8
      space-y-6
      "
    >

      <h2 className="text-2xl font-bold">
        Edit Produk
      </h2>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="input-auth"
        placeholder="Nama Produk"
      />

      <textarea
        rows={5}
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="input-auth resize-none"
        placeholder="Deskripsi Produk"
      />

      <input
        type="number"
        value={price}
        onChange={(e) =>
          setPrice(Number(e.target.value))
        }
        className="input-auth"
        placeholder="Harga"
      />

      <input
        type="number"
        value={stock}
        onChange={(e) =>
          setStock(Number(e.target.value))
        }
        className="input-auth"
        placeholder="Stock"
      />

      <input
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        className="input-auth"
        placeholder="Kategori"
      />

      <UploadProductImage
        value={imageUrl}
        onChange={setImageUrl}
      />

      <UploadDigitalProduct
        value={fileUrl}
        onChange={setFileUrl}
      />

      {(imageUrl || fileUrl) && (

        <div
          className="
          rounded-2xl
          border
          border-pink-900/30
          bg-zinc-900
          p-5
          space-y-4
          "
        >

          {imageUrl && (

            <div>

              <p className="mb-2 text-sm text-gray-400">
                Preview Gambar
              </p>

              <Image
                src={imageUrl}
                alt="Preview"
                width={640}
                height={160}
                className="
                h-40
                rounded-xl
                object-cover
                "
              />

            </div>

          )}

          {fileUrl && (

            <div>

              <p className="mb-2 text-sm text-gray-400">
                File Digital
              </p>

              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="
                break-all
                text-pink-500
                underline
                "
              >
                {fileUrl}
              </a>

            </div>

          )}

        </div>

      )}

      <div className="flex gap-4">

        <button
          type="button"
          onClick={onClose}
          className="
          flex-1
          rounded-xl
          bg-zinc-800
          py-3
          "
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={loading}
          className="
          flex-1
          rounded-xl
          bg-pink-600
          py-3
          hover:bg-pink-500
          disabled:cursor-not-allowed
          disabled:opacity-50
          "
        >
          {loading
            ? "Menyimpan..."
            : "Simpan"}
        </button>

      </div>

    </form>
  );
}
