"use client";

import React from "react";
import Image from "next/image";

// components
import Select from "@/components/select";
import StatusBadge from "@/components/status";
import Pagination from "@/components/pagination";
import Breadcrumb from "@/components/breadCrumb";
import DatePicker from "@/components/datePicker";

// icons, hooks and utils
import { formatDate } from "@/utils/dateFormat";
import { coin_types, page_limits } from "@/utils/option";
import TransactionCard from "@/components/trasactionCard";
import useFilterTransaction from "../hooks/useFilterRecharge";
import useFetchShopTransactions from "../hooks/useFetchRecharge";
import { useTranslations } from "next-intl";

export default function RechargeHistory() {
  const t = useTranslations("shop_recharge");
  const filter = useFilterTransaction();
  const fetchShopTransactions = useFetchShopTransactions({
    filter: filter.data,
  });

  React.useEffect(() => {
    filter.dispatch({
      type: filter.ACTION_TYPE.IDENTIFIER,
      payload: "WITHDRAW",
    });
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("_finance"), value: "/wallet" },
          { label: t("_withdraw_history"), value: "/wallet/recharge" },
        ]}
      />
      <div className="w-full bg-white mt-2 rounded flex items-end justify-end flex-col gap-2 text-gray-500 p-1 sm:p-4">
        <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-2">
          <div className="w-full flex items-start sm:justify-start justify-between gap-2">
            <div>
              <Select
                name="number"
                title={t("_show_number")}
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
            <div className="block sm:hidden text-gray-500">
              <Select
                name="coin_type"
                title={t("_coin_type")}
                option={coin_types}
                onChange={(e) => {
                  filter.dispatch({
                    type: filter.ACTION_TYPE.COIN_TYPE,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="w-full flex items-end justify-start gap-2">
            <div className="hidden sm:block text-gray-500">
              <Select
                name="coin_type"
                title={t("_coin_type")}
                option={coin_types}
                onChange={(e) => {
                  filter.dispatch({
                    type: filter.ACTION_TYPE.COIN_TYPE,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
            <DatePicker
              name="start_date"
              title={t("_start_date")}
              className="h-8"
              value={filter.state.createdAtBetween.startDate ?? ""}
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
              value={filter.state.createdAtBetween.endDate ?? ""}
              onChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.CREATED_AT_END_DATE,
                  payload: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4 hidden sm:block">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right border rounded">
            <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
              <tr className="border-b border-gray text-left">
                <th scope="col" className="py-3 pl-1">
                  {t("_id")}
                </th>
                <th scope="col" className="py-3 pl-1">
                  {t("_voucher")}
                </th>
                <th scope="col" className="py-3 pl-1">
                  {t("_amount")}
                </th>
                <th scope="col" className="py-3 pl-1">
                  {t("_received_amount")}
                </th>
                <th scope="col" className="py-3 pl-1">
                  {t("_method")}
                </th>
                <th scope="col" className="py-3 pl-1">
                  {t("_status")}
                </th>
                <th scope="col" className="py-3 pl-1">
                  {t("_created_at")}
                </th>
              </tr>
            </thead>
            <tbody>
              {fetchShopTransactions?.data?.map((val, index) => (
                <tr
                  key={val.id + index}
                  className="border-b text-xs border-gray bg-white hover:bg-gray py-6"
                >
                  <td className="pl-2 py-4">{index + 1}</td>
                  <td className="py-1">
                    <div className="flex items-start justify-start gap-4">
                      <Image
                        className="rounded border"
                        src={
                          val.payment_slip
                            ? val.payment_slip
                            : "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1739113550/default-bill_aaljeo.png"
                        }
                        alt="Voucher"
                        width={60}
                        height={60}
                      />
                    </div>
                  </td>
                  <td className="pl-2 py-4">${val.amount.toFixed(2)}</td>
                  <td className="pl-2 py-4">${val.amount.toFixed(2)}</td>
                  <td>{val.coin_type} Conversion rate : $1.00</td>
                  <td>
                    <StatusBadge status={val.transaction_status} />
                  </td>
                  <td>{formatDate(val.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-start justify-end py-4 gap-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchShopTransactions.total ?? 0) / filter.data.limit
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
        <div className="w-full mt-4 block sm:hidden">
          {fetchShopTransactions?.data?.map((val, index) => (
            <div
              key={val.id + index}
              className="w-full flex items-start jusitfy-start gap-4 flex-col my-2"
            >
              <TransactionCard
                date={formatDate(val.created_at)}
                status={val.status}
                title={val.coin_type + "Conversion rate : $1.00"}
                amount={val.amount.toFixed(2)}
                receive_amount={val.amount.toFixed(2)}
                image={
                  val.payment_slip
                    ? val.payment_slip
                    : "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1739113550/default-bill_aaljeo.png"
                }
              />
            </div>
          ))}
          <div className="flex items-start justify-center py-2 gap-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchShopTransactions.total ?? 0) / filter.data.limit
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
    </>
  );
}
