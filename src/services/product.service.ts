import { supabase } from "@/lib/supabase";

export async function getFeaturedProducts() {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .eq("is_featured", true)
    .order("created_at", {
      ascending: false,
    })
    .limit(6);

  if (error) {

    console.error(error);

    return [];

  }

  return data;

}

export async function uploadDigitalProduct(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("digital-products")
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data: publicData } = await supabase.storage
    .from("digital-products")
    .getPublicUrl(fileName);

  return publicData.publicUrl;

}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;

}

export async function createProduct(payload: {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
  file_url: string;
}) {
  const { error } = await supabase.from("products").insert(payload);
  if (error) throw error;
}

export async function deleteProduct(id: number) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateProduct(id: number, payload: Partial<Record<string, unknown>>) {
  const { error } = await supabase.from("products").update(payload).eq("id", id);
  if (error) throw error;
}

export async function uploadProductImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicData } = await supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return publicData.publicUrl;

}