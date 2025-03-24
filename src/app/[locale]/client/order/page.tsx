"use client";

import React from "react";

// components
import { useTranslations } from "next-intl";
import OrderListDetail from "./order-list/OrderListDatails";
import Breadcrumb from "@/components/breadCrumb";
import {
  CancelIcon,
  CheckCircleIcon,
  DeliveryIcon,
  PackingIcon,
} from "@/icons/page";

export default function OrderManagement() {
  const t = useTranslations("order_page");
  const m = useTranslations("member_page");
  const [tab, setTab] = React.useState<number>(2);

  return (
    <>
      <Breadcrumb
        items={[
          { label: m("_dashboard"), value: "/client" },
          { label: t("_order_management"), value: "/order" },
        ]}
      />
      <div className="my-2 flex items-end justify-between gap-2 bg-white py-2 px-4">
        <div className="w-full">
          <ul className="flex items-start text-sm font-medium text-center gap-4 border-b pb-1 overflow-x-auto whitespace-nowrap">
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                  tab === 2 ? "text-base text-sm" : ""
                }`}
                onClick={() => setTab(2)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 2 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">{t("_no_pick_up")}</p>
                </div>
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                onClick={() => setTab(1)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 1 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">{t("_all")}</p>
                </div>
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                onClick={() => setTab(3)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 3 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">{t("_processed_order")}</p>
                  {/* <p className="text-xs block sm:hidden flex items-center justify-center gap-1">
                    <DeliveryIcon size={16} className="text-green-500" />
                    {t("_order")}
                  </p> */}
                </div>
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                onClick={() => setTab(4)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 4 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">
                    {/* {t("_processed_order")} */}
                    Packing orders
                  </p>
                  {/* <p className="text-xs block sm:hidden flex items-center justify-center gap-1">
                    <PackingIcon size={16} className="text-green-500" />
                    {t("_order")}
                  </p> */}
                </div>
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                onClick={() => setTab(5)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 5 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">
                    {/* {t("_processed_order")} */}
                    Shipping orders
                  </p>
                  {/* <p className="text-xs block sm:hidden flex items-center justify-center gap-1">
                    <DeliveryIcon size={16} className="text-green-500" />
                    {t("_order")}
                  </p> */}
                </div>
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                onClick={() => setTab(6)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 6 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">{t("_canceled_order")}</p>
                  {/* <p className="text-xs block sm:hidden flex items-center justify-center gap-1">
                    <CancelIcon size={16} className="text-red-500" />
                    {t("_order")}
                  </p> */}
                </div>
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                onClick={() => setTab(7)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 7 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">{t("_success_order")}</p>
                  {/* <p className="text-xs block sm:hidden flex items-center justify-center gap-1">
                    <CheckCircleIcon size={16} className="text-green-500" />
                    {t("_order")}
                  </p> */}
                </div>
              </button>
            </li>
          </ul>
          <div
            id="default-tab-content"
            className="p-0 sm:p-3 bg-white text-second_black flex items-start justify-start flex-col gap-6"
          >
            <div className="w-full">
              {tab === 1 && <OrderListDetail status="" />}
              {tab === 2 && <OrderListDetail status="NO_PICKUP" />}
              {tab === 3 && <OrderListDetail status="PROCESSING" />}
              {tab === 4 && <OrderListDetail status="PACKING" />}
              {tab === 5 && <OrderListDetail status="SHIPPING" />}
              {tab === 6 && <OrderListDetail status="CANCELLED" />}
              {tab === 7 && <OrderListDetail status="SUCCESS" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
