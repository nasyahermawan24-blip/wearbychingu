"use client";

import { useState, useEffect } from "react";
import { Star, UploadCloud } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { createTestimonial } from "@/services/testimonial.service";

export default function TestimonialNewPage() {
  const [productId, setProductId] = useState<number>(0);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("product");
    setProductId(Number(p));
  }, []);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      let image_url = "";

      if (image) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("testimonial-images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("testimonial-images")
          .getPublicUrl(fileName);

        image_url = data.publicUrl;
      }

      await createTestimonial({
        product_id: productId,
        rating,
        comment,
        image_url,
      });

      alert("Testimoni berhasil dikirim.");

      window.location.href = "/dashboard/customer";
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Beri Testimoni
        </h1>

        <p className="text-gray-400 mt-2">
          Bagikan pengalamanmu setelah membeli produk digital.
        </p>

      </div>

      <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-8 space-y-6">

        <div>

          <label className="font-semibold">
            Rating
          </label>

          <div className="flex gap-2 mt-3">

            {[1,2,3,4,5].map((item)=>(

              <button
                key={item}
                onClick={()=>setRating(item)}
                type="button"
              >
                <Star
                  size={32}
                  fill={item<=rating ? "#ec4899" : "none"}
                  color="#ec4899"
                />
              </button>

            ))}

          </div>

        </div>

        <div>

          <label className="font-semibold">
            Komentar
          </label>

          <textarea
            rows={6}
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            className="
            mt-3
            w-full
            rounded-2xl
            bg-zinc-900
            border
            border-pink-900/30
            p-4
            "
          />

        </div>

        <div>

          <label className="font-semibold">
            Upload Foto
          </label>

          <input
            type="file"
            className="mt-3 block"
            onChange={(e)=>{

              if(e.target.files){

                setImage(e.target.files[0]);

              }

            }}
          />

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
          w-full
          rounded-2xl
          bg-pink-600
          py-4
          font-bold
          hover:bg-pink-500
          transition
          "
        >

          <UploadCloud className="inline mr-2"/>

          {loading ? "Mengirim..." : "Kirim Testimoni"}

        </button>

      </div>

    </section>
  );
}
