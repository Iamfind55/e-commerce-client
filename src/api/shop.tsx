import { gql } from "@apollo/client";

export const UPDATE_SHOP_PROFILE = gql`
  mutation UpdateShopInformation($data: UpdateShopInformationInput!) {
    updateShopInformation(data: $data) {
      success
      error {
        message
        code
        details
      }
      data {
        id
        fullname
        username
        email
        dob
        remark
        image {
          logo
          cover
        }
        status
        shop_vip
      }
    }
  }
`;
