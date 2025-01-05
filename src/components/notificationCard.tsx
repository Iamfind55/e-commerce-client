import { CancelIcon, FillCircleIcon, MessageSettingIcon } from "@/icons/page";
import React, { InputHTMLAttributes } from "react";
import MyModal from "./modal";
import IconButton from "./iconButton";

interface cardProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  status: string;
  detail: string;
  date: string;
}

export default function NotificationCard(props: cardProps) {
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className="w-full border w-auto bg-white py-2 px-4 rounded-md flex items-start justify-start flex-col select-none gap-2 hover:cursor-pointer group hover:shadow transition-all duration-300 relative">
        <div className="p-2 w-full flex items-center justify-between">
          <p className="text-xs text-gray-500">{props?.title}</p>
          <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
            <FillCircleIcon size={10} className="text-neon_pink" />
            {props?.status}
          </p>
        </div>
        <div className="pl-2">
          <p className="text-sm text-gray-800 flex items-center justify-center">
            {props?.detail}
          </p>
        </div>
        <div className="p-2 w-full flex items-center justify-between">
          <p className="text-xs text-gray-500">{props?.date}</p>
        </div>
        <button
          className="absolute bottom-0 right-0 p-2 hover:bg-neon_pink rounded-tl-xl rounded-br-md flex items-center justify-center bg-neon_blue transition-colors duration-300"
          onClick={() => handleOpenModal()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-6 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <MyModal isOpen={openModal} onClose={handleOpenModal} className="w-3/5">
        <div className="w-full flex items-start justify-start flex-col gap-2 rounded bg-white w-full text-gray-500 py-3">
          <div className="w-full flex items-start justify-between">
            <h4 className="text-gray-500 text-md mb-3">
              SN: SN_TR172204647065510
            </h4>
            <CancelIcon
              size={22}
              onClick={() => handleOpenModal()}
              className="text-gray-500 border rounded cursor-pointer hover:shadow-md"
            />
          </div>
          <div className="w-full flex items-start justify-start gap-2">
            <MessageSettingIcon size={18} />
            <p>Order completion payment</p>
          </div>
          <div className="w-full flex items-start justify-start flex-col gap-2 shadow-md border-t border-gray-100 rounded-md p-2">
            <div className="w-full flex text-sm items-start justify-start gap-4 rounded-sm p-2">
              <p>Order no:</p>
              <p>SN_JK171895010024640</p>
            </div>
            <div className="w-full flex text-sm items-start justify-start gap-4 bg-gray-100 rounded-sm p-2">
              <p>Product Sku:</p>
              <p>dc1UA-xrwKj_aibd</p>
            </div>
            <div className="w-full flex text-sm items-start justify-start gap-4 rounded-sm p-2">
              <p>Product spu:</p>
              <p>_-i5wtdc-U-A</p>
            </div>
            <div className="w-full flex text-sm items-start justify-start gap-4 bg-gray-100 rounded-sm p-2">
              <p>Actual payment:</p>
              <p>$1,145.00</p>
            </div>
            <div className="w-full flex text-sm items-start justify-start gap-4 rounded-sm p-2">
              <p>Original product price:</p>
              <p>$1,145.00</p>
            </div>
            <div className="w-full flex text-sm items-start justify-start gap-4 bg-gray-100 rounded-sm p-2">
              <p>Purchase quantity:</p>
              <p>1</p>
            </div>
            <div className="w-full flex text-sm items-start justify-start gap-4 rounded-sm p-2">
              <p>Payment time:</p>
              <p>2024-06-21 02:08:21</p>
            </div>
            <div className="w-full flex text-sm items-start justify-start gap-4 bg-gray-100 rounded-sm p-2">
              <p>Product name:</p>
              <p>
                Versace Men's Swiss Chronograph Two Tone Stainless Steel
                Bracelet Watch 45mm
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-4 mt-4">
          <IconButton
            title="Close"
            type="button"
            onClick={() => handleOpenModal()}
            className="rounded bg-neon_pink text-white w-auto text-xs hover:font-medium hover:shadow-md"
          />
        </div>
      </MyModal>
    </>
  );
}
