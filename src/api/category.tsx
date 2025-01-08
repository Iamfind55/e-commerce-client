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
