"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import React from "react";

// components
import BarChart from "@/components/barChart";
import Breadcrumb from "@/components/breadCrumb";
import LineChart from "@/components/lineChart";
import ReportCard from "@/components/reportCard";
import {
  CalendarIcon,
  DollarIcon,
  DollarOffIcon,
  PatientIcon,
} from "@/icons/page";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="text-b_text flex items-start justify-start flex-col gap-4">
      <Breadcrumb items={[{ label: "Dashboard", value: "/client" }]} />
      <div className="w-full flex items-start justify-between">
        <ReportCard
          title="Total patients"
          amount="100"
          percent="10"
          icon={<PatientIcon size={18} className="text-white" />}
        />
        <ReportCard
          title="Total appointments"
          amount="1,000"
          percent="10"
          icon={<CalendarIcon size={18} className="text-white" />}
        />
        <ReportCard
          title="Total balances"
          amount="1.000.000 Kip"
          percent="10"
          icon={<DollarOffIcon size={18} className="text-white" />}
        />
        <ReportCard
          title="Active balances"
          amount="500,000 Kip"
          percent="10"
          icon={<DollarIcon size={18} className="text-white" />}
        />
      </div>
      <div className="rounded w-full">
        <h1 className="mb-4 text-sm text-gray-500">Transaction history:</h1>
        <div className="flex items-center justify-between gap-6">
          <div className="w-1/2 bg-white shadow-md ">
            <BarChart />
          </div>
          <div className="w-1/2 bg-white shadow-md ">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
