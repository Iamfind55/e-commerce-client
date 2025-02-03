"use client";

import React from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";

// icons and utils
import {
  LinkIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  QRcodeIcon,
  TrashIcon,
  WithdrawIcon,
} from "@/icons/page";
import { useToast } from "@/utils/toast";
import { QUERY_CUSTOMER_WALLET } from "@/api/wallet";
import { useLazyQuery, useMutation } from "@apollo/client";
import { MUTATION_CUSTOMER_RECHARGE } from "@/api/recharge";
import { GetCustomerWalletResponse, ICutomerRecharge } from "@/types/wallet";

// components
import MyModal from "@/components/modal";
import Loading from "@/components/loading";
import Textfield from "@/components/textField";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import WalletCard from "@/components/walletCard";
import TransactionHistory from "./transaction-history/page";
import { useTranslations } from "next-intl";

interface CloudinaryResponse {
  secure_url?: string;
}

export default function CustomerWallet() {
  const t = useTranslations("my_wallet");
  const p = useTranslations("purchase_history");
  const i = useTranslations("instrument_panel");
  const { errorMessage, successMessage } = useToast();
  const [qrcode, setQrcode] = React.useState<string>("");
  const [cover, setCover] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isOpenQRModal, setIsOpenQRModal] = React.useState<boolean>(false);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const [transactionId, setTransactionId] = React.useState<string | null>(null);
  const [rechargeData, setRechargeData] = React.useState<ICutomerRecharge>({
    amout_recharged: 1,
    coin_type: "",
    account_number: "",
    image: "",
  });

  const [customerRecharge] = useMutation(MUTATION_CUSTOMER_RECHARGE);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleOpenQRModal = () => {
    setIsOpenQRModal(!isOpenQRModal);
  };

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
        title: t("_frozen_balance"),
        amount: `${totalFrozenBalance}`,
        percent: 3,
        icon: <LockIcon size={38} className="text-neon_pink" />,
      },
      {
        title: t("_total_balance"),
        amount: `${totalBalance}`,
        percent: 12,
        icon: <WithdrawIcon size={38} className="text-green-500" />,
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

      const res = await customerRecharge({
        variables: {
          data: {
            amount_recharged: rechargeData.amout_recharged,
            coin_type: rechargeData.coin_type,
            account_number: rechargeData.account_number,
            image: data.secure_url || "",
          },
        },
      });

      if (res?.data?.customerRechargeBalance.success) {
        refetch();
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
        message: "Failed to update profile. Please try again.",
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
        <TransactionHistory />
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
              <div className="flex items-start justify-start gap-2 py-2">
                <p className="text-sm">{t("_select_type")}:</p>
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
                      checked={rechargeData.coin_type === "erc20"}
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
                className="rounded bg-neon_pink text-white p-2 w-auto mt-4 text-sm"
                title={
                  isLoading ? t("_submiting_button") : t("_recharge_button")
                }
                icon={isLoading ? <Loading /> : <WithdrawIcon size={18} />}
                isFront={true}
                type="submit"
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
