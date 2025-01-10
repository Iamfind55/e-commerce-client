import { gql } from "@apollo/client";

export const QUERY_BRANDINGS = gql`
  query GetBrandings(
    $limit: Int
    $page: Int
    $sortedBy: BaseOrderByInput
    $where: BrandingWhereInput
  ) {
    getBrandings(
      limit: $limit
      page: $page
      sortedBy: $sortedBy
      where: $where
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
