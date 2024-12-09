"use client";

import Breadcrumb from "@/components/breadCrumb";
import StatusBadge from "@/components/status";
import {
  CancelIcon,
  CheckCircleIcon,
  PendingIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "@/icons/page";
import { useFetchTransactionById } from "@/lib/transaction/useFetchTransaction";
import { formatDate } from "@/utils/dateFormat";
import { formatNumber } from "@/utils/formatNumber";
// import formatDate from "@/utils/dateFormat";
// import formatNumber from "@/utils/formatNumber";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

export default function TransactionDetail() {
  const params = useParams();
  const id = params?.id;
  const { data } = useFetchTransactionById({ id: id as string });
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className="flex items-start justify-start flex-col gap-4 mb-0 sm:mb-6">
      {/* <Breadcrumb path="Transaction/transaction-detail" /> */}
      <div className="bg-white rounded text-b_text p-4 w-full shadow-md text-sm flex items-start justify-start flex-col gap-4">
        <div className="w-full flex items-start justify-between">
          <h1 className="text-secondary text-xl">OKARDCARE LOGO</h1>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="w-2/4 flex items-start justify-start flex-col gap-2">
            <p className="text-xs ml-2">okardcare office:</p>
            <p className="text-xs ml-2">
              Phonsawang village, Saysetha district Vientiane, Laos
            </p>
            <p className="text-xs ml-2">+856 2078856194, +856 2092415166</p>
          </div>
          <div className="w-2/4 flex items-start justify-center flex-col gap-2">
            <p className="text-xs ml-2">Invoice: {id}</p>
            <p className="text-xs ml-2">
              Date issued: {formatDate(data?.createdAt ?? "")}
            </p>
          </div>
        </div>
        <div className="w-full flex items-start justify-between mt-4">
          <div className="w-2/4 flex items-start justify-start flex-col gap-2">
            <strong>Payer information:</strong>
            <p className="text-xs ml-2">
              {user?.firstName}&nbsp;{user?.lastName}
            </p>
            <p className="text-xs ml-2">{user?.address}</p>
            <p className="text-xs ml-2">{user?.phone}</p>
            <p className="text-xs ml-2">{user?.email}</p>
          </div>
          <div className="w-2/4 flex items-start justify-center flex-col gap-2">
            <p className="text-xs ml-2">
              Total Due: {formatNumber(data?.amount ?? 0)} Kip
            </p>
            <p className="text-xs ml-2">Bank account: ***********1234567</p>
            <p className="text-xs ml-2">Country: Laos</p>
          </div>
        </div>
        <div className="hidden sm:block w-full relative overflow-y-auto overflow-x-auto h-auto mt-6">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            <thead className="sticky top-0  bg-gray text-xs uppercase bg-white">
              <tr className="border-y border-gray text-left">
                <th scope="col" className="py-3 pl-1">
                  TYPE
                </th>
                <th scope="col" className="py-3 pl-1">
                  AMOUNT
                </th>
                <th scope="col" className="py-3 pl-1">
                  STATUS
                </th>
                <th scope="col" className="py-3 pl-1">
                  ISSUE DATE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray bg-white hover:bg-gray">
                <td className="flex items-start justify-start gap-2 py-3">
                  {data?.type === "withdraw" ? (
                    <TrendDownIcon className="text-red-600" />
                  ) : (
                    <TrendUpIcon className="text-green-600" />
                  )}
                  {data?.type}
                </td>
                <td className="py-3">{formatNumber(data?.amount ?? 0)}</td>
                <td className="py-3">
                  <StatusBadge status={data?.status ?? ""} />
                </td>
                <td className="py-3">{formatDate(data?.createdAt ?? "")}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="block sm:hidden w-full flex items-start justify-start flex-col gap-4 bg-white border border-gray-100 rounded py-6 px-4 sm:px-1 text-b_text">
          <div className="w-full flex items-start justify-between rounded-md">
            <div>
              <p className="flex items-start justify-start text-sm">
                {data?.type === "withdraw" ? (
                  <TrendDownIcon className="text-red-600" />
                ) : (
                  <TrendUpIcon className="text-green-600" />
                )}
                &nbsp;&nbsp;
                {data?.type}
              </p>
              <span className="text-xs">
                {formatDate(data?.createdAt ?? "")}
              </span>
            </div>
            <div className="flex items-start justify-start flex-col gap-2">
              <strong className="font-md text-sm flex items-center justify-center">
                {formatNumber(data?.amount ?? 0)} Kip &nbsp;
                {data?.status === "active" ? (
                  <CheckCircleIcon className="text-green-600" />
                ) : data?.status === "failed" ? (
                  <CancelIcon className="text-red-600" />
                ) : (
                  <PendingIcon className="text-amber-300" />
                )}
              </strong>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start justify-between mt-4">
          <p className="text-xs">
            <strong>Note: </strong> It was a pleasure working with you and your
            team, We hope you will keep us in mind for future freelance
            projects. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
}
