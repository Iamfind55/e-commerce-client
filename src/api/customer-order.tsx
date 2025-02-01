import { gql } from "@apollo/client";

export const QUERY_CUSTOMER_ORDERS = gql`
  query CustomerGetOrders(
    $sortedBy: BaseOrderByInput
    $page: Int
    $limit: Int
    $where: OrderWhereInput
  ) {
    customerGetOrders(
      sortedBy: $sortedBy
      page: $page
      limit: $limit
      where: $where
    ) {
      success
      total
      data {
        id
        order_no
        total_quantity
        total_price
        total_discount
        expected_revenue
        status
        order_status
        payment_status
        customer_id
        payment_slip
        created_at
        delivery_type
      }
      error {
        message
        code
        details
      }
    }
  }
`;
