"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// components
import GlobalSlider from "./slider";
import ProductCard from "@/components/ProductCard";

// icons and utils
import { Link } from "@/navigation";
import { NextIcon } from "@/icons/page";
import {
  GetBestSellingProductsResponse,
  GetProductsResponse,
  ProductData,
} from "@/types/product";

// apollo and APIs
import { useLazyQuery } from "@apollo/client";
import { QUERY_BANNERS } from "@/api/banner";
import { QUERY_CATEGORIES } from "@/api/category";
import { QUERY_BEST_SELLING_PRODUCTS, QUERY_PRODUCTS } from "@/api/product";


export default function Home() {
  const t = useTranslations("homePage");
  const [getBanners, { data }] = useLazyQuery<GetBannersResponse>(
    QUERY_BANNERS,
    {
      fetchPolicy: "no-cache",
    }
  );

  const [getCategories, { data: categoryData }] =
    useLazyQuery<GetCategoriesResponse>(QUERY_CATEGORIES, {
      fetchPolicy: "no-cache",
    });

  const [getProducts, { data: productData }] =
    useLazyQuery<GetProductsResponse>(QUERY_PRODUCTS, {
      fetchPolicy: "no-cache",
    });

  const [getPopularProducts, { data: popularProduct }] =
    useLazyQuery<GetProductsResponse>(QUERY_PRODUCTS, {
      fetchPolicy: "no-cache",
    });

  const [getBestSellProducts, { data: bestSellProduct }] =
    useLazyQuery<GetBestSellingProductsResponse>(QUERY_BEST_SELLING_PRODUCTS, {
      fetchPolicy: "no-cache",
    });

  React.useEffect(() => {
    getProducts({
      variables: {
        limit: 12,
        where: {
          status: "ACTIVE",
          product_vip: 0,
        },
      },
    });
  }, [getProducts]);

  React.useEffect(() => {
    getPopularProducts({
      variables: {
        limit: 6,
        sortedBy: "sell_count_ASC",
        where: {
          status: "ACTIVE",
          product_vip: 0,
        },
      },
    });
  }, [getPopularProducts]);

  React.useEffect(() => {
    getBestSellProducts({
      variables: {
        limit: 6,
      },
    });
  }, [getBestSellProducts]);

  React.useEffect(() => {
    getBanners({
      variables: {
        sortedBy: "created_at_DESC",
        where: {
          status: "ACTIVE",
        },
      },
    });
  }, [getBanners]);

  React.useEffect(() => {
    getCategories({
      variables: {
        limit: 8,
        sortedBy: "created_at_DESC",
        where: {
          status: "ACTIVE",
        },
      },
    });
  }, [getCategories]);

  const bannersByPosition = React.useMemo(() => {
    if (!data?.getBanners?.data) return {};
    return data.getBanners.data.reduce(
      (acc: Record<string, Banner[]>, banner: Banner) => {
        if (!banner.position) return acc;
        acc[banner.position] = acc[banner.position] || [];
        acc[banner.position].push(banner);
        return acc;
      },
      {}
    );
  }, [data]);

  return (
    <div className="my-4 sm:my-6">
      <div className="flex items-center justify-center flex-col gap-6">
        <div className="container flex flex-col gap-6 px-2 sm:px-0">
          <div className="h-auto w-full">
            <GlobalSlider
              images={bannersByPosition["1"] || []}
              height="h-[50vh]"
              slidePerview={1}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              {t("_categories")}:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
              {categoryData?.getCategories?.data.map((image) => (
                <Link
                  href={`/category/${image.id}?name=${image.name?.name_en}`}
                  key={image.id}
                >
                  <Image
                    className="w-full h-full rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:rounded-md"
                    src={image.image ?? "/images/category01.webp"}
                    alt={image.name?.name_en ?? "default"}
                    width={200}
                    height={600}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              {t("_best_selling")}:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
              {bestSellProduct?.getBestSellingProducts?.data?.map(
                (product: ProductData) => (
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
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannersByPosition["2"] &&
              bannersByPosition["2"]
                .slice(0, 2) // Limit to the first 2 images
                .map((image) => (
                  <Image
                    key={image.id}
                    className="w-full h-full rounded-md cursor-pointer"
                    src={image.image || ""}
                    alt={image.name}
                    width={200}
                    height={500}
                  />
                ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannersByPosition["2"] || []}
              height="h-[36vh]"
              slidePerview={1}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              {t("_popular_products")}:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
              {popularProduct?.getProducts?.data?.map(
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
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannersByPosition["3"] &&
              bannersByPosition["3"]
                .slice(0, 2)
                .map((image) => (
                  <Image
                    key={image.id}
                    className="w-full h-full rounded-md cursor-pointer"
                    src={image.image || ""}
                    alt={image.name}
                    width={200}
                    height={500}
                  />
                ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannersByPosition["3"]}
              height="h-[36vh]"
              slidePerview={1}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center justify-between w-full">
              <p className="text-second_black text-sm sm:text-md">
                {t("_recommended_products")}:
              </p>
              <Link
                href="#"
                className="text-neon_pink p-2 rounded text-sm flex items-center justify-center gap-2 hover:text-neon_blue"
              >
                {t("_view_more_button")}
                <NextIcon size={18} />
              </Link>
            </div>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
              {productData?.getProducts?.data?.map(
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
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannersByPosition["4"] &&
              bannersByPosition["4"]
                .slice(0, 2) // Limit to the first 2 images
                .map((image) => (
                  <Image
                    key={image.id}
                    className="w-full h-full rounded-md cursor-pointer"
                    src={image.image || ""}
                    alt={image.name}
                    width={200}
                    height={500}
                  />
                ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannersByPosition["4"]}
              height="h-[36vh]"
              slidePerview={1}
            />
          </div>
          <div className="hidden sm:block text-second_black flex items-start justify-start flex-col gap-6">
            <h3 className="text-second_black text-md sm:text-lg uppercase">
              {t("_about_us")}:
            </h3>
            <div className="flex items-start justify-start flex-col gap-4">
              <p className="text-second_black text-md mt-4">
                {t("_about_us_benefits")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_benefits_01")}</li>
                <li>{t("_benefits_02")}</li>
                <li>{t("_benefits_03")}</li>
                <li>{t("_benefits_04")}</li>
                <li>{t("_benefits_05")}</li>
                <li>{t("_benefits_06")}</li>
                <li>{t("_benefits_07")}</li>
                <li>{t("_benefits_08")}</li>
                <li>{t("_benefits_09")}</li>
                <li>{t("_benefits_10")}</li>
                <li>{t("_benefits_11")}</li>
                <li>{t("_benefits_12")}</li>
                <li>{t("_benefits_13")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_goods_policy_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_goods_policy_detail")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_consequences_violation_title")}:
              </p>
              <p className="text-sm pl-2 font-extralight">
                {t("_consequences_violation_descrition")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_consequences_violation_01")}</li>
                <li>{t("_consequences_violation_02")}</li>
                <li>{t("_consequences_violation_03")}</li>
                <li>{t("_consequences_violation_04")}</li>
                <li>{t("_consequences_violation_05")}</li>
                <li>{t("_consequences_violation_06")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_policy_supplies_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_policy_supplies_01")}</li>
                <li>{t("_policy_supplies_02")}</li>
                <li>{t("_policy_supplies_03")}</li>
                <li>{t("_policy_supplies_04")}</li>
                <li>{t("_policy_supplies_05")}</li>
                <li>{t("_policy_supplies_06")}</li>
                <li>{t("_policy_supplies_07")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_flammable_explisive_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_flammable_explisive_01")}</li>
                <li>{t("_flammable_explisive_02")}</li>
                <li>{t("_flammable_explisive_03")}</li>
                <li>{t("_flammable_explisive_04")}</li>
                <li>{t("_flammable_explisive_05")}</li>
                <li>{t("_flammable_explisive_06")}</li>
                <li>{t("_flammable_explisive_07")}</li>
                <li>{t("_flammable_explisive_08")}</li>
                <li>{t("_flammable_explisive_09")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_stability_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_stability_01")}</li>
                <li>{t("_stability_02")}</li>
                <li>{t("_stability_03")}</li>
                <li>{t("_stability_04")}</li>
                <li>{t("_stability_05")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_pornographic_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_pornographic_01")}</li>
                <li>{t("_pornographic_02")}</li>
                <li>{t("_pornographic_03")}</li>
                <li>{t("_pornographic_04")}</li>
                <li>{t("_pornographic_05")}</li>
                <li>{t("_pornographic_06")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_involving_safety_privacy_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_involving_safety_privacy_01")}</li>
                <li>{t("_involving_safety_privacy_02")}</li>
                <li>{t("_involving_safety_privacy_03")}</li>
                <li>{t("_involving_safety_privacy_04")}</li>
                <li>{t("_involving_safety_privacy_05")}</li>
                <li>{t("_involving_safety_privacy_06")}</li>
                <li>{t("_involving_safety_privacy_07")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_equipment_category_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_equipment_category_01")}</li>
                <li>{t("_equipment_category_02")}</li>
                <li>{t("_equipment_category_03")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_service_ticket_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_service_ticket_01")}</li>
                <li>{t("_service_ticket_02")}</li>
                <li>{t("_service_ticket_03")}</li>
                <li>{t("_service_ticket_04")}</li>
                <li>{t("_service_ticket_05")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_without_permission_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_without_permission_01")}</li>
                <li>{t("_without_permission_02")}</li>
                <li>{t("_without_permission_03")}</li>
                <li>{t("_without_permission_04")}</li>
                <li>{t("_without_permission_05")}</li>
                <li>{t("_without_permission_06")}</li>
                <li>{t("_without_permission_07")}</li>
                <li>{t("_without_permission_08")}</li>
                <li>{t("_without_permission_09")}</li>
                <li>{t("_without_permission_10")}</li>
                <li>{t("_without_permission_11")}</li>
                <li>{t("_without_permission_12")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_virtual_goods_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_virtual_goods_01")}</li>
                <li>{t("_virtual_goods_02")}</li>
                <li>{t("_virtual_goods_03")}</li>
                <li>{t("_virtual_goods_04")}</li>
                <li>{t("_virtual_goods_05")}</li>
                <li>{t("_virtual_goods_06")}</li>
                <li>{t("_virtual_goods_07")}</li>
                <li>{t("_virtual_goods_08")}</li>
                <li>{t("_virtual_goods_09")}</li>
                <li>{t("_virtual_goods_10")}</li>
                <li>{t("_virtual_goods_11")}</li>
                <li>{t("_virtual_goods_12")}</li>
                <li>{t("_virtual_goods_13")}</li>
                <li>{t("_virtual_goods_14")}</li>
                <li>{t("_virtual_goods_15")}</li>
                <li>{t("_virtual_goods_16")}</li>
                <li>{t("_virtual_goods_17")}</li>
                <li>{t("_virtual_goods_18")}</li>
                <li>{t("_virtual_goods_19")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_animals_plants_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_animals_plants_01")}</li>
                <li>{t("_animals_plants_02")}</li>
                <li>{t("_animals_plants_03")}</li>
                <li>{t("_animals_plants_04")}</li>
                <li>{t("_animals_plants_05")}</li>
                <li>{t("_animals_plants_06")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_theft_illegal_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_theft_illegal_01")}</li>
                <li>{t("_theft_illegal_02")}</li>
                <li>{t("_theft_illegal_03")}</li>
                <li>{t("_theft_illegal_04")}</li>
                <li>{t("_theft_illegal_05")}</li>
                <li>{t("_theft_illegal_06")}</li>
                <li>{t("_theft_illegal_07")}</li>
                <li>{t("_theft_illegal_08")}</li>
                <li>{t("_theft_illegal_09")}</li>
                <li>{t("_theft_illegal_10")}</li>
                <li>{t("_theft_illegal_11")}</li>
                <li>{t("_theft_illegal_12")}</li>
                <li>{t("_theft_illegal_13")}</li>
              </ul>
            </div>

            <div className="flex items-start justify-start flex-col gap-2">
              <p className="text-second_black text-md mt-4">
                {t("_other_categories_title")}:
              </p>
              <ul className="text-sm pl-2 sm:pl-4 flex items-start justify-start gap-2 flex-col font-extralight">
                <li>{t("_other_categories_01")}</li>
                <li>{t("_other_categories_02")}</li>
                <li>{t("_other_categories_03")}</li>
                <li>{t("_other_categories_04")}</li>
                <li>{t("_other_categories_05")}</li>
                <li>{t("_other_categories_06")}</li>
                <li>{t("_other_categories_07")}</li>
                <li>{t("_other_categories_08")}</li>
                <li>{t("_other_categories_09")}</li>
                <li>{t("_other_categories_10")}</li>
                <li>{t("_other_categories_11")}</li>
              </ul>
              <p className="text-sm pl-2 font-extralight">
                {t("_other_categories_additional_info_01")}
              </p>
              <p className="text-sm pl-2 font-extralight">
                {t("_other_categories_additional_info_02")}
              </p>
              <p className="text-sm pl-2 font-extralight">
                {t("_other_categories_additional_info_03")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
