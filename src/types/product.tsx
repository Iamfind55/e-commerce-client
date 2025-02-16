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
  images?: string[];
  cover_image: string;
  price: number;
  discount?: number | null;
  quantity?: number | null;
  sku?: string | null;
  spu?: string | null;
  total_star?: number | null;
  total_comment?: number | null;
  category_ids?: string[] | null;
  categories?: Category[] | null;
  brand_id?: string | null;
  status?: string | null;
  recommended?: boolean | null;
  product_top?: boolean | null;
  product_vip?: number | null;
  created_at?: string | null;
}

export interface GetProductsResponse {
  getProducts: {
    success: boolean;
    total: number;
    data: ProductData[];
    error?: ErrorDetails;
  };
}

export interface GetProductResponse {
  getProduct: {
    success: boolean;
    data: ProductData;
    error?: ErrorDetails;
  };
}

export interface GetSimilarProductResponse {
  getSimilarProducts: {
    success: boolean;
    data: ProductData[];
    error?: ErrorDetails;
  };
}

export interface GetBestSellingProductsResponse {
  getBestSellingProducts: {
    success: boolean;
    total: number;
    data: ProductData[];
    error?: ErrorDetails;
  };
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
  identifier?: string | null;
  status?: string | null;
  order_no?: string | null;
  order_status?: string | null;
  shopProductStatus?: string | null;
  keyword?: string | null;
  brand_id?: string | null;
  category_id?: string | null;
  product_vip?: number | null;
  product_top?: boolean | null;
  notification_type?: string | null;
  price_between?: [number, number] | null;
  createdAtBetween: CreatedAtBetween;
  price_sort?: string | null;
}
