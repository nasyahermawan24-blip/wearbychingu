export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryForm {
  name: string;
  slug: string;
  description: string;
}

export interface Category {
  id: string;

  name: string;

  slug: string;

  description: string;

  created_at: string;
}

export interface CreateCategory {
  name: string;

  slug: string;

  description: string;
}