"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, UploadCloud } from "lucide-react";

import {
  createTestimonial,
  uploadTestimonialImage,
} from "@/services/testimonial.service";

export default function TestimonialNewPage() {
  const router = useRouter();
  const [productId, setProductId] = useState<number>(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const productParam = new URLSearchParams(window.location.search).get("product");
    const parsedProductId = Number(productParam);
    setProductId(Number.isNaN(parsedProductId) ? 0 : parsedProductId);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedComment = comment.trim().replace(/\s+/g, " ");

    if (!normalizedComment) {
      setNotice({ type: "error", message: "Komentar wajib diisi." });
      return;
    }

    if (normalizedComment.length < 10) {
      setNotice({
        type: "error",
        message: "Komentar terlalu singkat. Minimal 10 karakter.",
      });
      return;
    }

    if (!productId || Number.isNaN(productId)) {
      setNotice({
        type: "error",
        message: "Produk tidak valid. Silakan kembali dari halaman order.",
      });
      return;
    }

    try {
      setLoading(true);
      setNotice(null);

      const image_url = await uploadTestimonialImage(image as File);

      await createTestimonial({
        product_id: productId,
        rating,
        comment: normalizedComment,
        image_url,
      });

      setNotice({
        type: "success",
        message: "Testimoni berhasil dikirim dan menunggu persetujuan.",
      });

      router.push("/dashboard/customer");
    } catch (err: unknown) {
      setNotice({
        type: "error",
        message: err instanceof Error ? err.message : "Terjadi kesalahan saat mengirim testimoni.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Beri Testimoni</h1>
        <p className="mt-2 text-gray-400">
          Bagikan pengalamanmu setelah membeli produk digital.
        </p>
      </div>

      {notice ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            notice.type === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
              : "border-rose-500/40 bg-rose-500/10 text-rose-200"
          }`}
        >
          {notice.message}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-pink-900/30 bg-zinc-950 p-8"
      >
        <div>
          <label className="font-semibold">Rating</label>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <button
                key={item}
                type="button"
                aria-label={`Pilih rating ${item}`}
                onClick={() => setRating(item)}
                className="rounded-full p-1 transition hover:scale-110"
              >
                <Star
                  size={32}
                  fill={item <= rating ? "#ec4899" : "none"}
                  color="#ec4899"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold">Komentar</label>
          <textarea
            rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tuliskan pengalaman Anda setelah membeli produk..."
            maxLength={500}
            required
            className="mt-3 w-full rounded-2xl border border-pink-900/30 bg-zinc-900 p-4"
          />
          <p className="mt-2 text-xs text-gray-400">
            Minimal 10 karakter. Maksimal 500 karakter.
          </p>
        </div>

        <div>
          <label className="font-semibold">Upload Foto</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="mt-3 block w-full rounded-2xl border border-pink-900/30 bg-zinc-900 p-3 text-sm"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
          <p className="mt-2 text-xs text-gray-400">
            Opsional. Format yang didukung: JPG, PNG, WebP. Maksimal 2MB.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-pink-600 py-4 font-bold transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <UploadCloud className="mr-2 inline" />
          {loading ? "Mengirim..." : "Kirim Testimoni"}
        </button>
      </form>
    </section>
  );
}
