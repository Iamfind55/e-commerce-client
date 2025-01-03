"use client";

import React from "react";

// components
import Breadcrumb from "@/components/breadCrumb";
import ProductListDetail from "../components/page";

export default function ProductLists() {
  const [tab, setTab] = React.useState<number>(1);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", value: "/products" },
          { label: "product-list", value: "/product-list" },
        ]}
      />
      <div className="my-2 flex items-end justify-between gap-2 bg-white py-2 px-4">
        <div className="w-full">
          <div className="mb-b">
            <ul className="flex flex-wrap items-start justify-start text-sm font-medium text-center gap-0 sm:gap-4 border-b">
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
                    <p className="hidden sm:block text-sm">All</p>
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
                    <p className="hidden sm:block text-sm">On shelf</p>
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
                    <p className="hidden sm:block text-sm">Un shelf</p>
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
                    <p className="hidden sm:block text-sm">
                      Off-shelf application
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div
            id="default-tab-content"
            className="p-3 bg-white text-second_black flex items-start justify-start flex-col gap-6"
          >
            <div className="w-full">
              {tab === 1 && <ProductListDetail />}
              {tab === 2 && <ProductListDetail />}
              {tab === 3 && <ProductListDetail />}
              {tab === 4 && <ProductListDetail />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
