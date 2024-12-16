import { gql } from "@apollo/client";

export const SHOP_REGISTER = gql`
  mutation ShopRegister($data: CreateShopInput!) {
    shopRegister(data: $data) {
      data {
        token
      }
      error {
        message
        code
        details
      }
      success
    }
  }
`;
