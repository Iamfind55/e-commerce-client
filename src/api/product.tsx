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
