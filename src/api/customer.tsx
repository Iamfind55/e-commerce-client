import { gql } from "@apollo/client";

export const MUTATION_UPDATE_CUSTOMER_PROFILE = gql`
  mutation UpdateCustomerInformation($data: UpdateCustomerInformationInput!) {
    updateCustomerInformation(data: $data) {
      success
      data {
        id
        firstName
        lastName
        username
        email
        phone_number
        dob
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

export const MUTATION_UPDATE_PAYMENT_METHOD = gql`
  mutation UpdateCustomerInformation($data: UpdateCustomerInformationInput!) {
    updateCustomerInformation(data: $data) {
      success
      error {
        message
        code
        details
      }
    }
  }
`;

export const QUERY_CUSTOMER_PAYMENT_METHOD = gql`
  query GetCustomerInformation {
    getCustomerInformation {
      success
      data {
        payment_method {
          id
          bank_name
          code
          bank_account_name
          bank_account_number
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
