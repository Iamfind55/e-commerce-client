import React from "react";
import moment from "moment";
import { IShopProductFilter } from "@/types/shop";

// Define the type for actions
type Action =
  | { type: "shop_id"; payload: string | null }
  | { type: "status"; payload: string | null }
  | { type: "page"; payload: number | 1 }
  | { type: "keyword"; payload: string | null }
  | { type: "quantity"; payload: number | null }
  | { type: "created_at_start_date"; payload: string | null }
  | { type: "created_at_end_date"; payload: string | null }
  | { type: "sortedBy"; payload: string | null };

// Initial state
const initialState: IShopProductFilter = {
  limit: 15,
  page: 1,
  shop_id: null,
  status: null,
  keyword: null,
  quantity: null,
  sortedBy: null,
  createdAtBetween: {
    startDate: null,
    endDate: null,
  },
};

const ACTION_TYPE = {
  SHOP_ID: "shop_id",
  STATUS: "status",
  KEYWORD: "keyword",
  PAGE: "page",
  QUANTITY: "quantity",
  SORTED_BY: "sortedBy",
  CREATED_AT_START_DATE: "created_at_start_date",
  CREATED_AT_END_DATE: "created_at_end_date",
} as const;

const reducer = (
  state: IShopProductFilter,
  action: Action
): IShopProductFilter => {
  const startDate = action.payload ? moment(action.payload) : null;
  const endDate = moment(state.createdAtBetween.endDate);

  switch (action.type) {
    case ACTION_TYPE.CREATED_AT_START_DATE:
      return {
        ...state,
        createdAtBetween: {
          ...state.createdAtBetween,
          startDate: action.payload,
          ...(endDate.isValid() &&
            startDate?.isAfter(endDate) && {
              endDate: startDate.format("YYYY-MM-DD"),
            }),
          ...(!action.payload && {
            endDate: null,
          }),
        },
        ...(action.payload &&
          state.createdAtBetween.endDate && {
            page: 1,
          }),
      };

    case ACTION_TYPE.CREATED_AT_END_DATE:
      return {
        ...state,
        createdAtBetween: {
          ...state.createdAtBetween,
          endDate: action.payload,
          ...(startDate?.isValid() &&
            startDate?.isAfter(action.payload) && {
              startDate: action.payload,
            }),
          ...(!startDate?.isValid() && {
            startDate: action.payload,
          }),
        },
        ...(action.payload &&
          state.createdAtBetween.startDate && {
            page: 1,
          }),
      };

    case ACTION_TYPE.SHOP_ID:
      return { ...state, shop_id: action.payload || null, page: 1 };

    case ACTION_TYPE.STATUS:
      return { ...state, status: action.payload || null, page: 1 };

    case ACTION_TYPE.KEYWORD:
      return { ...state, keyword: action.payload || null, page: 1 };

    case ACTION_TYPE.QUANTITY:
      return { ...state, quantity: action.payload || null, page: 1 };

    case ACTION_TYPE.SORTED_BY:
      return { ...state, sortedBy: action.payload || null, page: 1 };

    case ACTION_TYPE.PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

const useShopProductFilter = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const data = React.useMemo(() => {
    const startDate = moment(state.createdAtBetween.startDate);
    const endDate = moment(state.createdAtBetween.endDate);
    return {
      ...state,
      createdAtBetween: {
        ...state.createdAtBetween,
        startDate: startDate.isValid() ? startDate.format("YYYY-MM-DD") : null,
        endDate: endDate.isValid() ? endDate.format("YYYY-MM-DD") : null,
      },
    };
  }, [state]);

  return {
    state,
    data,
    dispatch,
    ACTION_TYPE,
  };
};

export default useShopProductFilter;
