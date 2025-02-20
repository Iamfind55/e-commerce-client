"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

// images, utils
import { page_limits, payment_type } from "@/utils/option";
import useFilter from "../hooks/useFilter/page";
import { truncateText } from "@/utils/letterLimitation";
import { formatDate } from "@/utils/dateFormat";
import useFetchCustomerTransactionHistories from "../hooks/useFetchCusTransaction";

//components
import Select from "@/components/select";
import StatusBadge from "@/components/status";
import DatePicker from "@/components/datePicker";
import Pagination from "@/components/pagination";
import EmptyPage from "@/components/emptyPage";

export default function TransactionHistory({
  fetchNew,
}: {
  fetchNew: boolean;
}) {
  const t = useTranslations("my_wallet");
  const p = useTranslations("purchase_history");
  const filter = useFilter();
  const memoizedFilter = useMemo(
    () => ({
      ...filter.data,
      identifier: filter.data.identifier ?? undefined,
    }),
    [filter.data]
  );

  const fetchCustomerTransactions = useFetchCustomerTransactionHistories({
    filter: memoizedFilter,
  });

  React.useEffect(() => {
    fetchCustomerTransactions.refetch();
  }, [fetchNew]);

  return (
    <>
      <div className="bg-white rounded p-4 w-full flex items-start justify-start flex-col gap-2 mt-4">
        <h1 className="text-sm">{t("_transaction_title")}:</h1>
        <div className="w-full mt-2">
          <div className="w-full hidden sm:block">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
              <div className="w-1/4">
                <Select
                  name="status"
                  title="Show"
                  option={page_limits}
                  className="h-8"
                  onChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.LIMIT,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex items-start justify-statr gap-2">
                <Select
                  name="status"
                  title={p("_status")}
                  option={payment_type}
                  className="h-8"
                  onChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.IDENTIFIER,
                      payload: e.target.value,
                    });
                  }}
                />
                <div className="flex items-end justify-start gap-2">
                  <DatePicker
                    name="start_date"
                    title={p("_start_date")}
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
                    title={p("_end_date")}
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
            {fetchCustomerTransactions.total ?? 0 > 0 ? (
              <table className="w-full border rounded bg-gray overflow-x-auto text-left text-sm rtl:text-right mt-4">
                <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
                  <tr className="border-b border-gray text-left ml-2">
                    <th scope="col" className="py-3 pl-1">
                      {t("_id")}
                    </th>
                    <th scope="col" className="py-3 pl-1">
                      {t("_transaction")}
                    </th>
                    <th scope="col" className="py-3 pl-1">
                      {t("_amount")}
                    </th>
                    <th scope="col" className="py-3 pl-1">
                      {t("_coin_type")}
                    </th>
                    <th scope="col" className="py-3 pl-1">
                      {t("_date")}
                    </th>
                    <th scope="col" className="py-3 pl-1">
                      {p("_status")}
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
                          <p className="text-xs">
                            {truncateText(items.identifier, 30)}
                          </p>
                        </div>
                      </td>
                      <td className="text-xs">{items.amount.toFixed(2)}</td>
                      <td className="text-xs">${items.coin_type}</td>
                      <td>
                        <p className="text-xs">
                          {formatDate(items.created_at)}
                        </p>
                      </td>
                      <td className="text-xs my-2">
                        <StatusBadge
                          status={
                            items.status === "ACTIVE" ? "completed" : "failed"
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyPage />
            )}

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

          {fetchCustomerTransactions?.total ?? 0 > 0 ? (
            <div className="block sm:hidden">
              {fetchCustomerTransactions?.data?.map((val, index: number) => (
                <div
                  key={val.id + index}
                  className="w-full flex items-start justify-start flex-col gap-2 border rounded p-2 my-2"
                >
                  <div className="w-full flex items-start justify-start gap-4">
                    <p className="text-md font-bold">{val?.identifier}</p>
                  </div>
                  <div className="w-full flex items-end justify-between">
                    <div className="w-full flex items-start justify-between flex-col gap-1">
                      <div className="flex items-start justify-start">
                        <p className="text-xs text-gray-500">{p("_price")}: </p>
                        <p className="text-xs">
                          &nbsp;&nbsp;${val?.amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-start justify-start">
                        <p className="text-xs text-gray-500">
                          {p("_quantity")}:
                        </p>
                        <p className="text-xs">&nbsp;&nbsp;{val.coin_type}</p>
                      </div>
                      <div className="flex items-start justify-start">
                        <p className="text-xs text-gray-500">{t("_date")}: </p>
                        <p className="text-xs">
                          &nbsp;&nbsp;{formatDate(val.created_at)}
                        </p>
                      </div>
                      <StatusBadge status={val?.status} />
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
          ) : (
            <div className="block sm:hidden">
              <EmptyPage />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
