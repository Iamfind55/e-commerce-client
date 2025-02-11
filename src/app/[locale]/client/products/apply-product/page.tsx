"use client";

import React from "react";

// apollo
import { useLazyQuery } from "@apollo/client";
import { QUERY_CATEGORIES_HEADER } from "@/api/category";

// components
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";

// icons, hooks and utils
import ProductCard2 from "@/components/productCard2";
import { ArrowDownIcon, NextIcon } from "@/icons/page";
import useFilter from "@/app/[locale]/(pages)/product/hooks/useFilter/page";
import useFetchProducts from "@/app/[locale]/(pages)/product/hooks/useFetchProduct";
import { useTranslations } from "next-intl";

export default function ApplyProduct() {
  const t = useTranslations("shop_product_list");
  const filter = useFilter();
  const [openMenus, setOpenMenus] = React.useState<string[]>([]);
  const [checkedId, setCheckedId] = React.useState<string | null>(null);
  const [checkedCategories, setCheckedCategories] = React.useState<string[]>(
    []
  );

  const fetchShopProduct = useFetchProducts({ filter: filter.data });

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  const toggleCheckbox = (
    categoryId: string,
    parentId: string | null = null
  ) => {
    setCheckedId(categoryId);
    setCheckedCategories((prev) => {
      // If checking a subcategory, ensure the parent is also checked
      if (parentId && !prev.includes(parentId)) {
        return [...prev, parentId, categoryId]; // Check both parent and subcategory
      }

      // If unchecking a subcategory, make sure the parent remains checked (if it's not unchecked)
      if (!parentId) {
        return prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Uncheck the current category
          : [...prev, categoryId]; // Check the current category
      }

      // If unchecking a parent category, only remove it (don't affect subcategories)
      return prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];
    });

    filter.dispatch({
      type: filter.ACTION_TYPE.CATEGORY_ID,
      payload: categoryId,
    });
  };

  const renderMenu = (
    items: Category[],
    level = 0,
    parentId: string | null = null
  ) =>
    items?.map((item, index) => {
      const isMenuOpen = openMenus.includes(item.name.name_en);
      const isChecked = checkedCategories.includes(item.id); // Check if this category is in the checked state

      return (
        <div key={`${level}-${index}`} className="w-full">
          {/* Parent Menu */}
          <div
            onClick={() =>
              item.subcategories?.length && toggleMenu(item.name.name_en)
            }
            className="flex items-center justify-between cursor-pointer px-4 py-1 text-gray-500 hover:bg-gray-100"
          >
            <div className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                className="checkbox"
                checked={isChecked}
                onChange={() => toggleCheckbox(item.id, parentId)} // Pass parentId for subcategories
              />
              <span>{item.name.name_en}</span>
            </div>
            {item.subcategories && item.subcategories.length > 0 && (
              <span className="text-gray-400">
                {isMenuOpen ? (
                  <ArrowDownIcon size={18} />
                ) : (
                  <NextIcon size={16} />
                )}
              </span>
            )}
          </div>
          {item.subcategories &&
            item.subcategories.length > 0 &&
            isMenuOpen && (
              <div className={`ml-${10 + level * 5} ml-6`}>
                {renderMenu(item.subcategories, level + 1, item.id)}{" "}
                {/* Pass parentId to subcategories */}
              </div>
            )}
        </div>
      );
    });

  const [getCategories, { data, error }] = useLazyQuery(
    QUERY_CATEGORIES_HEADER,
    {
      fetchPolicy: "no-cache",
    }
  );

  React.useEffect(() => {
    getCategories({
      variables: {
        where: { status: "ACTIVE" },
        sortedBy: "created_at_ASC",
      },
    });
  }, [getCategories]);

  React.useEffect(() => {
    if (checkedId) {
      filter.dispatch({
        type: filter.ACTION_TYPE.CATEGORY_ID,
        payload: checkedId ?? "",
      });
    }
  }, [checkedId]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: t("_product"), value: "/products" },
          { label: t("_apply_product"), value: "/apply-product" },
        ]}
      />
      <div className="bg-white flex items-start justify-start flex-col gap-2 p-4 mt-4">
        <p className="text-gray-500 text-xs">{t("_filter_title")}:</p>
        <div className="w-full border border-gray-100 rounded">
          <div className="w-full flex flex-col gap-2 py-2">
            {renderMenu(data?.getCategories?.data || [])}
          </div>
        </div>
        <p className="text-gray-500 text-xs mt-4">
          {t("_list_founded_product")}:
        </p>
        <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
          {fetchShopProduct?.data?.map((product) => (
            <ProductCard2 key={product.id} {...product} />
          ))}
        </div>
        <div className="w-full flex items-end justify-end mb-4">
          <Pagination
            filter={filter.data}
            totalPage={Math.ceil(
              (fetchShopProduct.total ?? 0) / filter.data.limit
            )}
            onPageChange={(e) => {
              filter.dispatch({ type: filter.ACTION_TYPE.PAGE, payload: e });
            }}
          />
        </div>
      </div>
    </>
  );
}
