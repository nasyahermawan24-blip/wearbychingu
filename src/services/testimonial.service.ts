"use client";

import { supabase } from "@/lib/supabase";

export async function createTestimonial({
  product_id,
  rating,
  comment,
  image_url,
}: {
  product_id: number;
  rating: number;
  comment: string;
  image_url: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User belum login");
  }

  const { error } = await supabase
    .from("testimonials")
    .insert({
      user_id: user.id,
      product_id,
      rating,
      comment,
      image_url,
      status: "pending",
    });

  if (error) throw error;
}

export async function getTestimonials() {

  const { data, error } = await supabase
    .from("testimonials")
    .select(
      `id, rating, comment, image_url, profiles ( full_name ), products ( name )`
    )
    .eq("status", "active")
    .order("id", { ascending: false })
    .limit(6);

  if (error) {
    console.error(error);
    return [];
  }

  // Supabase returns related rows as arrays; unwrap to match component shape
  const mapped = (data || []).map((d: unknown) => {
    const row = d as { profiles?: unknown[]; products?: unknown[] } & Record<string, unknown>;

    return {
      ...row,
      profiles: Array.isArray(row.profiles) && row.profiles.length ? row.profiles[0] : null,
      products: Array.isArray(row.products) && row.products.length ? row.products[0] : null,
    } as unknown;
  });

  return mapped;

}