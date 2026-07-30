"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
} from "lucide-react";

import { getTestimonials } from "@/services/testimonial.service";

interface Testimonial {

  id: number;

  rating: number;

  comment: string;

  image_url: string | null;

  profiles: {

    full_name: string;

  } | null;

  products: {

    name: string;

  } | null;

}

export default function TestimonialsSection() {

  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      const data = await getTestimonials();

      const mapped = (data || []).map((d: unknown) => {
        const row = d as Record<string, unknown> & {
          id?: number;
          rating?: number;
          comment?: string;
          image_url?: string | null;
          profiles?: unknown;
          products?: unknown;
        };

        const profiles =
          Array.isArray(row.profiles) && (row.profiles as unknown[]).length
            ? ((row.profiles as unknown[])[0] as { full_name: string })
            : null;

        const products =
          Array.isArray(row.products) && (row.products as unknown[]).length
            ? ((row.products as unknown[])[0] as { name: string })
            : null;

        return {
          id: row.id as number,
          rating: row.rating as number,
          comment: (row.comment as string) || "",
          image_url: (row.image_url as string) || null,
          profiles,
          products,
        } as Testimonial;
      });

      setTestimonials(mapped);

      setLoading(false);

    }

    load();

  }, []);

  if (loading) {

    return (

      <section className="py-24">

        <div className="container mx-auto">

          <div className="text-center">

            Loading Testimoni...

          </div>

        </div>

      </section>

    );

  }

  if (testimonials.length === 0) {

    return null;

  }

  return (

    <section className="py-24">

      <div className="container mx-auto px-6">

        <div className="text-center mb-16">

          <span
            className="
            rounded-full
            border
            border-pink-500/30
            bg-pink-500/10
            px-4
            py-2
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-pink-400
            "
          >

            TESTIMONIAL

          </span>

          <h2
            className="
            mt-6
            text-5xl
            font-black
            "
          >

            Apa Kata Customer

          </h2>

          <p
            className="
            mt-4
            text-gray-400
            "
          >

            Pengalaman customer setelah membeli
            produk digital WearByChingu.

          </p>

        </div>

        <div
          className="
          grid
          gap-8
          lg:grid-cols-3
          "
        >

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="
              group
              rounded-3xl
              border
              border-pink-900/30
              bg-zinc-950
              p-8
              transition
              duration-300
              hover:border-pink-500/40
              hover:-translate-y-2
              hover:shadow-[0_20px_60px_rgba(219,39,119,.25)]
              "
            >

              <Quote
                className="
                text-pink-500
                "
                size={34}
              />

              <div
                className="
                mt-5
                flex
                gap-1
                "
              >

                {Array.from({
                  length: item.rating,
                }).map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    fill="#ec4899"
                    color="#ec4899"
                  />

                ))}

              </div>

              <p
                className="
                mt-6
                text-sm
                leading-7
                text-gray-300
                "
              >

                “{item.comment}”

              </p>

              {item.image_url && (

                <div className="mt-6">

                  <Image
                    src={item.image_url}
                    alt="testimonial"
                    width={500}
                    height={500}
                    className="
                    h-56
                    w-full
                    rounded-2xl
                    object-cover
                    "
                  />

                </div>

              )}

              <div
                className="
                mt-8
                border-t
                border-pink-900/20
                pt-5
                "
              >

                <h4
                  className="
                  font-bold
                  "
                >

                  {item.profiles?.full_name}

                </h4>

                <p
                  className="
                  mt-1
                  text-sm
                  text-pink-400
                  "
                >

                  {item.products?.name}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}