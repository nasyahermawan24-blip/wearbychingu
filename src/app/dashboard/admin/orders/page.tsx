import OrderTable from "@/components/dashboard/order/OrderTable";

export default function AdminOrdersPage() {
  return (
    <section className="p-8">

      <h1 className="text-4xl font-bold">
        Manajemen Pesanan
      </h1>

      <p className="mt-2 text-gray-400">
        Kelola semua pesanan customer.
      </p>

      <div className="mt-10">
        <OrderTable />
      </div>

    </section>
  );
}