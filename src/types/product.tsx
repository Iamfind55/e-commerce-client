export interface ProductName {
  name_en: string;
}

export interface ProductDescription {
  name_en: string | null;
}

export interface ProductData {
  id: string;
  name: ProductName;
  description: ProductDescription | null;
  images: string[]; // Array of image URLs
  cover_image: string; // URL of the cover image
  price: number;
  discount: number | null;
  quantity: number | null;
  sku: string | null;
  spu: string | null;
  total_star: number | null;
  total_comment: number | null;
  category_ids: string[] | null; // Array of category IDs
  brand_id: string | null;
  status: string | null;
  recommended: boolean | null;
  product_top: boolean | null;
  product_vip: boolean | null;
  created_at: string | null; // ISO date string
}

export interface ShopProduct {
  id: string;
  quantity: number;
  product_id: string;
  productData: ProductData; // Nested ProductData object
  status: string;
  created_at: string; // ISO date string
}

export interface CreatedAtBetween {
  startDate: string | null;
  endDate: string | null;
}

export interface IFilter {
  limit: number;
  offset?: number;
  page: number;
  status?: string | null;
  keyword?: string | null;
  brand_id?: string | null;
  category_id?: string | null;
  product_vip?: boolean | null;
  product_top?: boolean | null;
  price_between?: [number, number] | null;
  createdAtBetween: CreatedAtBetween;
}
