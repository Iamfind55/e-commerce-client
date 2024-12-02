import { ArrowNextIcon } from "@/icons/page";
import { truncateText } from "@/utils/letterLimitation";
import Image from "next/image";
import Link from "next/link";
import React, { InputHTMLAttributes } from "react";

interface cardProps extends InputHTMLAttributes<HTMLInputElement> {
  image?: string;
  title?: string;
  description?: string;
  link?: string;
}

export default function ServiceCard(props: cardProps) {
  return (
    <div className="flex items-start justify-start flex-col select-none gap-2 w-full hover:cursor-pointer">
      <div className="max-w-sm bg-white rounded rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-out">
        <a href="#">
          <Image
            className="rounded-t-lg"
            src={props?.image ?? ""}
            alt=""
            width={500}
            height={500}
          />
        </a>
        <div className="p-2 sm:p-3">
          <Link href="#">
            <h5 className="hidden sm:block mb-2 text-base font-bold tracking-tight">
              {truncateText(props?.title ?? "", 50)}
            </h5>
            <h5 className="block sm:hidden mb-2 text-base font-bold tracking-tight">
              {truncateText(props?.title ?? "", 20)}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-black text-b_text text-xs sm:text-sm">
            {truncateText(props?.description ?? "", 120)}
          </p>
          <Link
            href="#"
            className="flex items-start justify-start pr-3 py-2 text-sm font-medium text-base rounded-lg focus:ring-4 focus:outline-none hover:text-secondary hover:text-sm"
          >
            <span>More details</span> &nbsp; <ArrowNextIcon size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
}
