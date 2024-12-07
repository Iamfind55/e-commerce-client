"use client";

import ProductCard from "@/components/ProductCard";
import RangeMultiSlider from "@/components/RangeMultiSlider";
import BottomDrawer from "@/components/bottomDrawer";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import Pagination from "@/components/pagination";
import Select from "@/components/select";
import { CancelIcon, FilterIcon } from "@/icons/page";
import useFilter from "@/lib/useFilter";
import React from "react";

const categories = [
  { name: "Women" },
  { name: "Men" },
  { name: "Kids & baby" },
  { name: "Shoes" },
  { name: "Handbages & Accessories" },
  { name: "Jewelry" },
  { name: "Christmas" },
  { name: "Electronic product" },
];
const brands: any = [
  { label: "Brand01", value: "brand01" },
  { label: "Brand02", value: "brand02" },
  { label: "Brand03", value: "brand03" },
  { label: "Brand04", value: "brand04" },
];
const filters: any = [
  { label: "Newest", value: "newest" },
  { label: "Most expensive", value: "most_expensive" },
  { label: "Cheapest", value: "cheapest" },
];
const products = [
  {
    id: "123",
    price: "250",
    name: "Product1",
    description: "This is the first product in our system now.",
  },
  {
    id: "124",
    price: "300",
    name: "Product2",
    description: "This is the second product, a little better.",
  },
  {
    id: "125",
    price: "150",
    name: "Product3",
    description: "The third product, perfect for casual use.",
  },
  {
    id: "126",
    price: "200",
    name: "Product4",
    description: "Our fourth product, optimized for comfort.",
  },
  {
    id: "127",
    price: "350",
    name: "Product5",
    description: "The fifth product, top-of-the-line quality.",
  },
  {
    id: "128",
    price: "400",
    name: "Product6",
    description: "The sixth product, with premium features.",
  },
  {
    id: "1234",
    price: "250",
    name: "Product1",
    description: "This is the first product in our system now.",
  },
  {
    id: "1244",
    price: "300",
    name: "Product2",
    description: "This is the second product, a little better.",
  },
  {
    id: "1254",
    price: "150",
    name: "Product3",
    description: "The third product, perfect for casual use.",
  },
  {
    id: "1264",
    price: "200",
    name: "Product4",
    description: "Our fourth product, optimized for comfort.",
  },
];

export default function Category() {
  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  //   const { data, total, loading } = useFetchDoctors(filter);
  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="container flex items-start justify-start gap-2 py-4 text-second_black">
          <div className="w-1/4 hidden sm:flex items-start justify-center flex-col gap-1 p-2 rounded shadow-md">
            <div className="w-full border-b border-gray-200 py-2">
              <h1 className="text-sm">All categories</h1>
            </div>
            <div className="w-full">
              <ul className="w-full flex items-start justify-start flex-col gap-1 text-xs text-second_black p-2">
                {categories?.map((val, index) => (
                  <li
                    key={index + 1}
                    className="cursor-pointer hover:bg-gray-200 w-full py-1 px-2 rounded"
                  >
                    {val?.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <div className="border rounded w-full p-2">
                <div className="bg-white rounded">
                  <h1 className="text-sm">Price range</h1>
                </div>
                <div className="p-4">
                  <div className="relative mb-6">
                    <RangeMultiSlider
                      onChange={(min, max) => {
                        // filterDispatch({
                        //   type: ACTION_TYPE.MIN,
                        //   payload: min,
                        // });
                        // filterDispatch({
                        //   type: ACTION_TYPE.MAX,
                        //   payload: max,
                        // });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 shadow w-full sm:w-3/4 flex items-start justify-start flex-col gap-4">
            <div className="w-full">
              <Breadcrumb
                items={[
                  { label: "Home", value: "/" },
                  { label: "Bank Accounts", value: "/banks" },
                  { label: "Create", value: "/banks/create" },
                ]}
              />
            </div>
            <div className="w-full flex sm:hidden items-center justify-between">
              <p className="text-sm">Home</p>
              <button
                onClick={() => toggleOpenDrawer()}
                className="flex items-center justify-between"
              >
                <FilterIcon size={22} />
              </button>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="hidden sm:block text-sm">Home</p>
              <div className="flex items-start justify-start gap-2">
                <Select
                  name="brand"
                  title="Brand"
                  option={brands}
                  className="h-8"
                />
                <Select
                  name="filter"
                  title="Sort by"
                  option={filters}
                  className="h-8"
                />
              </div>
            </div>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
            <div className="w-full flex items-center justify-center mb-4">
              <Pagination
                filter={filter}
                totalPage={20}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <BottomDrawer
        isOpen={openDrawer}
        onClose={toggleOpenDrawer}
        title="TIKTOKSHOP"
        icon={<CancelIcon size={24} />}
        className="w-full md:w-96 z-50 bg-white mb-6"
      >
        <div className="w-full bg-white pb-6 mb-6 items-start justify-center flex-col gap-1 p-2 shadow-md">
          <div className="w-full border-b border-gray-200 py-2">
            <h1 className="text-sm text-neon_blue">All categories</h1>
          </div>
          <div className="w-full">
            <ul className="w-full flex items-start justify-start flex-col gap-1 text-xs text-second_black p-2">
              {categories?.map((val, index) => (
                <li
                  key={index + 1}
                  className="cursor-pointer hover:bg-gray-200 w-full py-1 px-2 rounded"
                >
                  {val?.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <div className="border rounded w-full p-2">
              <div className="bg-white rounded">
                <h1 className="text-sm">Price range</h1>
              </div>
              <div className="p-4">
                <div className="relative mb-6">
                  <RangeMultiSlider onChange={(min, max) => {}} />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <IconButton
              className="rounded text-base p-2 w-full mt-4 mb-6 italic text-sm bg-neon_pink"
              type="button"
              title="Apply now"
              //   onClick={() => router.push("/signin")}
            />
          </div>
        </div>
      </BottomDrawer>
    </>
  );
}
