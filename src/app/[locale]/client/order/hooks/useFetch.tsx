import React from "react";
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP_ORDER } from "@/api/order";
import { IFilter } from "@/types/product";
import { GetShopOrderResponse } from "@/types/order";

const useFetchShopOrders = ({ filter }: { filter: IFilter }) => {
  const { order_status, order_no, limit, page, createdAtBetween } = filter;
  const numericLimit = Number(limit);

  console.log(order_no);
  const [shopGetOrders, { data, refetch }] = useLazyQuery<GetShopOrderResponse>(
    QUERY_SHOP_ORDER,
    {
      fetchPolicy: "no-cache",
    }
  );

  const fetchShopOrders = () => {
    shopGetOrders({
      variables: {
        orderBy: "created_at_DESC",
        limit: numericLimit,
        page: page,
        where: {
          ...(order_no && { order_no: order_no }),
          ...(order_status && { order_status: order_status }),
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
    fetchShopOrders();
  }, [filter, shopGetOrders]);

  return {
    shopGetOrders,
    fetchShopOrders,
    refetch,
    data: data?.shopGetOrders?.data?.map((order, index) => ({
      ...order,
      no: index + 1,
    })),
    total: data?.shopGetOrders?.total,
  };
};

export default useFetchShopOrders;
