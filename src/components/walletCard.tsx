import React, { InputHTMLAttributes, ReactNode } from "react";

interface cardProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  amount: string;
  percent: number;
  icon: ReactNode;
}

export default function WalletCard(props: cardProps) {
  return (
    <div className="w-auto bg-white p-1 sm:p-4 rounded-md flex items-start justify-start flex-col select-none gap-1 sm:gap-2 hover:cursor-pointer group shadow transition-all duration-300">
      <div className="py-2 sm:py-4 px-2 w-full flex items-center justify-start gap-4">
        <div className="rounded-full transition-all duration-300">
          {props?.icon}
        </div>
        <div className="flex items-start justify-start flex-col gap-2">
          <p className="text-md font-medium text-gray-500">{props?.title}</p>
          <h3 className="text-lg font-medium text-gray-500">{props?.amount}</h3>
        </div>
      </div>
    </div>
  );
}
