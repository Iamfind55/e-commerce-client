"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";

// components
import Breadcrumb from "@/components/breadCrumb";
import Pagination from "@/components/pagination";
import useFetchProducts from "./hooks/useFetchProduct";

// icons, utils, and hooks
import { useToast } from "@/utils/toast";
import { AwardIcon } from "@/icons/page";
import useFilter from "./hooks/useFilter/page";
import EmptyPage from "@/components/emptyPage";
import IconButton from "@/components/iconButton";
import VIPProductCard from "@/components/vipProductCard";

import { MUTATION_CREATE_SHOP_PRODUCT } from "@/api/product";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";

export default function ApplyVIPProduct() {
  const filter = useFilter();
  const c = useTranslations("contact_page");
  const t = useTranslations("apply_vip_product");
  const m = useTranslations("myCartPage");
  const g = useTranslations("global");
  const { successMessage, errorMessage } = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const fetchProduct = useFetchProducts({ filter: filter.data });

  console.log(fetchProduct);

  const [activeVIP, setActiveVIP] = React.useState<number>(1);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = React.useState<
    { id: string; quantity: number }[]
  >([]);

  const [apployShopVIPProduct] = useMutation(MUTATION_CREATE_SHOP_PRODUCT);

  // Handle individual product selection
  const handleCheckboxChange = (productId: string, quantity: number) => {
    setSelectedProducts((prevSelectedProducts) => {
      const exists = prevSelectedProducts.some((p) => p.id === productId);

      if (exists) {
        return prevSelectedProducts.filter((p) => p.id !== productId);
      } else {
        return [...prevSelectedProducts, { id: productId, quantity }];
      }
    });
  };

  // Check if all products are selected
  const allSelected =
    fetchProduct?.data &&
    fetchProduct.data.length > 0 &&
    selectedProducts.length === fetchProduct.data.length;

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (!fetchProduct?.data) return;

    if (allSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(
        fetchProduct.data
          .filter((product) => product.shopProductStatus !== "ON_SHELF") // Exclude "ON_SHELF" products
          .map((product) => ({
            id: product.id,
            quantity: product.quantity ?? 0,
          }))
      );
    }
  };

  const handleApplyProduct = async () => {
    setIsLoading(true);
    try {
      const promises = selectedProducts.map((product) =>
        apployShopVIPProduct({
          variables: {
            data: {
              status: "ACTIVE",
              shop_id: user?.id,
              quantity: product.quantity,
              product_id: product.id,
            },
          },
        })
      );

      const responses = await Promise.all(promises);
      let success = true;
      let errorMessageText = "";

      responses.forEach((res) => {
        if (res?.data?.createShopProduct?.success === false) {
          const error = res?.data?.createShopProduct?.error;

          // Always add the error message
          if (error?.message) {
            errorMessageText += `${error.message} `;
          }

          // Track failure
          success = false;
        }
      });

      if (success && !errorMessageText) {
        successMessage({
          message: "Products applied successfully",
          duration: 3000,
        });
        setSelectedProducts([]);
      } else {
        errorMessage({
          message: errorMessageText || "Some products failed to apply.",
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error happened! Try again later",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: c("_dashboard"), value: "/client" },
          { label: t("_apply_vip_product"), value: "/apply-vip-product" },
        ]}
      />
      <div className="my-2 flex items-start justify-start flex-col gap-4 bg-white p-4">
        <div className="w-full flex flex-col items-start justify-between">
          <p className="text-gray-500 text-sm mt-4 mb-2">
            {t("_filter_title")}
          </p>
          <div className="w-full gap-4 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((vip) => (
              <div
                key={vip}
                className={`w-full h-12 rounded ${
                  activeVIP === vip
                    ? "bg-neon_pink text-white"
                    : "bg-gray-500 text-white"
                } flex items-center justify-center flex-col cursor-pointer`}
                onClick={() => {
                  setActiveVIP(vip);
                  filter.dispatch({
                    type: filter.ACTION_TYPE.PRODUCT_VIP,
                    payload: vip,
                  });
                }}
              >
                <AwardIcon size={22} />
                <div className="w-full text-sm font-bold text-center">{`VIP-0${vip}`}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full text-gray-500 flex flex-col sm:flex-col md:flex-row lg:flex-row items-start justify-between gap-2 my-4">
            <div className="w-full flex items-start sm:justify-start justify-between gap-2">
              <p className="text-gray-500 text-sm">
                {t("_founded_prdduct")}&nbsp;
                <span className="text-neon_pink">{`VIP-0${activeVIP}:`}</span>
              </p>
              <div className="flex items-start justify-start gap-2">
                <p className="text-sm">
                  ({fetchProduct?.total ?? 0}&nbsp;{m("_items")})
                </p>
              </div>
            </div>
            <div className="w-full flex items-center sm:justify-end justify-between gap-4">
              <div className="flex items-center">
                <input
                  checked={!!allSelected}
                  onChange={handleSelectAll}
                  id="checked-checkbox"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                />
                <label
                  htmlFor="checked-checkbox"
                  className="ms-2 text-sm font-medium text-gray-800 cursor-pointer"
                >
                  {t("_select_all")}
                </label>
              </div>
              <IconButton
                type="button"
                title={g("_apply_button")}
                icon={isLoading ? <Loading /> : ""}
                isFront={true}
                className={`rounded bg-neon_pink p-2 w-auto text-white text-xs ${
                  selectedProducts.length >= 1 ? "block" : "hidden"
                }`}
                onClick={handleApplyProduct}
              />
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
                  {fetchProduct?.data?.map((product) => (
                    <VIPProductCard
                      key={product.id}
                      {...product}
                      selectedProducts={selectedProducts}
                      handleCheckboxChange={() =>
                        handleCheckboxChange(product.id, product.quantity ?? 0)
                      }
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
          <div className="w-full flex items-center sm:items-end justify-center sm:justify-end mb-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (fetchProduct.total ?? 0) / filter.data.limit
              )}
              onPageChange={(e) =>
                filter.dispatch({
                  type: filter.ACTION_TYPE.PAGE,
                  payload: e,
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
