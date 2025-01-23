export interface IPaymentMethod {
  id: string;
  bank_name: string;
  code: string;
  bank_account_name: string;
  bank_account_number: string;
}

export interface Ipayment {
  payment_method: IPaymentMethod[];
}

export interface GetPaymentResponse {
  getCustomerInformation: {
    success: boolean;
    data: Ipayment;
    error?: ErrorDetails;
  };
}
