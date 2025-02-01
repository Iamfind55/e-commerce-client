"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

// components
import { RootState } from "@/redux/store";
import Breadcrumb from "@/components/breadCrumb";

// images
import { useTranslations } from "next-intl";
import { truncateText } from "@/utils/letterLimitation";
import IconButton from "@/components/iconButton";
import StatusBadge from "@/components/status";
import Select from "@/components/select";
import { page_limits, product_status } from "@/utils/option";
import DatePicker from "@/components/datePicker";
import Pagination from "@/components/pagination";
import useFilter from "./hooks/useFilter/page";
import useFetchCustomerOrders from "./hooks/useFetchOrder";
import { formatDate, formatDateTimeToDate } from "@/utils/dateFormat";
import { Link } from "@/navigation";

export default function PurchaseHistory() {
  const t = useTranslations("myCartPage");
  const filter = useFilter();
  const fetchOrders = useFetchCustomerOrders({ filter: filter.data });
  console.log(fetchOrders);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <Breadcrumb
          items={[
            { label: "Customer", value: "/customer" },
            { label: "Purchase history", value: "/purchase-history" },
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
                  title="Status"
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
                    title="Start date"
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
                    title="End date"
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
                    Order no
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    price
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    quantity
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    delivery
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    payment
                  </th>
                  <th scope="col" className="py-3 pl-1 text-center">
                    created at
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-1 flex items-center justify-center"
                  >
                    Actions
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
                      <StatusBadge status={order.payment_status} />
                    </td>
                    <td>
                      <p className="text-xs text-center">
                        {formatDateTimeToDate(order.created_at)}
                      </p>
                    </td>
                    <td className="pl-2 py-4 flex items-center justify-center gap-2">
                      <IconButton
                        className="rounded border text-gray-500 p-2 w-auto text-xs"
                        type="button"
                        title="Pay"
                        // onClick={}
                      />
                      <IconButton
                        className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                        title="Cancel"
                        type="submit"
                      />
                    </td>
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
                  <div className="w-full flex items-start justify-between">
                    <IconButton
                      className="rounded border text-gray-500 p-2 w-auto text-xs"
                      type="button"
                      title="Cancel"
                    />
                    <IconButton
                      className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                      title="Pay"
                      type="submit"
                    />
                  </div>
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
