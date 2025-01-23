export interface IWalletData {
  id: string;
  name: string;
  total_balance: number;
  total_frozen_balance: number;
  total_withdraw: number;
  total_recharged: number;
  total_withdraw_able_balance: number;
  shop_id: string;
  customer_id: string;
  status: string;
}

export interface GetWalletResponse {
  getShopWallet: {
    success: boolean;
    data: IWalletData;
    error?: ErrorDetails;
  };
}
