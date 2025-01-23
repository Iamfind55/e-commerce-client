import { gql } from "@apollo/client";

export const MUTATION_CREATE_CUSTOMER_ADDRESS = gql`
  mutation CreateCustomerAddress($data: CreateShopAddressInput!) {
    createCustomerAddress(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_UPDATE_CUSTOMER_ADDRESS = gql`
  mutation UpdateCustomerAddress($data: UpdateShopAddressInput!) {
    updateCustomerAddress(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_CUSTOMER_ADDRESS = gql`
  query GetCustomerAddresses($where: ShopAddressWhereInput) {
    getCustomerAddresses(where: $where) {
      success
      total
      data {
        id
        country {
          country
        }
        state {
          state
        }
        city {
          city
        }
        address
        postal_code
        email
        phone_number
        is_used
        status
      }
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_DELETE_CUSTOMER_ADDRESS = gql`
  mutation DeleteCustomerAddress($deleteCustomerAddressId: ID!) {
    deleteCustomerAddress(id: $deleteCustomerAddressId) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const MUTATION_SET_DEFAULT_ADDRESS = gql`
  mutation SetCustomerAddressDefaultToUse(
    $setCustomerAddressDefaultToUseId: ID!
  ) {
    setCustomerAddressDefaultToUse(id: $setCustomerAddressDefaultToUseId) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;
