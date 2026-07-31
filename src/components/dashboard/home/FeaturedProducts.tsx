"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import { getFeaturedProducts } from "@/services/product.service";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string | null;
  slug: string;
  stock: number;
  is_featured: boolean;
  status: string;
}

export default function FeaturedProducts() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadProducts() {

      const data = await getFeaturedProducts();

      setProducts(data);

      setLoading(false);

    }

    loadProducts();

  }, []);

  if (loading) {

    return (

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center text-gray-400">

            Memuat produk...

          </div>

        </div>

      </section>

    );

  }

  if (products.length === 0) {

    return null;

  }

  return (

    <section className="py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-pink-500 font-bold uppercase tracking-widest">

              Featured

            </p>

            <h2 className="text-4xl font-black mt-2">

              Produk Terlaris

            </h2>

          </div>

          <Link
            href="/products"
            className="
            flex
            items-center
            gap-2
            text-pink-400
            hover:text-pink-300
            "
          >

            Lihat Semua

            <ArrowRight size={18} />

          </Link>

        </div>

        <div
          className="
          mt-12
          grid
          gap-8
          md:grid-cols-2
          lg:grid-cols-3
          "
        >

          {products.map((item) => (

            <div
              key={item.id}
              className="
              overflow-hidden
              rounded-3xl
              border
              border-pink-900/30
              bg-zinc-950
              transition
              duration-300
              hover:-translate-y-2
              hover:border-pink-500/40
              hover:shadow-[0_20px_50px_rgba(236,72,153,.25)]
              "
            >

              <div className="h-72 w-full relative">
                <Image
                  src={
                    item.image_url ||
                    "https://placehold.co/600x700/18181b/f472b6?text=WearByChingu"
                  }
                  alt={item.name}
                  fill
                  className="rounded-3xl object-cover"
                />
              </div>

              <div className="p-6">

                <h3
                  className="
                  text-xl
                  font-bold
                  "
                >

                  {item.name}

                </h3>

                <p
                  className="
                  mt-2
                  text-sm
                  text-gray-400
                  line-clamp-2
                  "
                >

                  {item.description}

                </p>

                <p
                  className="
                  mt-4
                  text-pink-400
                  text-lg
                  font-black
                  "
                >

                  Rp{" "}
                  {Number(item.price).toLocaleString("id-ID")}

                </p>

                <Link
                  href={`/product/${item.id}`}
                  className="
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-pink-600
                  py-3
                  font-semibold
                  transition
                  hover:bg-pink-700
                  "
                >

                  <ShoppingBag size={18} />

                  Lihat Detail

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}