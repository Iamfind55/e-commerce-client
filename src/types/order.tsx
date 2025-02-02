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
  total_quantity: number;
  total_price: number;
  total_discount: number;
  expected_revenue: number;
  order_status: string;
  payment_status: string;
  customer_id: string;
  payment_slip: string;
  delivery_type: string;
  created_at: string;
  status: string;
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
  product_name: string;
  product_cover_image: string;
  sku: string;
  spu: string;
  quantity: number;
  price: number;
  product_id: string;
  order_id: string;
  status: string;
  payment_status: string;
  order_status: string;
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
