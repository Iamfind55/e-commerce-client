import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query GetProducts(
    $where: ProductWhereInput
    $limit: Int
    $sortedBy: BaseOrderByInput
  ) {
    getProducts(where: $where, limit: $limit, sortedBy: $sortedBy) {
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
