import { supabase } from "@/lib/supabase";
import { Testimonial } from "@/types/Testimonial";

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
}): Promise<void> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("User belum login");
  }

  const { error } = await supabase.from("testimonials").insert({
    user_id: user.id,
    product_id,
    rating,
    comment,
    image_url,
    status: "pending",
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select(
      `id, user_id, product_id, rating, comment, status, created_at, updated_at, profiles(full_name), products(id, name, image_url)`
    )
    .eq("status", "approved")
    .order("id", { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => {
    const testimonial = row as Record<string, unknown> & {
      profiles?: unknown[];
      products?: unknown[];
    };

    const profile = Array.isArray(testimonial.profiles) && testimonial.profiles.length
      ? (testimonial.profiles[0] as { full_name?: string })
      : null;

    const product = Array.isArray(testimonial.products) && testimonial.products.length
      ? (testimonial.products[0] as {
          id?: number;
          name?: string;
          image_url?: string;
        })
      : null;

    return {
      id: Number(testimonial.id ?? 0),
      user_id: String(testimonial.user_id ?? ""),
      product_id: Number(testimonial.product_id ?? 0),
      rating: Number(testimonial.rating ?? 0),
      comment: String(testimonial.comment ?? ""),
      status: String(testimonial.status ?? ""),
      created_at: String(testimonial.created_at ?? ""),
      updated_at: String(testimonial.updated_at ?? ""),
      profiles: profile
        ? {
            full_name: profile.full_name ?? "",
          }
        : null,
      products: product
        ? {
            id: product.id ?? 0,
            name: product.name ?? "",
            image_url: product.image_url ?? "",
          }
        : null,
    } as Testimonial;
  });
}