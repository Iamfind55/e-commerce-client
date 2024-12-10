import { CartIcon } from "@/icons/page";
import React from "react";
import RatingStar from "./ratingStar";
import { truncateText } from "@/utils/letterLimitation";
import Link from "next/link";
import Image from "next/image";
import { IproductTypes } from "@/types/product";
import category01 from "/public/images/category01.webp";

export default function ProductCard(props: IproductTypes) {
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
        <div className="p-3 flex items-start justify-start flex-col gap-2">
          <div className="w-full flex items-center justify-start gap-2">
            <i className="text-xs sm:text-md text-second_black font-normal sm:font-bold tracking-tight">
              {truncateText(`${props?.name}`, 20)}
            </i>
            <RatingStar rating={4} />
          </div>
          <strong className="text-second_black">$&nbsp;{props?.price}</strong>
          <p className="text-second_black font-normal text-xs text-b_text">
            {truncateText(props?.description, 70)}
          </p>
          <div className="w-full flex flex-col sm:flex-row md:flex-row items-center justify-around gap-2">
            <Link
              href="/product/sdfgsdfgsdfgsdgfs"
              className="w-full sm:w-auto bg-neon_pink text-white flex items-center justify-center px-3 py-1 text-xs text-center rounded focus:outline-none"
            >
              View
            </Link>
            <Link
              href={`${props?.link}/${props.id}`}
              className="w-full sm:w-auto text-second_black border border-neon_blue rounded flex items-center justify-center px-3 py-1 mt-0 text-xs text-center text-base rounded focus:outline-none"
            >
              Add to
              <CartIcon
                size={16}
                className="text-second_black animate-bounce"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
