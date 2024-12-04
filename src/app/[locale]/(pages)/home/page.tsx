"use client";

import React from "react";
import MySwiper from "./slider";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

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
import { Link } from "@/navigation";
import { NextIcon } from "@/icons/page";

export default function Home() {
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

  return (
    <div className="my-6">
      <div className="flex items-center justify-center flex-col gap-6">
        <div className="container flex flex-col gap-6">
          <div className="h-auto w-full">
            <MySwiper />
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-md">Categories:</p>
            <div className="w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-4">
              {categoryImages.map((image, index) => (
                <Image
                  key={index + 1}
                  className="w-full h-full rounded cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:rounded-md"
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-md">Best seller products:</p>
            <div className="w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-6">
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

          <div className="w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
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

          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-second_black text-md">Popular products:</p>
            <div className="w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-6">
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

          <div className="w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
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

          <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex items-center justify-between w-full">
              <p className="text-second_black text-md">
                All recommended products:
              </p>
              <Link
                href="#"
                className="text-neon_pink p-2 rounded text-sm flex items-center justify-center gap-2 hover:text-neon_blue"
              >
                View more
                <NextIcon size={18} />
              </Link>
            </div>
            <div className="w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-6">
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

          <div className="w-full h-auto grid grid-cols-2 gap-4 lg:grid-cols-2">
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
        </div>
      </div>
    </div>
  );
}
