import { IFilter } from "@/types/product";
import moment from "moment";
import React from "react";

// Define the type for actions
type Action =
  | { type: "status"; payload: string | null }
  | { type: "page"; payload: number | 1 }
  | { type: "keyword"; payload: string | null }
  | { type: "brand_id"; payload: string | null }
  | { type: "category_id"; payload: string | null }
  | { type: "product_vip"; payload: boolean | null }
  | { type: "product_top"; payload: boolean | null }
  | { type: "price_between"; payload: [number, number] | null }
  | { type: "created_at_start_date"; payload: string | null }
  | { type: "created_at_end_date"; payload: string | null };

// Initial state
const initialState: IFilter = {
  limit: 3,
  page: 1,
  status: null,
  keyword: null,
  brand_id: null,
  category_id: null,
  product_vip: null,
  product_top: null,
  price_between: null,
  createdAtBetween: {
    startDate: null,
    endDate: null,
  },
};

const ACTION_TYPE = {
  STATUS: "status",
  KEYWORD: "keyword",
  PAGE: "page",
  BRAND_ID: "brand_id",
  CATEGORY_ID: "category_id",
  PRODUCT_VIP: "product_vip",
  PRODUCT_TOP: "product_top",
  PRICE_BETWEEN: "price_between",
  CREATED_AT_START_DATE: "created_at_start_date",
  CREATED_AT_END_DATE: "created_at_end_date",
} as const;

const reducer = (state: IFilter, action: Action): IFilter => {
  const startDate = moment(state.createdAtBetween.startDate);
  const endDate = moment(state.createdAtBetween.endDate);

  switch (action.type) {
    case ACTION_TYPE.CREATED_AT_START_DATE:
      return {
        ...state,
        createdAtBetween: {
          ...state.createdAtBetween,
          startDate: action.payload,
          ...(endDate.isValid() &&
            moment(action.payload).isAfter(endDate) && {
              endDate: action.payload,
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
          ...(startDate.isValid() &&
            startDate.isAfter(action.payload) && {
              startDate: action.payload,
            }),
          ...(!startDate.isValid() && {
            startDate: action.payload,
          }),
        },
        ...(action.payload &&
          state.createdAtBetween.startDate && {
            page: 1,
          }),
      };

    case ACTION_TYPE.STATUS:
      return { ...state, status: action.payload || null, page: 1 };

    case ACTION_TYPE.KEYWORD:
      return { ...state, keyword: action.payload || null, page: 1 };

    case ACTION_TYPE.BRAND_ID:
      return { ...state, brand_id: action.payload || null, page: 1 };

    case ACTION_TYPE.CATEGORY_ID:
      return { ...state, category_id: action.payload || null, page: 1 };

    case ACTION_TYPE.PRODUCT_VIP:
      return { ...state, product_vip: action.payload || null, page: 1 };

    case ACTION_TYPE.PRODUCT_TOP:
      return { ...state, product_top: action.payload || null };

    case ACTION_TYPE.PRICE_BETWEEN:
      return { ...state, price_between: action.payload || null, page: 1 };

    case ACTION_TYPE.PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

const useFilter = () => {
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

export default useFilter;
