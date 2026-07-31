"use client";

import { useEffect, useState } from "react";

import ProductCard from "@/components/products/ProductCard";

import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";

export default function ProductsPage() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function fetchProducts() {

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

    fetchProducts();

  }, []);

  if (loading) {

    return (

      <section
        className="
        flex
        min-h-[60vh]
        items-center
        justify-center
        "
      >

        <p className="text-xl text-gray-400">
          Loading products...
        </p>

      </section>

    );

  }

  return (

    <section
      className="
      relative
      mx-auto
      max-w-7xl
      overflow-hidden
      px-6
      py-14
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.14),_transparent_45%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl" />

      <div className="relative z-10 mb-12">

        <h1
          className="
          text-5xl
          font-bold
          "
        >
          Korean Fashion
        </h1>

        <p
          className="
          mt-3
          text-gray-400
          "
        >
          Temukan koleksi fashion premium
          WearByChingu.
        </p>

      </div>

      <div
        className="
        grid
        gap-8
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        "
      >

        {products.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

}