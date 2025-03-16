"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLazyQuery, useMutation } from "@apollo/client";

// components
import Textfield from "@/components/textField";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import WalletCard from "@/components/walletCard";

// icons and utils
import { useToast } from "@/utils/toast";
import {
  CheckCircleIcon,
  CopyIcon,
  DepositIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  WalletIcon,
  WithdrawIcon,
} from "@/icons/page";
import { GetShopWalletResponse, IRecharge, IWithdraw } from "@/types/wallet";
import { MUTATION_SHOP_RECHARGE, MUTATION_SHOP_WITHDRAW } from "@/api/recharge";
import { QUERY_SHOP_WALLET } from "@/api/wallet";
import Select from "@/components/select";
import { coin_type } from "@/utils/option";

interface CloudinaryResponse {
  secure_url?: string;
}

export default function ShopWallet() {
  const t = useTranslations("wallet_management");
  const m = useTranslations("my_wallet");
  const { errorMessage, successMessage } = useToast();
  const [cover, setCover] = React.useState<File | null>(null);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoading1, setIsLoading1] = React.useState<boolean>(false);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const [rechargeData, setRechargeData] = React.useState<IRecharge>({
    amount_recharged: 1,
    coin_type: "ERC20",
    account_number: "",
    image: "",
  });
  const [withdrawData, setWithdrawData] = React.useState<IWithdraw>({
    account_number: "",
    amount_withdraw: 1,
    coin_type: "ERC20",
  });

  const [shopRecharge] = useMutation(MUTATION_SHOP_RECHARGE);
  const [shopWithdraw] = useMutation(MUTATION_SHOP_WITHDRAW);
  const [getShopWallet, { data, refetch }] =
    useLazyQuery<GetShopWalletResponse>(QUERY_SHOP_WALLET, {
      fetchPolicy: "no-cache",
    });

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

  const handleIncreaseWithdrawQuantity = () => {
    setWithdrawData((prev) => ({
      ...prev,
      amount_withdraw: prev.amount_withdraw ?? 0 + 1,
    }));
  };

  const handleDecreaseWithdrawQuantity = () => {
    setWithdrawData((prev) => ({
      ...prev,
      amount_withdraw: prev.amount_withdraw ?? 0 - 1,
    }));
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile1 = e.target.files?.[0];

    if (selectedFile1) {
      setErrorMessages(null);
      setCover(selectedFile1);
      setPreview1(URL.createObjectURL(selectedFile1)); // Generate preview URL
    }
  };

  React.useEffect(() => {
    getShopWallet();
  }, [getShopWallet]);

  const reportItems = React.useMemo(() => {
    const total_balance = data?.getShopWallet?.data?.total_balance || 0;
    const frozen_balance = data?.getShopWallet?.data?.total_frozen_balance || 0;
    const withdraw_balance = data?.getShopWallet?.data?.total_withdraw || 0;
    const withdrawable_balance =
      data?.getShopWallet?.data?.total_withdraw_able_balance || 0;
    const total_recharged = data?.getShopWallet?.data?.total_recharged || 0;

    return [
      {
        title: t("_wallet_balance"),
        amount: `${total_balance}`,
        percent: 3,
        icon: <WalletIcon size={20} className="text-neon_blue" />,
      },
      {
        title: t("_recharged"),
        amount: `${total_recharged}`,
        percent: 12,
        icon: <DepositIcon size={20} className="text-green-500" />,
      },
      {
        title: t("_withdrawal"),
        amount: `${withdraw_balance}`,
        percent: 12,
        icon: <WithdrawIcon size={20} className="text-neon_pink" />,
      },
      {
        title: t("_frozen_balance"),
        amount: `${frozen_balance}`,
        percent: 12,
        icon: <LockIcon size={20} className="text-neon_pink" />,
      },
      {
        title: t("_withdrawal_balance"),
        amount: `${withdrawable_balance}`,
        percent: 12,
        icon: <WithdrawIcon size={20} className="text-green-500" />,
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

      const res = await shopRecharge({
        variables: {
          data: {
            amount_recharged: rechargeData.amount_recharged,
            coin_type: rechargeData.coin_type,
            account_number: rechargeData.account_number,
            image: data.secure_url || "",
          },
        },
      });

      if (res?.data?.shopRechargeBalance.success) {
        setRechargeData({
          amount_recharged: 1,
          coin_type: "",
          account_number: "",
          image: "",
        });
        setCover(null);
        setPreview1(null);

        successMessage({
          message: "Recharge successfull!",
          duration: 3000,
        });

        refetch();
      } else {
        errorMessage({
          message: res?.data?.shopRechargeBalance?.error?.details,
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
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading1(true);

    try {
      const res = await shopWithdraw({
        variables: {
          data: {
            amount_withdraw: withdrawData.amount_withdraw,
            coin_type: withdrawData.coin_type,
            account_number: withdrawData.account_number,
          },
        },
      });

      if (res?.data?.shopWithdrawBalance.success) {
        setWithdrawData({
          amount_withdraw: 1,
          coin_type: "",
          account_number: "",
        });

        successMessage({
          message: "Sent withdraw request successfull!",
          duration: 3000,
        });

        refetch();
      } else {
        errorMessage({
          message: res?.data?.shopWithdrawBalance?.error?.details,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected error happened!",
        duration: 3000,
      });
    } finally {
      setIsLoading1(false);
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
          { label: t("_finance"), value: "/wallet" },
          { label: t("_wallet"), value: "/wallet" },
        ]}
      />
      <div className="mt-2 rounded flex items-start justify-start flex-col gap-2 py-4 text-gray-500">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {reportItems.map((item, index) => (
            <WalletCard
              key={index + 1}
              title={item.title}
              amount={item.amount}
              icon={item.icon}
            />
          ))}
        </div>

        <div className="mt-6 w-full flex flex-col sm:flex-row items-start justify-between gap-4">
          <form
            className="bg-white rounded w-full sm:w-1/2 flex items-start justify-start flex-col gap-4 p-4"
            onSubmit={handleSubmitForm}
          >
            <p className="text-md font-medium">{m("_top_up_title")}:</p>
            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="flex items-center justify-center gap-2 py-2">
                <p className="text-sm">{m("_select_type")}:</p>
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
                </div>
              </div>
              <div className="w-full flex items-start justify-between gap-4">
                <p className="text-sm w-auto">{m("_amount")}:</p>
                <div className="w-full flex items-center justify-start gap-6 border rounded py-2 px-4">
                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    type="button"
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
                    type="button"
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
                placeholder={m("_transaction_id_placeholder")}
                id="transaction_id"
                title={m("_transaction_id")}
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
                <p className="text-xs">{m("_update_recharge_voucher")}:</p>
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
                    <PlusIcon size={16} /> {m("_upload_button")}
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
                <p className="text-xs">{m("_recharge_into_title")}:</p>
              </div>
              <div className="w-full">
                <div className="flex items-start justify-between">
                  <p className="text-xs">{m("_amount_conversion_rate")}:</p>
                  <p className="text-black text-sm">$1.00</p>
                </div>
                <p className="text-xs mt-4">
                  {rechargeData?.coin_type} Network address:
                </p>
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
                className="rounded bg-green-500 text-white p-2 w-auto mt-2 text-sm"
                type="submit"
                title={
                  isLoading ? m("_submiting_button") : m("_recharge_button")
                }
              />
            </div>
          </form>

          <form
            onSubmit={handleWithdraw}
            className="bg-white rounded w-full sm:w-1/2 flex items-start justify-start flex-col gap-2 p-4"
          >
            <p className="text-md font-medium">{t("_withdraw_title")}:</p>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="flex items-center justify-center gap-2 py-2">
                <p className="text-sm">{m("_select_type")}:</p>
                <div className="flex items-start justify-start gap-4">
                  <Select
                    name="coin_type"
                    title=""
                    option={coin_type}
                    value={withdrawData.coin_type}
                    onChange={(e) =>
                      setWithdrawData((prev) => ({
                        ...prev,
                        coin_type: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="w-full flex items-start justify-between gap-4">
                <p className="text-sm w-auto">{m("_amount")}:</p>
                <div className="w-full flex items-center justify-start gap-6 border rounded py-2 px-4">
                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    onClick={handleDecreaseWithdrawQuantity}
                    type="button"
                  >
                    <MinusIcon size={16} />
                  </button>

                  <input
                    type="number"
                    min="0"
                    className="text-sm w-full text-center border-none focus:outline-none"
                    value={withdrawData.amount_withdraw ?? ""}
                    onFocus={(e) => {
                      if (withdrawData.amount_withdraw === 1) {
                        setWithdrawData((prev) => ({
                          ...prev,
                          amount_withdraw: null,
                        }));
                      }
                    }}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/^0+/, "");
                      setWithdrawData((prev) => ({
                        ...prev,
                        amount_withdraw: inputValue ? Number(inputValue) : null,
                      }));
                    }}
                  />

                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    onClick={handleIncreaseWithdrawQuantity}
                    type="button"
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
                title={t("_account_address")}
                placeholder={t("_account_address_placeholder")}
                value={withdrawData.account_number}
                onChange={(e) =>
                  setWithdrawData((prev) => ({
                    ...prev,
                    account_number: e.target.value,
                  }))
                }
              />
            </div>

            <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
              <div className="border-b w-full pb-1">
                <p className="text-xs">{t("_withdraw_info")}:</p>
              </div>
              <div className="w-full flex flex-col gap-1">
                <div className="flex items-start justify-between pr-4">
                  <p className="text-xs">{m("_amount_conversion_rate")}:</p>
                  <p className="text-black text-sm">$1.00</p>
                </div>
                <div className="flex items-start justify-between pr-4">
                  <p className="text-xs">{t("_minimum_withdrawal")}:</p>
                  <p className="text-black text-sm">$20.00</p>
                </div>
                <div className="flex items-start justify-between pr-4">
                  <p className="text-xs">{t("_maximum_withdrawal")}:</p>
                  <p className="text-black text-sm">$100,000.00</p>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-between px-3">
              {withdrawData.coin_type && (
                <p>
                  {withdrawData.coin_type.toUpperCase()} /{" "}
                  {withdrawData?.amount_withdraw}
                </p>
              )}

              <IconButton
                className="rounded bg-neon_pink text-white p-2 w-auto mt-4 text-sm"
                type="submit"
                title={
                  isLoading1 ? m("_submiting_button") : t("_apply_withdraw")
                }
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
