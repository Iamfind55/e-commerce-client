"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

// components
import { RootState } from "@/redux/store";
import Breadcrumb from "@/components/breadCrumb";

// images
import category01 from "/public/images/category01.webp";
import { useTranslations } from "next-intl";
import { truncateText } from "@/utils/letterLimitation";
import IconButton from "@/components/iconButton";
import StatusBadge from "@/components/status";
import Select from "@/components/select";
import { page_limits, product_status } from "@/utils/option";
import DatePicker from "@/components/datePicker";
import Pagination from "@/components/pagination";
import useFilter from "../../(pages)/product/hooks/useFilter/page";
import useFetchProducts from "../../(pages)/product/hooks/useFetchProduct/page";

export default function PurchaseHistory() {
  const filter = useFilter();
  const fetchShopProduct = useFetchProducts({ filter: filter.data });

  const t = useTranslations("myCartPage");
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <Breadcrumb
          items={[
            { label: "Customer", value: "/customer" },
            { label: "Purchase history", value: "/purchase-history" },
          ]}
        />

        <div className="w-full mt-1 sm:mt-4 bg-white rounded p-4">
          <div className="w-full hidden sm:block">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-2">
              <div className="flex items-start justify-start gap-2">
                <Select
                  name="page_limit"
                  title="Show"
                  option={page_limits}
                  className="h-8"
                />
              </div>
              <div className="flex items-start justify-statr gap-2">
                <Select
                  name="status"
                  title="Status"
                  option={product_status}
                  className="h-8"
                />
                <div className="flex items-end justify-start gap-2">
                  <DatePicker
                    name="start_date"
                    title="Start date"
                    className="h-8"
                  />
                  <DatePicker
                    name="end_date"
                    title="End date"
                    className="h-8"
                  />
                </div>
              </div>
            </div>
            <table className="w-full border rounded bg-gray overflow-x-auto text-left text-sm rtl:text-right mt-4">
              <thead className="sticky top-0 bg-gray text-xs uppercase bg-white">
                <tr className="border-b border-gray text-left">
                  <th scope="col" className="py-3 pl-1">
                    id
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Product
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Quantity
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Price
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Date
                  </th>
                  <th scope="col" className="py-3 pl-1">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="py-3 pl-1 flex items-center justify-center"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray bg-white hover:bg-gray py-6 text-gray-500"
                  >
                    <td className="pl-2 py-4">{index + 1}</td>
                    <td>
                      <div className="flex items-center justify-center gap-4">
                        <Image
                          className="rounded"
                          src={
                            product?.cover_image
                              ? product?.cover_image
                              : category01
                          }
                          alt={product.name}
                          width={60}
                          height={60}
                        />
                        <p className="text-xs">
                          {truncateText(product.name, 30)}
                        </p>
                      </div>
                    </td>
                    <td className="text-xs text-center">{product.quantity}</td>
                    <td className="text-xs">${product.price}</td>
                    <td>
                      <p className="text-xs">18-01-2025</p>
                    </td>
                    <td className="text-xs">
                      <StatusBadge status="completed" />
                    </td>
                    <td className="pl-2 py-4 flex items-center justify-center gap-2">
                      <IconButton
                        className="rounded border text-gray-500 p-2 w-auto text-xs"
                        type="button"
                        title="Pay"
                        // onClick={}
                      />
                      <IconButton
                        className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                        title="Cancel"
                        type="submit"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full flex items-end justify-end mb-4">
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
          <div className="block sm:hidden">
            {cartItems?.map((val, index: number) => (
              <div
                key={val.id}
                className="w-full flex items-start justify-start flex-col gap-2 border rounded p-2 my-2"
              >
                <div className="w-full flex items-start justify-start gap-4">
                  <Image
                    className="rounded"
                    src={category01}
                    alt="image-01"
                    width={60}
                    height={60}
                  />
                  <p className="text-xs">{val?.name}</p>
                </div>
                <div className="w-full flex items-end justify-between">
                  <div className="w-full flex items-start justify-between flex-col gap-1">
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">{t("_price")}: </p>
                      <p className="text-xs">&nbsp;&nbsp;${val?.price}</p>
                    </div>
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">
                        {t("_quantity")}:{" "}
                      </p>
                      <p className="text-xs">&nbsp;&nbsp;{val.quantity}</p>
                    </div>
                    <div className="flex items-start justify-start">
                      <p className="text-xs text-gray-500">Date: </p>
                      <p className="text-xs">&nbsp;&nbsp;18-01-2025</p>
                    </div>
                    <StatusBadge status="completed" />
                  </div>
                  <div className="w-full flex items-start justify-between">
                    <IconButton
                      className="rounded border text-gray-500 p-2 w-auto text-xs"
                      type="button"
                      title="Pay"
                    />
                    <IconButton
                      className="rounded text-white p-2 bg-neon_pink w-auto text-xs"
                      title="Cancel"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full flex items-center justify-center mb-4">
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
        </div>
      </div>
    </>
  );
}
