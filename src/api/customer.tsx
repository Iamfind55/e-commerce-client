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
