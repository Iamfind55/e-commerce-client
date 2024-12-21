import { gql } from "@apollo/client";

export const MUTATION_UPDATE_SHOP_PROFILE = gql`
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
        phone_number
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

export const MUTATION_CREATE_SHOP_SOCIAL = gql`
  mutation CreateShopSocial($data: CreateShopSocialInput!) {
    createShopSocial(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_SHOP_SOCIALS = gql`
  query GetShopSocials($where: ShopSocialWhereInput) {
    getShopSocials(where: $where) {
      success
      error {
        message
        code
        details
      }
      data {
        id
        name
        image
        link
        status
        created_at
      }
    }
  }
`;

export const MUTATION_DELETE_SHOP_SOCIAL = gql`
  mutation DeleteShopSocial($deleteShopSocialId: ID!) {
    deleteShopSocial(id: $deleteShopSocialId) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
