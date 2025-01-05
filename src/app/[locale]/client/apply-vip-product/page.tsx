"use client";
import React from "react";

// components
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";
import useFetchProducts from "./hooks/useFetchProduct/page";

// icons, utils and hooks
import { AwardIcon } from "@/icons/page";
import useFilter from "./hooks/useFilter/page";
import VIPProductCard from "@/components/vipProductCard";
import EmptyPage from "@/components/emptyPage";

export default function ApplyVIPProduct() {
  const filter = useFilter();
  const fetchProduct = useFetchProducts({ filter: filter.data });
  const [activeVIP, setActiveVIP] = React.useState<number>(1);

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const handleCheckboxChange = (productId: string) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(productId)) {
        return prevSelectedIds.filter((id) => id !== productId);
      } else {
        return [...prevSelectedIds, productId];
      }
    });
  };

  console.log(selectedIds);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", value: "/client" },
          { label: "Apply VIP products", value: "/apply-vip-product" },
        ]}
      />
      <div className="my-2 flex items-start justify-start flex-col gap-2 bg-white p-4">
        <div className="w-full flex flex-col items-start justify-between">
          <p className="text-gray-500 text-sm mt-4 mb-2">
            Filter products by VIPs:
          </p>
          <div className="grid w-full gap-4 md:grid-cols-5">
            <div
              className={`w-full h-16  rounded ${
                activeVIP === 1
                  ? "bg-neon_pink text-white"
                  : "bg-gray-800 text-gray-500"
              }  flex items-center justify-center flex-col cursor-pointer hover:bg-white hover:text-neon_pink hover:border hover:border-neon_pink`}
              onClick={() => {
                setActiveVIP(1);
                filter.dispatch({
                  type: filter.ACTION_TYPE.PRODUCT_VIP,
                  payload: 1,
                });
              }}
            >
              <AwardIcon size={28} />
              <div className="w-full text-sm font-semibold text-center">
                VIP-01
              </div>
            </div>

            <div
              className={`w-full h-16  rounded ${
                activeVIP === 2
                  ? "bg-neon_pink text-white"
                  : "bg-gray-800 text-gray-500"
              }  flex items-center justify-center flex-col cursor-pointer hover:bg-white hover:text-neon_pink hover:border hover:border-neon_pink`}
              onClick={() => {
                setActiveVIP(2);
                filter.dispatch({
                  type: filter.ACTION_TYPE.PRODUCT_VIP,
                  payload: 2,
                });
              }}
            >
              <AwardIcon size={28} />
              <div className="w-full text-sm font-semibold text-center">
                VIP-02
              </div>
            </div>

            <div
              className={`w-full h-16  rounded ${
                activeVIP === 3
                  ? "bg-neon_pink text-white"
                  : "bg-gray-800 text-gray-500"
              }  flex items-center justify-center flex-col cursor-pointer hover:bg-white hover:text-neon_pink hover:border hover:border-neon_pink`}
              onClick={() => {
                setActiveVIP(3);
                filter.dispatch({
                  type: filter.ACTION_TYPE.PRODUCT_VIP,
                  payload: 3,
                });
              }}
            >
              <AwardIcon size={28} />
              <div className="w-full text-sm font-semibold text-center">
                VIP-03
              </div>
            </div>

            <div
              className={`w-full h-16  rounded ${
                activeVIP === 4
                  ? "bg-neon_pink text-white"
                  : "bg-gray-800 text-gray-500"
              }  flex items-center justify-center flex-col cursor-pointer hover:bg-white hover:text-neon_pink hover:border hover:border-neon_pink`}
              onClick={() => {
                setActiveVIP(4);
                filter.dispatch({
                  type: filter.ACTION_TYPE.PRODUCT_VIP,
                  payload: 4,
                });
              }}
            >
              <AwardIcon size={28} />
              <div className="w-full text-sm font-semibold text-center">
                VIP-04
              </div>
            </div>

            <div
              className={`w-full h-16  rounded ${
                activeVIP === 5
                  ? "bg-neon_pink text-white"
                  : "bg-gray-800 text-gray-500"
              }  flex items-center justify-center flex-col cursor-pointer hover:bg-white hover:text-neon_pink hover:border hover:border-neon_pink`}
              onClick={() => {
                setActiveVIP(5);
                filter.dispatch({
                  type: filter.ACTION_TYPE.PRODUCT_VIP,
                  payload: 5,
                });
              }}
            >
              <AwardIcon size={28} />
              <div className="w-full text-sm font-semibold text-center">
                VIP-05
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full text-gray-500 flex items-center justify-between gap-2 my-4">
            <p className="text-gray-500 text-sm">
              List of all products founded for&nbsp;
              <span className="text-neon_pink">
                {activeVIP === 1
                  ? "VIP-01."
                  : activeVIP === 2
                  ? "VIP-02."
                  : activeVIP === 3
                  ? "VIP-03."
                  : activeVIP === 4
                  ? "VIP-04."
                  : "VIP-05."}
              </span>
            </p>
            <div className="flex items-start justify-start gap-2">
              <p className="text-sm">({fetchProduct?.total}&nbsp;items)</p>
            </div>
          </div>
          {fetchProduct.loading ? (
            <div className="w-full flex items-center justify-center">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div>
              {fetchProduct?.total ?? 0 < 1 ? (
                <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
                  {fetchProduct?.data?.map((product, index: number) => (
                    <VIPProductCard
                      key={index + 1}
                      {...product}
                      selectedIds={selectedIds}
                      handleCheckboxChange={handleCheckboxChange}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded w-full">
                  <EmptyPage />
                </div>
              )}
            </div>
          )}
          <div className="w-full flex items-end justify-end mb-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchProduct.total ?? 0) / filter.data.limit
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
