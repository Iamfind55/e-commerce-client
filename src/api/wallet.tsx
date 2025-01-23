import { gql } from "@apollo/client";

export const QUERY_WALLET_INFO = gql`
  query GetShopWallet {
    getShopWallet {
      success
      error {
        message
        code
        details
      }
      data {
        id
        name
        total_balance
        total_frozen_balance
        total_withdraw
        total_recharged
        total_withdraw_able_balance
        shop_id
        customer_id
        status
      }
    }
  }
`;
