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
