"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Star,
  MessageCircle,
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Nasya Amorita",
    rating: 5,
    comment:
      "Template sangat bagus, mudah digunakan dan tampilannya premium. Sangat puas dengan produk WearByChingu.",
    date: "22 Juli 2026",
  },
  {
    id: 2,
    name: "Aulia",
    rating: 5,
    comment:
      "Pelayanan cepat, proses pembayaran mudah, file langsung bisa diunduh.",
    date: "20 Juli 2026",
  },
  {
    id: 3,
    name: "Rizky",
    rating: 4,
    comment:
      "Produknya berkualitas dan sesuai deskripsi. Akan membeli lagi nanti.",
    date: "18 Juli 2026",
  },
  {
    id: 4,
    name: "Cindy",
    rating: 5,
    comment:
      "UI template sangat cantik dan cocok untuk bisnis fashion digital.",
    date: "15 Juli 2026",
  },
];

export default function Testimonials() {
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState(0);

  const filteredTestimonials = useMemo(() => {
    return testimonialData.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.comment.toLowerCase().includes(search.toLowerCase());

      const matchRating =
        rating === 0 ? true : item.rating === rating;

      return matchSearch && matchRating;
    });
  }, [search, rating]);

  return (
    <section className="space-y-10">

      {/* HERO */}

      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-pink-900/40
        bg-gradient-to-r
        from-zinc-950
        via-zinc-900
        to-pink-950/30
        p-10
        "
      >

        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative z-10">

          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-pink-500/30
            bg-pink-500/10
            px-4
            py-2
            text-xs
            font-semibold
            text-pink-400
            "
          >
            <MessageCircle size={15} />
            CUSTOMER REVIEW
          </div>

          <h1 className="mt-5 text-4xl font-extrabold">
            Testimonial Customer
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Lihat pengalaman para customer setelah membeli
            produk digital WearByChingu.
          </p>

        </div>

      </div>

      {/* STATISTIK */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6">

          <p className="text-gray-400">
            Total Review
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {testimonialData.length}
          </h2>

        </div>

        <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6">

          <p className="text-gray-400">
            Rating
          </p>

          <h2 className="mt-3 flex items-center gap-2 text-4xl font-bold">

            4.9

            <Star
              size={28}
              className="fill-yellow-400 text-yellow-400"
            />

          </h2>

        </div>

        <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-6">

          <p className="text-gray-400">
            Customer Puas
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            98%
          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full lg:w-96">

          <Search
            size={18}
            className="absolute left-4 top-3 text-gray-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari testimonial..."
            className="
            w-full
            rounded-2xl
            border
            border-pink-900/30
            bg-zinc-950
            py-3
            pl-11
            pr-4
            outline-none
            transition
            focus:border-pink-500
            "
          />

        </div>

        <div className="flex gap-2">

          {[0, 5, 4, 3].map((value) => (

            <button
              key={value}
              onClick={() => setRating(value)}
              className={`
                rounded-xl
                px-5
                py-2
                transition

                ${
                  rating === value
                    ? "bg-pink-600 text-white"
                    : "bg-zinc-900 text-gray-300"
                }
              `}
            >
              {value === 0 ? "Semua" : `${value} ★`}
            </button>

          ))}

        </div>

      </div>

      {/* CARD */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredTestimonials.map((item) => (

          <div
            key={item.id}
            className="
            rounded-3xl
            border
            border-pink-900/30
            bg-zinc-950
            p-6
            transition
            hover:-translate-y-1
            hover:border-pink-500
            "
          >

            <h3 className="text-xl font-bold">
              {item.name}
            </h3>

            <div className="mt-3 flex">

              {Array.from({
                length: item.rating,
              }).map((_, index) => (

                <Star
                  key={index}
                  size={18}
                  className="fill-yellow-400 text-yellow-400"
                />

              ))}

            </div>

            <p className="mt-4 text-gray-400 leading-7">
              {item.comment}
            </p>

            <p className="mt-6 text-sm text-pink-400">
              {item.date}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}