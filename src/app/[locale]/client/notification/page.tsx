"use client";

import React from "react";

// components
import Select from "@/components/select";
import { SearchIcon } from "@/icons/page";
import DatePicker from "@/components/datePicker";

// utils
import useFilter from "./hooks/useFilter";
import Pagination from "@/components/pagination";
import Breadcrumb from "@/components/breadCrumb";
import useFetchNotifications from "./hooks/useFetch";
import NotificationCard from "@/components/notificationCard";
import { notification_type_status, page_limits } from "@/utils/option";
import { useTranslations } from "next-intl";

export default function Notifications() {
  const filter = useFilter();
  const m = useTranslations("my_wallet");
  const o = useTranslations("order_page");
  const p = useTranslations("purchase_history");
  const fetchShopNotifications = useFetchNotifications({ filter: filter.data });

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", value: "/client" },
          { label: "Notifications", value: "/notification" },
        ]}
      />
      <div className="my-2 flex items-start justify-start flex-col gap-2 bg-white p-4 rounded">
        <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-2">
          <div className="w-full sm:w-1/2 flex items-start justify-start gap-2">
            <div className="w-full sm:w-auto flex items-start justify-start gap-2 mt-2 sm:mt-0">
              <Select
                name="stock"
                title={p("_show")}
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
            <div className="w-full sm:w-auto flex items-start justify-start gap-2 mt-2 sm:mt-0">
              <Select
                name="status"
                title={m("_select_type")}
                option={notification_type_status}
                className="h-8"
                onChange={(e) => {
                  filter.dispatch({
                    type: filter.ACTION_TYPE.NOTIFICATION_TYPE,
                    payload: e.target.value,
                  });
                }}
              />
            </div>
          </div>

          <div className="w-full sm:w-1/2 flex mt-2 sm:mt-0 items-end justify-start gap-2">
            <DatePicker
              name="start_date"
              title={o("_start_date")}
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
              title={o("_end_date")}
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
        <div className="w-full">
          <p className="text-gray-500 text-xs mt-4 mb-2">
            List of all notifications:
          </p>
          <div className="w-full h-auto grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-4">
            {fetchShopNotifications?.data?.map((product) => (
              <NotificationCard key={product.id} {...product} />
            ))}
          </div>
          <div className="w-full flex items-end justify-end mb-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchShopNotifications.total ?? 0) / filter.data.limit
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
