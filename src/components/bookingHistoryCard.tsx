import { CallIcon, CancelIcon, CloseEyeIcon } from "@/icons/page";
import { formatNumber, removeSeconds } from "@/utils/formatNumber";
import { formatTime } from "@/utils/timeCalculate";
import React, { InputHTMLAttributes } from "react";
import IconButton from "./iconButton";
import { isWithinTimeRange } from "@/utils/dateFormat";

interface cardProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  doctor: string;
  date: string;
  startTime: string;
  endTime: string;
  total_time: string;
  total_cost: string;
  status: string;
  onViewDetail: () => void;
  onCall: () => void;
  onCancel: () => void;
}

export default function BookingHistoryCard(props: cardProps) {
  return (
    <div className="w-64 bg-white border mt-2 py-2 px-1 rounded-md flex items-start justify-start flex-col select-none gap-2 w-full">
      <div className="p-2 w-full flex items-start justify-between">
        <div className="flex items-start justify-start flex-col gap-1">
          <p className="text-xs text-gray_color">
            <strong>ID:</strong> {props?.id}
          </p>
          <p className="text-xs text-gray_color">
            <strong>Doctor:</strong> {props?.doctor}
          </p>
          <p className="text-xs text-gray_color">
            <strong>Date:</strong> {props?.date}&nbsp;
            <strong className="text-base text-sm">
              (
              {removeSeconds(props?.startTime) +
                " - " +
                removeSeconds(props?.endTime)}
              )
            </strong>
          </p>
          <p className="text-xs text-gray_color">
            <strong>Total time:</strong> {formatTime(Number(props?.total_time))}
          </p>
          <p className="text-xs text-gray_color">
            <strong>Total cost:</strong>{" "}
            {formatNumber(Number(props?.total_cost))} Kip
          </p>
        </div>
        <div className="flex items-start justify-start flex-col gap-2">
          {props?.status === "pending" && (
            <button
              onClick={() => props?.onCall()}
              className="p-2 rounded-lg text-base hover:text-white bg-gray-200 hover:bg-secondary hover:cursor-pointer"
            >
              <CallIcon />
            </button>
          )}

          <button
            onClick={() => props?.onViewDetail()}
            className="p-2 rounded-lg text-base hover:text-white bg-gray-200 hover:bg-secondary hover:cursor-pointer"
          >
            <CloseEyeIcon />
          </button>
          <button
            onClick={() => props?.onCancel()}
            className="p-2 rounded-lg text-base hover:text-white bg-gray-200 hover:bg-secondary hover:cursor-pointer"
          >
            <CancelIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
