import DownloadTable from "@/components/downloads/DownloadTable";

export default function DownloadsPage() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Download Produk
        </h1>

        <p className="mt-3 text-gray-400">
          Semua produk digital yang telah
          berhasil diverifikasi dapat
          diunduh melalui halaman ini.
        </p>

      </div>

      <DownloadTable />

    </section>
  );
}