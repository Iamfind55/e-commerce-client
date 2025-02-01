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
