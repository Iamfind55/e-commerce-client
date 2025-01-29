export interface CategoryName {
  name_en: string;
}

export interface Subcategory {
  id: string;
  name: CategoryName;
  subcategories?: Subcategory[];
}

export interface Category {
  id: string;
  name: CategoryName;
  subcategories?: Subcategory[];
}

export interface ErrorResponse {
  message: string;
  code: string;
  details?: string;
}

export interface GetHeaderCategoriesResponse {
  getCategories: {
    success: boolean;
    total: number;
    data: Category[];
    error: ErrorResponse;
  };
}
