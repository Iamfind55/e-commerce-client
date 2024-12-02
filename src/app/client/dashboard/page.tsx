"use client";

import BarChart from "@/components/barChart";
import Breadcrumb from "@/components/breadCrumb";
import LineChart from "@/components/lineChart";
import ReportCard from "@/components/reportCard";
import {
  CalendarIcon,
  CloseEyeIcon,
  DollarIcon,
  DollarOffIcon,
  PatientIcon,
} from "@/icons/page";
import { useRouter } from "next/navigation";
import React from "react";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="text-b_text flex items-start justify-start flex-col gap-4">
      <Breadcrumb path="Dashboard" />
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
        <h1 className="mb-4 text-sm">Transaction history:</h1>
        <div className="flex items-center justify-between gap-6">
          <div className="w-1/2 bg-white shadow-md ">
            <BarChart />
          </div>
          <div className="w-1/2 bg-white shadow-md ">
            <LineChart />
          </div>
        </div>
      </div>
      {/* <div className="rounded p-6 bg-white shadow-md w-full">
        <h1 className="mb-4 font-bold">Payment history:</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                PAYMENT METHOD
              </th>
              <th scope="col" className="px-6 py-3">
                AMOUNT
              </th>
              <th scope="col" className="px-6 py-3">
                STATUS
              </th>
              <th scope="col" className="px-6 py-3">
                DATE
              </th>
              <th scope="col" className="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th scope="row" className="px-6 py-4">
                1
              </th>
              <td className="px-6 py-4">Bcelone</td>
              <td className="px-6 py-4">2,000,000 kip</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                  Success
                </span>
              </td>
              <td className="px-6 py-4">06-09-2024 11:23:07</td>
              <td className="px-6 py-4 flex items-start justify-start gap-3">
                <CloseEyeIcon
                  size={20}
                  className="cursor-pointer"
                  onClick={() => router.push("/client/dashboard/123")}
                />
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th scope="row" className="px-6 py-4">
                1
              </th>
              <td className="px-6 py-4">Bcelone</td>
              <td className="px-6 py-4">2,000,000 kip</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                  Failed
                </span>
              </td>
              <td className="px-6 py-4">06-09-2024 11:23:07</td>
              <td className="px-6 py-4 flex items-start justify-start gap-3">
                <CloseEyeIcon
                  size={20}
                  className="cursor-pointer"
                  onClick={() => router.push("/client/dashboard/123")}
                />
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th scope="row" className="px-6 py-4">
                1
              </th>
              <td className="px-6 py-4">Bcelone</td>
              <td className="px-6 py-4">2,000,000 kip</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                  Success
                </span>
              </td>
              <td className="px-6 py-4">06-09-2024 11:23:07</td>
              <td className="px-6 py-4 flex items-start justify-start gap-3">
                <CloseEyeIcon
                  size={20}
                  className="cursor-pointer"
                  onClick={() => router.push("/client/dashboard/123")}
                />
              </td>
            </tr>
            <tr className="bg-white border-b">
              <th scope="row" className="px-6 py-4">
                1
              </th>
              <td className="px-6 py-4">Bcelone</td>
              <td className="px-6 py-4">2,000,000 kip</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                  Failed
                </span>
              </td>
              <td className="px-6 py-4">06-09-2024 11:23:07</td>
              <td className="px-6 py-4 flex items-start justify-start gap-3">
                <CloseEyeIcon
                  size={20}
                  className="cursor-pointer"
                  onClick={() => router.push("/client/dashboard/123")}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
