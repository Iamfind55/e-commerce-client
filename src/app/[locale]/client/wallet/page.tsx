"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
import { QRCodeCanvas } from "qrcode.react";

// components
import MyModal from "@/components/modal";
import Textfield from "@/components/textField";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import WalletCard from "@/components/walletCard";

// icons and utils
import {
  DepositIcon,
  LinkIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  QRcodeIcon,
  TrashIcon,
  WalletIcon,
  WithdrawIcon,
} from "@/icons/page";

type ReportItem = {
  title: string;
  amount: string;
  percent: number;
  icon: ReactNode;
};

export default function Withdraw() {
  const [qrcode, setQrcode] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(1);
  const [cover, setCover] = React.useState<File | null>(null);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [withdrawQuantity, setWithdrawQuantity] = React.useState<number>(20);
  const [transactionId, setTransactionId] = React.useState<string | null>(null);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const [selectedCoinType, setSelectedCoinType] =
    React.useState<string>("erc20");

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleIncreaseWithdrawQuantity = () => {
    setWithdrawQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseWithdrawQuantity = () => {
    setWithdrawQuantity((prevQuantity) =>
      prevQuantity > 1 ? prevQuantity - 1 : 1
    );
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

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  // Handle change in selected coin type
  const handleCoinTypeChange = (event: any) => {
    setSelectedCoinType(event.target.value);
  };

  const reportItems: ReportItem[] = [
    {
      title: "Wallet Banlance",
      amount: "$500",
      percent: 5,
      icon: <WalletIcon size={38} className="text-neon_blue" />,
    },
    {
      title: "Recharged",
      amount: "$12",
      percent: 15,
      icon: <DepositIcon size={38} className="text-green-500" />,
    },
    {
      title: "Withdrawal",
      amount: "$12,000",
      percent: 8,
      icon: <WithdrawIcon size={38} className="text-neon_pink" />,
    },
    {
      title: "Frozen Balance",
      amount: "$7,000",
      percent: 3,
      icon: <LockIcon size={38} className="text-neon_pink" />,
    },
    {
      title: "Withdrawable Balance",
      amount: "$320",
      percent: 12,
      icon: <WithdrawIcon size={38} className="text-green-500" />,
    },
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Wallet management", value: "/wallet" },
          { label: "My wallet", value: "/wallet" },
        ]}
      />
      <div className="mt-2 rounded flex items-start justify-start flex-col gap-2 py-4 text-gray-500">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {reportItems.map((item, index) => (
            <WalletCard
              key={index}
              title={item.title}
              amount={item.amount}
              percent={item.percent}
              icon={item.icon}
            />
          ))}
        </div>

        <div className="mt-6 w-full flex flex-col sm:flex-row items-start justify-between gap-4">
          <form className="bg-white rounded w-full sm:w-1/2 flex items-start justify-start flex-col gap-4 p-4">
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
                        handleOpenModal();
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

          <form className="bg-white rounded w-full sm:w-1/2 flex items-start justify-start flex-col gap-2 p-4">
            <p className="text-md font-medium">
              Transfer Wallet Balance to Your Account:
            </p>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="flex items-start justify-start gap-2 py-2">
                <p className="text-sm">Select type:</p>
                <div className="flex items-start justify-start gap-4">
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      value="erc20"
                      id="with-erc20-coin"
                      name="rechargeAccount"
                      onChange={handleCoinTypeChange}
                      checked={selectedCoinType === "erc20"}
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="with-erc20-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      ERC20
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      type="radio"
                      value="trc20"
                      id="with-trc20-coin"
                      name="rechargeAccount"
                      onChange={handleCoinTypeChange}
                      checked={selectedCoinType === "trc20"}
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="with-trc20-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      TRC20
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      value="btc"
                      type="radio"
                      id="with-btc-coin"
                      name="rechargeAccount"
                      onChange={handleCoinTypeChange}
                      checked={selectedCoinType === "btc"}
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="with-btc-coin"
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
                    onClick={handleDecreaseWithdrawQuantity}
                  >
                    <MinusIcon size={16} />
                  </button>
                  <p className="text-sm w-full text-center">
                    {withdrawQuantity}
                  </p>
                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    onClick={handleIncreaseWithdrawQuantity}
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <Textfield
                required
                id="account_address"
                name="accountAddress"
                color="text-gray-500"
                title="Account address"
                placeholder="Enter account address...."
              />
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="border-b w-full pb-1">
                <p className="text-xs">Withdraw Information:</p>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="flex items-start justify-between pr-4">
                  <p className="text-xs">Amount conversion rate:</p>
                  <p className="text-black text-sm">$1.00</p>
                </div>
                <div className="flex items-start justify-between pr-4">
                  <p className="text-xs">Minimum withdrawal:</p>
                  <p className="text-black text-sm">$20.00</p>
                </div>
                <div className="flex items-start justify-between pr-4">
                  <p className="text-xs">Maximum withdrawal:</p>
                  <p className="text-black text-sm">$100,000.00</p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-3">
              <p>
                {selectedCoinType.toUpperCase()} / {withdrawQuantity}
              </p>
              <IconButton
                className="rounded bg-neon_pink text-white p-2 w-auto mt-4 text-sm"
                type="button"
                title="Apply for withdrawal"
              />
            </div>
          </form>
        </div>
      </div>

      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/5 md:inset-0 h-auto shadow"
      >
        <div className="w-full h-[50vh] flex items-center justify-center">
          <QRCodeCanvas value={qrcode} size={250} />
        </div>
      </MyModal>
    </>
  );
}
