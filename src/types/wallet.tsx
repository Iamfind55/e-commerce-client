export interface IWalletData {
  id: string;
  name: string;
  status: string;
  total_balance: number;
  total_frozen_balance: number;
  total_withdraw_able_balance: number;
}

export interface GetWalletResponse {
  getShopWallet: {
    success: boolean;
    data: IWalletData;
    error?: ErrorDetails;
  };
}
