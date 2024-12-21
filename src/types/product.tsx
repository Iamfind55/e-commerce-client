export interface IproductTypes {
  id: string;
  name: {
    name_en: string;
  };
  description: {
    name_en: string;
  };
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
  brand_id: string;
  status: string;
  recommended: boolean;
  product_top: boolean;
  product_vip: boolean;
}

export interface CreatedAt {
  startDate: string | null;
  endDate: string | null;
}

export interface IFilter {
  limit: number;
  page: number;
  status?: string | null;
  keyword?: string | null;
  brand_id?: string | null;
  category_id?: string | null;
  product_vip?: boolean | null;
  product_top?: boolean | null;
  price_between?: [number, number] | null;
  createdAt: CreatedAt;
}
