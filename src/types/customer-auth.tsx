export interface ICustomerSignup {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  email?: string;
  phone_number?: string;
  dob?: string;
  image?: string;
}

export interface ICustomerLogin {
  username: string;
  password: string;
}

export interface ICustomers {
  id: string;
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  email?: string;
  phone_number?: string;
  dob?: string;
  image?: string;
  status: string;
  created_at?: string;
}

export interface IPaymentMethod {
  id: string;
  code: string;
  bank_name?: string;
  bank_account_name: string;
  bank_account_number: string;
}
