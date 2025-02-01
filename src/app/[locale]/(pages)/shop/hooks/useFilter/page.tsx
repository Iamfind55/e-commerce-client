import { IShopFilter } from "@/types/shop";
import React from "react";

// Define the type for actions
type Action =
  | { type: "status"; payload: string | null }
  | { type: "page"; payload: number | 1 }
  | { type: "keyword"; payload: string | null }
  | { type: "shop_vip"; payload: number | null }
  | { type: "created_at_DESC"; payload: string | null };

// Initial state
const initialState: IShopFilter = {
  limit: 10,
  page: 1,
  status: null,
  keyword: null,
  shop_vip: null,
  created_at_DESC: null,
};

const ACTION_TYPE = {
  STATUS: "status",
  KEYWORD: "keyword",
  PAGE: "page",
  SHOP_VIP: "shop_vip",
  CREATED_DESC: "created_at_DESC",
} as const;

const reducer = (state: IShopFilter, action: Action): IShopFilter => {
  switch (action.type) {
    case ACTION_TYPE.STATUS:
      return { ...state, status: action.payload || null, page: 1 };

    case ACTION_TYPE.KEYWORD:
      return { ...state, keyword: action.payload || null, page: 1 };

    case ACTION_TYPE.SHOP_VIP:
      return { ...state, shop_vip: action.payload || null, page: 1 };

    case ACTION_TYPE.CREATED_DESC:
      return { ...state, created_at_DESC: action.payload || null, page: 1 };

    case ACTION_TYPE.PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

const useFilter = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const data = React.useMemo(() => {
    return {
      ...state,
    };
  }, [state]);

  return {
    state,
    data,
    dispatch,
    ACTION_TYPE,
  };
};

export default useFilter;
