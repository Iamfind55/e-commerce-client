import { gql } from "@apollo/client";

export const QUERY_CUSTOMER_DASHBOARD = gql`
  query CustomerGetOrderDashboard($where: WhereOrderDasboardInput!) {
    customerGetOrderDashboard(where: $where) {
      success
      data {
        total_order
        order_status
      }
      error {
        message
        code
        details
      }
    }
  }
`;
