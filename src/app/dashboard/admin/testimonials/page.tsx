import TestimonialTable from "@/components/dashboard/admin/TestimonialTable";

export default function AdminTestimonialsPage() {
  return (
    <section className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Manajemen Testimoni
        </h1>

        <p className="mt-2 text-gray-400">
          Kelola testimonial pelanggan WearByChingu.
        </p>

      </div>

      <TestimonialTable />

    </section>
  );
}