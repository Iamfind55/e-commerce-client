import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query GetProducts($page: Int, $limit: Int, $where: ProductWhereInput) {
    getProducts(page: $page, limit: $limit, where: $where) {
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
      }
    }
  }
`;
