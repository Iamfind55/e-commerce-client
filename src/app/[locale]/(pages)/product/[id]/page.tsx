"use client";

import React, { useState, useEffect } from "react";
import RatingStar from "@/components/ratingStar";
import Image from "next/image";
import category01 from "/public/images/category01.webp";
import { AwardIcon, CartIcon, MinusIcon, PlusIcon } from "@/icons/page";
import IconButton from "@/components/iconButton";
import ThumbnailSwiper from "@/components/thumbnailSwiper";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description of Product 1",
    rating: 4.5,
    price: 1000,
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description of Product 2",
    rating: 4.0,
    price: 800,
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description of Product 3",
    rating: 5.0,
    price: 1200,
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description of Product 4",
    rating: 3.5,
    price: 600,
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description of Product 5",
    rating: 4.8,
    price: 1500,
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
];

export default function ProductDetails() {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(100);
  const [totalPrice, setTotalPrice] = useState<number>(price);

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const [tab, setTab] = React.useState<number>(1);

  return (
    <div className="flex items-center justify-center bg-bg_color py-0 sm:py-6">
      <div className="container w-full flex items-start justify-start flex-col gap-4 text-gray-500">
        <div className="w-full flex flex-col md:flex-row items-start justify-start gap-4 bg-white rounded">
          <div className="w-full sm:w-2/4 p-4 rounded flex items-start justify-center">
            <div className="w-full h-[60vh]">
              <ThumbnailSwiper />
            </div>
          </div>
          <div className="w-full sm:w-2/4 h-[65vh] flex items-start justify-start flex-col gap-4 rounded p-4">
            <h1 className="text-md">OXO Stainless Steel Salad Spinner</h1>
            <div className="flex items-center justify-center gap-2">
              <RatingStar rating={4} />
              <p className="text-xs">(10 comments)</p>
            </div>
            <div className="border-b w-full"></div>
            <div className="w-full flex items-center justify-start gap-6">
              <p className="text-sm">Seller</p>
              <div className="flex items-center justify-start gap-2">
                <p className="text-sm">Liyang Store</p>
                <Image
                  className="rounded"
                  src={category01}
                  alt=""
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="border-b w-full"></div>
            <div className="w-full flex items-center justify-start gap-6">
              <p className="text-sm">Price</p>
              <h1 className="text-xl">${price}</h1>
            </div>
            <div className="border-b w-full"></div>
            <div className="w-full flex items-center justify-start gap-6">
              <p className="text-sm">Quantity</p>
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
              <p className="text-sm">(23033 Available)</p>
            </div>
            <div className="border-b w-full"></div>
            <div>
              <div className="w-full flex items-center justify-start gap-6">
                <p className="text-sm">Total Price:</p>
                <h1 className="text-xl">${totalPrice}</h1>
              </div>
              <div className="w-full flex items-start justify-start gap-4">
                <IconButton
                  className="rounded text-white p-2 w-auto mt-4 italic text-sm bg-neon_pink"
                  icon={<CartIcon />}
                  isFront={true}
                  type="button"
                  title="Add to cart"
                />
                <IconButton
                  className="rounded text-white p-2 w-auto mt-4 italic text-sm bg-neon_blue"
                  type="button"
                  title="Buy now"
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
                      <span>Product details</span>
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
                      <span>All comments</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div id="default-tab-content" className="p-3">
                {tab === 1 && (
                  <div>
                    <p>
                      One less distraction. This adidas running tank helps make
                      sure heat and sweat don't get to your head, thanks to
                      moisture-absorbing AEROREADY and its light, breathable
                      feel. Push for your first 10k or set a new speed goal.
                      There's nothing holding you back.
                    </p>
                  </div>
                )}
                {tab === 2 && "Comment"}
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-2 border-t py-2">
              <div className="flex items-center justify-between w-full">
                <p className="text-second_black text-sm sm:text-md">
                  Related products:
                </p>
              </div>
              <div className="w-full h-auto grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
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
          </div>

          <div className="w-full sm:w-1/4 order-1 sm:order-2 rounded bg-white">
            <div className="w-full flex items-start justify-between flex-col p-2">
              <div className="w-full flex items-start justify-between border-b py-4">
                <p className="text-xs">Seller</p>
                <AwardIcon className="text-neon_pink" size={24} />
              </div>
              <div className="w-full flex items-start justify-start gap-2 flex-col py-2">
                <p className="text-xs">Poakue PK shop</p>
                <div className="w-full border rounded p-4 gap-2 flex items-center justify-center flex-col">
                  <RatingStar rating={4.5} />
                  <p className="text-xs">Tatal comment: (1230) comments</p>
                </div>
              </div>
            </div>
            <div className="w-full flex items-start justify-start gap-2 flex-col p-2">
              <h1 className="w-full border-b pb-2">Best selling products:</h1>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-full flex items-start justify-start gap-2 cursor-pointer py-2 rounded hover:bg-gray-200"
                >
                  <Image
                    className="rounded"
                    src={category01}
                    alt={product.name}
                    width={100}
                    height={120}
                  />
                  <div className="flex items-start justify-start flex-col gap-1">
                    <p className="text-sm">{product.name}</p>
                    <p className="text-xs">{product.description}</p>
                    <div className="flex items-center justify-start gap-2">
                      <RatingStar rating={product.rating} />
                      <p className="text-sm">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
