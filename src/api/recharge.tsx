import { gql } from "@apollo/client";

export const MUTATION_CUSTOMER_RECHARGE = gql`
  mutation CustomerRechargeBalance($data: RechargeWalletInput!) {
    customerRechargeBalance(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_RECHARGE = gql`
  mutation ShopRechargeBalance($data: RechargeWalletInput!) {
    shopRechargeBalance(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SHOP_WITHDRAW = gql`
  mutation ShopWithdrawBalance($data: WithdrawWalletInput!) {
    shopWithdrawBalance(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
