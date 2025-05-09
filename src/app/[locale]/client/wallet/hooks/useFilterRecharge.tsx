import React from "react";
import moment from "moment";
import { ITransactionFilter } from "@/types/transaction";

// Define the type for actions
type Action =
  | { type: "page"; payload: number | 1 }
  | { type: "limit"; payload: number | 10 }
  | { type: "coin_type"; payload: string | null }
  | { type: "identifier"; payload: string | null }
  | { type: "created_at_start_date"; payload: string | null }
  | { type: "created_at_end_date"; payload: string | null };

// Initial state
const initialState: ITransactionFilter = {
  page: 1,
  limit: 50,
  identifier: null,
  coin_type: null,
  createdAtBetween: {
    startDate: null,
    endDate: null,
  },
};

const ACTION_TYPE = {
  LIMIT: "limit",
  PAGE: "page",
  IDENTIFIER: "identifier",
  COIN_TYPE: "coin_type",
  CREATED_AT_START_DATE: "created_at_start_date",
  CREATED_AT_END_DATE: "created_at_end_date",
} as const;

const reducer = (
  state: ITransactionFilter,
  action: Action
): ITransactionFilter => {
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
      return { ...state, limit: action.payload, page: 1 };

    case ACTION_TYPE.IDENTIFIER:
      return { ...state, identifier: action.payload || null, page: 1 };

    case ACTION_TYPE.COIN_TYPE:
      return { ...state, coin_type: action.payload || null, page: 1 };

    case ACTION_TYPE.PAGE:
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

const useFilterTransaction = () => {
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

export default useFilterTransaction;
