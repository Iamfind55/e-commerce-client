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
  DepositIcon,
  DollarIcon,
  EmailIcon,
  NotiIcon,
} from "@/icons/page";
import { QUERY_SHOP_DASHBOARDS } from "@/api/dashboard";
import { useLazyQuery } from "@apollo/client";
import { formatStringAndNumber } from "@/utils/formatNumber";

type ReportItem = {
  title: string;
  amount: string;
  percent: number;
  icon: ReactNode;
};

export default function DashboardPage() {
  const [getDashboards, { data }] = useLazyQuery(QUERY_SHOP_DASHBOARDS, {
    fetchPolicy: "cache-and-network",
  });

  React.useEffect(() => {
    getDashboards();
  }, [getDashboards]);

  // Helper function to format currency with 2 decimal places
  const formatCurrency = (value: number | string | undefined): string => {
    if (value === undefined) return "0.00";
    const numString = String(value).replace(/,/g, '');
    const numValue = parseFloat(numString);

    if (isNaN(numValue)) return "0.00";

    const [integerPart, decimalPart] = numValue.toFixed(2).split('.');
    const formattedInteger = parseInt(integerPart).toLocaleString('en-US');

    return `${formattedInteger}.${decimalPart}`;
  };

  const reportItems: ReportItem[] = [
    {
      title: "My Products",
      amount: `${formatStringAndNumber(data?.shopGetProductDashboard?.data?.total || "0")}`,
      percent: Number(data?.shopGetProductDashboard?.data?.increase) || 0,
      icon: <AppleIcon size={18} className="text-white" />,
    },
    {
      title: "Total Income",
      amount: `$${formatCurrency(data?.shopGetTotalIncomeDashboard?.data?.total)}`,
      percent: Number(data?.shopGetTotalIncomeDashboard?.data?.increase) || 0,
      icon: <DepositIcon size={18} className="text-white" />,
    },
    {
      title: "Unread Messages",
      amount: `${formatStringAndNumber(data?.shopGetUnreadMessageDashboard?.data?.total || "0")}`,
      percent: Number(data?.shopGetUnreadMessageDashboard?.data?.increase) || 0,
      icon: <EmailIcon size={18} className="text-white" />,
    },
    {
      title: "Total Expense",
      amount: `$${formatCurrency(data?.shopGetTotalExpenseDashboard?.data?.total)}`,
      percent: Number(data?.shopGetTotalExpenseDashboard?.data?.increase) || 0,
      icon: <DollarIcon size={18} className="text-white" />,
    },
    {
      title: "Total Orders",
      amount: formatStringAndNumber(data?.shopGetTotalOrderDashboard?.data?.total || "0"),
      percent: Number(data?.shopGetTotalOrderDashboard?.data?.increase) || 0,
      icon: <CartIcon size={18} className="text-white" />,
    },
    {
      title: "New Orders",
      amount: formatStringAndNumber(data?.shopGetTotalNewOrderDashboard?.data?.total || "0"),
      percent: Number(data?.shopGetTotalNewOrderDashboard?.data?.increase) || 0,
      icon: <CartPlusIcon size={18} className="text-white" />,
    },
    {
      title: "Total Canceled Orders",
      amount: formatStringAndNumber(data?.shopGetTotalCanceledOrderDashboard?.data?.total || "0"),
      percent:
        Number(data?.shopGetTotalCanceledOrderDashboard?.data?.increase) || 0,
      icon: <CartCancelIcon size={18} className="text-white" />,
    },
    {
      title: "Total today's income",
      amount: `$${formatCurrency(data?.shopGetTotalTodayIncomeDashboard?.data?.total)}`,
      percent:
        Number(data?.shopGetTotalTodayIncomeDashboard?.data?.increase) || 0,
      icon: <DepositIcon size={18} className="text-white" />,
    },
    {
      title: "Total today's profits",
      amount: `$${formatCurrency(formatStringAndNumber(data?.shopGetTotalTodayProfitDashboard?.data?.total))}`,
      percent:
        Number(data?.shopGetTotalTodayProfitDashboard?.data?.increase) || 0,
      icon: <DepositIcon size={18} className="text-white" />,
    },
  ];

  return (
    <div className="text-b_text flex items-start justify-start flex-col gap-4">
      <Breadcrumb items={[{ label: "Dashboard", value: "/client" }]} />
      <div className="w-full flex items-start justify-between">
        <div className="w-full grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
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