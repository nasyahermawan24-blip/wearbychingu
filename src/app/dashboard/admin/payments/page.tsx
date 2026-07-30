import PaymentTable from "@/components/admin/PaymentTable";

export default function AdminPaymentsPage() {
  return (
    <section className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Verifikasi Pembayaran
        </h1>

        <p className="mt-2 text-gray-400">
          Kelola pembayaran customer.
        </p>

      </div>

      <PaymentTable />

    </section>
  );
}