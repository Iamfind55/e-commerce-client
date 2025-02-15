import React from "react";
import Image from "next/image";
import StatusBadge from "./status";
import { formatDate } from "@/utils/dateFormat";
import { truncateText } from "@/utils/letterLimitation";

export default function OrderCardComponent(props: any) {
  return (
    <>
      <div className="cursor-pointer flex items-start justify-start flex-col select-none gap-2 w-auto rounded border hover:shadow-lg transition-all duration-300 p-2">
        <div className="flex items-start justify-start flex-col gap-2 w-full bg-white rounded text-gray-500">
          <p className="text-xs">Order Date: {formatDate(props?.created_at)}</p>
          <div className="flex items-start justify-start gap-2">
            <Image
              className="rounded object-cover"
              src={
                !props.product_cover_image
                  ? "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
                  : props?.product_cover_image
              }
              alt=""
              width={80}
              height={80}
            />
            <p className="text-xs">
              {props?.product_name &&
                truncateText(
                  JSON.parse(props?.product_name).name_en.trim(),
                  100
                )}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">Payment status: </p>
            <p>
              <StatusBadge status={props?.payment_status} />
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">Order status: </p>
            <p className="text-xs text-white font-extralight">
              <StatusBadge status={props?.order_status} />
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">Sign in status: </p>
            <p className="text-xs text-white font-extralight">
              <StatusBadge status={props?.sign_in_status} />
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Order Quantity: &nbsp;
              <span className="text-sm">{props?.quantity}</span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Commodity payment: &nbsp;
              <span className="text-neon_pink font-medium">
                ${(props?.price - props?.price * 0.2).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Order payment: &nbsp;
              <span className="text-neon_pink font-medium">
                ${(props?.price * props.quantity).toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Profit ratio: &nbsp;
              <span className="text-neon_pink font-medium">
                {props?.profit ? props?.profit : "20"}%
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs">
              Expected revenue:
              <span className="text-green-500 font-medium">
                + {(props?.price * 0.2).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
