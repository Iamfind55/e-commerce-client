import React from "react";

// api
import { useLazyQuery } from "@apollo/client";
import { QUERY_CUSTOMER_ORDERS } from "@/api/customer-order";

// type and utils
import { GetCustomerOrderResponse, IOrderFilter } from "@/types/order";

const useFetchCustomerOrders = ({ filter }: { filter: IOrderFilter }) => {
  const { limit, page, order_no, order_status, createdAtBetween } = filter;
  const numericLimit = Number(limit);
  const [getCustomerOrders, { data, loading, refetch }] =
    useLazyQuery<GetCustomerOrderResponse>(QUERY_CUSTOMER_ORDERS, {
      fetchPolicy: "no-cache",
    });

  const fetchCustomerOrders = () => {
    getCustomerOrders({
      variables: {
        limit: numericLimit,
        page: page,
        sortedBy: "created_at_DESC",
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
    fetchCustomerOrders();
  }, [filter, getCustomerOrders]);

  return {
    getCustomerOrders,
    fetchCustomerOrders,
    loading,
    refetch,
    data: data?.customerGetOrders?.data?.map((items, index) => ({
      ...items,
      no: index + 1,
    })),
    total: data?.customerGetOrders?.total,
  };
};

export default useFetchCustomerOrders;
