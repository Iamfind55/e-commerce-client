import React from "react";
import Image from "next/image";

// APIs and apollo
import { useLazyQuery } from "@apollo/client";
import { QUERY_SHOP_SINGLE_PRODUCT } from "@/api/shop";

// components
import MyModal from "./modal";
import IconButton from "./iconButton";
import { CheckCircleIcon } from "@/icons/page";

// icons and untils
import { stripHtml } from "@/utils/stripHtml";
import { truncateText } from "@/utils/letterLimitation";
import { ProductData, ShopProduct } from "@/types/product";

export default function ShopProductCard(props: ShopProduct) {
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
    // category_ids: null,
    categories: [],
    brand_id: null,
    status: null,
    recommended: null,
    product_top: null,
    product_vip: null,
    created_at: null,
  };

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [productId, setProductId] = React.useState<string>("");
  const [productData, setProductData] =
    React.useState<ProductData>(defaultProductData);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const [getShopSingleProducts] = useLazyQuery(QUERY_SHOP_SINGLE_PRODUCT, {
    fetchPolicy: "no-cache",
  });

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getShopSingleProducts({
          variables: {
            getShopProductId: productId,
          },
        });
        if (res.data.getShopProduct.success) {
          setProductData(res.data.getShopProduct.data.productData);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <div className="cursor-pointer flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300">
        <div className="w-full bg-white rounded">
          <div className="w-full h-[150px] object-cover flex items-center justify-center">
            <Image
              className="rounded object-cover"
              src={
                !props.productData.cover_image
                  ? "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
                  : props?.productData.cover_image
              }
              alt=""
              width={120}
              height={120}
            />
          </div>
          <div className="p-3 flex items-start justify-start flex-col gap-1">
            <div className="w-full flex items-center justify-start gap-2">
              <i className="text-xs sm:text-md text-second_black font-normal sm:font-bold tracking-tight">
                {truncateText(`${props?.productData.name.name_en}`, 20)}
              </i>
            </div>
            <p className="text-gray-500 font-normal text-xs">
              {truncateText(
                stripHtml(props?.productData?.description?.name_en ?? ""),
                60
              )}
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; In stock / 12934.
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; Already on shelf.
            </p>
            <p className="flex items-center justify-start text-xs text-gray-500">
              <CheckCircleIcon size={16} className="text-green-500" />
              &nbsp; Active.
            </p>
            <div className="w-full flex flex-col sm:flex-row md:flex-row items-center justify-between gap-2 mt-2">
              <div>
                <p className="font-bold text-md">${props.productData.price}</p>
              </div>
              <button
                className="w-full sm:w-auto bg-neon_pink text-white flex items-center justify-center px-4 py-1 text-xs text-center rounded focus:outline-none"
                onClick={() => {
                  setProductId(props.id);
                  handleOpenModal();
                }}
              >
                View
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
            First Impressions Baby Girls Top and Bloomer Set, Created for Macys
          </h4>
          <div className="border-b-2 border-gray-300">
            <p className="text-sm text-gray-500">Basic infomation</p>
          </div>
          <div className="my-4 flex items-start justify-start flex-col gap-4">
            <div className="w-full flex items-start justify-start gap-2">
              <label
                htmlFor="product_name"
                className="text-gray-500 text-xs w-1/12"
              >
                Product name
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
                Categories
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
                Brand
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
                Sku
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
                Spu
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
                Sort by
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
                Status
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
                URL
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
                Description
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
                Images
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
                          Images
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          Label
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          Sort
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          Cover image
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-gray-500 border"
                        >
                          Image description
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
                                value
                                  ? value
                                  : "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
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
                title="Cancel"
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
