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
