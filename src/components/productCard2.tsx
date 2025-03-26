import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

// APIs and apollo
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  MUTATION_CREATE_SHOP_PRODUCT,
  QUERY_SINGLE_PRODUCT,
} from "@/api/product";

// components
import MyModal from "./modal";
import IconButton from "./iconButton";
import { CheckCircleIcon } from "@/icons/page";

// icons and untils
import { useTranslations } from "next-intl";
import { stripHtml } from "@/utils/stripHtml";
import { truncateText } from "@/utils/letterLimitation";
import { GetProductResponse, ProductData } from "@/types/product";
import { useToast } from "@/utils/toast";
import Loading from "./loading";

interface ProductCardProps extends ProductData {
  isSelected: boolean;
  onSelect: (productId: string, quantity: number) => void;
  refetch: () => void;
}

export default function ProductCard2({
  isSelected,
  onSelect,
  refetch,
  ...props
}: ProductCardProps) {
  const t = useTranslations("shop_product_list");
  const { successMessage, errorMessage } = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const defaultProductData: ProductData = {
    id: "",
    name: { name_en: "" },
    description: { name_en: "" },
    images: [],
    cover_image: "",
    price: 0,
    discount: null,
    quantity: null,
    sku: null,
    spu: null,
    total_star: null,
    total_comment: null,
    categories: [],
    brand_id: null,
    status: null,
    recommended: null,
    product_top: null,
    product_vip: null,
    created_at: null,
  };
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isOpenShelfModal, setIsOpenShelfModal] =
    React.useState<boolean>(false);
  const [productId, setProductId] = React.useState<string>("");
  const [productData, setProductData] =
    React.useState<ProductData>(defaultProductData);

  const [createShopProduct] = useMutation(MUTATION_CREATE_SHOP_PRODUCT);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenShelfModal = () => {
    setIsOpenShelfModal(!isOpenShelfModal);
  };

  const [getProduct] = useLazyQuery<GetProductResponse>(QUERY_SINGLE_PRODUCT, {
    fetchPolicy: "no-cache",
  });

  const handleApployProduct = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      const res = await createShopProduct({
        variables: {
          data: {
            status: "ACTIVE",
            shop_id: user?.id,
            quantity: quantity,
            product_id: productId,
          },
        },
      });

      if (res?.data?.createShopProduct?.success) {
        handleOpenShelfModal();
        successMessage({
          message: "Product applied successfully",
          duration: 3000,
        });
        refetch();
      } else {
        errorMessage({
          message: res?.data?.createShopProduct?.error?.message,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({ message: "Unexpected error happen!", duration: 3000 })
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProduct({
          variables: {
            getProductId: productId,
          },
        });
        if (res?.data?.getProduct.success) {
          setProductData(res.data.getProduct.data);
        }
      } catch (error) {
        // console.log("Error:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <div className="relative w-auto cursor-pointer flex flex-col select-none gap-2 rounded border hover:shadow-lg transition-all duration-300 p-3">
        {/* Checkbox for selection */}
        <div className={`absolute top-2 right-2 z-10 ${props?.shopProductStatus === "ON_SHELF" ? "hidden" : "block"}`}>
          <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer accent-neon_pink border border-gray-200"
            checked={isSelected}
            onChange={() => onSelect(props.id, props.quantity ?? 1)}
          />
        </div>

        {/* Product Image */}
        <div className="w-full bg-white rounded">
          <div className="w-full h-[150px] flex items-center justify-center">
            <Image
              className="rounded object-cover"
              src={
                props.cover_image !== "null" ? props.cover_image :
                  "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/default-image_uwedsh.webp"
              }
              alt=""
              width={120}
              height={120}
            />
          </div>

          {/* Product Details */}
          <div className="p-3 flex flex-col gap-1">
            <div className="w-full flex items-center justify-center gap-2">
              <i className="text-xs sm:text-md text-second_black font-normal sm:font-bold tracking-tight">
                {truncateText(`${props?.name.name_en}`, 20)}
              </i>
            </div>
            <p className="text-gray-500 font-normal text-xs">
              {truncateText(stripHtml(props?.description?.name_en ?? ""), 60)}
            </p>
            <p className="flex items-center text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; {t("_in_stock")} / {props?.quantity}.
            </p>
            <p className="flex items-center text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp;{t("_can_apply_product")}.
            </p>
            <p className="flex items-center text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; {t("_active")}.
            </p>

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 mt-2">
              <div className="absolute top-0 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-br-lg">
                ${props?.price}
              </div>
              <button
                className="w-full sm:w-auto bg-gray-500 text-white px-4 py-1 text-xs rounded"
                onClick={() => {
                  setProductId(props.id);
                  handleOpenModal();
                }}
              >
                {t("_show_button")}
              </button>
              <button
                className={`w-full sm:w-auto ${props.shopProductStatus === "ON_SHELF"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "text-white bg-neon_pink"
                  } px-4 py-1 text-xs rounded`}
                disabled={props.shopProductStatus === "ON_SHELF"}
                onClick={() => {
                  setProductId(props.id);
                  handleOpenShelfModal();
                }}
              >
                {props.shopProductStatus === "ON_SHELF"
                  ? "Already shelf"
                  : t("_up_shelf")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Address */}
      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="w-11/12"
      >
        <div className="rounded bg-white w-full p-4">
          <h4 className="text-gray-500 text-lg mb-3">
            {productData?.name.name_en}
          </h4>
          <div className="border-b-2 border-gray-300">
            <p className="text-sm text-gray-500">{t("_basic_info")}</p>
          </div>
          <div className="my-4 flex items-start justify-start flex-col gap-4">
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_product_name")}
              </label>
              <input
                required
                disabled
                id="product_name"
                type="text"
                value={productData?.name.name_en}
                className="w-11/12 h-8 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_categories")}
              </label>
              <div className="flex items-start justify-start gap-6">
                {productData?.categories?.map((val) => (
                  <span
                    key={val.id}
                    className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-md"
                  >
                    {val.name.name_en}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_brand")}
              </label>
              <input
                required
                disabled
                id="product_name"
                type="text"
                value={productData?.brand_id ?? ""}
                className="w-11/12 h-8 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_sku")}
              </label>
              <input
                required
                disabled
                type="text"
                id="product_name"
                value={productData?.sku ?? ""}
                className="w-11/12 h-8 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_spu")}
              </label>
              <input
                required
                disabled
                type="text"
                id="product_name"
                value={productData?.spu ?? ""}
                className="w-11/12 h-8 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_sort_by")}
              </label>
              <input
                required
                disabled
                type="text"
                value={0}
                id="product_name"
                className="w-11/12 h-8 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_status")}
              </label>
              <input
                required
                disabled
                type="text"
                id="product_name"
                value={productData?.status ?? ""}
                className="w-11/12 h-8 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_url")}
              </label>
              <input
                required
                disabled
                id="product_name"
                type="text"
                className="w-11/12 h-8 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_description")}
              </label>
              <textarea
                required
                disabled
                rows={4}
                id="product_description"
                value={stripHtml(productData?.description?.name_en ?? "")}
                className="w-11/12 bg-gray-100 text-gray-500 border text-xs rounded block p-2 focus:outline-none focus:ring-1"
              />
            </div>
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                {t("_images")}
              </label>
              <div className="w-11/12">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr className="text-gray-100">
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          {t("_images")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          {t("_label")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          {t("_sort")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          {t("_cover_image")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          {t("_image_description")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productData?.images?.map((value) => (
                        <tr className="bg-white border" key={value}>
                          <th
                            scope="row"
                            className="px-6 py-4 whitespace-nowrap border"
                          >
                            <Image
                              className="rounded object-cover"
                              src={
                                value && !value.includes("http")
                                  ? "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
                                  : value
                              }
                              alt=""
                              width={120}
                              height={120}
                            />
                          </th>
                          <td scope="row" className="px-6 py-4 border">
                            {productData?.name?.name_en}
                          </td>
                          <td className="px-6 py-4 border">0</td>
                          <td className="px-6 py-4 border">Yes</td>
                          <td className="px-6 py-4 border">Yes</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-end gap-4">
              <IconButton
                type="button"
                title={t("_cancel_button")}
                onClick={handleOpenModal}
                className="rounded bg-neon_pink p-2 w-auto text-white text-xs"
              />
            </div>
          </div>
        </div>
      </MyModal>

      <MyModal
        isOpen={isOpenShelfModal}
        onClose={handleOpenShelfModal}
        className="w-11/12 sm:w-2/4"
      >
        <div className="text-gray-500 flex items-center justify-center flex-col gap-6 p-4">
          <div className="w-full flex items-center justify-center flex-col gap-2">
            <h1 className="text-md sm:text-lg">{t("_confirm_title")}</h1>
            <p className="text-xs">{productData?.name.name_en}</p>
          </div>
          <div className="w-full flex items-center justify-center gap-4">
            <IconButton
              type="button"
              title={t("_cancel_button")}
              onClick={handleOpenShelfModal}
              className="rounded bg-gray-500 p-2 w-auto text-white text-xs"
            />
            <IconButton
              type="button"
              title={t("_apploy_button")}
              icon={isLoading ? <Loading /> : ""}
              isFront={true}
              onClick={() =>
                handleApployProduct(
                  productData?.id,
                  productData?.quantity ?? 100
                )
              }
              className="rounded bg-neon_pink p-2 w-auto text-white text-xs"
            />
          </div>
        </div>
      </MyModal>
    </>
  );
}
