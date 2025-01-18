import { DepositIcon, WithdrawIcon } from "@/icons/page";
import { useFetchTransaction } from "@/lib/transaction/useFetchTransaction";
import useFilter from "@/lib/useFilter";
// import formatNumber from "@/utils/formatNumber";
// import formatDate from "@/utils/dateFormat";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import EmptyPage from "./emptyPage";
import IconButton from "./iconButton";
import { formatNumber } from "@/utils/formatNumber";
import { formatDate } from "@/utils/dateFormat";

interface BalanceCardProps {
  refresh: string | null;
}

export default function BalanceCard({ refresh }: BalanceCardProps) {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.auth);
  const { state: filter } = useFilter();
  const { data, loading, refresh: doRefresh } = useFetchTransaction(filter);

  React.useEffect(() => {
    doRefresh();
  }, [refresh]);

  const recentTransactions = useMemo(() => {
    return data && data.length > 0 ? (
      data.map((row, index: number) => {
        return (
          <div
            className="w-full rounded flex items-center justify-between border py-2 px-3"
            key={index + 1}
          >
            <div className="flex items-start justify-center gap-2">
              {row?.type === "withdraw" ? (
                <WithdrawIcon size={30} />
              ) : (
                <DepositIcon size={30} />
              )}

              <div className="flex items-start justify-start flex-col gap-1">
                <p className="text-b_text text-sm">{row?.type}</p>
                <p className="text-b_text text-xs">
                  {formatDate(row?.createdAt ?? "")}
                </p>
              </div>
            </div>
            <span
              className={`${
                row?.type === "withdraw"
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              } 
              inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-lg`}
            >
              {row?.type === "withdraw" ? "-" : "+"}
              &nbsp;{formatNumber(row?.amount)} Kip
            </span>
          </div>
        );
      })
    ) : (
      <EmptyPage />
    );
  }, [data]);

  return (
    <div className="border rounded p-3 flex items-start justify-between flex-col gap-2">
      <div className="w-full flex items-center justify-center flex-col gap-2 bg-white border-b border-base p-4">
        <p className="text-sm text-secondary">Total balances:</p>
        <strong className="text-secondary text-xl">
          {formatNumber(user?.balance)} Kip
        </strong>
      </div>
      <div className="w-full flex items-start justify-between flex-col gap-2">
        <h4 className="text-b_text text-sm mt-3 font-bold">
          Recent Transactions:
        </h4>
        {loading ? "Loading...." : recentTransactions}
        <div className="flex items-center justify-center w-full">
          <IconButton
            className="rounded text-white p-2 w-auto mt-4 text-xs bg-base"
            isFront={true}
            type="button"
            title="View more..."
            onClick={() => router.push("/client/transaction")}
          />
        </div>
      </div>
    </div>
  );
}
