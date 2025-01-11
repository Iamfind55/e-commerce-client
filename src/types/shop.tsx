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

export interface GetShopResponse {
  getShops: {
    success: boolean;
    total: number;
    data: ShopData[];
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
