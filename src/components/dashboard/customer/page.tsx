import CustomerOrderTable from "@/components/customer/CustomerOrderTable";

export default function CustomerDashboardPage() {
  return (
    <section className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Dashboard Customer
        </h1>

        <p className="mt-2 text-gray-400">
          Lihat seluruh pesanan, status pembayaran,
          dan download produk digital setelah
          pembayaran diverifikasi.
        </p>

      </div>

      <CustomerOrderTable />

    </section>
  );
}