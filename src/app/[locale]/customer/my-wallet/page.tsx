"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// icons and utils
import {
  CheckCircleIcon,
  CopyIcon,
  DepositIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WithdrawIcon,
} from "@/icons/page";
import { useToast } from "@/utils/toast";
import { QUERY_CUSTOMER_WALLET } from "@/api/wallet";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MUTATION_CUSTOMER_RECHARGE } from "@/api/recharge";
import { GetCustomerWalletResponse, IRecharge } from "@/types/wallet";

// components
import MyModal from "@/components/modal";
import Loading from "@/components/loading";
import Textfield from "@/components/textField";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import WalletCard from "@/components/walletCard";
import TransactionHistory from "./transaction-history/TransactionHistory";
import Select from "@/components/select";
import { coin_type } from "@/utils/option";

interface CloudinaryResponse {
  secure_url?: string;
}

export default function CustomerWallet() {
  const t = useTranslations("my_wallet");
  const i = useTranslations("instrument_panel");
  const { errorMessage, successMessage } = useToast();
  const [cover, setCover] = React.useState<File | null>(null);
  const [fetchNew, setFetchNew] = React.useState<boolean>(false);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);

  const [rechargeData, setRechargeData] = React.useState<IRecharge>({
    amount_recharged: 1,
    coin_type: "ERC20",
    account_number: "",
    image: "",
  });

  const [customerRecharge] = useMutation(MUTATION_CUSTOMER_RECHARGE);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleIncreaseQuantity = () => {
    setRechargeData((prev) => ({
      ...prev,
      amount_recharged: prev.amount_recharged ?? 0 + 1,
    }));
  };

  const handleDecreaseQuantity = () => {
    if (rechargeData.amount_recharged ?? 0 > 0) {
      setRechargeData((prev) => ({
        ...prev,
        amount_recharged: prev.amount_recharged ?? 0 - 1,
      }));
    }
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile1 = e.target.files?.[0];
    if (selectedFile1) {
      setCover(selectedFile1);
      setPreview1(URL.createObjectURL(selectedFile1)); // Generate preview URL
    }
  };

  const [getWallet, { data, loading, refetch }] =
    useLazyQuery<GetCustomerWalletResponse>(QUERY_CUSTOMER_WALLET, {
      fetchPolicy: "no-cache",
    });

  React.useEffect(() => {
    getWallet();
  }, [getWallet]);

  // Map data to report items
  const reportItems = React.useMemo(() => {
    const totalBalance = data?.getCustomerWallet?.data?.total_balance || 0;
    const totalFrozenBalance =
      data?.getCustomerWallet?.data?.total_frozen_balance || 0;

    return [
      {
        title: t("_total_balance"),
        amount: `${totalBalance}`,
        percent: 12,
        icon: <WithdrawIcon size={38} className="text-green-500" />,
      },
      {
        title: t("_frozen_balance"),
        amount: `${totalFrozenBalance}`,
        percent: 3,
        icon: <LockIcon size={38} className="text-neon_pink" />,
      },
    ];
  }, [data]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cover) {
      setErrorMessages("Please upload a voucher");
      return;
    }
    try {
      setIsLoading(true);
      let data: CloudinaryResponse = {};
      if (cover) {
        const _formData = new FormData();
        _formData.append("file", cover);
        _formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""
        );

        const response = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",
          {
            method: "POST",
            body: _formData,
          }
        );
        data = (await response.json()) as CloudinaryResponse;
      }

      const res = await customerRecharge({
        variables: {
          data: {
            amount_recharged: rechargeData.amount_recharged,
            coin_type: rechargeData.coin_type,
            account_number: rechargeData.account_number,
            image: data.secure_url || "",
          },
        },
      });

      if (res?.data?.customerRechargeBalance.success) {
        refetch();
        handleOpenModal();
        setFetchNew(!fetchNew);
        successMessage({
          message: "Recharge successfull!",
          duration: 3000,
        });
      } else {
        errorMessage({
          message: res?.data?.customerRechargeBalance?.error?.details,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error happened!",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setRechargeData({
        amount_recharged: 1,
        coin_type: "",
        account_number: "",
        image: "",
      });
    }
  };

  const getAddress = () => {
    switch (rechargeData?.coin_type) {
      case "ERC20":
        return "0x5D3AdaFa5a041DF8f02323efc7f0ACDF090CB2E2";
      case "TRC20":
        return "TVFMxHrpyMt8xoBXuX7a36xdSkvsmvvn4f";
      case "BTC":
        return "bc1pvzt44umfkdc7ceyxpj9jq2sahcthpp9v237usuusf9y63q4l6g2spmwev3";
      default:
        return "";
    }
  };

  // Function to copy text
  const handleCopy = async () => {
    const address = getAddress();
    if (!address) return;

    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      successMessage({
        message: `${"Copy " + rechargeData?.coin_type + " address successful"}`,
        duration: 3000,
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: i("_customer"), value: "/customer" },
          { label: t("_my_wallet"), value: "/customer/my-wallet" },
        ]}
      />
      <div className="mt-2 rounded flex items-start justify-start flex-col gap-2 py-4 text-gray-500">
        {loading ? (
          <p className="text-gray-500 text-center">Loading....</p>
        ) : (
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
                    {t("_offline_wallet_recharge")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <TransactionHistory fetchNew={fetchNew} />
      </div>

      <MyModal
        isOpen={isOpenModal}
        onClose={handleOpenModal}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/4 md:inset-0 h-auto shadow"
      >
        <div className="w-full rounded bg-white w-full">
          <form
            className="w-full bg-white rounded flex items-start justify-start flex-col p-4"
            onSubmit={handleSubmitForm}
          >
            <p className="text-md font-medium">{t("_top_up_title")}:</p>
            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="flex items-center justify-center gap-2 py-2">
                <p className="text-sm">{t("_select_type")}:</p>
                <div className="flex items-start justify-start gap-4">
                  <Select
                    name="coin_type"
                    title=""
                    option={coin_type}
                    value={rechargeData.coin_type}
                    onChange={(e) =>
                      setRechargeData((prev) => ({
                        ...prev,
                        coin_type: e.target.value,
                      }))
                    }
                  />
                  {/* <div className="flex items-center mb-4">
                    <input
                      id="erc20-coin"
                      type="radio"
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                      value="ERC20"
                      onChange={(e) =>
                        setRechargeData((prev) => ({
                          ...prev,
                          coin_type: e.target.value,
                        }))
                      }
                      checked={rechargeData.coin_type === "ERC20"}
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
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                      value="TRC20"
                      onChange={(e) =>
                        setRechargeData((prev) => ({
                          ...prev,
                          coin_type: e.target.value,
                        }))
                      }
                      checked={rechargeData.coin_type === "TRC20"}
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
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                      value="BTC"
                      onChange={(e) =>
                        setRechargeData((prev) => ({
                          ...prev,
                          coin_type: e.target.value,
                        }))
                      }
                      checked={rechargeData.coin_type === "BTC"}
                    />
                    <label
                      htmlFor="btc-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      BTC
                    </label>
                  </div> */}
                </div>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <p className="text-sm w-auto">{t("_amount")}:</p>
                <div className="w-full flex items-center justify-start gap-6 border rounded py-2 px-4">
                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    onClick={handleDecreaseQuantity}
                  >
                    <MinusIcon size={16} />
                  </button>

                  <input
                    type="number"
                    min="0"
                    className="text-sm w-full text-center border-none focus:outline-none"
                    value={rechargeData.amount_recharged ?? ""}
                    onFocus={(e) => {
                      if (rechargeData.amount_recharged === 1) {
                        setRechargeData((prev) => ({
                          ...prev,
                          amount_recharged: null,
                        }));
                      }
                    }}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/^0+/, ""); // Remove leading zeros
                      setRechargeData((prev) => ({
                        ...prev,
                        amount_recharged: inputValue
                          ? Number(inputValue)
                          : null,
                      }));
                    }}
                  />

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
                placeholder={t("_transaction_id_placeholder")}
                id="transaction_id"
                title={t("_transaction_id")}
                required
                color="text-gray-500"
                value={rechargeData.account_number}
                onChange={(e) =>
                  setRechargeData((prev) => ({
                    ...prev,
                    account_number: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="border-b w-full pb-1">
                <p className="text-xs">{t("_update_recharge_voucher")}:</p>
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
                    <PlusIcon size={16} /> {t("_upload_button")}
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
                {errorMessages && (
                  <div
                    className="w-full py-1 px-4 mb-4 text-xs text-red-500 rounded border border-red-500"
                    role="alert"
                  >
                    <span className="font-medium">Error!</span> {errorMessages}!
                  </div>
                )}
              </div>
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="border-b w-full pb-1">
                <p className="text-xs">{t("_recharge_into_title")}:</p>
              </div>
              <div className="w-full">
                <div className="flex items-start justify-between">
                  <p className="text-xs">{t("_amount_conversion_rate")}:</p>
                  <p className="text-black text-sm">1.00</p>
                </div>
                <p className="text-xs mt-4">{t("_account_address")}:</p>
                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium">
                    {rechargeData?.coin_type === "ERC20"
                      ? "0x5D3AdaFa5a041DF8f02323efc7f0ACDF090CB2E2"
                      : rechargeData?.coin_type === "TRC20"
                      ? "TVFMxHrpyMt8xoBXuX7a36xdSkvsmvvn4f"
                      : rechargeData?.coin_type === "BTC"
                      ? "bc1pvzt44umfkdc7ceyxpj9jq2sahcthpp9v237usuusf9y63q4l6g2spmwev3"
                      : ""}
                  </p>
                  <div className="flex items-start justify-start gap-4">
                    {!isCopied ? (
                      <CopyIcon
                        size={16}
                        className="text-gray-500 cursor-pointer"
                        onClick={() => {
                          handleCopy();
                          setIsCopied(!isCopied);
                        }}
                      />
                    ) : (
                      <CheckCircleIcon
                        size={20}
                        className="text-green-500 cursor-pointer "
                        onClick={() => {
                          setIsCopied(!isCopied);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <IconButton
                className="rounded bg-neon_pink text-white p-2 w-auto mt-4 text-sm"
                title={
                  isLoading ? t("_submiting_button") : t("_recharge_button")
                }
                icon={isLoading ? <Loading /> : <DepositIcon size={18} />}
                isFront={true}
                type="submit"
              />
            </div>
          </form>
        </div>
      </MyModal>
    </>
  );
}
