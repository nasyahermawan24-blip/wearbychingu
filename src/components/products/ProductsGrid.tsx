"use client";

import { useEffect, useMemo, useState } from "react";

import ProductsHeader from "./ProductsHeader";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";

export default function ProductsGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Load Products Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        category === "All" ||
        product.category === category;

      return matchSearch && matchCategory;
    });
  }, [products, search, category]);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="py-20 text-center text-gray-400">
          Loading products...
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <ProductsHeader />

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <CategoryFilter
        selected={category}
        onChange={setCategory}
      />

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-pink-400">
          Tidak ada produk yang sesuai.
        </div>
      ) : (
        <div
          className="
            grid
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  );
}