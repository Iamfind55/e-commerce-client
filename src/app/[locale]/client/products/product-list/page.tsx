"use client";

import React from "react";

// components
import Breadcrumb from "@/components/breadCrumb";
import ProductListDetail from "../components/ProductListDetail";
import { useTranslations } from "next-intl";

export default function ProductLists() {
  const [tab, setTab] = React.useState<number>(1);
  const t = useTranslations("shop_product_list");

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("_product"), value: "/products" },
          { label: t("_product_list"), value: "/product-list" },
        ]}
      />
      <div className="my-2 flex items-end justify-between gap-2 bg-white py-2 px-0 sm:px-4">
        <div className="w-full">
          <div className="w-full mb-b px-3">
            <ul className="w-full flex flex-wrap items-start justify-start text-sm font-medium text-center gap-4 border-b">
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block px-4 py-1 rounded-t-md flex items-start justify-start gap-2 ${
                    tab === 1 ? "bg-neon_pink text-white text-sm" : ""
                  }`}
                  onClick={() => setTab(1)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 1 && "text-white"
                    }`}
                  >
                    <p className="text-sm">{t("_all")}</p>
                  </div>
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block px-4 py-1 rounded-t-md flex items-start justify-start gap-2 ${
                    tab === 2 ? "bg-neon_pink text-white text-sm" : ""
                  }`}
                  onClick={() => setTab(2)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 2 && "text-white"
                    }`}
                  >
                    <p className="text-sm">{t("_on_shelf")}</p>
                  </div>
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block px-4 py-1 rounded-t-md flex items-start justify-start gap-2 ${
                    tab === 3 ? "bg-neon_pink text-white text-sm" : ""
                  }`}
                  onClick={() => setTab(3)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 3 && "text-white"
                    }`}
                  >
                    <p className="text-sm">{t("_un_shelf")}</p>
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
              {tab === 1 && (
                <ProductListDetail
                  status=""
                  title={t("_list_of_all_products")}
                />
              )}
              {tab === 2 && (
                <ProductListDetail
                  status="ON_SHELF"
                  title={t("_on_shelf_products")}
                />
              )}
              {tab === 3 && (
                <ProductListDetail
                  status="UN_SHELF"
                  title={t("_un_shelf_products")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
