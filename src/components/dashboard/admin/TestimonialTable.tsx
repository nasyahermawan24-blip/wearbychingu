"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { supabase } from "@/lib/supabase";

interface Testimonial {
  id: number;
  rating: number;
  comment: string;
  image_url: string | null;
  status: string;
  profiles: {
    full_name: string;
  } | null;
  products: {
    name: string;
  } | null;
}

export default function TestimonialTable() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadTestimonials() {
    const { data, error } = await supabase
      .from("testimonials")
      .select(`
        id,
        rating,
        comment,
        image_url,
        status,
        profiles(full_name),
        products(name)
      `)
      .order("id", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    const mapped = (data || []).map((d: unknown) => {
      const row = d as Record<string, unknown> & {
        id?: number;
        rating?: number;
        comment?: string;
        image_url?: string | null;
        status?: string;
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
        status: (row.status as string) || "",
        profiles,
        products,
      } as Testimonial;
    });

    setTestimonials(mapped);
    setLoading(false);
  }

  async function updateStatus(
    id: number,
    status: "approved" | "rejected"
  ) {
    const { error } = await supabase
      .from("testimonials")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadTestimonials();
  }

  useEffect(() => {
    loadTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl border border-pink-900/30 bg-zinc-950 p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-pink-900/30 bg-zinc-950">

      <table className="w-full">

        <thead className="border-b border-pink-900/30">

          <tr>

            <th className="p-4 text-left">
              Customer
            </th>

            <th className="p-4 text-left">
              Produk
            </th>

            <th className="p-4 text-left">
              Rating
            </th>

            <th className="p-4 text-left">
              Komentar
            </th>

            <th className="p-4 text-left">
              Foto
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {testimonials.map((item) => (

            <tr
              key={item.id}
              className="border-b border-pink-900/20"
            >

              <td className="p-4">
                {item.profiles?.full_name ?? "-"}
              </td>

              <td className="p-4">
                {item.products?.name ?? "-"}
              </td>

              <td className="p-4">

                {"⭐".repeat(item.rating)}

              </td>

              <td className="p-4 max-w-sm">

                {item.comment}

              </td>

              <td className="p-4">

                {item.image_url ? (

                  <Image
                    src={item.image_url}
                    alt="testimonial"
                    width={80}
                    height={80}
                    className="rounded-xl object-cover"
                  />

                ) : (

                  "-"

                )}

              </td>

              <td className="p-4">

                <span
                  className="
                  rounded-full
                  bg-pink-600
                  px-3
                  py-1
                  text-xs
                  "
                >
                  {item.status}
                </span>

              </td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      updateStatus(
                        item.id,
                        "approved"
                      )
                    }
                    className="
                    rounded-xl
                    bg-emerald-600
                    px-4
                    py-2
                    text-xs
                    font-bold
                    "
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(
                        item.id,
                        "rejected"
                      )
                    }
                    className="
                    rounded-xl
                    bg-red-600
                    px-4
                    py-2
                    text-xs
                    font-bold
                    "
                  >
                    Reject
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}