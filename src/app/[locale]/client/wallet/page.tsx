"use client";

import IconButton from "@/components/iconButton";
import StatusBadge from "@/components/status";
import HeadTable from "@/components/tableHeader";
import { calculateIndexPaginate } from "@/help/calculateIndexPaginate";
import {
  CancelIcon,
  CheckCircleIcon,
  CloseEyeIcon,
  DepositIcon,
  PendingIcon,
  TrendDownIcon,
  TrendUpIcon,
  WalletIcon,
  WithdrawIcon,
} from "@/icons/page";
import { useFetchTransaction } from "@/lib/transaction/useFetchTransaction";
import useFilter from "@/lib/useFilter";
import { ITransactionTypes } from "@/types/transaction";
import { formatDate } from "@/utils/dateFormat";
import { formatNumber } from "@/utils/formatNumber";
// import formatDate from "@/utils/dateFormat";
// import formatNumber from "@/utils/formatNumber";
// import { transactionColumns } from "@/utils/option";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Withdraw() {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { state: filter } = useFilter();
  const { data, loading } = useFetchTransaction(filter);
  return (
    <div className="flex items-start justify-start flex-col gap-4">
      <div className="w-full flex items-start justify-start gap-4 bg-white shadow-md border-t border-gray-100 rounded">
        <div className="py-6 px-4 w-4/4 text-b_text flex items-start justify-start flex-col gap-4 blur-xs">
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-cyan-100 text-secondary">
              <WalletIcon size={36} />
            </div>
            <div>
              <p className="text-sm text-b_text">
                <strong>Full name:</strong>&nbsp; {user?.firstName}&nbsp;
                {user?.lastName}
              </p>
              <p className="text-sm text-b_text">
                <strong>Email:</strong>&nbsp; {user?.email}
              </p>
            </div>
          </div>
          <h4 className="text-b_text text-sm mb-3 font-bold">
            Available balances:
          </h4>
          <strong className="text-xl text-base w-full">
            {formatNumber(user?.balance)} Kip
          </strong>
          <div className="flex items-center justify-center gap-3">
            <IconButton
              className="rounded text-white p-2 bg-base w-full mt-4 text-xs"
              icon={<DepositIcon />}
              isFront={true}
              title="Deposit"
              type="button"
              onClick={() => router.push("/client/deposit")}
            />
            <IconButton
              className="rounded text-white p-2 bg-b_text w-full mt-4 text-xs"
              icon={<WithdrawIcon />}
              isFront={true}
              title="Withdraw"
              type="button"
              onClick={() => router.push("/client/withdraw")}
            />
          </div>
        </div>
        {/* <div className="py-6 px-4 w-2/4 border text-b_text">
          <h4 className="text-b_text text-sm mb-3 font-sm">
            Your active bank account:
          </h4>
        </div> */}
      </div>
      <div className="hidden sm:block w-full flex items-start justify-start flex-col gap-4 bg-white border rounded py-6 px-4">
        <h4 className="text-b_text text-sm mb-3 font-sm">
          List of all latest transactions:
        </h4>
        <div className="w-full relative overflow-y-auto overflow-x-auto h-auto border text-b_text">
          <table className="w-full bg-gray overflow-x-auto text-left text-sm rtl:text-right">
            {/* <HeadTable columns={transactionColumns} /> */}
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
                        <td className="pl-2">
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
                        <td className="flex items-start justify-start gap-3 h-full py-1">
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
      </div>
      <div className="block sm:hidden w-full flex items-start justify-start flex-col gap-4 bg-white shadow-md border-t border-gray-100 rounded py-6 px-4 sm:px-2 text-b_text">
        <h4 className="text-b_text text-sm font-sm">
          List of all latest transactions:
        </h4>
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
  );
}
