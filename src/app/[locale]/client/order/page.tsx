"use client";

import React from "react";

// components
import OrderListDetail from "./order-list/page";
import Breadcrumb from "@/components/breadCrumb";
import { CancelIcon, CheckCircleIcon } from "@/icons/page";

export default function OrderManagement() {
  const [tab, setTab] = React.useState<number>(1);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", value: "/client" },
          { label: "Order managment", value: "/order" },
        ]}
      />
      <div className="my-2 flex items-end justify-between gap-2 bg-white py-2 px-4">
        <div className="w-full">
          <ul className="flex flex-wrap items-start justify-between sm:justify-start text-sm font-medium text-center gap-0 sm:gap-4 border-b pb-1">
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                  tab === 1 ? "text-base text-sm" : ""
                }`}
                onClick={() => setTab(1)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 1 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">All</p>
                </div>
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                onClick={() => setTab(2)}
              >
                <div
                  className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                    tab === 2 && "text-neon_pink"
                  }`}
                >
                  <p className="text-xs">No Pickup</p>
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
                  <p className="text-xs hidden sm:block">Processed Orders</p>
                  <p className="text-xs block sm:hidden flex items-center justify-center gap-1">
                    <CheckCircleIcon size={16} className="text-green-500" />
                    Orders
                  </p>
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
                  <p className="text-xs hidden sm:block">Canceled Orders</p>
                  <p className="text-xs block sm:hidden flex items-center justify-center gap-1">
                    <CancelIcon size={16} className="text-red-500" />
                    Orders
                  </p>
                </div>
              </button>
            </li>
          </ul>
          <div
            id="default-tab-content"
            className="p-0 sm:p-3 bg-white text-second_black flex items-start justify-start flex-col gap-6"
          >
            <div className="w-full">
              {tab === 1 && <OrderListDetail />}
              {tab === 2 && <OrderListDetail />}
              {tab === 3 && <OrderListDetail />}
              {tab === 4 && <OrderListDetail />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
