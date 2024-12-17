"use client";

import { CloseEyeIcon, OpenEyeIcon } from "@/icons/page";
import Link from "next/link";
import React, { InputHTMLAttributes, useState } from "react";

interface TextfieldProps extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
}

export default function Password(props: TextfieldProps) {
  const [ispassword, setIspassword] = useState(true);
  return (
    <div className="block select-none ">
      <label className={`text-gray-500 block text-xs`} htmlFor={props?.id}>
        {props?.title}{" "}
        {props?.required && <span className="text-red-500">&nbsp;*</span>}
      </label>
      <div className="flex items-center relative">
        <input
          id={props?.id}
          type={ispassword ? "password" : "text"}
          className={`text-xs text-gray-500 p-4 mt-2 rounded w-full border pr-[50px] focus:bg-white focus:ring-1 focus:ring-secondary outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out font-sans h-9`}
          {...props}
        />
        <button
          type="button"
          className="absolute right-0 w-[40px] text-gray-500 p-3 pt-4"
          onClick={() => setIspassword((res) => !res)}
        >
          {ispassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
        </button>
      </div>
      <div className="text-end">
        <Link href="#">
          <i className="text-xs text-error">{props?.helperText}</i>
        </Link>
      </div>
    </div>
  );
}
