import { gql } from "@apollo/client";

export const QUERY_CUSTOMER_TRANSACTION_HISTORIES = gql`
  query CustomerGetTransactionHistories(
    $sortedBy: BaseOrderByInput
    $page: Int
    $limit: Int
    $where: TransactionHistoryWhereInput
  ) {
    customerGetTransactionHistories(
      sortedBy: $sortedBy
      page: $page
      limit: $limit
      where: $where
    ) {
      success
      total
      data {
        id
        identifier
        amount
        coin_type
        wallet_id
        status
        created_at
        customer_id
        transaction_status
        payment_slip
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_SHOP_TRANSACTION_HISTORIES = gql`
  query ShopGetTransactionHistories(
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
    $where: TransactionHistoryWhereInput
  ) {
    shopGetTransactionHistories(
      limit: $limit
      page: $page
      sortedBy: $sortedBy
      where: $where
    ) {
      success
      total
      data {
        id
        amount
        coin_type
        transaction_status
        wallet_id
        shop_id
        identifier
        payment_slip
        created_at
        status
      }
      error {
        message
        code
        details
      }
    }
  }
`;
