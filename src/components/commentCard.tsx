import React, { InputHTMLAttributes } from "react";
import RatingStar from "./ratingStar";
import Image from "next/image";
import { QuotesIconL, QuotesIconR } from "@/icons/page";

interface commentCardProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  image?: string;
  first_name?: string;
  last_name?: string;
  feedback?: string;
  rating?: number;
  created_at?: string;
}

export default function CommentCard(props: commentCardProps) {
  return (
    <div className="w-full flex items-start justify-center gap-3 p-4 mb-4 border rounded">
      <div className="border rounded-full w-16 h-16 bg-gray_color">
        <Image
          src="/images/doctor-01.jpg"
          alt="Doctor"
          className="rounded-full object-cover"
          width={64}
          height={64}
        />
      </div>
      <div className="w-full flex items-start justify-center flex-col gap-2">
        <div className="w-full flex items-start justify-between gap-2 px-2">
          <div className="flex items-center justify-center gap-6">
            <div className="flex flex-col sm:flex-row items-start justify-center gap-4">
              <h4 className="font-bold text-secondary text-sm">
                {props?.first_name} {props?.last_name}
              </h4>
              <div className="flex items-center justify-center gap-4">
                <RatingStar rating={props?.rating || 1} />
                <p className="text-gray_color text-xs sm:text-sm">
                  [{props?.rating}]
                </p>
              </div>
            </div>
          </div>
          <p className="text-gray_color text-xs">{props?.created_at}</p>
        </div>
        <p className="text-gray_color text-xs flex items-start justify-center">
          <QuotesIconL size={18} className="color-base" />
          {props?.feedback}
          <QuotesIconR size={18} className="color-base" />
        </p>
      </div>
    </div>
  );
}
