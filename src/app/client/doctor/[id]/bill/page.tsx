"use client";

import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import {
  PDFIcon,
  CloseEyeIcon,
  DownloadIcon,
  CheckCircleIcon,
  CancelIcon,
} from "@/icons/page";
import { truncateText } from "@/utils/letterLimitation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as htmlToImage from "html-to-image";
import { useFetchAppointmentById } from "@/lib/doctor/useFetchAppointment";
import { removeSeconds } from "@/utils/formatNumber";
import { isWithinTimeRange } from "@/utils/dateFormat";
import { useParams } from "next/navigation";
import StatusBadge from "@/components/status";
import { useToast } from "@/utils/toast";

export default function AppointmentBill() {
  const params = useParams();
  const ref = React.useRef<HTMLDivElement>(null);
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const { data } = useFetchAppointmentById({ id: id as string });
  const { errorMessage } = useToast();
  const date = data?.date ?? "";
  const startTime = data?.startTime ?? "";
  const endTime = data?.endTime ?? "";
  const downloadPasswordAsImage = () => {
    const element = ref.current;
    const A4_WIDTH = 1123;
    const A4_HEIGHT = 794;
    if (element) {
      const originalStyle = element.style.cssText;
      element.style.cssText = `
        font-size: 18px;
        background-color: white;
        color: black;
        padding: 2rem;
        width: ${A4_WIDTH}px;
        height: ${A4_HEIGHT}px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      htmlToImage
        .toPng(element, {
          width: A4_WIDTH,
          height: A4_HEIGHT,
          style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          },
        })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "appointment-bill.png";
          link.href = dataUrl;
          link.click();
          element.style.cssText = originalStyle;
        })
        .catch((error) => {
          element.style.cssText = originalStyle;
        });
    }
  };

  return (
    <>
      <Breadcrumb path="Doctor/appointment/bill" />
      <div
        ref={ref}
        className="relative bg-white rounded p-4 shadow-md text-b_text mt-2"
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl font-bold text-gray-300 pointer-events-none">
          <Image
            className="rounded-full"
            src="/images/okardcare-hori-logo.png"
            alt=""
            width={600}
            height={600}
          />
        </div>

        <div className="p-0 sm:p-2 rounded relative sm:border">
          <div className="w-full flex items-center justify-between p-2 sm:border-b">
            <div>
              <Image
                className="rounded-full"
                src="/images/okardcare-hori-logo.png"
                alt=""
                width={200}
                height={200}
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs">Email: admin@okardcare.com</p>
              <p className="text-xs">Tel: +856 20 78856194</p>
            </div>
          </div>

          <div className="w-full flex items-center justify-between p-0 sm:p-2 sm:border-b flex-col sm:flex-row">
            <div className="w-full sm:w2/4 flex items-start justify-start flex-col gap-1">
              <p className="text-sm text-base">Patient information:</p>
              <p className="text-xs text-gray_color">No: {data?.patient?.id}</p>
              <p className="text-xs text-gray_color">
                Full name: {data?.patient?.firstName}&nbsp;{" "}
                {data?.patient?.lastName}
              </p>
              <p className="text-xs text-gray_color">
                Tel: {data?.patient?.phone}
              </p>
            </div>
            <div className="w-full sm:w-2/4 flex items-start justify-start flex-col gap-1 mt-2 sm:mt-0">
              <p className="text-sm text-base">Doctor information:</p>
              <p className="text-xs text-gray_color">No: {data?.doctor?.id}</p>
              <p className="text-xs text-gray_color">
                Dr. {data?.doctor?.firstName}&nbsp;{data?.doctor?.lastName}
              </p>
              <p className="text-xs text-gray_color">
                Address: {data?.doctor?.address}
              </p>
            </div>
          </div>
          <div className="w-full flex items-start justify-between flex-col sm:flex-row pt-4 pb-2 gap-2">
            <div className="w-full sm:w-2/4 flex items-start justify-start flex-col gap-1">
              <p className="text-sm text-base">Appointment details:</p>
              <p className="text-xs text-gray_color">Booking ID: {data?.id}</p>
              <p className="text-xs text-gray_color">
                Date: {data?.date} &nbsp;
                <strong className="text-base">
                  ( {removeSeconds(data?.startTime ?? "")} -{" "}
                  {removeSeconds(data?.endTime ?? "")})
                </strong>
              </p>
              <p className="text-xs text-gray_color">
                Total time: {data?.duration} minutes
              </p>
              <p className="text-xs text-gray_color">
                Total cost: {data?.total} Kip
              </p>
              <p className="text-xs text-gray_color">
                Link for talking: &nbsp;&nbsp;
                {data?.consultations?.map((val, index) => (
                  <Link
                    key={index + 1}
                    href={
                      isWithinTimeRange(date, startTime, endTime) === true
                        ? val.url
                        : "#"
                    }
                    className={`text-xs underline ${
                      isWithinTimeRange(date, startTime, endTime) === true
                        ? "text-base"
                        : "cursor-not-allowed text-gray_color"
                    } `}
                  >
                    {truncateText(val.url, 50)}
                  </Link>
                ))}
              </p>
              <span
                id="badge-dismiss-yellow"
                className="hidden sm:block inline-flex items-center px-2 py-1 me-2 text-xs text-base bg-gray-200 rounded mt-4"
              >
                Book with confidence! We will refund any unused time in your
                session
                <button
                  type="button"
                  className="inline-flex items-center p-1 ms-2 text-sm text-base rounded-sm hover:bg-gray-200 hover:text-base"
                  data-dismiss-target="#badge-dismiss-yellow"
                  aria-label="Remove"
                >
                  <svg
                    className="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Remove badge</span>
                </button>
              </span>
            </div>
            <div className="w-full sm:w-2/4">
              <p className="text-sm text-base">Your related documents:</p>
              <p className="text-xs text-gray_color">Cases: {data?.case}</p>
              <p className="text-xs text-gray_color">
                Description: {data?.notes}
              </p>
              <p className="text-xs text-gray_color flex items-start justify-start gap-2">
                Urgency:{" "}
                {data?.urgency ? (
                  <span className="flex items-start justify-start gap-1">
                    <CheckCircleIcon className="text-green-500" size={18} /> Yes
                  </span>
                ) : (
                  <span className="flex items-start justify-start gap-2">
                    <CancelIcon className="text-error" size={18} /> No
                  </span>
                )}
              </p>
              <p className="text-xs text-gray_color my-2">
                Status: <StatusBadge status={data?.status ?? ""} />
              </p>
              <div className="mt-2 bg-gray-200 w-3/4 flex items-center justify-between text-gray_500 rounded p-2 hover:bg-bg_gray_200 hover:cursor-pointer">
                <p className="text-xs flex items-center justify-center">
                  <PDFIcon size={18} className="text-error" />
                  &nbsp;
                  {truncateText("Myfile", 20)}
                </p>
                <CloseEyeIcon
                  size={16}
                  className="cursor-pointer"
                  onClick={() => {
                    if (data?.filename) {
                      window.open(data?.filename, "_blank"); // Directly open the URL in a new tab
                    } else {
                      errorMessage({
                        message: "File not available",
                        duration: 3000,
                      });
                    }
                  }}
                />
              </div>
              <span
                id="badge-dismiss-yellow"
                className="block sm:hidden inline-flex items-center px-2 py-1 me-2 text-xs text-base bg-gray-200 rounded mt-4"
              >
                Book with confidence! We will refund any unused time in your
                session
                <button
                  type="button"
                  className="inline-flex items-center p-1 ms-2 text-sm text-base rounded-sm hover:bg-gray-200 hover:text-base"
                  data-dismiss-target="#badge-dismiss-yellow"
                  aria-label="Remove"
                >
                  <svg
                    className="w-2 h-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Remove badge</span>
                </button>
              </span>
            </div>
          </div>

          <div className="flex items-start justify-start flex-col gap-2 my-6">
            <p className="text-sm text-gray_color text-xs w-full text-center mt-2">
              Thank you for trusting us. We are committed to reliable,
              accessible online care for your well-being
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white w-full flex items-start justify-end pt-0 pb-0 sm:pb-4 gap-2">
        <div className="w-full sm:w-1/2 flex items-end justify-end gap-2 px-0 sm:px-4">
          <IconButton
            className="rounded text-white bg-base w-auto mt-4 text-xs"
            icon={<DownloadIcon size={18} />}
            isFront={true}
            title="Download"
            onClick={downloadPasswordAsImage}
          />
        </div>
      </div>
    </>
  );
}
