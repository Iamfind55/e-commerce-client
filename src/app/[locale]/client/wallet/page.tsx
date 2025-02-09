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
import { GetShopWalletResponse, IRecharge, IWithdraw } from "@/types/wallet";
import { useToast } from "@/utils/toast";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MUTATION_SHOP_RECHARGE, MUTATION_SHOP_WITHDRAW } from "@/api/recharge";
import { QUERY_SHOP_WALLET } from "@/api/wallet";
import { useTranslations } from "next-intl";

interface CloudinaryResponse {
  secure_url?: string;
}

export default function ShopWallet() {
  const t = useTranslations("wallet_management");
  const m = useTranslations("my_wallet");
  const { errorMessage, successMessage } = useToast();
  const [qrcode, setQrcode] = React.useState<string>("");
  const [cover, setCover] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [withdrawQuantity, setWithdrawQuantity] = React.useState<number>(20);
  // const [transactionId, setTransactionId] = React.useState<string | null>(null);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);

  const [rechargeData, setRechargeData] = React.useState<IRecharge>({
    amout_recharged: 1,
    coin_type: "",
    account_number: "",
    image: "",
  });
  const [withdrawData, setWithdrawData] = React.useState<IWithdraw>({
    account_number: "",
    amout_withdraw: 1,
    coin_type: "",
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
      amout_recharged: prev.amout_recharged + 1,
    }));
  };

  const handleDecreaseQuantity = () => {
    if (rechargeData.amout_recharged > 0) {
      setRechargeData((prev) => ({
        ...prev,
        amout_recharged: prev.amout_recharged - 1,
      }));
    }
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

    if (selectedFile1) {
      if (!allowedTypes.includes(selectedFile1.type)) {
        setErrorMessages("Only JPG, JPEG, and PNG files are allowed.");
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
    setIsLoading(true);
    try {
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
            amount_recharged: rechargeData.amout_recharged,
            coin_type: rechargeData.coin_type,
            account_number: rechargeData.account_number,
            image: data.secure_url || "",
          },
        },
      });

      if (res?.data?.shopRechargeBalance.success) {
        setRechargeData({
          amout_recharged: 1,
          coin_type: "",
          account_number: "",
          image: "",
        });

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
    setIsLoading(true);

    try {
      const res = await shopWithdraw({
        variables: {
          data: {
            amount_recharged: rechargeData.amout_recharged,
            coin_type: rechargeData.coin_type,
            account_number: rechargeData.account_number,
          },
        },
      });

      if (res?.data?.shopWithdrawBalance.success) {
        setWithdrawData({
          amout_withdraw: 1,
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
      setIsLoading(false);
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
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
              <div className="flex items-start justify-start gap-2 py-2">
                <p className="text-sm">{m("_select_type")}:</p>
                <div className="flex items-start justify-start gap-4">
                  <div className="flex items-center mb-4">
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
                  </div>
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
                    value={rechargeData.amout_recharged}
                    onChange={(e) =>
                      setRechargeData((prev) => ({
                        ...prev,
                        amout_recharged: Number(e.target.value) || 0,
                      }))
                    }
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
                  <p className="text-red-500 text-xs">{errorMessages}</p>
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
                  <p className="text-black text-sm">1.00</p>
                </div>
                <p className="text-xs mt-4">{m("_amount_conversion_rate")}:</p>
                <div className="w-full flex items-start justify-between">
                  <p className="text-xs font-medium">
                    TJaqEGnAWkaZY2yqYy33U8Rvwy82nUpSsw
                  </p>
                  <div className="flex items-start justify-start gap-4">
                    <LinkIcon
                      size={16}
                      className="text-gray-500 cursor-pointer"
                      // onClick={() =>
                      //   setTransactionId("TJaqEGnAWkaZY2yqYy33U8Rvwy82nUpSsw")
                      // }
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
              <div className="flex items-start justify-start gap-2 py-2">
                <p className="text-sm">{m("_select_type")}:</p>
                <div className="flex items-start justify-start gap-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="w-erc20-coin"
                      type="radio"
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                      value="ERC20"
                      onChange={(e) =>
                        setWithdrawData((prev) => ({
                          ...prev,
                          coin_type: e.target.value,
                        }))
                      }
                      checked={withdrawData.coin_type === "ERC20"}
                    />
                    <label
                      htmlFor="w-erc20-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      ERC20
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="w-trc20-coin"
                      type="radio"
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                      value="TRC20"
                      onChange={(e) =>
                        setWithdrawData((prev) => ({
                          ...prev,
                          coin_type: e.target.value,
                        }))
                      }
                      checked={withdrawData.coin_type === "TRC20"}
                    />
                    <label
                      htmlFor="w-trc20-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      TRC20
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      id="w-btc-coin"
                      type="radio"
                      name="rechargeAccount"
                      className="w-3 h-3 text-gray-500 bg-gray-100 border-gray-300"
                      value="BTC"
                      onChange={(e) =>
                        setWithdrawData((prev) => ({
                          ...prev,
                          coin_type: e.target.value,
                        }))
                      }
                      checked={withdrawData.coin_type === "BTC"}
                    />
                    <label
                      htmlFor="w-btc-coin"
                      className="ms-2 text-xs font-medium text-gray-500 cursor-pointer"
                    >
                      BTC
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-full flex items-start justify-between gap-4">
                <p className="text-sm w-auto">{m("_amount")}:</p>
                <div className="w-full flex items-center justify-start gap-6 border rounded py-2 px-4">
                  <button
                    className="rounded-full bg-gray-300 text-white cursor-pointer"
                    onClick={handleDecreaseWithdrawQuantity}
                  >
                    <MinusIcon size={16} />
                  </button>
                  <input
                    type="number"
                    min="0"
                    className="text-sm w-full text-center border-none focus:outline-none"
                    value={withdrawData.amout_withdraw}
                    onChange={(e) =>
                      setWithdrawData((prev) => ({
                        ...prev,
                        amout_withdraw: Number(e.target.value) || 0,
                      }))
                    }
                  />
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
              <p>
                {withdrawData.coin_type.toUpperCase()} / {withdrawQuantity}
              </p>
              <IconButton
                className="rounded bg-neon_pink text-white p-2 w-auto mt-4 text-sm"
                type="submit"
                title={
                  isLoading ? m("_submiting_button") : t("_apply_withdraw")
                }
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
