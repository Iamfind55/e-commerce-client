import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// APIs and apollo
import { useLazyQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "@/api/product";

// components
import MyModal from "./modal";
import IconButton from "./iconButton";
import {
  CheckCircleIcon,
  VIP1Icon,
  VIP2Icon,
  VIP3Icon,
  VIP4Icon,
  VIP5Icon,
} from "@/icons/page";

// icons and untils
import { stripHtml } from "@/utils/stripHtml";
import { GetProductResponse, ProductData } from "@/types/product";
import { truncateText } from "@/utils/letterLimitation";

interface VIPProductCardProps extends ProductData {
  selectedProducts: { id: string; quantity: number }[];
  handleCheckboxChange: (productId: string) => void;
}

export default function VIPProductCard({
  id,
  name,
  description,
  cover_image,
  price,
  quantity,
  product_vip,
  selectedProducts,
  shopProductStatus,
  handleCheckboxChange,
}: VIPProductCardProps) {
  const t = useTranslations("shop_product_list");
  const selectedIds = selectedProducts.map((product) => product.id);
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
    category_ids: null,
    brand_id: null,
    status: null,
    recommended: null,
    product_top: null,
    product_vip: null,
    created_at: null,
  };
  const [productId, setProductId] = React.useState<string>("");
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [productData, setProductData] =
    React.useState<ProductData>(defaultProductData);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const [getProduct] = useLazyQuery<GetProductResponse>(QUERY_SINGLE_PRODUCT, {
    fetchPolicy: "no-cache",
  });
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
      <div className="cursor-pointer flex items-start justify-start flex-col select-none gap-2 w-auto rounded rounded-tr-xl border hover:shadow-lg transition-all duration-300">
        <div className="w-full bg-white rounded relative group">
          {/* Checkbox - Top-Left */}
          <div
            className={`absolute top-1 left-2 group ${selectedIds.length >= 1
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
              } ${shopProductStatus === "ON_SHELF" ? "hidden" : "block"
              } transition-opacity duration-200`}
          >
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded text-neon_pink focus:ring-neon_pink border-gray-300"
              onChange={() => handleCheckboxChange(id)}
              checked={selectedIds.includes(id)}
            />
          </div>

          {/* Checkbox - Top-Right */}
          <div className="absolute top-0 right-0">
            {product_vip === 1 ? (
              <div className="flex items-center justify-center gap-1 text-white bg-gray-500 py-1 px-4 rounded-tr-xl rounded-bl-xl">
                <p className="text-xs">VIP</p>
                <VIP1Icon size={16} className="text-white" />
              </div>
            ) : product_vip === 2 ? (
              <div className="flex items-center justify-center gap-1 text-white bg-emerald-500 py-1 px-4 rounded-tr-xl rounded-bl-xl">
                <p className="text-xs">VIP</p>
                <VIP2Icon size={16} className="text-white" />
              </div>
            ) : product_vip === 3 ? (
              <div className="flex items-center justify-center gap-1 text-white bg-teal-500 py-1 px-4 rounded-tr-xl rounded-bl-xl">
                <p className="text-xs">VIP</p>
                <VIP3Icon size={16} className="text-white" />
              </div>
            ) : product_vip === 4 ? (
              <div className="flex items-center justify-center gap-1 text-white bg-purple-500 py-1 px-4 rounded-tr-xl rounded-bl-xl">
                <p className="text-xs">VIP</p>
                <VIP4Icon size={16} className="text-white" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1 text-white bg-pink-500 py-1 px-4 rounded-tr-xl rounded-bl-xl">
                <p className="text-xs">VIP</p>
                <VIP5Icon size={16} className="text-white" />
              </div>
            )}
          </div>

          <div className="w-full h-[150px] object-cover flex items-center justify-center">
            <Image
              className="rounded object-cover"
              src={
                !cover_image
                  ? "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
                  : cover_image
              }
              alt=""
              width={120}
              height={120}
            />
          </div>
          <div className="p-3 flex items-start justify-start flex-col gap-1">
            <div className="w-full flex items-center justify-start gap-2">
              <i className="text-xs sm:text-md text-second_black font-normal sm:font-bold tracking-tight">
                {truncateText(`${name.name_en}`, 25)}
              </i>
            </div>
            <p className="text-gray-500 font-normal text-xs">
              {truncateText(stripHtml(description?.name_en ?? ""), 60)}
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; {t("_in_stock")} / {quantity}.
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              {/* &nbsp; {t("_already_on_shelf")} */}
              &nbsp;{t("_can_apply_product")}.
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; {t("_active")}.
            </p>
            <div className="w-full flex flex-col sm:flex-row md:flex-row items-center justify-between gap-2 mt-2">
              <div>
                <p className="font-bold text-md text-black">${price}</p>
              </div>
              <button
                className={`w-full sm:w-auto ${shopProductStatus === "ON_SHELF"
                    ? "text-neon_pink bg-gray-200 border border-neon_pink"
                    : "text-gray-500 border border-gray-200"
                  }  flex items-center justify-center px-4 py-1 text-xs text-center rounded focus:outline-none`}
                onClick={() => {
                  setProductId(id);
                  handleOpenModal();
                }}
              >
                {shopProductStatus === "ON_SHELF"
                  ? "Already on shelf"
                  : t("_view")}
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
    </>
  );
}
