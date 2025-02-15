import { gql } from "@apollo/client";

export const QUERY_SHOP_ORDER = gql`
  query ShopGetOrders(
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
    $where: OrderWhereInput
  ) {
    shopGetOrders(
      limit: $limit
      page: $page
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        order_no
        payment_status
        order_status
        total_quantity
        total_price
        expected_revenue
        total_discount
        status
        status
        created_at
        delivery_type
        profit
        total_products
        sign_in_status
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_SHOP_ORDER_DETAILS = gql`
  query ShopGetOrderDetails(
    $where: OrderDetailWhereInput!
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
  ) {
    shopGetOrderDetails(
      where: $where
      limit: $limit
      page: $page
      sortedBy: $sortedBy
    ) {
      success
      total
      data {
        id
        product_name
        product_cover_image
        sku
        spu
        status
        inventory {
          my_inventory
          total_inventory
        }
        delivery_type
        discount
        quantity
        price
        order_no
        profit
        order_id
        order_status
        payment_status
        product_id
        created_at
        sign_in_status
      }
      error {
        message
        code
        details
      }
    }
  }
`;
