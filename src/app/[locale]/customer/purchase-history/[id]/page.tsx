"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useLazyQuery } from "@apollo/client";

// APIs
import { QUERY_CUSTOMER_ORDERS_DETAILS } from "@/api/customer-order";

// components
import { formatDate } from "@/utils/dateFormat";
import Breadcrumb from "@/components/breadCrumb";
import { truncateText } from "@/utils/letterLimitation";
import { GetCustomerOrderDetailResponse } from "@/types/order";
import { useTranslations } from "next-intl";

export default function PurchaseHistoryDetails() {
  const params = useParams();
  const i = useTranslations("instrument_panel");
  const t = useTranslations("purchase_history");
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [getCusOrderDetails, { data }] =
    useLazyQuery<GetCustomerOrderDetailResponse>(
      QUERY_CUSTOMER_ORDERS_DETAILS,
      {
        fetchPolicy: "no-cache",
      }
    );

  React.useEffect(() => {
    getCusOrderDetails({
      variables: {
        where: {
          order_no: id,
        },
      },
    });
  }, [getCusOrderDetails]);

  return (
    <>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <Breadcrumb
          items={[
            { label: i("_customer"), value: "/customer" },
            {
              label: t("_purchase_history"),
              value: "/customer/purchase-history",
            },
            {
              label: t("_purchase_history_detail"),
              value: "/customer/purchase-history/id",
            },
          ]}
        />
        <div className="flex items-start justify-start flex-col w-full rounded p-4 bg-white gap-4">
          <div className="flex items-center justify-center w-full">
            <h1 className="uppercase underline">{t("_invoice")}:</h1>
          </div>

          <div className="flex items-start justify-between w-full">
            <div>
              <p className="text-xs font-bold">{t("_detail")}:</p>
              <p className="text-xs">
                {t("_order_status")}:&nbsp;
                <span>
                  {data?.customerGetOrderDetails?.data[0].order_status}
                </span>
              </p>
              <p className="text-xs">
                {t("_delivery_type")}:&nbsp;
                <span>
                  {data?.customerGetOrderDetails?.data[0].delivery_type}
                </span>
              </p>
              <p className="text-xs">
                {t("_payment_status")}:&nbsp;
                <span>
                  {data?.customerGetOrderDetails?.data[0].payment_status}
                </span>
              </p>
            </div>

            <div>
              <p className="text-xs font-bold">
                {t("_invoice_no")}:&nbsp;
                <span className="font-normal">
                  {data?.customerGetOrderDetails?.data[0].order_no}
                </span>
              </p>
              <p className="text-xs font-bold">
                {t("_created_at")}:&nbsp;
                <span className="font-normal">
                  {formatDate(
                    data?.customerGetOrderDetails?.data[0]?.created_at ?? ""
                  )}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full relative overflow-x-auto shadow">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-600 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {i("_product")}
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    {t("_price")}
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    {t("_quantity")}
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    {t("_sub_total")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.customerGetOrderDetails?.data.map((val, index) => (
                  <tr
                    className="odd:bg-white even:bg-gray-100 border-b border-gray-200 text-xs"
                    key={val?.id}
                  >
                    <th
                      scope="row"
                      className="hidden sm:block px-6 py-4 whitespace-wrap"
                    >
                      {val?.product_name &&
                        truncateText(
                          JSON.parse(val.product_name).name_en.trim(),
                          100
                        )}
                    </th>
                    <th
                      scope="row"
                      className="block sm:hidden px-6 py-4 whitespace-wrap"
                    >
                      {val?.product_name &&
                        truncateText(
                          JSON.parse(val.product_name).name_en.trim(),
                          5
                        )}
                    </th>
                    <td className="px-6 py-4 text-center">
                      ${val?.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">{val?.quantity}</td>
                    <td className="px-6 py-4 text-center">
                      ${val?.price * val?.quantity}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold text-gray-800">
                  <td colSpan={3} className="px-6 py-4 text-right">
                    {t("_total_price")}:
                  </td>
                  <td className="px-6 py-4 text-center">
                    $
                    {data?.customerGetOrderDetails?.data
                      .reduce((sum, val) => sum + val.price * val.quantity, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
