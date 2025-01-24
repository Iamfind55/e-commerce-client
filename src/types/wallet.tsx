export interface IWalletData {
  id: string;
  name: string;
  status: string;
  total_balance: number;
  total_frozen_balance: number;
  total_withdraw_able_balance: number;
}

export interface GetShopWalletResponse {
  getShopWallet: {
    success: boolean;
    data: IWalletData;
    error?: ErrorDetails;
  };
}

export interface GetCustomerWalletResponse {
  getCustomerWallet: {
    success: boolean;
    data: IWalletData;
    error?: ErrorDetails;
  };
}

export interface ICutomerRecharge {
  amout_recharged: number;
  coin_type: string;
  account_number: string;
  image: string;
}
