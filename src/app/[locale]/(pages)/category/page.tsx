"use client";

import React from "react";
import { useLazyQuery } from "@apollo/client";

// apollo and APIs
import { useRouter } from "@/navigation";
import { QUERY_BRANDINGS } from "@/api/branding";
import IconButton from "@/components/iconButton";
import { QUERY_CATEGORIES } from "@/api/category";

// components
import Select from "@/components/select";
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/ProductCard";
import BottomDrawer from "@/components/bottomDrawer";
import RangeMultiSlider from "@/components/RangeMultiSlider";

// utils, icons and hooks
import { ProductData } from "@/types/product";
import { CancelIcon, FilterIcon } from "@/icons/page";
import { GetBrandingResponse } from "@/types/branding";
import useFilter from "../product/hooks/useFilter/page";
import useFetchProducts from "../product/hooks/useFetchProduct";

const filters: any = [
  { label: "Most expensive", value: "price_DESC" },
  { label: "Cheapest", value: "price_ASC" },
];

export default function Category() {
  const router = useRouter();
  const filter = useFilter();
  const fetchProducts = useFetchProducts({ filter: filter.data });

  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };

  const [getBrandings, { data: brandingData }] =
    useLazyQuery<GetBrandingResponse>(QUERY_BRANDINGS, {
      fetchPolicy: "no-cache",
    });

  const [getCategories, { data: categoryData }] = useLazyQuery(
    QUERY_CATEGORIES,
    {
      fetchPolicy: "no-cache",
    }
  );

  const fetchCategories = () => {
    getCategories({
      variables: {
        where: {
          status: "ACTIVE",
        },
        sortedBy: "created_at_ASC",
      },
    });
  };

  React.useEffect(() => {
    fetchCategories();
  }, [getCategories]);

  React.useEffect(() => {
    getBrandings({
      variables: {
        sortedBy: "created_at_DESC",
        where: {
          status: "ACTIVE",
        },
      },
    });
  }, [getBrandings]);

  // Re-format the structure of branding
  const brands = brandingData?.getBrandings?.data.map((brand) => ({
    label: brand.name.name_en,
    value: brand.id,
  }));

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="container flex items-start justify-start gap-2 py-4 text-second_black">
          <div className="w-1/4 hidden sm:flex items-start justify-center flex-col gap-1 p-2 rounded shadow-md">
            <div className="w-full border-b border-gray-200 py-2">
              <h1 className="text-sm text-sm cursor-pointer hover:bg-gray-100 pl-4 py-1 rounded">
                All categories
              </h1>
            </div>
            <div className="w-full">
              <ul className="w-full flex items-start justify-start flex-col gap-1 text-xs text-second_black p-2">
                {categoryData?.getCategories?.data?.map((val: Category) => (
                  <li
                    key={val?.id}
                    className="flex items-start justify-between cursor-pointer hover:bg-gray-200 w-full py-1 px-2 rounded"
                    onClick={() =>
                      router.push(
                        `/category/${val.id}?name=${val.name?.name_en}`
                      )
                    }
                  >
                    <span>{val?.name?.name_en}</span>
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
                        filter.dispatch({
                          type: filter.ACTION_TYPE.PRICE_BETWEEN,
                          payload: [min, max],
                        });
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
                  { label: "All category", value: "/category" },
                ]}
              />
            </div>
            <div className="w-full flex items-center justify-end">
              <div className="flex items-center justify-center gap-2">
                {brands && brands.length > 0 && (
                  <Select
                    name="brand"
                    title="Brand"
                    option={brands}
                    className="h-8"
                    onChange={(e) => {
                      filter.dispatch({
                        type: filter.ACTION_TYPE.BRAND_ID,
                        payload: e.target.value,
                      });
                    }}
                  />
                )}
                <Select
                  name="filter"
                  title="Sort by"
                  option={filters}
                  className="h-8"
                  onChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.PRICE_SORT,
                      payload: e.target.value,
                    });
                  }}
                />
                <div className="flex sm:hidden items-end justify-end">
                  <button
                    onClick={() => toggleOpenDrawer()}
                    className="flex items-center justify-between"
                  >
                    <FilterIcon size={22} />
                  </button>
                </div>
              </div>
            </div>
            {fetchProducts?.loading ? (
              <div className="w-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            ) : (
              <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
                {fetchProducts?.data?.map((product: ProductData) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    price={product.price}
                    name={product.name}
                    description={product.description}
                    cover_image={product.cover_image}
                    total_star={product.total_star}
                    quantity={product.quantity}
                  />
                ))}
              </div>
            )}

            <div className="w-full flex items-end justify-end mb-4">
              <Pagination
                filter={filter.data}
                totalPage={Math.ceil(
                  (fetchProducts.total ?? 0) / filter.data.limit
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
      <BottomDrawer
        isOpen={openDrawer}
        onClose={toggleOpenDrawer}
        title="TIKTOKSHOP"
        icon={<CancelIcon size={24} />}
        className="w-full md:w-96 z-50 bg-white mb-6"
      >
        <div className="w-full bg-white pb-6 mb-6 items-start justify-center flex-col gap-1 p-2 shadow-md">
          <div className="w-full border-b border-gray-200 py-2">
            <h1 className="text-sm text-gray-500">All categories</h1>
          </div>
          <div className="w-full">
            <ul className="w-full flex items-start justify-start flex-col gap-1 text-xs text-second_black p-2">
              {categoryData?.getCategories?.data?.map((val: Category) => (
                <li
                  key={val.id}
                  className="flex items-start justify-between cursor-pointer hover:bg-gray-200 w-full py-1 px-2 rounded"
                  onClick={() =>
                    router.push(`/category/${val.id}?name=${val.name?.name_en}`)
                  }
                >
                  <span>{val?.name?.name_en}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full mb-6">
            <div className="border rounded w-full p-2">
              <div className="bg-white rounded">
                <h1 className="text-sm">Price range</h1>
              </div>
              <div className="p-4">
                <div className="relative mb-6">
                  <RangeMultiSlider
                    onChange={(min, max) => {
                      filter.dispatch({
                        type: filter.ACTION_TYPE.PRICE_BETWEEN,
                        payload: [min, max],
                      });
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <IconButton
                  className="rounded text-base p-2 w-full mt-4 mb-6 italic text-sm bg-neon_pink"
                  type="button"
                  title="Apply now"
                  onClick={() => toggleOpenDrawer()}
                />
              </div>
            </div>
          </div>
        </div>
      </BottomDrawer>
    </>
  );
}
