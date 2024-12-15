"use client";

import React from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { Link } from "@/navigation";
import { NextIcon } from "@/icons/page";
import GlobalSlider from "./slider";

// images
import category01 from "/public/images/category01.webp";
import category02 from "/public/images/category02.webp";
import category03 from "/public/images/category03.webp";
import category04 from "/public/images/category04.webp";
import category05 from "/public/images/category05.webp";
import category06 from "/public/images/category06.webp";
import category07 from "/public/images/category07.webp";
import category08 from "/public/images/category08.webp";
import bannerImage01 from "/public/images/banner01.webp";
import bannerImage02 from "/public/images/banner02.webp";
import bannerImage03 from "/public/images/banner03.webp";
import bannerImage04 from "/public/images/banner04.webp";
import bannerImage05 from "/public/images/banner05.webp";
import bannerImage06 from "/public/images/banner06.webp";
import sliderImage01 from "/public/images/slider01.jpg";
import sliderImage02 from "/public/images/slider02.jpg";
import sliderImage03 from "/public/images/slider03.jpg";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("homePage");
  const categoryImages = [
    { src: category01, alt: "Category 1", width: 200, height: 600 },
    { src: category02, alt: "Category 2", width: 200, height: 600 },
    { src: category03, alt: "Category 3", width: 200, height: 500 },
    { src: category04, alt: "Category 4", width: 200, height: 500 },
    { src: category05, alt: "Category 5", width: 200, height: 500 },
    { src: category06, alt: "Category 6", width: 200, height: 600 },
    { src: category07, alt: "Category 7", width: 200, height: 500 },
    { src: category08, alt: "Category 8", width: 200, height: 500 },
  ];

  const bannerImages01 = [
    { src: bannerImage01, alt: "Slider Image 1", width: 200, height: 500 },
    { src: bannerImage02, alt: "Slider Image 2", width: 200, height: 600 },
  ];

  const bannerImages02 = [
    { src: bannerImage03, alt: "Slider Image 1", width: 200, height: 500 },
    { src: bannerImage04, alt: "Slider Image 2", width: 200, height: 600 },
  ];

  const bannerImages03 = [
    { src: bannerImage05, alt: "Slider Image 1", width: 200, height: 500 },
    { src: bannerImage06, alt: "Slider Image 2", width: 200, height: 600 },
  ];

  const products = [
    {
      id: "123",
      price: "250",
      name: "Product1",
      description: "This is the first product in our system now.",
    },
    {
      id: "124",
      price: "300",
      name: "Product2",
      description: "This is the second product, a little better.",
    },
    {
      id: "125",
      price: "150",
      name: "Product3",
      description: "The third product, perfect for casual use.",
    },
    {
      id: "126",
      price: "200",
      name: "Product4",
      description: "Our fourth product, optimized for comfort.",
    },
    {
      id: "127",
      price: "350",
      name: "Product5",
      description: "The fifth product, top-of-the-line quality.",
    },
    {
      id: "128",
      price: "400",
      name: "Product6",
      description: "The sixth product, with premium features.",
    },
  ];

  const products02 = [
    {
      id: "1231",
      price: "250",
      name: "Product1",
      description: "This is the first product in our system now.",
    },
    {
      id: "1241",
      price: "300",
      name: "Product2",
      description: "This is the second product, a little better.",
    },
    {
      id: "1251",
      price: "150",
      name: "Product3",
      description: "The third product, perfect for casual use.",
    },
    {
      id: "1261",
      price: "200",
      name: "Product4",
      description: "Our fourth product, optimized for comfort.",
    },
    {
      id: "1271",
      price: "350",
      name: "Product5",
      description: "The fifth product, top-of-the-line quality.",
    },
    {
      id: "1281",
      price: "400",
      name: "Product6",
      description: "The sixth product, with premium features.",
    },
    {
      id: "12312",
      price: "250",
      name: "Product7",
      description: "This is the first product in our system now.",
    },
    {
      id: "12412",
      price: "300",
      name: "Product8",
      description: "This is the second product, a little better.",
    },
    {
      id: "12512",
      price: "150",
      name: "Product9",
      description: "The third product, perfect for casual use.",
    },
    {
      id: "12612",
      price: "200",
      name: "Product10",
      description: "Our fourth product, optimized for comfort.",
    },
    {
      id: "12712",
      price: "350",
      name: "Product11",
      description: "The fifth product, top-of-the-line quality.",
    },
    {
      id: "12812",
      price: "400",
      name: "Product12",
      description: "The sixth product, with premium features.",
    },
  ];

  const sliderImages = [
    { src: sliderImage01, alt: "Slider Image 1" },
    { src: sliderImage02, alt: "Slider Image 2" },
    { src: sliderImage03, alt: "Slider Image 3" },
  ];

  return (
    <div className="my-4 sm:my-6">
      <div className="flex items-center justify-center flex-col gap-6">
        <div className="container flex flex-col gap-6 px-2 sm:px-0">
          <div className="h-auto w-full">
            <GlobalSlider
              images={sliderImages}
              height="h-[80vh]"
              slidePerview={1}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              {t("_categories")}:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
              {categoryImages.map((image, index) => (
                <Link href="/category" key={index + 1}>
                  <Image
                    className="w-full h-full rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:rounded-md"
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
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
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
          </div>
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannerImages01.map((image, index) => (
              <Image
                key={index + 1}
                className="w-full h-full rounded-md cursor-pointer"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannerImages01}
              height="h-[36vh]"
              slidePerview={1}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-sm sm:text-md">
              {t("_popular_products")}:
            </p>
            <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
          </div>
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannerImages02.map((image, index) => (
              <Image
                key={index + 1}
                className="w-full h-full rounded-md cursor-pointer"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannerImages02}
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
              {products02.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  price={product.price}
                  name={product.name}
                  description={product.description}
                />
              ))}
            </div>
          </div>
          <div className="hidden sm:flex w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
            {bannerImages03.map((image, index) => (
              <Image
                key={index + 1}
                className="w-full h-full rounded-md cursor-pointer"
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
              />
            ))}
          </div>
          <div className="block sm:hidden h-auto w-full">
            <GlobalSlider
              images={bannerImages03}
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
