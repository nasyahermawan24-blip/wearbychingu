import BrandPlaceholderPage from "@/components/common/BrandPlaceholderPage";

export default function OrdersPage() {
  return (
    <BrandPlaceholderPage
      eyebrow="Orders"
      title="Halaman Orders"
      description="Riwayat pesanan Anda akan ditampilkan di sini setelah fitur order management selesai."
      ctaHref="/dashboard/customer"
      ctaLabel="Lihat Dashboard"
    />
  );
}
