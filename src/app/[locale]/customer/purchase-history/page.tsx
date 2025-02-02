"use client";

import { Link, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

// components
import Select from "@/components/select";
import StatusBadge from "@/components/status";
import IconButton from "@/components/iconButton";
import Breadcrumb from "@/components/breadCrumb";
import DatePicker from "@/components/datePicker";
import Pagination from "@/components/pagination";

// hooks and utils
import useFilter from "./hooks/useFilter/page";
import { truncateText } from "@/utils/letterLimitation";
import { formatDateTimeToDate } from "@/utils/dateFormat";
import useFetchCustomerOrders from "./hooks/useFetchOrder";
import { page_limits, product_status } from "@/utils/option";

export default function PurchaseHistory() {
  const router = useRouter();
  const t = useTranslations("purchase_history");
  const i = useTranslations("instrument_panel");
  const filter = useFilter();
  const fetchOrders = useFetchCustomerOrders({ filter: filter.data });

  return (
    <>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <Breadcrumb
          items={[
            { label: i("_customer"), value: "/customer" },
            { label: t("_purchase_history"), value: "/purchase-history" },
          ]}
        />

        <div className="w-full mt-1 sm:mt-4 bg-white rounded p-4">
          <div className="w-full hidden sm:block">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
              <div className="flex items-start justify-start gap-2">
                <Select
                  name="page_limit"
                  title="Show"
                  option={page_limits}
                  className="h-8"
                />
              </div>
              <div className="flex items-start justify-statr gap-2">
                <Select
                  name="status"
                  title={t("_status")}
                  option={product_status}
                  className="h-8"
                  onChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.ORDER_STATUS,
                      payload: e.target.value,
                    });
                  }}
                />
                <div className="flex items-end justify-start gap-2">
                  <DatePicker
                    name="start_date"
                    title={t("_start_date")}
                    className="h-8"
                    value={filter?.state?.createdAtBetween?.startDate ?? ""}
                    onChange={(e) => {
                      filter.dispatch({
                        type: filter.ACTION_TYPE.CREATED_AT_START_DATE,
                        payload: e.target.value,
                      });
                    }}
                  />
                  <DatePicker
                    name="end_date"
                    title={t("_end_date")}
                    className="h-8"
                    value={filter?.state?.createdAtBetween?.endDate ?? ""}
                    onChange={(e) => {
                      filter.dispatch({
                        type: filter.ACTION_TYPE.CREATED_AT_END_DATE,
                        payload: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <table className="w-full border rounded bg-gray overflow-x-auto text-left text-sm rtl:text-right mt-4 pl-2">
              <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
                <tr className="border-b border-gray">
                  <th scope="col" className="py-3 pl-1">
                    {t("_order_no")}
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    {t("_price")}
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    {t("_quantity")}
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    {t("_delivery")}
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    {t("_payment")}
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    {t("_created_at")}
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-1 flex items-center justify-center"
                  >
                    {t("_action")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchOrders?.data?.map((order, index: number) => (
                  <tr
                    key={order.id + index}
                    className="border-b border-gray bg-white hover:bg-gray py-6 text-gray-500 cursor-pointer"
                  >
                    <td className="pl-2">
                      <Link
                        href={`purchase-history/${order?.order_no}`}
                        className="text-xs text-neon_pink underline"
                      >
                        {truncateText(order.order_no, 30)}
                      </Link>
                    </td>
                    <td className="text-xs text-center">
                      ${order.total_price.toFixed(2)}
                    </td>
                    <td className="text-xs text-center">
                      {order.total_quantity}
                    </td>
                    <td>
                      <p className="text-xs text-center">
                        {order.delivery_type}
                      </p>
                    </td>
                    <td className="text-xs text-center">
                      <StatusBadge
                        status={
                          order.payment_status === "COMPLETED"
                            ? "completed"
                            : "failed"
                        }
                      />
                    </td>
                    <td>
                      <p className="text-xs text-center">
                        {formatDateTimeToDate(order.created_at)}
                      </p>
                    </td>
                    {order.payment_status === "FAILED" ? (
                      <td className="pl-2 py-4 flex items-center justify-center gap-2">
                        <IconButton
                          className="rounded border text-gray-500 p-0 w-auto text-xs"
                          type="button"
                          title={t("_pay_button")}
                        />
                        <IconButton
                          className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                          title={t("_cancel_button")}
                          type="submit"
                        />
                      </td>
                    ) : (
                      <td className="pl-2 py-4 flex items-center justify-center gap-2">
                        <IconButton
                          className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                          title={t("_detail")}
                          type="button"
                          onClick={() =>
                            router.push(`/purchase-history/${order.order_no}`)
                          }
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex items-end justify-end mb-4">
              <Pagination
                filter={filter.data}
                totalPage={Math.ceil(
                  (fetchOrders.total ?? 0) / filter.data.limit
                )}
                onPageChange={(e) => {
                  filter.dispatch({
                    type: filter.ACTION_TYPE.PAGE,
                    payload: e,
                  });
                }}
              />
            </div>
          </div>
          <div className="block sm:hidden">
            {fetchOrders?.data?.map((val, index: number) => (
              <div
                key={val.id + index}
                className="w-full flex items-start justify-start flex-col gap-2 border rounded p-2 my-2"
              >
                <div className="w-full flex items-start justify-start gap-4">
                  <p className="text-xs">{val?.order_no}</p>
                </div>
                <div className="w-full flex items-end justify-between">
                  <div className="w-full flex items-start justify-between flex-col gap-1">
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">{t("_price")}: </p>
                      <p className="text-xs">&nbsp;&nbsp;${val?.total_price}</p>
                    </div>
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">
                        {t("_quantity")}:{" "}
                      </p>
                      <p className="text-xs">
                        &nbsp;&nbsp;{val.total_quantity}
                      </p>
                    </div>
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">Date: </p>
                      <p className="text-xs">
                        &nbsp;&nbsp;{formatDateTimeToDate(val.created_at)}
                      </p>
                    </div>
                    <StatusBadge status={val.payment_status} />
                  </div>
                  {val?.payment_status === "FAILED" ? (
                    <div className="w-full flex items-start justify-between">
                      <IconButton
                        className="rounded border text-gray-500 p-2 w-auto text-xs"
                        type="button"
                        title={t("_cancel_button")}
                      />
                      <IconButton
                        className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                        title={t("_pay_button")}
                        type="submit"
                      />
                    </div>
                  ) : (
                    <IconButton
                      className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                      title={t("_detail")}
                      type="button"
                      onClick={() =>
                        router.push(`/purchase-history/${val.order_no}`)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="w-full flex items-center justify-center mb-4">
              <Pagination
                filter={filter.data}
                totalPage={Math.ceil(
                  (fetchOrders.total ?? 0) / filter.data.limit
                )}
                onPageChange={(e) => {
                  filter.dispatch({
                    type: filter.ACTION_TYPE.PAGE,
                    payload: e,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
