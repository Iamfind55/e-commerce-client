import { gql } from "@apollo/client";

export const MUTATION_CREATE_ORDER = gql`
  mutation CreateOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
      success
      message
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_PAY_FAILED_ORDER = gql`
  mutation PayOrderFailed($payOrderFailedId: ID!) {
    payOrderFailed(id: $payOrderFailedId) {
      success
      message
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_CANCEL_FAILED_ORDER = gql`
  mutation CancelOrderFailed($cancelOrderFailedId: ID!) {
    cancelOrderFailed(id: $cancelOrderFailedId) {
      success
      message
      error {
        message
        code
        details
      }
    }
  }
`;
