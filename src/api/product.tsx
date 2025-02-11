import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query GetProducts(
    $where: ProductWhereInput
    $limit: Int
    $sortedBy: BaseOrderByInput
    $page: Int
  ) {
    getProducts(
      where: $where
      limit: $limit
      sortedBy: $sortedBy
      page: $page
    ) {
      success
      total
      data {
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
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_BEST_SELLING_PRODUCTS = gql`
  query GetBestSellingProducts($limit: Int) {
    getBestSellingProducts(limit: $limit) {
      success
      total
      data {
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
        sell_count
        created_by
        created_at
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

export const QUERY_SINGLE_PRODUCT = gql`
  query GetProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
      success
      data {
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
        categories {
          id
          name {
            name_en
          }
        }
        brand_id
        status
        recommended
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_SIMILAR_PRODUCT = gql`
  query GetSimilarProducts($limit: Int, $where: SimilarProductWhereInput) {
    getSimilarProducts(limit: $limit, where: $where) {
      success
      data {
        id
        name {
          name_en
        }
        description {
          name_en
        }
        cover_image
        price
        discount
        quantity
        total_star
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_CREATE_SHOP_PRODUCT = gql`
  mutation CreateShopProduct($data: CreateShopProductInput!) {
    createShopProduct(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
