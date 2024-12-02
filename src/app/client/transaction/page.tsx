"use client";

import React from "react";
// components
import Breadcrumb from "@/components/breadCrumb";
import {
  CancelIcon,
  CheckCircleIcon,
  CloseEyeIcon,
  PendingIcon,
  SearchIcon,
  TrendDownIcon,
  TrendUpIcon,
} from "@/icons/page";
import HeadTable from "@/components/tableHeader";
import StatusBadge from "@/components/status";
// import formatNumber from "@/utils/formatNumber";
// import formatDate from "@/utils/dateFormat";
import { transactionColumns, transactions } from "@/utils/option";
import { ITransactionTypes } from "@/types/transaction";
import useFilter from "@/lib/useFilter";
import { useFetchTransaction } from "@/lib/transaction/useFetchTransaction";
import Pagination from "@/components/pagination";
import { calculateIndexPaginate } from "@/help/calculateIndexPaginate";
import Link from "next/link";
import IconButton from "@/components/iconButton";
import { useRouter } from "next/navigation";
import Select from "@/components/select";
import { formatNumber } from "@/utils/formatNumber";
import { formatDate } from "@/utils/dateFormat";

export default function TransactionPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { state: filter, dispatch: filterDispatch, ACTION_TYPE } = useFilter();
  const { data, total, loading } = useFetchTransaction(filter);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // const newValue = event.target.value.trim();
    // setSearchTerm(newValue);
    // if (typingTimeoutRef.current) {
    //   clearTimeout(typingTimeoutRef.current);
    // }
    // typingTimeoutRef.current = setTimeout(() => {
    //   if (newValue) {
    //     filterDispatch({ type: ACTION_TYPE.SEARCH, payload: newValue });
    //   } else {
    //     filterDispatch({ type: ACTION_TYPE.SEARCH, payload: "" });
    //   }
    // }, 500);
  };
  const handlePageChange = (newPage: number) => {
    filterDispatch({ type: ACTION_TYPE.PAGE, payload: newPage });
  };
  return (
    <div className="flex items-start justify-start flex-col gap-4">
      <Breadcrumb path="Transaction/details" />
      <div className="bg-white rounded text-b_text p-4 w-full shadow-md">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          List of all transactions:
        </h4>
        <div className="hidden sm:block w-full">
          <div className="flex justify-between py-3 gap-3">
            <div className="flex gap-1 lg:gap-4">
              <div>
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon size={18} />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray300 border   text-sm rounded-lg block w-full ps-10 p-2 focus:outline-none focus:ring-1 "
                    placeholder="Search.."
                    required
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="relative overflow-y-auto overflow-x-auto h-auto">
            <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
              <HeadTable columns={transactionColumns} />
              {loading ? (
                "Loading"
              ) : (
                <tbody>
                  {data &&
                    data.map((row: ITransactionTypes, index: number) => {
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray bg-white hover:bg-gray"
                        >
                          <td className="pl-2 py-4">
                            {calculateIndexPaginate({ filter, index })}
                          </td>
                          <td>
                            <p className="flex">
                              {row?.type === "withdraw" ? (
                                <TrendDownIcon className="text-red-600" />
                              ) : (
                                <TrendUpIcon className="text-green-600" />
                              )}
                              &nbsp;&nbsp;
                              {row?.type}
                            </p>
                          </td>
                          <td>{formatNumber(row?.amount)}</td>
                          <td>
                            <StatusBadge status={row.status ?? ""} />
                          </td>
                          <td>{formatDate(row?.createdAt ?? "")}</td>
                          <td className="flex items-start justify-start gap-3 h-full pt-2">
                            <Link
                              href={`/client/transaction/${row?.id}`}
                              className="hover:border p-2 rounded-full cursor-pointer"
                            >
                              <CloseEyeIcon size={18} />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              )}
            </table>
          </div>
          <div>
            {total > filter.offset && (
              <div className="flex justify-between text-sm py-2 m-2">
                <p>
                  Showing {filter.page} to {total} of {filter.offset} entries
                </p>
                <Pagination
                  filter={filter}
                  totalPage={total}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="block sm:hidden w-full flex items-start justify-start flex-col gap-2 bg-white rounded text-b_text">
          <div className="w-full flex justify-between gap-2">
            <div className="w-2/4">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full py-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <SearchIcon size={18} />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-white border text-sm rounded-lg block w-full ps-10 p-1.5 focus:outline-none focus:ring-1 "
                  placeholder="Search.."
                  required
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="w-2/4">
              <Select
                name="gender"
                // title="Gender"
                option={transactions}
                className="h-8"
              />
            </div>
          </div>
          {data &&
            data.map((row: ITransactionTypes, index: number) => {
              return (
                <Link
                  key={index + 1}
                  href={`/client/transaction/${row?.id}`}
                  className="w-full flex items-start justify-between rounded-md p-2 border"
                >
                  <div>
                    <p className="flex items-start justify-start text-sm">
                      {row?.type === "withdraw" ? (
                        <TrendDownIcon className="text-red-600" />
                      ) : (
                        <TrendUpIcon className="text-green-600" />
                      )}
                      &nbsp;&nbsp;
                      {row?.type}
                    </p>
                    <span className="text-xs">
                      {formatDate(row?.createdAt ?? "")}
                    </span>
                  </div>
                  <div className="flex items-start justify-start flex-col gap-2">
                    <strong className="font-md text-sm flex items-center justify-center">
                      {formatNumber(row?.amount)} Kip &nbsp;
                      {row.status === "active" ? (
                        <CheckCircleIcon className="text-green-600" />
                      ) : row.status === "failed" ? (
                        <CancelIcon className="text-red-600" />
                      ) : (
                        <PendingIcon className="text-amber-300" />
                      )}
                    </strong>
                  </div>
                </Link>
              );
            })}
          <IconButton
            className="rounded-md text-base p-2 w-full border border-base text-xs"
            isFront={true}
            type="button"
            title="View More..."
            onClick={() => router.push("/client/transaction")}
          />
        </div>
      </div>
    </div>
  );
}
