import { supabase } from "@/lib/supabase";
import {
  Category,
  CategoryForm,
} from "@/types/category";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at");

  if (error) throw new Error(error.message);

  return data as Category[];
}

export async function createCategory(
  category: CategoryForm
) {
  const { error } = await supabase
    .from("categories")
    .insert(category);

  if (error) throw new Error(error.message);
}

export async function updateCategory(
  id: string,
  category: CategoryForm
) {
  const { error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteCategory(
  id: string
) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}