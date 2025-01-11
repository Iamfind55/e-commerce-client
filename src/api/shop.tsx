import { gql } from "@apollo/client";

export const QUERY_SHOPS = gql`
  query GetShops(
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
    $where: ShopWhereInput
  ) {
    getShops(limit: $limit, page: $page, sortedBy: $sortedBy, where: $where) {
      success
      total
      data {
        id
        fullname
        username
        phone_number
        email
        remark
        image {
          logo
          cover
        }
        status
        shop_vip
        created_at
      }
      error {
        message
        code
        details
      }
    }
  }
`;

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

export const QUERY_SHOP_PRODUCTS = gql`
  query GetShopProducts(
    $page: Int
    $limit: Int
    $sortedBy: BaseOrderByInput
    $where: ShopProductWhereInput
  ) {
    getShopProducts(
      page: $page
      limit: $limit
      sortedBy: $sortedBy
      where: $where
    ) {
      total
      error {
        message
        code
        details
      }
      success
      data {
        id
        quantity
        product_id
        productData {
          id
          name {
            name_en
          }
          description {
            name_en
          }
          images
          cover_image
          price
          discount
          quantity
          sku
          spu
          total_star
          total_comment
          category_ids
          brand_id
          status
          recommended
          product_top
          product_vip
          created_at
        }
        status
        created_at
      }
    }
  }
`;

export const QUERY_SHOP_SINGLE_PRODUCT = gql`
  query GetShopProduct($getShopProductId: ID!) {
    getShopProduct(id: $getShopProductId) {
      success
      data {
        id
        quantity
        product_id
        productData {
          id
          name {
            name_en
          }
          description {
            name_en
          }
          images
          cover_image
          price
          discount
          quantity
          sku
          spu
          total_star
          total_comment
          category_ids
          brand_id
          status
          recommended
          product_top
          product_vip
        }
        status
        updated_at
      }
      error {
        message
        code
        details
      }
    }
  }
`;
