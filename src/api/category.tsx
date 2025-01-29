import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query GetCategories(
    $where: CategoryWhereInput
    $limit: Int
    $sortedBy: BaseOrderByInput
    $page: Int
  ) {
    getCategories(
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
        image
        status
        parent_id
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

export const QUERY_CATEGORIES_HEADER = gql`
  query GetCategories($where: CategoryWhereInput, $sortedBy: BaseOrderByInput) {
    getCategories(where: $where, sortedBy: $sortedBy) {
      success
      total
      data {
        id
        name {
          name_en
        }
        subcategories {
          id
          name {
            name_en
          }
          subcategories {
            id
            name {
              name_en
            }
            subcategories {
              id
              name {
                name_en
              }
            }
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
