import { Product } from "./product";

export interface Testimonial {
  id: number;

  user_id: string;

  product_id: number;

  rating: number;

  comment: string;

  status: string;

  image_url?: string | null;

  created_at?: string;

  updated_at?: string;

  profiles?: {
    full_name: string;
  } | null;

  products?: Pick<Product, "id" | "name" | "image_url"> | null;
}