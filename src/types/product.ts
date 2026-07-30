export interface Product {
  id: number;

  name: string;

  description: string;

  category: string;

  price: number;

  image_url: string;

  file_url: string;

  created_at: string;

  slug: string | null;

  category_id: string | null;

  stock: number;

  is_featured: boolean;

  status: string;

  updated_at: string;
}

export interface DownloadProduct {
  id: number;

  name: string;

  file_url: string;
}
