import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  query GetCategories($where: CategoryWhereInput, $sortedBy: BaseOrderByInput) {
    getCategories(where: $where, sortedBy: $sortedBy) {
      success
      total
      data {
        id
        name {
          name_en
        }
        parent_id
        image
      }
      error {
        message
        code
        details
      }
    }
  }
`;
