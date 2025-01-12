import { ProductDescription, ProductName } from "./product";

// shop types
export interface Images {
  logo: string | null;
  cover: string | null;
}

export interface ShopData {
  id: string;
  fullname: string;
  username: string | null;
  phone_number?: string;
  email: string;
  remark: string;
  image: Images | null;
  status?: string | null;
  shop_vip?: number | null;
  created_at?: string | null;
}

export interface GetShopsResponse {
  getShops: {
    success: boolean;
    total: number;
    data: ShopData[];
    error?: ErrorDetails;
  };
}

export interface GetShopResponse {
  getShop: {
    success: boolean;
    total: number;
    data: ShopData;
    error?: ErrorDetails;
  };
}

export interface IShopFilter {
  limit: number;
  page: number;
  status: string | null;
  keyword: string | null;
  shop_vip: number | null;
  created_at_DESC: string | null;
}

// shop product types
export interface ShopProductCategory {
  id: string;
  name: ProductName;
  image: string;
}

export interface ProductData {
  id: string;
  name: ProductName;
  description: ProductDescription;
  images: string[];
  cover_image: string;
  price: number;
  discount: number;
  quantity: number;
  sku: string;
  spu: string;
  total_star: number;
  total_comment: number;
  category_ids: string[];
  categories: ShopProductCategory[];
  brand_id: string;
  status: string;
  recommended: boolean;
  product_top: boolean;
  product_vip: boolean;
  sell_count: number;
}

export interface ShopProductData {
  id: string;
  quantity: number;
  product_id: string;
  status: string;
  productData: ProductData;
}

export interface GetShopProductsResponse {
  getShopProducts: {
    success: boolean;
    total: number;
    data: ShopProductData[];
    error?: ErrorDetails;
  };
}

export interface CreatedAtBetween {
  startDate: string | null;
  endDate: string | null;
}

export interface IShopProductFilter {
  limit: number;
  page: number;
  status?: string | null;
  keyword?: string | null;
  quantity?: number | null;
  sortedBy?: string | null;
  createdAtBetween: CreatedAtBetween;
}
