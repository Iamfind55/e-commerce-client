"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

// Apollo and APIs
import { QUERY_SHOP } from "@/api/shop";
import { useLazyQuery } from "@apollo/client";

// components
import ShopHomeComponent from "../components/shop-home";
import AllProductComponent from "../components/all-product";
import BestSellingComponent from "../components/best-selling";

// utils, icons, hook and types
import { GetShopResponse } from "@/types/shop";

export default function Shop() {
  const params = useParams();
  const [tab, setTab] = React.useState<number>(1);
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const [getShop, { data: shopData }] = useLazyQuery<GetShopResponse>(
    QUERY_SHOP,
    {
      fetchPolicy: "no-cache",
    }
  );

  React.useEffect(() => {
    getShop({
      variables: {
        getShopId: id,
      },
    });
  }, [getShop]);

  return (
    <>
      <div
        className="flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat min-h-[30vh] sm:min-h-[40vh]"
        style={{
          backgroundImage: `url(${
            shopData?.getShop?.data?.image?.cover
              ? shopData?.getShop?.data?.image?.cover
              : "/images/category01.webp"
          })`,
        }}
      >
        <div className="container bg-white flex p-2 rounded opacity-70 sm:opacity-100 transition-opacity duration-300">
          <div className="w-full flex flex-col sm:flow-row items-center justify-center gap-2 sm:gap-4 my-0 sm:my-4">
            <Image
              className="rounded"
              src={
                shopData?.getShop?.data?.image?.logo
                  ? shopData?.getShop?.data?.image?.logo
                  : "/images/category01.webp"
              }
              alt="product-01"
              width={100}
              height={100}
            />
            <div className="w-11/12 sm:w-4/5 flex items-center justify-center flex-col gap-2">
              <p className="text-md text-black">
                {shopData?.getShop?.data?.fullname}
              </p>
              <p className="text-gray-500 text-md text-xs">
                {shopData?.getShop?.data?.email && (
                  <span>Email: {shopData?.getShop?.data?.email}</span>
                )}
              </p>
              <p className="text-xs text-gray-500">
                {shopData?.getShop?.data?.remark && (
                  <span>Details: {shopData?.getShop?.data?.remark}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-bg_color pb-6 pt-4">
        <div className="container bg-white p-0 sm:p-6 rounded">
          <div className="border-b pt-2 pb-1 sm:pt-0 px-2">
            <ul className="flex flex-wrap items-start justify-start -mb-px text-sm font-medium text-center gap-2 sm:gap-4 rounded">
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 1 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(1)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 1 && "text-neon_pink"
                    }`}
                  >
                    <p className="text-sm">Shop home</p>
                  </div>
                </button>
              </li>

              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 2 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(2)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 2 && "text-neon_pink"
                    }`}
                  >
                    <p className="text-sm">Best selling</p>
                  </div>
                </button>
              </li>

              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                    tab === 3 ? "text-base text-sm" : "text-b_text"
                  }`}
                  onClick={() => setTab(3)}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 3 && "text-neon_pink"
                    }`}
                  >
                    <p className="text-sm">All products</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div
            id="default-tab-content"
            className="p-2 bg-white text-second_black mt-6 flex items-start justify-start flex-col"
          >
            <div className="w-full bg-white text-black">
              {tab === 1 && <ShopHomeComponent />}
              {tab === 2 && <BestSellingComponent />}
              {tab === 3 && <AllProductComponent />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
