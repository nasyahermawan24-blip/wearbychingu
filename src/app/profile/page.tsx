import BrandPlaceholderPage from "@/components/common/BrandPlaceholderPage";

export default function ProfilePage() {
  return (
    <BrandPlaceholderPage
      eyebrow="Profile"
      title="Halaman Profile"
      description="Informasi profil pengguna akan tersedia pada pengembangan berikutnya."
      ctaHref="/dashboard/customer"
      ctaLabel="Kembali ke Dashboard"
    />
  );
}
