"use client";

import Image from "next/image";
import category01 from "/public/images/category01.webp";
import RatingStar from "@/components/ratingStar";
import React from "react";
import ShopHomeComponent from "../components/shop-home";
import BestSellingComponent from "../components/best-selling";
import AllProductComponent from "../components/all-product";

export default function Shop() {
  const [tab, setTab] = React.useState<number>(1);
  return (
    <>
      <div
        className="flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat min-h-[30vh] sm:min-h-[40vh]"
        style={{ backgroundImage: `url(${category01.src})` }}
      >
        <div className="container bg-bg_color flex p-2 sm:p-6 rounded opacity-90 sm:opacity-100 transition-opacity duration-300">
          <div className="w-full flex items-start justify-start gap-4 my-2 sm:my-4">
            <Image
              className="rounded"
              src={category01}
              alt="product-01"
              width={100}
              height={100}
            />
            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-md text-black">Beauty Shop</p>
              <RatingStar rating={4.5} />
              <p className="text-xs text-gray-500">
                Cellphones & Tabs, Women Clothing & Fashion, Beauty, Health &
                Hair, Men Clothing & Fashion, Baby & Kids
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
