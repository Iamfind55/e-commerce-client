"use client";

import Image from "next/image";
import category01 from "/public/images/category01.webp";
import RatingStar from "@/components/ratingStar";
import React from "react";

export default function Shop() {
  const [tab, setTab] = React.useState<number>(1);
  return (
    <>
      <div
        className="flex items-center justify-center flex-col bg-cover bg-center bg-no-repeat min-h-[35vh]"
        style={{ backgroundImage: `url(${category01.src})` }}
      >
        <div className="container bg-bg_color flex p-6 rounded">
          <div className="w-4/5 flex items-start justify-start gap-2 my-4">
            <Image
              className="rounded"
              src={category01}
              alt="product-01"
              width={100}
              height={100}
            />
            <div className="flex items-start justify-start flex-col">
              <p className="text-md text-black">Beauty Shop</p>
              <p className="text-xs text-gray-500">
                Cellphones & Tabs, Women Clothing & Fashion, Beauty, Health &
                Hair, Men Clothing & Fashion, Baby & Kids
              </p>
            </div>
          </div>
          <div className="w-1/5 flex items-start justify-start gap-2 flex-col my-4">
            <p className="text-sm text-black">Rating</p>
            <RatingStar rating={4.5} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 bg-bg_color">
        <div className="container bg-white flex p-6 rounded">
          <div className="w-full">
            <div className="border-b">
              <ul className="flex flex-wrap items-start justify-start -mb-px text-sm font-medium text-center gap-0 sm:gap-4 rounded">
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
                      <p className="hidden sm:block text-sm">Shop home</p>
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
                      <p className="hidden sm:block text-sm">Best selling</p>
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
                      <p className="hidden sm:block text-sm">All products</p>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            <div
              id="default-tab-content"
              className="p-2 p-3 bg-white text-second_black mt-6 flex items-start justify-start flex-col gap-6"
            >
              <div className="w-full bg-white text-black">
                {tab === 1 && "AA"}
                {tab === 2 && "BB"}
                {tab === 3 && "CC"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
