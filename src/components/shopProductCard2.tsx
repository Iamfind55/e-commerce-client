import React from "react";
import Image from "next/image";

// components
import { CheckCircleIcon } from "@/icons/page";
import { CartIcon } from "@/icons/page"; // Import your cart icon component

// icons and utilities
import { stripHtml } from "@/utils/stripHtml";
import { truncateText } from "@/utils/letterLimitation";

// images
import { ShopProductData } from "@/types/shop";
import category01 from "/public/images/category01.webp";
import { useRouter } from "@/navigation";

export default function ShopProductCard2(props: ShopProductData) {
  const router = useRouter();

  return (
    <div className="cursor-pointer relative flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300 group">
      <div className="absolute top-2 left-2 transform -translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <button
          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition duration-300"
          onClick={() => console.log("Add to cart", props.productData.id)}
        >
          <CartIcon size={20} className="text-neon_pink" />
        </button>
      </div>

      <div className="w-full bg-white rounded">
        <div className="w-full h-[150px] object-cover flex items-center justify-center">
          <Image
            className="rounded object-cover"
            src={
              !props.productData.cover_image
                ? category01
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
            &nbsp; In stock / {props?.quantity || 0}.
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
              onClick={() => router.push(`/product/${props.productData.id}`)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
