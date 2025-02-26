import { gql } from "@apollo/client";

export const MUTATION_SHOP_REGISTER = gql`
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

export const MUTATION_SHOP_SIGN_IN = gql`
  mutation ShopLogin($where: ShopWhereLoginInput) {
    shopLogin(where: $where) {
      success
      data {
        token
        data {
          id
          fullname
          username
          email
          phone_number
          dob
          remark
          shop_address
          image {
            logo
            cover
          }
          payment_method {
            id
            bank_name
            code
            bank_account_name
            bank_account_number
          }
          status
          shop_vip
          created_by
          created_at
          updated_at
          store_name
          id_card_info {
            id_card_number
            id_card_image_front
            id_card_image_back
            id_card_image
          }
        }
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_FORGOT_PASSWORD = gql`
  mutation ShopForgotPassword($email: String!) {
    shopForgotPassword(email: $email) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_RESET_PASSWORD = gql`
  mutation ShopResetPassword($data: ShopResetPasswordInput!) {
    shopResetPassword(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
