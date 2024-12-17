export interface IImage {
  logo: string | null;
  cover: string | null;
}

export interface IPaymentMethod {
  id: string | null;
  bank_name: string | null;
  code: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
}

export interface IUserData {
  id: string | null;
  fullname: string | null;
  username: string | null;
  email: string | null;
  dob: string | null;
  remark: string | null;
  image: IImage;
  payment_method: IPaymentMethod[];
  status: string | null;
  shop_vip: number | null;
  created_at: string | null;
}
