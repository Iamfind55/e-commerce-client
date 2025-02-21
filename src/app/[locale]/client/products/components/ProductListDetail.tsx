import React from "react";

// components
import Select from "@/components/select";
import { SearchIcon } from "@/icons/page";
import DatePicker from "@/components/datePicker";

// utils
import EmptyPage from "@/components/emptyPage";
import useFilter from "../hooks/useFilter/page";
import { product_status } from "@/utils/option";
import Pagination from "@/components/pagination";
import useFetchProducts from "../hooks/useFetchProduct";
import ShopProductCard from "@/components/shopProductCard";
import { useTranslations } from "next-intl";

interface PropsDetails {
  status: string;
  title: string;
}

export default function ProductListDetail({ status, title }: PropsDetails) {
  const filter = useFilter();
  const fetchShopProduct = useFetchProducts({ filter: filter.data });
  const t = useTranslations("shop_product_list");

  React.useEffect(() => {
    filter.dispatch({
      type: filter.ACTION_TYPE.SHOPPRODUCTSTATUS,
      payload: status ?? "",
    });
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
        <div className="flex items-start justify-start gap-2">
          <Select
            name="status"
            title={t("_status")}
            option={product_status}
            className="h-8"
            onChange={(e) => {
              filter.dispatch({
                type: filter.ACTION_TYPE.STATUS,
                payload: e.target.value,
              });
            }}
          />
          <div className="relative w-full block sm:hidden mt-5">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon size={16} className="text-neon_pink" />
            </div>
            <input
              required
              type="text"
              id="search"
              placeholder={t("_search")}
              onChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.KEYWORD,
                  payload: e.target.value,
                });
              }}
              className="h-8 bg-white text-gray-500 border text-xs rounded block w-auto ps-10 p-2 focus:outline-none focus:ring-1"
            />
          </div>
          {/* <Select name="stock" title="Stock" option={stock} className="h-8" /> */}
        </div>
        <div className="w-full flex items-end justify-start gap-2">
          <div className="w-full relative w-full hidden sm:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon size={16} className="text-neon_pink" />
            </div>
            <input
              required
              type="text"
              id="search"
              placeholder={t("_search")}
              onChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.KEYWORD,
                  payload: e.target.value,
                });
              }}
              className="h-8 bg-white text-gray-500 border text-xs rounded block w-auto ps-10 p-2 focus:outline-none focus:ring-1"
            />
          </div>
          <DatePicker
            name="start_date"
            title={t("_start_date")}
            className="h-8"
            value={filter?.state?.createdAtBetween?.startDate ?? ""}
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
            value={filter?.state?.createdAtBetween?.endDate ?? ""}
            onChange={(e) => {
              filter.dispatch({
                type: filter.ACTION_TYPE.CREATED_AT_END_DATE,
                payload: e.target.value,
              });
            }}
          />
        </div>
      </div>

      {fetchShopProduct?.total ?? 0 > 0 ? (
        <div>
          <p className="text-gray-500 text-sm mt-4 mb-2">{title}:</p>
          <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
            {fetchShopProduct?.data?.map((product) => (
              <ShopProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="w-full flex sm:items-end items-center sm:justify-end justify-center mb-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchShopProduct.total ?? 0) / filter.data.limit
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
      ) : (
        <EmptyPage />
      )}
    </>
  );
}
