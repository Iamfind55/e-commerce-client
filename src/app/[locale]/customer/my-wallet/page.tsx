"use client";

import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import MyModal from "@/components/modal";
import Textfield from "@/components/textField";
import WalletCard from "@/components/walletCard";
import {
  LinkIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  QRcodeIcon,
  TrashIcon,
  WithdrawIcon,
} from "@/icons/page";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import React, { ReactNode } from "react";
import TransactionHistory from "./transaction-history/page";

type ReportItem = {
  title: string;
  amount: string;
  percent: number;
  icon: ReactNode;
};

export default function CustomerWallet() {
  const [qrcode, setQrcode] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(1);
  const [cover, setCover] = React.useState<File | null>(null);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isOpenQRModal, setIsOpenQRModal] = React.useState<boolean>(false);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const [transactionId, setTransactionId] = React.useState<string | null>(null);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenQRModal = () => {
    setIsOpenQRModal(!isOpenQRModal);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile1 = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 1024 * 1024;

    if (selectedFile1) {
      if (!allowedTypes.includes(selectedFile1.type)) {
        setErrorMessages("Only JPG, JPEG, and PNG files are allowed.");
        setCover(null);
        setPreview1(null);
        return;
      }

      if (selectedFile1.size > maxSizeInBytes) {
        setErrorMessages("File size exceeds 1MB.");
        setCover(null);
        setPreview1(null);
        return;
      }

      setErrorMessages(null);
      setCover(selectedFile1);
      setPreview1(URL.createObjectURL(selectedFile1)); // Generate preview URL
    }
  };

  const reportItems: ReportItem[] = [
    {
      title: "Frozen Balance",
      amount: "$7,000",
      percent: 3,
      icon: <LockIcon size={38} className="text-neon_pink" />,
    },
    {
      title: "Total Balance",
      amount: "$320",
      percent: 12,
      icon: <WithdrawIcon size={38} className="text-green-500" />,
    },
  ];
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Customer", value: "/customer" },
          { label: "My wallet", value: "/customer/my-wallet" },
        ]}
      />
      <div className="mt-2 rounded flex items-start justify-start flex-col gap-2 py-4 text-gray-500">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 px-4 sm:px-0">
          {reportItems.map((item, index) => (
            <WalletCard
              key={index}
              title={item.title}
              amount={item.amount}
              percent={item.percent}
              icon={item.icon}
            />
          ))}
          <div
            onClick={() => handleOpenModal()}
            className="w-auto bg-white p-4 rounded-md flex items-start justify-start flex-col select-none gap-1 sm:gap-2 hover:cursor-pointer group shadow transition-all duration-300"
          >
            <div className="py-0 sm:py-4 px-2 w-full flex items-center justify-start flex-col gap-1 sm:gap-4">
              <div className="rounded-full transition-all duration-300">
                <PlusIcon size={22} />
              </div>
              <div className="flex items-start justify-start flex-col gap-2">
                <p className="text-md font-medium text-gray-500">
                  Offline wallet recharge
                </p>
              </div>
            </div>
          </div>
        </div>
        <TransactionHistory />
      </div>

      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/4 md:inset-0 h-auto shadow"
      >
        <div className="w-full rounded bg-white w-full">
          <form className="w-full bg-white rounded flex items-start justify-start flex-col p-4">
            <p className="text-md font-medium">Top-Up Your Wallet Balance:</p>
            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="flex items-start justify-start gap-2 py-2">
                <p className="text-sm">Select type:</p>
                <div className="flex items-start justify-start gap-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="erc20-coin"
                      type="radio"
                      value="erc20"
                      // checked
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="erc20-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      ERC20
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="trc20-coin"
                      type="radio"
                      value="trc20"
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="trc20-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      TRC20
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="btc-coin"
                      type="radio"
                      value="btc"
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="btc-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      BTC
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-start justify-between gap-4">
                <p className="text-sm w-auto">Amount:</p>
                <div className="w-full flex items-center justify-start gap-6 border rounded py-2 px-4">
                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    onClick={handleDecreaseQuantity}
                  >
                    <MinusIcon size={16} />
                  </button>
                  <p className="text-sm w-full text-center">{quantity}</p>
                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    onClick={handleIncreaseQuantity}
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <Textfield
                name="transactionId"
                placeholder="Enter your transaction ID...."
                id="transaction_id"
                title="Transaction ID"
                required
                color="text-gray-500"
                value={transactionId ?? ""}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="border-b w-full pb-1">
                <p className="text-xs">Upload recharge voucher:</p>
              </div>
              <div className="flex items-start justify-start gap-4">
                <div className="flex items-center justify-start gap-6">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="cover-upload"
                    onChange={handleChangeCover}
                    className="block w-full hidden"
                  />
                  <label
                    htmlFor="cover-upload"
                    className="w-auto border text-xs text-gray-500 rounded flex items-center justify-center cursor-pointer px-4 py-2"
                  >
                    <PlusIcon size={16} /> Upload
                  </label>
                </div>

                <div className={`w-full relative ${!preview1 && "hidden"}`}>
                  {preview1 && (
                    <Image
                      src={preview1}
                      width={50}
                      height={50}
                      alt="Image preview"
                      className="w-full h-32 object-cover border rounded"
                    />
                  )}
                  <button
                    onClick={() => {
                      setPreview1(null);
                    }}
                    className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full text-neon_pink cursor-pointer"
                  >
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="border-b w-full pb-1">
                <p className="text-xs">Recharge Information:</p>
              </div>
              <div className="w-full">
                <div className="flex items-start justify-between">
                  <p className="text-xs">Amount conversion rate:</p>
                  <p className="text-black text-sm">1.00</p>
                </div>
                <p className="text-xs mt-4">Account address:</p>
                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium">
                    TJaqEGnAWkaZY2yqYy33U8Rvwy82nUpSsw
                  </p>
                  <div className="flex items-start justify-start gap-4">
                    <LinkIcon
                      size={16}
                      className="text-gray-500 cursor-pointer"
                      onClick={() =>
                        setTransactionId("TJaqEGnAWkaZY2yqYy33U8Rvwy82nUpSsw")
                      }
                    />
                    <QRcodeIcon
                      size={16}
                      className="text-gray-500 cursor-pointer"
                      onClick={() => {
                        handleOpenQRModal();
                        setQrcode("TJaqEGnAWkaZY2yqYy33U8Rvwy82nUpSsw");
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <IconButton
                className="rounded bg-neon_blue text-white p-2 w-auto mt-4 text-sm"
                type="button"
                title="Recharge"
              />
            </div>
          </form>
        </div>
      </MyModal>

      <MyModal
        isOpen={isOpenQRModal}
        onClose={handleOpenQRModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/5 md:inset-0 h-auto shadow"
      >
        <div className="w-full h-[50vh] flex items-center justify-center">
          <QRCodeCanvas value={qrcode} size={250} />
        </div>
      </MyModal>
    </>
  );
}
