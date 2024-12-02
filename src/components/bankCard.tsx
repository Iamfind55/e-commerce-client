import { ArrowNextIcon, EditIcon, TrashIcon } from "@/icons/page";
import React, { InputHTMLAttributes } from "react";

interface cardProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  accountName?: string;
  accountNumber?: string;
  status?: string;
  createdAt?: string;
}

export default function BankCard(props: cardProps) {
  return (
    <div className="flex items-start justify-start flex-col select-none gap-2 w-full">
      <div className="p-3 w-full shadow-sm border border-gray-100 rounded text-xs">
        <div className="w-full flex items-end justify-end gap-2 sticky top-0 right-0 bg-white">
          <div className="border rounded-full border p-1">
            <EditIcon size={18} className="text-base" />
          </div>
          <div className="border rounded-full border p-1">
            <TrashIcon size={16} className="text-red-600" />
          </div>
        </div>
        <div>
          <p>Bank name:&nbsp; {props?.name}</p>
          <p>Bank account name:&nbsp; {props?.accountName}</p>
          <p>Bank account number:&nbsp; {props?.accountNumber}</p>
          <p>Created date:&nbsp; {props?.createdAt}</p>
        </div>
      </div>
    </div>
  );
}
