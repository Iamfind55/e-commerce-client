import Image from "next/image";
import React, { InputHTMLAttributes } from "react";

// components and images
import StatusBadge from "./status";

interface cardProps extends InputHTMLAttributes<HTMLInputElement> {
  date: string;
  title: string;
  image: string;
  status: string;
  amount: string;
  receive_amount: string;
}

export default function TransactionCard(props: cardProps) {
  return (
    <div className="w-full flex flex-col items-center bg-white rounded-lg shadow hover:bg-gray-100 p-2 gap-2">
      <div className="w-full flex items-start justify-between">
        <p className="text-xs">{props?.date}</p>
        <StatusBadge status={props?.status} />
      </div>
      <div className="w-full flex items-start justify-start gap-2">
        <div className="object-cover rounded-t-lg">
          <Image
            className="rounded"
            src={props?.image}
            alt="Voucher"
            width={60}
            height={60}
          />
        </div>
        <p className="text-xs font-normal text-gray-500">{props?.title}</p>
      </div>
      <div className="w-full flex flex-col items-start justify-start">
        <p className="text-xs">Amount: {props?.amount}</p>
        <p className="text-xs">Received amount: {props?.receive_amount}</p>
      </div>
    </div>
  );
}
