"use client";

import { QUERY_BRANDINGS } from "@/api/branding";
import { QUERY_CATEGORIES } from "@/api/category";
import { QUERY_PRODUCTS } from "@/api/product";
import ProductCard from "@/components/ProductCard";
import RangeMultiSlider from "@/components/RangeMultiSlider";
import BottomDrawer from "@/components/bottomDrawer";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import Pagination from "@/components/pagination";
import Select from "@/components/select";
import { ArrowDownIcon, CancelIcon, FilterIcon, NextIcon } from "@/icons/page";
import useFilter from "@/lib/useFilter";
import { useRouter } from "@/navigation";
import { GetBrandingResponse } from "@/types/branding";
import { GetProductsResponse, ProductData } from "@/types/product";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "next/navigation";
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

const filters: any = [
  { label: "Newest", value: "newest" },
  { label: "Most expensive", value: "most_expensive" },
  { label: "Cheapest", value: "cheapest" },
];

export default function Category() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [categoryName, setCategoryName] = React.useState<string | null>(null);

  const getQueryParam = (param: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  React.useEffect(() => {
    const name = getQueryParam("name");
    setCategoryName(name);
  }, []);

  const [openDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const toggleOpenDrawer = () => {
    setIsOpenDrawer(!openDrawer);
  };

  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };

  const [getBrandings, { data: brandingData }] =
    useLazyQuery<GetBrandingResponse>(QUERY_BRANDINGS, {
      fetchPolicy: "no-cache",
    });

  const [getProducts, { data: productData }] =
    useLazyQuery<GetProductsResponse>(QUERY_PRODUCTS, {
      fetchPolicy: "no-cache",
    });

  React.useEffect(() => {
    getProducts({
      variables: {
        limit: 12,
        where: {
          status: "ACTIVE",
          product_vip: 0,
          category_id: id,
        },
      },
    });
  }, [getProducts]);

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

  const brands = brandingData?.getBrandings?.data.map((brand) => ({
    label: brand.name.name_en,
    value: brand.id,
  }));

  const [getCategories, { data }] = useLazyQuery(QUERY_CATEGORIES, {
    fetchPolicy: "no-cache",
  });

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

  const fetchSignleCategories = async (id: string) => {
    await getCategories({
      variables: {
        where: {
          parent_id: id,
          status: "ACTIVE",
        },
        sortedBy: "created_at_ASC",
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="container flex items-start justify-start gap-2 py-4 text-second_black">
          <div className="w-1/4 hidden sm:flex items-start justify-center flex-col gap-1 p-2 rounded shadow-md">
            <div className="w-full border-b border-gray-200 py-2">
              <h1
                className="text-sm cursor-pointer hover:bg-gray-100 pl-4 py-1 rounded"
                onClick={() => router.push("/category")}
              >
                All categories
              </h1>
            </div>
            <div className="w-full">
              <ul className="w-full flex items-start justify-start flex-col gap-1 text-xs text-second_black p-2">
                {data?.getCategories?.data?.map(
                  (val: Category, index: number) => (
                    <li
                      key={index + 1}
                      className="flex items-start justify-between cursor-pointer hover:bg-gray-200 w-full py-1 px-2 rounded"
                      onClick={() => fetchSignleCategories(val?.id)}
                    >
                      <span>{val?.name?.name_en}</span>
                      <NextIcon size={16} />
                    </li>
                  )
                )}
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
                  { label: "All category", value: "/category" },
                  { label: `${categoryName}`, value: `/category/${id}` },
                ]}
              />
            </div>
            <div className="w-full flex sm:hidden items-center justify-between">
              <p className="text-sm">{categoryName}</p>
              <button
                onClick={() => toggleOpenDrawer()}
                className="flex items-center justify-between"
              >
                <FilterIcon size={22} />
              </button>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="hidden sm:block text-sm">{categoryName}</p>
              <div className="flex items-start justify-start gap-2">
                {brands && brands.length > 0 && (
                  <Select
                    name="brand"
                    title="Brand"
                    option={brands}
                    className="h-8"
                  />
                )}
                <Select
                  name="filter"
                  title="Sort by"
                  option={filters}
                  className="h-8"
                />
              </div>
            </div>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
              {productData?.getProducts?.data?.map(
                (product: ProductData, index: number) => (
                  <ProductCard
                    key={index + 1}
                    id={product.id}
                    price={product.price}
                    name={product.name}
                    description={product.description}
                    cover_image={product.cover_image}
                    total_star={product.total_star}
                  />
                )
              )}
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
