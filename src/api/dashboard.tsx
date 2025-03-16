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

export const QUERY_SHOP_DASHBOARDS = gql`
  query ShopGetProductDashboard {
    shopGetProductDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetTotalCanceledOrderDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetTotalExpenseDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetTotalIncomeDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetTotalNewOrderDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetTotalOrderDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetTotalTodayIncomeDashboard {
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
      success
    }
    shopGetTotalTodayProfitDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetUnreadMessageDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
    shopGetIllegalOperationDashboard {
      success
      data {
        total
        increase
      }
      error {
        message
        code
        details
      }
    }
  }
`;
