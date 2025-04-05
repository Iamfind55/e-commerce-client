import { gql } from "@apollo/client";

export const SUBSCRIPTION_ORDER = gql`
  subscription SubscribeNewOrder($shopId: ID) {
    subscribeNewOrder(shopId: $shopId) {
      notification_type
    }
  }
`;

export const SUBSCRIPTION_UPDATE_ORDER = gql`
  subscription SubscribeUpdateOrderStatus($shopId: ID) {
    subscribeUpdateOrderStatus(shopId: $shopId) {
      success
      message
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_COUNT_NO_PICK_UP_ORDER = gql`
  query CountNewOrder($orderStatus: OrderStatus!) {
    countNewOrder(order_status: $orderStatus) {
      success
      total
      error {
        message
        code
        details
      }
    }
  }
`;