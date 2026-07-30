"use client";

import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
} from "@/services/product.service";

import { Product } from "@/types/product";

import ProductForm from "./ProductForm";
import EditProductModal from "./EditProductModal";

export default function ProductTable() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  async function loadProducts() {

    try {

      const data =
        await getProducts();

      setProducts(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  async function handleDelete(
    id: number
  ) {

    const confirmDelete =
      confirm(
        "Apakah Anda yakin ingin menghapus produk ini?"
      );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      alert(
        "Produk berhasil dihapus."
      );

      await loadProducts();

    } catch (error) {

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Terjadi kesalahan.");
      }

    }

  }

  useEffect(() => {

    loadProducts();

  }, []);

  const formatPrice =
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
      <div className="text-center py-16">
        Loading...
      </div>
    );

  }

  return (

    <>

      <div
        className="
        rounded-3xl
        border
        border-pink-900/30
        bg-zinc-950
        overflow-hidden
        "
      >

        <div
          className="
          flex
          items-center
          justify-between
          px-6
          py-5
          border-b
          border-pink-900/30
          "
        >

          <h2 className="text-2xl font-bold">
            Daftar Produk
          </h2>

          <button
            onClick={() =>
              setShowForm(true)
            }
            className="
            rounded-xl
            bg-pink-600
            px-5
            py-2
            font-semibold
            hover:bg-pink-500
            transition
            "
          >
            + Tambah Produk
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-zinc-900">

              <tr>

                <th className="p-4 text-left">
                  Nama
                </th>

                <th className="p-4 text-left">
                  Harga
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  File
                </th>

                <th className="p-4 text-left">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.id}
                  className="
                  border-t
                  border-pink-900/20
                  "
                >

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {formatPrice.format(
                      product.price
                    )}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    {product.status}
                  </td>

                  <td className="p-4">

                    {product.file_url ? (

                      <span className="text-green-500">
                        Sudah Upload
                      </span>

                    ) : (

                      <span className="text-red-500">
                        Belum Upload
                      </span>

                    )}

                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          setEditingProduct(product)
                        }
                        className="
                        rounded-lg
                        bg-blue-600
                        px-4
                        py-2
                        hover:bg-blue-500
                        transition
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="
                        rounded-lg
                        bg-red-600
                        px-4
                        py-2
                        hover:bg-red-500
                        transition
                        "
                      >
                        Hapus
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {showForm && (

        <div
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-8
          "
        >

          <div
            className="
            w-full
            max-w-3xl
            "
          >

            <ProductForm
              onSuccess={async () => {
                setShowForm(false);
                await loadProducts();
              }}
            />

            <button
              onClick={() =>
                setShowForm(false)
              }
              className="
              mt-6
              w-full
              rounded-xl
              bg-zinc-800
              py-3
              "
            >
              Tutup
            </button>

          </div>

        </div>

      )}

      {editingProduct && (

        <div
          className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-8
          "
        >

          <div
            className="
            w-full
            max-w-3xl
            "
          >

            <EditProductModal
              product={editingProduct}
              onClose={() =>
                setEditingProduct(null)
              }
              onSuccess={async () => {
                setEditingProduct(null);
                await loadProducts();
              }}
            />

          </div>

        </div>

      )}

    </>

  );

}