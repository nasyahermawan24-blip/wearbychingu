"use client";

import { useState } from "react";
import { Star, Upload, Image as ImageIcon } from "lucide-react";

export default function TestimonialForm() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState<File | null>(null);

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    setImage(e.target.files[0]);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    console.log({
      rating,
      comment,
      image,
    });

    alert(
      "Tahap berikutnya kita akan menyimpan testimonial ke database."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
      rounded-3xl
      border
      border-pink-900/30
      bg-zinc-950
      p-8
      space-y-8
      "
    >
      {/* Rating */}

      <div>

        <label className="block text-sm font-semibold mb-4">

          Rating

        </label>

        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map((star) => (

            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
            >
              <Star
                size={36}
                className={
                  star <= rating
                    ? "fill-pink-500 text-pink-500 transition"
                    : "text-gray-600 transition"
                }
              />
            </button>

          ))}

        </div>

      </div>

      {/* Komentar */}

      <div>

        <label className="block text-sm font-semibold mb-3">

          Komentar

        </label>

        <textarea
          rows={6}
          required
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          placeholder="Bagikan pengalamanmu..."
          className="
          w-full
          rounded-2xl
          border
          border-pink-900/30
          bg-zinc-900
          p-4
          outline-none
          focus:border-pink-500
          "
        />

      </div>

      {/* Upload */}

      <div>

        <label className="block text-sm font-semibold mb-3">

          Upload Foto (Opsional)

        </label>

        <label
          className="
          flex
          items-center
          justify-center
          gap-3
          rounded-2xl
          border-2
          border-dashed
          border-pink-800/40
          bg-zinc-900
          p-8
          cursor-pointer
          hover:border-pink-500
          transition
          "
        >

          <Upload
            size={26}
            className="text-pink-500"
          />

          <span>

            Pilih Gambar

          </span>

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

        </label>

      </div>

      {/* Preview */}

      {image && (

        <div>

          <p className="mb-3 font-semibold">

            Preview

          </p>

          <div
            className="
            rounded-2xl
            border
            border-pink-900/30
            bg-zinc-900
            p-4
            "
          >

            <div className="flex items-center gap-3">

              <ImageIcon className="text-pink-500" />

              <span>

                {image.name}

              </span>

            </div>

          </div>

        </div>

      )}

      {/* Button */}

      <button
        type="submit"
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

        Kirim Testimoni

      </button>

    </form>
  );
}