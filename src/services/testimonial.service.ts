import { supabase } from "@/lib/supabase";
import { Testimonial } from "@/types/Testimonial";

const VALID_RATING_VALUES = new Set([1, 2, 3, 4, 5]);
const MAX_COMMENT_LENGTH = 500;
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function normalizeComment(comment: string): string {
  return comment.trim().replace(/\s+/g, " ");
}

export async function uploadTestimonialImage(file: File): Promise<string | null> {
  if (!file) return null;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Format foto harus JPG, PNG, atau WebP.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Ukuran foto maksimal 2MB.");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("Sesi Anda tidak valid, silakan login kembali.");
  }

  if (!user) {
    throw new Error("Anda harus login terlebih dahulu sebelum mengirim testimoni.");
  }

  const safeFileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const objectPath = `testimonials/${user.id}/${safeFileName}`;

  const { error: uploadError } = await supabase.storage
    .from("testimonial-images")
    .upload(objectPath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message || "Upload foto gagal.");
  }

  const { data } = supabase.storage
    .from("testimonial-images")
    .getPublicUrl(objectPath);

  return data.publicUrl || null;
}

export async function createTestimonial({
  product_id,
  rating,
  comment,
  image_url,
}: {
  product_id: number;
  rating: number;
  comment: string;
  image_url?: string | null;
}): Promise<void> {
  const normalizedComment = normalizeComment(comment);

  if (!normalizedComment) {
    throw new Error("Komentar wajib diisi.");
  }

  if (normalizedComment.length > MAX_COMMENT_LENGTH) {
    throw new Error(`Komentar maksimal ${MAX_COMMENT_LENGTH} karakter.`);
  }

  if (!VALID_RATING_VALUES.has(rating)) {
    throw new Error("Rating harus berada di antara 1 sampai 5.");
  }

  if (!product_id || Number.isNaN(product_id)) {
    throw new Error("Produk tidak valid.");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error("Sesi Anda tidak valid, silakan login kembali.");
  }

  if (!user) {
    throw new Error("Anda harus login terlebih dahulu sebelum mengirim testimoni.");
  }

  const { data: productData, error: productError } = await supabase
    .from("products")
    .select("id")
    .eq("id", product_id)
    .maybeSingle();

  if (productError) {
    throw new Error(productError.message);
  }

  if (!productData) {
    throw new Error("Produk yang Anda pilih tidak ditemukan.");
  }

  const { error } = await supabase.from("testimonials").insert({
    user_id: user.id,
    product_id,
    rating,
    comment: normalizedComment,
    image_url: image_url || null,
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
      `id, user_id, product_id, rating, comment, status, image_url, profiles(full_name), products(id, name, image_url)`
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

    const profile =
      Array.isArray(testimonial.profiles) && testimonial.profiles.length
        ? (testimonial.profiles[0] as { full_name?: string })
        : null;

    const product =
      Array.isArray(testimonial.products) && testimonial.products.length
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
      image_url: (testimonial.image_url as string | null) ?? null,
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