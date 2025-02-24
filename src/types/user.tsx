export interface IImage {
  logo: string | null;
  cover: string | null;
}

export interface ICardImages {
  id_card_number: "";
  id_card_image_front: "";
  id_card_image_back: "";
  id_card_image: "";
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
  password?: string | null;
  email: string | null;
  phone_number: string | null;
  dob?: string | null;
  remark?: string | null;
  image?: IImage;
  id_card_info?: ICardImages;
  payment_method?: IPaymentMethod[];
  store_name?: string | null;
  status?: string | null;
  shop_vip?: number | null;
  created_at?: string | null;
}

export interface IShopSocial {
  id?: string;
  name: string;
  link: string;
  image?: string;
  status?: string;
  created_at?: string;
}
