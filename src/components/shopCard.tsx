import React from "react";
import Image from "next/image";

// components
import { Link, useRouter } from "@/navigation";
import IconButton from "./iconButton";

// icons, utils, hook
import { ShopIcon } from "@/icons/page";
import { ShopData } from "@/types/shop";
import { formatDate } from "@/utils/dateFormat";
import { truncateText } from "@/utils/letterLimitation";
import defaultImage from "/public/images/default-image.webp";

export default function ShopCard(props: ShopData) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center cursor-pointer w-full md:w-fit bg-white rounded-lg hover:shadow gap-4">
      <div className="w-full flex flex-col items-center relative">
        <div className="w-full h-[14vh]">
          <Image
            className="w-full h-full object-cover rounded-tl-md rounded-tr-md"
            src={props?.image?.cover || defaultImage}
            alt={props?.fullname || "Shop"}
            width={24}
            height={24}
          />
        </div>

        <div className="absolute top-16">
          <Image
            className="w-16 h-16 mb-3 rounded-full shadow-md border-2 border-white"
            src={props?.image?.logo || defaultImage}
            alt={props?.fullname}
            width={24}
            height={24}
          />
        </div>

        <div className="mt-6 p-2 flex items-center justify-center flex-col gap-1">
          <h5 className="flex items-center justify-center my-2 font-medium text-gray-900 text-sm md:text-md">
            {props?.fullname}
          </h5>
          <p className="text-xs text-gray-500">
            {truncateText(
              props?.remark ??
                "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
              100
            )}
          </p>
          <div className="flex items-center justify-center flex-col gap-2">
            <p className="text-xs text-gray-500">
              Shop since {formatDate(props?.created_at ?? "")}
            </p>
            <p className="text-xs text-gray-500">Total products: 12343</p>
            <div className="my-2 f-full flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2 w-full">
                <IconButton
                  className="rounded text-white p-2 w-auto mt-4 text-xs bg-neon_pink"
                  icon={<ShopIcon size={20} />}
                  isFront={true}
                  type="button"
                  title="Visit shop"
                  onClick={() => router.push(`/shop/${props?.id}`)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
