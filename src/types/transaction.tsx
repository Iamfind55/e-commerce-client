import { CreatedAtBetween } from "./product";

export interface ITransactionTypes {
  id?: string;
  type: string;
  amount: number;
  createdAt?: string;
  status?: string;
}

export interface ITransactionFilter {
  limit: number;
  page: number;
  identifier?: string | null;
  coin_type?: string | null;
  status?: string | null;
  createdAtBetween: CreatedAtBetween;
}

export interface ItransactionData {
  id: string;
  identifier: string;
  amount: number;
  coin_type: string;
  wallet_id: string;
  status: string;
  created_at: string;
  customer_id: string;
  payment_slip: string;
  transaction_status: string;
}

export interface GetShopTransactionResponse {
  shopGetTransactionHistories: {
    success: boolean;
    total: number;
    data: ItransactionData[];
    error?: ErrorDetails;
  };
}

export interface GetCustomerTransactionResponse {
  customerGetTransactionHistories: {
    success: boolean;
    total: number;
    data: ItransactionData[];
    error?: ErrorDetails;
  };
}
