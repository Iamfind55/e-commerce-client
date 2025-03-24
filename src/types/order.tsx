export interface CreatedAtBetween {
  startDate: string | null;
  endDate: string | null;
}

export interface IOrderFilter {
  limit: number;
  page: number;
  order_no: string | null;
  order_status?: string | null;
  createdAtBetween: CreatedAtBetween;
  price_sort?: string | null;
}

export interface IOrderData {
  id: string;
  order_no: string;
  payment_status: string;
  order_status: string;
  total_quantity: number;
  total_price: number;
  expected_revenue: number;
  total_discount: number;
  delivery_type: string;
  profit: string;
  total_products: string;
  sign_in_status: string;
  status: string;
  created_at: string;
}

export interface GetCustomerOrderResponse {
  customerGetOrders: {
    success: boolean;
    total: number;
    data: IOrderData[];
    error?: ErrorDetails;
  };
}

export interface ProductName {
  name_en: string;
}

export interface IOrderDetailData {
  id: string;
  order_no: string;
  payment_status: string;
  order_status: string;
  product_name: string;
  product_cover_image: string;
  sku: string;
  spu: string;
  quantity: number;
  price: number;
  product_id: string;
  order_id: string;
  status: string;
  delivery_type: string;
  customer_id: string;
  created_at: string;
}

export interface GetCustomerOrderDetailResponse {
  customerGetOrderDetails: {
    success: boolean;
    total: number;
    data: IOrderDetailData[];
    error?: ErrorDetails;
  };
}

export interface GetShopOrderResponse {
  shopGetOrders: {
    success: boolean;
    total: number;
    data: IOrderData[];
    error?: ErrorDetails;
  };
}

export interface IOrderDetailData {
  id: string;
  product_name: string;
  product_cover_image: string;
  sku: string;
  spu: string;
  status: string;
  inventory: Inventory;
  delivery_type: string;
  discount: number;
  quantity: number;
  price: number;
  order_no: string;
  order_id: string;
  order_status: string;
  payment_status: string;
  product_id: string;
  created_at: string;
  profit: number;
  sign_in_status: string;
}

export interface Inventory {
  my_inventory: number;
  total_inventory: number;
}

export interface GetShopOrderDetailResponse {
  shopGetOrderDetails: {
    success: boolean;
    total: number;
    data: IOrderDetailData[];
    error?: ErrorDetails;
  };
}
