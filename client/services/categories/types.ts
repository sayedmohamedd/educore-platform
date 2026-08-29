export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string | null;
  coursesCount: number;
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface CreateCategory {
  name: string;
  description?: string;
}
