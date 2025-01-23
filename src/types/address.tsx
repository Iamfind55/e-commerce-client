export interface CustomerAddress {
  id: string;
  country: {
    country: string;
  };
  state?: {
    state?: string;
  };
  city: {
    city: string;
  };
  address: string;
  postal_code: string;
  email: string;
  phone_number: string;
  is_used: boolean;
  status?: string;
}

export interface GetCustomerAddressesResponse {
  getCustomerAddresses: {
    success: boolean;
    total: number;
    data: CustomerAddress[];
    error?: ErrorDetails;
  };
}
