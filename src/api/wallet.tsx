import { gql } from "@apollo/client";

export const QUERY_SHOP_WALLET = gql`
  query GetShopWallet {
    getShopWallet {
      success
      data {
        id
        name
        total_balance
        total_frozen_balance
        total_withdraw
        total_recharged
        total_withdraw_able_balance
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

export const QUERY_CUSTOMER_WALLET = gql`
  query GetCustomerWallet {
    getCustomerWallet {
      success
      data {
        id
        name
        total_balance
        total_frozen_balance
        total_withdraw
        total_recharged
        total_withdraw_able_balance
        customer_id
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

// export const QUERY_WALLET_CUSTOMER = gql`
//   query GetCustomerInformation {
//     getCustomerInformation {
//       success
//       data {
//         payment_method {
//           id
//           bank_name
//           code
//           bank_account_name
//           bank_account_number
//         }
//       }
//       error {
//         message
//         code
//         details
//       }
//     }
//   }
// `;
