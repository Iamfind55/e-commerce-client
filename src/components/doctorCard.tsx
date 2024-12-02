import { CalendarIcon, CloseEyeIcon, LocationIcon } from "@/icons/page";
import React from "react";
import RatingStar from "./ratingStar";
import { truncateText } from "@/utils/letterLimitation";
import Link from "next/link";
import Image from "next/image";
import { IDoctorTypes } from "@/types/doctor";

export default function DoctorCard(props: IDoctorTypes) {
  return (
    <div className="flex items-start justify-start flex-col select-none gap-2 w-full rounded shadow-md hover:border-secondary">
      <div className="max-w-sm bg-white rounded">
        <Link href={`${props?.link}/${props.id}`}>
          <Image
            className="rounded"
            src={!props.profile ? "/images/default-image.webp" : props?.profile}
            alt=""
            width={300}
            height={200}
          />
        </Link>
        <div className="p-3 flex items-start justify-start flex-col gap-2">
          <div className="w-full flex-col sm:flex items-center justify-center">
            <i className="text-xs sm:text-md text-secondary font-normal sm:font-bold tracking-tight">
              Dr. &nbsp;
              {truncateText(
                `${props?.firstName + " "} ${" " + props?.lastName}`,
                20
              )}
            </i>
          </div>
          <p className="hidden sm:block text-gray_color font-normal text-xs text-b_text">
            {truncateText(props?.bio || "This is my bio information", 70)}
          </p>
          <p className="flex items-start text-gray_color justify-start font-normal text-xs text-b_text">
            <LocationIcon size={16} />
            &nbsp;{truncateText(props?.address1 ?? "", 70)}
          </p>
          <div className="w-full flex flex-col sm:flex-row md:flex-row items-center justify-around gap-2">
            <Link
              href={`${props?.link}/${props.id}/book`}
              className="w-full sm:w-auto bg-secondary text-white flex items-center justify-center px-3 py-1 text-xs text-center rounded focus:outline-none"
            >
              <CalendarIcon className="animate-bounce" />
              &nbsp;Book
            </Link>
            <Link
              href={`${props?.link}/${props.id}`}
              className="w-full sm:w-auto text-gray_color border border-secondary rounded flex items-center justify-center px-3 py-1 mt-0 text-xs text-center text-base rounded focus:outline-none"
            >
              <CloseEyeIcon />
              &nbsp; Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
