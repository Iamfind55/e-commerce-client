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
import useFetchCustomerTransactionHistories from "../hooks/useFetchCusTransaction";
import useFilter from "../hooks/useFilter/page";
import { CloseEyeIcon } from "@/icons/page";
import { formatDateTimeToDate } from "@/utils/dateFormat";

export default function TransactionHistory() {
  const t = useTranslations("myCartPage");
  const filter = useFilter();
  const fetchCustomerTransactions = useFetchCustomerTransactionHistories({
    filter: filter.data,
  });

  console.log(fetchCustomerTransactions);

  return (
    <>
      <div className="bg-white rounded p-4 w-full flex items-start justify-start flex-col gap-2 mt-4">
        <h1 className="text-sm">Transaction details:</h1>
        <div className="w-full mt-2">
          <div className="w-full hidden sm:block">
            <div className="flex flex-col sm:flex-row items-start justify-end gap-2">
              <div className="flex items-start justify-statr gap-2">
                <Select
                  name="status"
                  title="Status"
                  option={product_status}
                  className="h-8"
                  onChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.STATUS,
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
            <table className="w-full border rounded bg-gray overflow-x-auto text-left text-sm rtl:text-right mt-4">
              <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
                <tr className="border-b border-gray text-left">
                  <th scope="col" className="py-3 pl-1">
                    id
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Transaction
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Amount
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Coin Type
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Date
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Status
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
                {fetchCustomerTransactions?.data?.map((items, index) => (
                  <tr
                    key={items.id}
                    className="border-b border-gray bg-white hover:bg-gray py-6 text-gray-500"
                  >
                    <td className="pl-2 py-4">{index + 1}</td>
                    <td>
                      <div className="flex items-center justify-start gap-4">
                        {/* <Image
                          className="rounded"
                          src={
                            items?.payment_slip
                              ? items?.payment_slip
                              : category01
                          }
                          alt={items.identifier}
                          width={60}
                          height={60}
                        /> */}
                        <p className="text-xs">
                          {truncateText(items.identifier, 30)}
                        </p>
                      </div>
                    </td>
                    <td className="text-xs">{items.amount}</td>
                    <td className="text-xs">${items.coin_type}</td>
                    <td>
                      <p className="text-xs">
                        {formatDateTimeToDate(items.created_at)}
                      </p>
                    </td>
                    <td className="text-xs">
                      <StatusBadge
                        status={
                          items.status === "ACTIVE" ? "completed" : "failed"
                        }
                      />
                    </td>
                    <td className="pl-2 py-4 flex items-center justify-center gap-2">
                      <CloseEyeIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex items-end justify-end mb-4">
              <Pagination
                filter={filter.data}
                totalPage={Math.ceil(
                  (fetchCustomerTransactions.total ?? 0) / filter.data.limit
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
            {fetchCustomerTransactions?.data?.map((val, index: number) => (
              <div
                key={val.id + index}
                className="w-full flex items-start justify-start flex-col gap-2 border rounded p-2 my-2"
              >
                <div className="w-full flex items-start justify-start gap-4">
                  <Image
                    className="rounded"
                    src={
                      val?.payment_slip
                        ? val?.payment_slip
                        : "/images/category01.webp"
                    }
                    alt={val?.identifier}
                    width={60}
                    height={60}
                  />
                  <p className="text-xs">{val?.identifier}</p>
                </div>
                <div className="w-full flex items-end justify-between">
                  <div className="w-full flex items-start justify-between flex-col gap-1">
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">{t("_price")}: </p>
                      <p className="text-xs">&nbsp;&nbsp;${val?.amount}</p>
                    </div>
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">
                        {t("_quantity")}:{" "}
                      </p>
                      <p className="text-xs">&nbsp;&nbsp;{val.coin_type}</p>
                    </div>
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">Date: </p>
                      <p className="text-xs">&nbsp;&nbsp;{val.created_at}</p>
                    </div>
                    <StatusBadge status={val?.status} />
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <IconButton
                      className="rounded border text-gray-500 p-2 w-auto text-xs"
                      type="button"
                      title="Pay"
                    />
                    <IconButton
                      className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                      title="Cancel"
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
                  (fetchCustomerTransactions.total ?? 0) / filter.data.limit
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
