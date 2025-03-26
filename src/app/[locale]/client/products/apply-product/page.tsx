"use client";

import React from "react";
import { useTranslations } from "next-intl";

// apollo
import { useLazyQuery, useMutation } from "@apollo/client";
import { QUERY_CATEGORIES_HEADER } from "@/api/category";

// components
import EmptyPage from "@/components/emptyPage";
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";

// icons, hooks and utils
import ProductCard2 from "@/components/productCard2";
import { ArrowDownIcon, NextIcon } from "@/icons/page";
import useFilter from "@/app/[locale]/(pages)/product/hooks/useFilter/page";
import useFetchProducts from "@/app/[locale]/(pages)/product/hooks/useFetchProduct";
import IconButton from "@/components/iconButton";
import Loading from "@/components/loading";
import { useSelector } from "react-redux";
import { ProductName } from "@/types/product";
import { MUTATION_CREATE_MANY_SHOP_PRODUCT } from "@/api/product";
import { useToast } from "@/utils/toast";

// Type definitions
type ProductType = {
  id: string;
  quantity?: number | null;
  shopId?: string;
  shopProductStatus?: string | null;
  name: ProductName;
  images?: string[];
  cover_image: string;
};

type SelectedProduct = {
  product_id: string;
  quantity: number;
  shop_id: string;
};

export default function ApplyProduct() {
  const filter = useFilter();
  const g = useTranslations("global");
  const t = useTranslations("shop_product_list");
  const a = useTranslations("apply_vip_product");
  const { successMessage, errorMessage } = useToast();
  const { user } = useSelector((state: any) => state.auth);

  const [openMenus, setOpenMenus] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [checkedId, setCheckedId] = React.useState<string | null>(null);
  const [checkedCategories, setCheckedCategories] = React.useState<string[]>([]);

  const [createShopProduct] = useMutation(MUTATION_CREATE_MANY_SHOP_PRODUCT);
  const fetchShopProduct = useFetchProducts({ filter: filter.data });

  const [selectedProducts, setSelectedProducts] = React.useState<SelectedProduct[]>([]);

  const handleSelectProduct = (product: ProductType) => {
    setSelectedProducts((prevSelected) => {
      const existingProductIndex = prevSelected.findIndex(
        (item) => item.product_id === product.id
      );

      if (existingProductIndex !== -1) {
        return prevSelected.filter(
          (item) => item.product_id !== product.id
        );
      }

      // Ensure quantity is a number, defaulting to 0 if undefined or null
      const quantity = product.quantity ?? 0;

      // Add new product with guaranteed number quantity
      return [
        ...prevSelected,
        {
          product_id: product.id,
          quantity: Number(quantity), // Explicitly convert to number
          shop_id: user?.id ?? '' // Use user's ID or empty string as fallback
        }
      ];
    });
  };

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
      const isChecked = checkedCategories.includes(item.id);

      return (
        <div key={`${level}-${index}`} className="w-full">
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
                onChange={() => toggleCheckbox(item.id, parentId)}
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
              </div>
            )}
        </div>
      );
    });

  const [getCategories, { data }] = useLazyQuery(QUERY_CATEGORIES_HEADER, {
    fetchPolicy: "no-cache",
  });

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

  // Check if all products are selected
  const allSelected =
    fetchShopProduct?.data &&
    fetchShopProduct.data.length > 0 &&
    selectedProducts.length === fetchShopProduct.data.length;

  const handleSelectAll = () => {
    if (!fetchShopProduct?.data) return;

    // If all products are currently selected, unselect all
    if (allSelected) {
      setSelectedProducts([]);
    } else {
      // Select all products except those with ON_SHELF status
      const selectableProducts = fetchShopProduct.data
        .filter((product) => product.shopProductStatus !== "ON_SHELF")
        .map((product) => ({
          product_id: product.id,
          quantity: 0,
          shop_id: user?.id ?? ''
        }));

      setSelectedProducts(selectableProducts);
    }
  };

  const handleApplyAllProducts = async () => {
    try {
      const res = await createShopProduct({
        variables: {
          data: selectedProducts
        }
      })
      if (res?.data?.createManyShopProducts?.success) {
        successMessage({
          message: "Product applied successfully",
          duration: 3000,
        });
        fetchShopProduct.refetch();
      } else {
        errorMessage({
          message: res?.data?.createManyShopProducts?.error?.message,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({ message: "Unexpected error happen!", duration: 3000 })
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="w-full flex items-center justify-between mt-2">
          <p className="w-1/2 text-gray-500 text-xs mt-4">
            {t("_list_founded_product")}:
          </p>
          <div className="w-full flex items-center sm:justify-end justify-between gap-4">
            <div className={`flex items-center ${selectedProducts.length >= 1 ? "hidden" : "block"}`}>
              <input
                checked={!!allSelected}
                onChange={handleSelectAll}
                id="checked-checkbox"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 rounded-sm focus:ring-neon_pink"
              />
              <label
                htmlFor="checked-checkbox"
                className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
              >
                {a("_select_all")}
              </label>
            </div>
            <IconButton
              type="button"
              title="Cancel"
              icon={isLoading ? <Loading /> : ""}
              isFront={true}
              className={`rounded bg-gray-500 p-2 w-auto text-white text-xs ${selectedProducts.length >= 1 ? "block" : "hidden"
                }`}
              onClick={() => setSelectedProducts([])}
            />
            <IconButton
              type="button"
              title={g("_apply_button")}
              icon={isLoading ? <Loading /> : ""}
              isFront={true}
              className={`rounded bg-neon_pink p-2 w-auto text-white text-xs ${selectedProducts.length >= 1 ? "block" : "hidden"}`}
              onClick={handleApplyAllProducts}
            />
          </div>
        </div>
        {fetchShopProduct?.total ?? 0 > 0 ? (
          <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
            {fetchShopProduct?.data?.map((product) => (
              <ProductCard2
                key={product.id}
                {...product}
                isSelected={
                  selectedProducts.some(
                    (selectedProduct) => selectedProduct.product_id === product.id
                  )
                }
                onSelect={() => handleSelectProduct({
                  ...product,
                  id: product.id,
                  quantity: product.quantity,
                  shopId: user.id
                })}
                refetch={() => fetchShopProduct.refetch()}
              />
            ))}
          </div>
        ) : (
          <div className="w-full items-start justify-center">
            <EmptyPage />
          </div>
        )}
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