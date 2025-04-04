import { gql } from "@apollo/client";

export const TRANSACTION_SUBSCRIPTION = gql`
  subscription TransactionSubscribe {
    transactionSubscribe {
      notification_type
    }
  }
`;

export const SUBSCRIPTION_ORDER = gql`
  subscription SubscribeNewOrder($shopId: ID) {
    subscribeNewOrder(shopId: $shopId) {
      notification_type
    }
  }
`;

export const QUERY_COUNT_NEW_TRANSACTION = gql`
  query CountNewTransaction {
    countNewTransaction {
      total
      success
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
