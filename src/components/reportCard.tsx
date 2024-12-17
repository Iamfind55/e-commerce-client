import React, { InputHTMLAttributes, ReactNode } from "react";

interface cardProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  amount: string;
  percent: string;
  icon: ReactNode;
}

export default function ReportCard(props: cardProps) {
  return (
    <div className="w-56 bg-white shadow p-4 rounded-md flex items-start justify-start flex-col select-none gap-2 w-full">
      <div className="p-2 w-full flex items-center justify-between border-b">
        <div className="flex items-start justify-start flex-col gap-1">
          <p className="text-xs text-gray-500">{props?.title}</p>
          <h3 className="text-lg text-gray-500">{props?.amount}</h3>
        </div>
        <div className="bg-neon_pink rounded-md p-3">{props?.icon}</div>
      </div>
      <div className="pl-2">
        <p className="text-xs flex items-start justify-start">
          <span className="text-green-500">+{props?.percent}%</span>&nbsp; than
          last month
        </p>
      </div>
    </div>
  );
}
