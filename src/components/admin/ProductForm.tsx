"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { createProduct } from "@/services/product.service";

import UploadProductImage from "./UploadProductImage";
import UploadDigitalProduct from "./UploadDigitalProduct";

interface Props {
  onSuccess?: () => void;
}

export default function ProductForm({
  onSuccess,
}: Props) {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [fileUrl, setFileUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {

      if (!name.trim()) {
        alert("Nama produk wajib diisi.");
        return;
      }

      if (!description.trim()) {
        alert("Deskripsi wajib diisi.");
        return;
      }

      if (!price) {
        alert("Harga wajib diisi.");
        return;
      }

      if (!stock) {
        alert("Stock wajib diisi.");
        return;
      }

      if (!category.trim()) {
        alert("Kategori wajib diisi.");
        return;
      }

      if (!imageUrl) {
        alert(
          "Silakan upload gambar produk."
        );
        return;
      }

      if (!fileUrl) {
        alert(
          "Silakan upload file digital."
        );
        return;
      }

      setLoading(true);

      await createProduct({
        name,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
        image_url: imageUrl,
        file_url: fileUrl,
      });

      alert(
        "Produk berhasil ditambahkan."
      );

      onSuccess?.();

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");
      setImageUrl("");
      setFileUrl("");

      router.refresh();

    } catch (error: unknown) {

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
        Tambah Produk
      </h2>

      <input
        placeholder="Nama Produk"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="input-auth"
      />

      <textarea
        rows={5}
        placeholder="Deskripsi Produk"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
        className="input-auth resize-none"
      />

      <input
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) =>
          setPrice(e.target.value)
        }
        className="input-auth"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
        className="input-auth"
      />

      <input
        placeholder="Kategori"
        value={category}
        onChange={(e) =>
          setCategory(
            e.target.value
          )
        }
        className="input-auth"
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
          space-y-3
          "
        >

          <h3 className="font-semibold">
            Preview Upload
          </h3>

          {imageUrl && (

            <div>

              <p className="text-sm text-gray-400 mb-2">
                Gambar Produk
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

              <p className="text-sm text-gray-400">
                File Digital
              </p>

              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer"
                className="
                text-pink-500
                underline
                break-all
                "
              >
                {fileUrl}
              </a>

            </div>

          )}

        </div>

      )}

      <button
        type="submit"
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
        disabled:opacity-50
        disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Menyimpan..."
          : "Simpan Produk"}
      </button>

    </form>
  );
}
