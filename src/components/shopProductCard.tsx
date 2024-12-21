import React from "react";
import Link from "next/link";
import Image from "next/image";

// components
import RatingStar from "./ratingStar";
import { CheckCircleIcon } from "@/icons/page";

// icons and untils
import { IproductTypes } from "@/types/product";
import { truncateText } from "@/utils/letterLimitation";

// images
import category01 from "/public/images/category01.webp";

export default function ShopProductCard(props: IproductTypes) {
  return (
    <div className="cursor-pointer flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300">
      <div className="max-w-sm bg-white rounded">
        <Image
          className="rounded"
          src={!props.profile ? category01 : props?.profile}
          alt=""
          width={300}
          height={200}
        />
        <div className="p-3 flex items-start justify-start flex-col gap-1">
          <div className="w-full flex items-center justify-start gap-2">
            <i className="text-xs sm:text-md text-second_black font-normal sm:font-bold tracking-tight">
              {truncateText(`${props?.name}`, 20)}
            </i>
            <RatingStar rating={4} />
          </div>
          <p className="text-gray-500 font-normal text-xs">
            {truncateText(props?.description, 70)}
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
          <div className="w-full flex flex-col sm:flex-row md:flex-row items-start justify-start gap-2 mt-2">
            <Link
              href="/product/sdfgsdfgsdfgsdgfs"
              className="w-full sm:w-auto bg-neon_pink text-white flex items-center justify-center px-4 py-1 text-xs text-center rounded focus:outline-none"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
