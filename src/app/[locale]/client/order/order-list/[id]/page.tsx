"use client";

import React from "react";
import Loading from "@/components/loading";
import { useParams } from "next/navigation";
import { useLazyQuery } from "@apollo/client";
import Breadcrumb from "@/components/breadCrumb";
import { QUERY_SHOP_ORDER_DETAILS } from "@/api/order";
import OrderCardComponent from "@/components/orderCard";
import { GetShopOrderDetailResponse } from "@/types/order";

export default function ShopOrderListDetails() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [shopGetOrderDetails, { data, loading }] =
    useLazyQuery<GetShopOrderDetailResponse>(QUERY_SHOP_ORDER_DETAILS, {
      fetchPolicy: "no-cache",
    });
  React.useEffect(() => {
    shopGetOrderDetails({
      variables: {
        where: {
          order_no: id,
        },
        limit: 100,
        page: 1,
        sortedBy: "created_at_DESC",
      },
    });
  }, [shopGetOrderDetails]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", value: "/client" },
          { label: "Order list", value: "/client/order" },
          { label: "Order list detail", value: "/client/order-list/order-id" },
        ]}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="text-sm text-gray-500 rounded p-4 bg-white mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 sm:mx-0 mx-2">
            {data?.shopGetOrderDetails?.data?.map((val, index) => (
              <OrderCardComponent {...val} key={index + 1} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
