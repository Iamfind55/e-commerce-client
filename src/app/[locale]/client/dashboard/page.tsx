"use client";

import React, { ReactNode } from "react";

// components
import Breadcrumb from "@/components/breadCrumb";
import ReportCard from "@/components/reportCard";
import {
  AppleIcon,
  CartCancelIcon,
  CartIcon,
  CartPlusIcon,
  CreditCardIcon,
  DepositIcon,
  DollarIcon,
  EmailIcon,
  NotiIcon,
} from "@/icons/page";

type ReportItem = {
  title: string;
  amount: string;
  percent: number;
  icon: ReactNode;
};

export default function DashboardPage() {
  const reportItems: ReportItem[] = [
    {
      title: "My Products",
      amount: "500",
      percent: 5,
      icon: <AppleIcon size={18} className="text-white" />,
    },
    {
      title: "Unread Messages",
      amount: "12",
      percent: 15,
      icon: <EmailIcon size={18} className="text-white" />,
    },
    {
      title: "Total Income",
      amount: "$12,000",
      percent: 8,
      icon: <DepositIcon size={18} className="text-white" />,
    },
    {
      title: "Total Expense",
      amount: "$7,000",
      percent: 3,
      icon: <DollarIcon size={18} className="text-white" />,
    },
    {
      title: "Total Orders",
      amount: "320",
      percent: 12,
      icon: <CartIcon size={18} className="text-white" />,
    },
    {
      title: "New Orders",
      amount: "40",
      percent: 20,
      icon: <CartPlusIcon size={18} className="text-white" />,
    },
    {
      title: "Total Canceled Orders",
      amount: "15",
      percent: -5,
      icon: <CartCancelIcon size={18} className="text-white" />,
    },
    {
      title: "Credit Score",
      amount: "750",
      percent: 1,
      icon: <CreditCardIcon size={18} className="text-white" />,
    },
    {
      title: "Illegal Operations",
      amount: "3",
      percent: -4,
      icon: <NotiIcon size={18} className="text-white" />,
    },
    {
      title: "Total today's income",
      amount: "$3,000",
      percent: 44,
      icon: <DepositIcon size={18} className="text-white" />,
    },
    {
      title: "Total today's profits",
      amount: "$5,000",
      percent: 56,
      icon: <DepositIcon size={18} className="text-white" />,
    },
  ];

  return (
    <div className="text-b_text flex items-start justify-start flex-col gap-4">
      <Breadcrumb items={[{ label: "Dashboard", value: "/client" }]} />
      <div className="w-full flex items-start justify-between">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {reportItems.map((item, index) => (
            <ReportCard
              key={index}
              title={item.title}
              amount={item.amount}
              percent={item.percent}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
