import { gql } from "@apollo/client";

export const QUERY_BANNERS = gql`
  query GetBanners($where: BannerWhereInput) {
    getBanners(where: $where) {
      success
      total
      data {
        id
        name
        image
        link_url
        position
      }
      error {
        message
        code
        details
      }
    }
  }
`;
