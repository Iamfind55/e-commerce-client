import React from "react";
import { IFilter } from "@/types/product";
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP_NOTIFICATIONS } from "@/api/notification";
import { GetShopNotificationResponse } from "@/types/notification";

const useFetchNotifications = ({ filter }: { filter: IFilter }) => {
  const {
    notification_type,
    keyword,
    status,
    order_no,
    limit,
    page,
    createdAtBetween,
  } = filter;
  const numericLimit = Number(limit);

  const [shopGetNotifications, { data, refetch }] =
    useLazyQuery<GetShopNotificationResponse>(QUERY_SHOP_NOTIFICATIONS, {
      fetchPolicy: "no-cache",
    });

  const fetchShopOrders = () => {
    shopGetNotifications({
      variables: {
        orderBy: "created_at_DESC",
        limit: numericLimit,
        page: page,
        where: {
          ...(status && { status: status }),
          ...(keyword && { keyword: keyword }),
          ...(order_no && { order_no: order_no }),
          ...(notification_type && { notification_type: notification_type }),
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
  }, [filter, shopGetNotifications]);

  return {
    shopGetNotifications,
    fetchShopOrders,
    refetch,
    data: data?.shopGetNotifications?.data?.map((order, index) => ({
      ...order,
      no: index + 1,
    })),
    total: data?.shopGetNotifications?.total,
  };
};

export default useFetchNotifications;
