"use client";

import React from "react";

// apollo
import { useLazyQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "@/api/category";

// components
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";
import ShopProductCard from "@/components/shopProductCard";

// icons, hooks and utils
import useFilter from "../hooks/useFilter/page";
import useFetchProducts from "../hooks/useFetchProduct";

export default function ApplyProduct() {
  const filter = useFilter();
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);
  const [checkedMenus, setCheckedMenus] = React.useState<string[]>([]);
  const fetchShopProduct = useFetchProducts({ filter: filter.data });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  const toggleCheckbox = (menu: string) => {
    setCheckedMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  const renderMenu = (items: Category[], level = 0) =>
    items?.map((item, index) => {
      const isMenuOpen = openMenus.includes(item.name.name_en);
      const isChecked = checkedMenus.includes(item.name.name_en);

      return (
        <div key={`${level}-${index}`} className="w-full">
          {/* Parent Menu */}
          <div
            // onClick={() =>
            //   item.children
            //     ? toggleMenu(item.name.name_en)
            //     : router.push(item.route)
            // }
            className={`flex items-center justify-between cursor-pointer px-4 py-1 text-gray-500 hover:bg-gray-100`}
          >
            <div className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                className="checkbox"
                checked={isChecked}
                onChange={() => {
                  toggleCheckbox(item.name.name_en);
                  filter.dispatch({
                    type: filter.ACTION_TYPE.CATEGORY_ID,
                    payload: item.id,
                  });
                }}
              />
              <span>{item.name.name_en}</span>
            </div>
            {/* {item.children && (
              <span className="text-gray-400">
                {isMenuOpen ? (
                  <ArrowDownIcon size={18} />
                ) : (
                  <NextIcon size={16} />
                )}
              </span>
            )} */}
          </div>

          {/* Render Children */}
          {/* {item.children && isMenuOpen && (
            <div className={`ml-${10 + level * 5} ml-6`}>
              {renderMenu(item.children, level + 1)}
            </div>
          )} */}
        </div>
      );
    });

  const [getCategories, { data, error }] = useLazyQuery(QUERY_CATEGORIES, {
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

  React.useEffect(() => {
    if (error) {
      console.error("Apollo Error:", error);
    }
  }, [error]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Products", value: "/products" },
          { label: "apply product", value: "/apply-product" },
        ]}
      />
      <div className="bg-white flex items-start justify-start flex-col gap-2 p-4 mt-4">
        <p className="text-gray-500 text-xs">Filter product by category:</p>
        <div className="w-full border border-gray-100 rounded">
          <div className="w-full flex flex-col gap-2 py-2">
            {/* {renderMenu(menuItems)} */}
            {renderMenu(data?.getCategories?.data)}
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          List of all products found:
        </p>
        <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
          {fetchShopProduct?.data?.map((product) => (
            <ShopProductCard key={product.id} {...product} />
          ))}
        </div>

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
    </>
  );
}
