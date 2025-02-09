import React from "react";

// api
import { useLazyQuery } from "@apollo/client";
import {
  GetShopTransactionResponse,
  ITransactionFilter,
} from "@/types/transaction";
import { QUERY_SHOP_TRANSACTION_HISTORIES } from "@/api/transaction";

const useFetchShopTransactions = ({
  filter,
}: {
  filter: ITransactionFilter;
}) => {
  const { identifier, coin_type, limit, page, createdAtBetween } = filter;
  const numericLimit = Number(limit);

  const [getShopTransactions, { data }] =
    useLazyQuery<GetShopTransactionResponse>(QUERY_SHOP_TRANSACTION_HISTORIES, {
      fetchPolicy: "no-cache",
    });

  const fetchShopTransactions = () => {
    getShopTransactions({
      variables: {
        orderBy: "created_at_DESC",
        limit: numericLimit,
        page: page,
        where: {
          ...(identifier && { identifier: identifier }),
          ...(coin_type && { coin_type: coin_type }),
          ...(createdAtBetween?.startDate &&
            createdAtBetween.endDate && {
              createdAtBetween: {
                startDate: createdAtBetween.startDate,
                endDate: createdAtBetween.endDate,
              },
            }),
        },
      },
    });
  };

  React.useEffect(() => {
    fetchShopTransactions();
  }, [filter, getShopTransactions]);

  return {
    getShopTransactions,
    fetchShopTransactions,
    data: data?.shopGetTransactionHistories?.data?.map(
      (transaction, index) => ({
        ...transaction,
        no: index + 1,
      })
    ),
    total: data?.shopGetTransactionHistories?.total,
  };
};

export default useFetchShopTransactions;
