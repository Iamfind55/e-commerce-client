import { IFilter } from "@/types/product";
import moment from "moment";
import React from "react";

// Define the type for actions
type Action =
  | { type: "page"; payload: number | 1 }
  | { type: "limit"; payload: number | 10 }
  | { type: "order_no"; payload: string | null }
  | { type: "status"; payload: string | null }
  | { type: "keyword"; payload: string | null }
  | { type: "notification_type"; payload: string | null }
  | { type: "created_at_start_date"; payload: string | null }
  | { type: "created_at_end_date"; payload: string | null };

// Initial state
const initialState: IFilter = {
  limit: 50,
  status: null,
  order_no: null,
  keyword: null,
  notification_type: null,
  page: 1,
  createdAtBetween: {
    startDate: null,
    endDate: null,
  },
};

const ACTION_TYPE = {
  LIMIT: "limit",
  PAGE: "page",
  STATUS: "status",
  KEYWORD: "keyword",
  ORDER_NO: "order_no",
  NOTIFICATION_TYPE: "notification_type",
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

    case ACTION_TYPE.LIMIT:
      return { ...state, limit: action.payload };

    case ACTION_TYPE.NOTIFICATION_TYPE:
      return { ...state, notification_type: action.payload || null, page: 1 };

    case ACTION_TYPE.STATUS:
      return { ...state, status: action.payload || null, page: 1 };

    case ACTION_TYPE.ORDER_NO:
      return { ...state, order_no: action.payload || null, page: 1 };

    case ACTION_TYPE.KEYWORD:
      return { ...state, keyword: action.payload || null, page: 1 };

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
