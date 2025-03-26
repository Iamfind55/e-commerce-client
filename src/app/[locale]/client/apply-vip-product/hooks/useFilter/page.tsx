import React from "react";
import { IFilter } from "@/types/product";

// Define the type for actions
type Action =
  | { type: "page"; payload: number | 1 }
  | { type: "status"; payload: string | null }
  | { type: "product_vip"; payload: number | null };

// Initial state
const initialState: IFilter = {
  page: 1,
  limit: 50,
  product_vip: 1,
  createdAtBetween: {
    startDate: null,
    endDate: null,
  },
};

const ACTION_TYPE = {
  PAGE: "page",
  STATUS: "status",
  PRODUCT_VIP: "product_vip",
} as const;

const reducer = (state: IFilter, action: Action): IFilter => {
  switch (action.type) {
    case ACTION_TYPE.PRODUCT_VIP:
      return { ...state, product_vip: action.payload || null, page: 1 };

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
