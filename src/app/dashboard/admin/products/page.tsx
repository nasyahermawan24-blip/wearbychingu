import ProductTable from "@/components/admin/ProductTable";

export default function AdminProductsPage() {
  return (
    <section className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Manajemen Produk
        </h1>

        <p className="mt-2 text-gray-400">
          Kelola seluruh produk digital yang
          dijual di WearByChingu.
        </p>

      </div>

      <ProductTable />

    </section>
  );
}