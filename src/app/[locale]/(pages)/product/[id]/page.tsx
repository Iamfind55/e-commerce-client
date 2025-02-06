"use client";

import Image from "next/image";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import RatingStar from "@/components/ratingStar";
import React, { useState, useEffect } from "react";

// Apollo and APIs
import {
  QUERY_BEST_SELLING_PRODUCTS,
  QUERY_SIMILAR_PRODUCT,
  QUERY_SINGLE_PRODUCT,
} from "@/api/product";
import { useLazyQuery } from "@apollo/client";

// components
import { useRouter } from "@/navigation";
import IconButton from "@/components/iconButton";
import ProductCard from "@/components/ProductCard";
import ThumbnailSwiper from "@/components/thumbnailSwiper";

import { addToCart } from "@/redux/slice/cartSlice";

// icons and utils
import {
  GetBestSellingProductsResponse,
  GetProductResponse,
  GetSimilarProductResponse,
  ProductData,
} from "@/types/product";
import { stripHtml } from "@/utils/stripHtml";
import { truncateText } from "@/utils/letterLimitation";
import { AwardIcon, CartIcon, MinusIcon, PlusIcon } from "@/icons/page";
import { useTranslations } from "next-intl";

export default function ProductDetails() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const s = useTranslations("shop_page");
  const t = useTranslations("product_detail");
  const token = Cookies.get("auth_token");
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const [price, setPrice] = useState<number>(0);
  const [tab, setTab] = React.useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(price);

  const [getProduct, { data: productData }] = useLazyQuery<GetProductResponse>(
    QUERY_SINGLE_PRODUCT,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [getSimilarProducts, { data: similarProductData }] =
    useLazyQuery<GetSimilarProductResponse>(QUERY_SIMILAR_PRODUCT, {
      fetchPolicy: "no-cache",
    });

  const [getBestSellProducts, { data: bestSellProductData }] =
    useLazyQuery<GetBestSellingProductsResponse>(QUERY_BEST_SELLING_PRODUCTS, {
      fetchPolicy: "no-cache",
    });

  React.useEffect(() => {
    getBestSellProducts({
      variables: {
        limit: 6,
      },
    });
  }, [getBestSellProducts]);

  React.useEffect(() => {
    getSimilarProducts({
      variables: {
        limit: 8,
      },
    });
  }, [getSimilarProducts]);

  React.useEffect(() => {
    getProduct({
      variables: {
        getProductId: id,
      },
    });
  }, [getProduct, id]);

  React.useEffect(() => {
    if (productData?.getProduct?.data) {
      setPrice(productData.getProduct.data.price);
    }
  }, [productData]);

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="flex items-center justify-center bg-bg_color py-0 sm:py-6">
      <div className="container w-full flex items-start justify-start flex-col gap-4 text-gray-500">
        <div className="w-full flex flex-col md:flex-row items-start justify-start gap-4 bg-white rounded">
          <div className="w-full sm:w-2/4 p-4 rounded flex items-start justify-center">
            <div className="w-full h-[60vh]">
              {productData?.getProduct?.data?.images && (
                <ThumbnailSwiper images={productData.getProduct.data.images} />
              )}
            </div>
          </div>
          <div className="w-full sm:w-2/4 h-[65vh] flex items-start justify-start flex-col gap-4 rounded p-4">
            <h1 className="text-md">
              {productData?.getProduct?.data?.name?.name_en}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <RatingStar
                rating={productData?.getProduct?.data?.total_star ?? 3}
              />
              <p className="text-xs">
                ({productData?.getProduct?.data?.total_comment ?? 0}{" "}
                {t("_comments")})
              </p>
            </div>
            <div className="border-b w-full"></div>
            <div className="w-full flex items-center justify-start gap-6">
              <p className="text-sm">{t("_seller")}</p>
              <div className="flex items-center justify-start gap-2">
                <p className="text-sm">Liyang Store</p>
                <Image
                  className="rounded"
                  src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/default-image_uwedsh.webp"
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="border-b w-full"></div>
            <div className="w-full flex items-center justify-start gap-6">
              <p className="text-sm">{t("_price")}</p>
              <h1 className="text-xl">${price}</h1>
            </div>
            <div className="border-b w-full"></div>
            <div className="w-full flex items-center justify-start gap-6">
              <p className="text-sm">{t("_quantity")}</p>
              <div className="flex items-center justify-start gap-6 border rounded py-2 px-4">
                <button
                  className="rounded-full bg-gray-300 text-white cursor-pointer"
                  onClick={handleDecreaseQuantity}
                >
                  <MinusIcon size={16} />
                </button>
                <p>{quantity}</p>
                <button
                  className="rounded-full bg-gray-300 text-white cursor-pointer"
                  onClick={handleIncreaseQuantity}
                >
                  <PlusIcon size={16} />
                </button>
              </div>
              <p className="text-sm">
                ({productData?.getProduct?.data?.quantity ?? 10}{" "}
                {t("_available")})
              </p>
            </div>
            <div className="border-b w-full"></div>
            <div>
              <div className="w-full flex items-center justify-start gap-6">
                <p className="text-sm">{t("_total_price")}:</p>
                <h1 className="text-xl">${totalPrice}</h1>
              </div>
              <div className="w-full flex items-start justify-start gap-4">
                <IconButton
                  className="rounded text-white p-2 w-auto mt-4 italic text-sm bg-neon_pink"
                  icon={<CartIcon />}
                  isFront={true}
                  type="button"
                  title={t("_add_to_cart")}
                  onClick={() => {
                    if (!token) {
                      router.push("/cus-signin");
                    } else {
                      dispatch(
                        addToCart({
                          id: productData?.getProduct?.data?.id ?? "",
                          name:
                            productData?.getProduct?.data?.name.name_en ?? "",
                          price: productData?.getProduct?.data?.price ?? 0,
                          quantity: quantity ?? 1,
                          cover_image:
                            productData?.getProduct?.data?.cover_image ?? "",
                          in_stock:
                            productData?.getProduct?.data?.quantity ?? 100,
                        })
                      );
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-start justify-start gap-6 py-4">
          <div className="w-full sm:w-3/4 order-2 sm:order-1 rounded flex bg-white p-2 items-start justify-start flex-col gap-4">
            <div className="w-full">
              <div className="mb-b border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <li className="me-2" role="presentation">
                    <button
                      className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                        tab === 1
                          ? "text-base text-sm border-b-2 border-neon_pink"
                          : "text-b_text"
                      }`}
                      onClick={() => setTab(1)}
                    >
                      <span>{t("_product_details")}</span>
                    </button>
                  </li>
                  <li className="me-2" role="presentation">
                    <button
                      className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                        tab === 2
                          ? "text-base text-sm border-b-2 border-neon_pink"
                          : "text-b_text"
                      }`}
                      onClick={() => setTab(2)}
                    >
                      <span>{t("_all_comments")}</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div id="default-tab-content" className="p-3">
                {tab === 1 && (
                  <div>
                    <p className="text-sm text-gray-500">
                      {stripHtml(
                        productData?.getProduct?.data?.description?.name_en ??
                          ""
                      )}
                    </p>
                  </div>
                )}
                {tab === 2 && t("_comments") + "...."}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-2 border-t py-2">
              <div className="flex items-center justify-between w-full">
                <p className="text-second_black text-sm sm:text-md">
                  {t("_related_products")}:
                </p>
              </div>
              <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
                {similarProductData?.getSimilarProducts?.data?.map(
                  (product: ProductData, index: number) => (
                    <ProductCard
                      key={product.id}
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
            </div>
          </div>

          <div className="w-full sm:w-1/4 order-1 sm:order-2 rounded bg-white">
            <div className="w-full flex items-start justify-between flex-col p-2">
              <div className="w-full flex items-start justify-between border-b py-4">
                <p className="text-xs">{t("_seller")}</p>
                <AwardIcon className="text-neon_pink" size={24} />
              </div>
              <div className="w-full flex items-start justify-start gap-2 flex-col py-2">
                <p className="text-xs">Poakue PK shop</p>
                <div className="w-full border rounded p-4 gap-2 flex items-center justify-center flex-col">
                  <RatingStar rating={4.5} />
                  <p className="text-xs">
                    {t("_all_comments")}: (1230) {t("_comments")}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex items-start justify-start gap-2 flex-col p-2">
              <h1 className="w-full border-b pb-2">
                {s("_best_selling_product")}:
              </h1>
              {bestSellProductData?.getBestSellingProducts?.data?.map(
                (product) => (
                  <div
                    key={product.id}
                    className="w-full flex items-start justify-start gap-2 cursor-pointer py-2 rounded border border-white hover:border hover:border-neon_pink"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <Image
                      className="rounded"
                      src={
                        product?.cover_image
                          ? product.cover_image
                          : "/images/default-image.png"
                      }
                      alt={product.name?.name_en}
                      width={100}
                      height={120}
                    />
                    <div className="flex items-start justify-start flex-col gap-1">
                      <p className="text-sm">
                        {truncateText(
                          stripHtml(product.name?.name_en ?? ""),
                          25
                        )}
                      </p>
                      <p className="text-xs">
                        {truncateText(
                          stripHtml(product.description?.name_en ?? ""),
                          60
                        )}
                      </p>
                      <div className="flex items-center justify-start gap-2">
                        <RatingStar rating={product.total_star ?? 2} />
                        <p className="text-sm">${product?.price}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
