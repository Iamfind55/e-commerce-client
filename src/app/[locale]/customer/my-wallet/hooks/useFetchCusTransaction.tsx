import React from "react";

// api
import { useLazyQuery } from "@apollo/client";

// type and utils
import { QUERY_CUSTOMER_TRANSACTION_HISTORIES } from "@/api/transaction";
import {
  GetCustomerTransactionResponse,
  ITransactionFilter,
} from "@/types/transaction";

const useFetchCustomerTransactionHistories = ({
  filter,
}: {
  filter: ITransactionFilter;
}) => {
  const { limit, page, identifier, createdAtBetween } = filter;

  const [getCustomerTransactions, { data, loading }] =
    useLazyQuery<GetCustomerTransactionResponse>(
      QUERY_CUSTOMER_TRANSACTION_HISTORIES,
      {
        fetchPolicy: "no-cache",
      }
    );

  const fetchCustomerTransactions = () => {
    getCustomerTransactions({
      variables: {
        orderBy: "created_at_DESC",
        limit: limit,
        page: page,
        where: {
          ...(identifier && { identifier: identifier }),
          ...(createdAtBetween?.startDate &&
            createdAtBetween.endDate && {
              createdAtBetween: {
                startDate: createdAtBetween.startDate,
                endDate: createdAtBetween.endDate,
              },
            }),
        },
        sortedBy: "created_at_DESC",
      },
    });
  };

  React.useEffect(() => {
    fetchCustomerTransactions();
  }, [filter, getCustomerTransactions]);

  return {
    getCustomerTransactions,
    fetchCustomerTransactions,
    loading,
    data: data?.customerGetTransactionHistories?.data?.map((items, index) => ({
      ...items,
      no: index + 1,
    })),
    total: data?.customerGetTransactionHistories?.total,
  };
};

export default useFetchCustomerTransactionHistories;
