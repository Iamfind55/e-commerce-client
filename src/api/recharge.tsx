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
