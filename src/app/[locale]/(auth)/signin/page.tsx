"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

// components
import {
  CheckCircleIcon,
  CopyIcon,
  DepositIcon,
  MinusIcon,
  NextIcon,
  PlusIcon,
  TelegramIcon,
  TrashIcon,
} from "@/icons/page";
import Password from "@/components/passwordTextField";
import GlobalSlider from "../../(pages)/home/slider";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";

// types and untils
import { login } from "@/redux/slice/authSlice";
import {
  MUTATION_SHOP_RECHARGE_WITHOUT_LOGIN,
  MUTATION_SHOP_SIGN_IN,
} from "@/api/auth";
import { useToast } from "@/utils/toast";
import { ILogins } from "@/types/login";
import { useTranslations } from "next-intl";
import Select from "@/components/select";
import { coin_type } from "@/utils/option";
import MyModal from "@/components/modal";
import { IRecharge } from "@/types/wallet";
import Image from "next/image";
import Loading from "@/components/loading";

interface CloudinaryResponse {
  secure_url?: string;
}

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const m = useTranslations("my_wallet");
  const t = useTranslations("shop_sign_in");
  const c = useTranslations("contact_page");
  const { successMessage, errorMessage } = useToast();
  const [shopSignIn] = useMutation(MUTATION_SHOP_SIGN_IN);
  const [cover, setCover] = React.useState<File | null>(null);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [isTopup, setIsTopup] = React.useState<boolean>(false);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const [shopRechargeWithoutLogin] = useMutation(
    MUTATION_SHOP_RECHARGE_WITHOUT_LOGIN
  );

  const [loginData, setLoginData] = React.useState<ILogins>({
    username: "",
    password: "",
  });

  const [rechargeData, setRechargeData] = React.useState<IRecharge>({
    amount_recharged: 1,
    coin_type: "ERC20",
    account_number: "",
    image: "",
  });

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

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!loginData.username) {
      errorMessage({
        message: "Username or email is required!",
        duration: 2000,
      });
      setIsLoading(false);
      return;
    }
    if (!loginData.password) {
      errorMessage({
        message: "Password is required!",
        duration: 2000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await shopSignIn({
        variables: {
          where: {
            username: loginData?.username,
            password: loginData?.password,
          },
        },
      });

      if (data.shopLogin.success) {
        successMessage({
          message: "Login successful!",
          duration: 3000,
        });
        const res = data.shopLogin.data;

        dispatch(
          login({
            id: res.data.id || "",
            fullname: res.data.fullname || "",
            username: res.data.username || "",
            phone_number: res.data.phone_number || "",
            email: res.data.email || "",
            dob: res.data.dob || "",
            remark: res.data.remark || "",
            shop_address: res.data.shop_address || "",
            image: {
              logo: res.data.image?.logo || "",
              cover: res.data.image?.cover || "",
            },
            id_card_info: {
              id_card_number: res.data.id_card_info.id_card_number || "",
              id_card_image_front:
                res.data.id_card_info.id_card_image_front || "",
              id_card_image_back:
                res.data.id_card_info.id_card_image_back || "",
              id_card_image: res.data.id_card_info.id_card_image || "",
            },
            payment_method:
              res?.data?.payment_method?.map((method: any) => ({
                id: method.id || "",
                bank_name: method.bank_name || "",
                code: method.code || "",
                bank_account_name: method.bank_account_name || "",
                bank_account_number: method.bank_account_number || "",
              })) || [],
            status: res.data.status || "",
            store_name: res.data.store_name || "",
            shop_vip: res.data.shop_vip || 0, // Fallbacks to `false` if `shop_vip` is null/undefined
            created_at: res.data.created_at || "",
          })
        );

        document.cookie = `auth_token=${data.shopLogin.data.token}; path=/; max-age=3600`;
        router.push("/client");
      } else {
        if (data?.shopLogin.error?.details.status === "INACTIVE") {
          handleOpenModal();
        } else {
          errorMessage({
            message: data.shopLogin.error?.message || "SignIn failed!",
            duration: 3000,
          });
        }
      }
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const sliderImages = [
    {
      id: "1",
      image:
        "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860058/login-image-01_oeytev.png",
      name: "Slider Image 1",
    },
    {
      id: "2",
      image:
        "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860058/login-image-02_rkedzx.png",
      name: "Slider Image 2",
    },
    {
      id: "3",
      image:
        "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860058/login-image-03_vil9am.png",
      name: "Slider Image 3",
    },
  ];

  const sliderTexts = [
    {
      title: t("_title1"),
      description: t("_des1"),
    },
    {
      title: t("_title2"),
      description: t("_des3"),
    },
    {
      title: t("_title1"),
      description: t("_des3"),
    },
  ];

  const handleRecharge = async (e: React.FormEvent) => {
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

      const res = await shopRechargeWithoutLogin({
        variables: {
          data: {
            amount_recharged: rechargeData.amount_recharged,
            coin_type: rechargeData.coin_type,
            account_number: rechargeData.account_number,
            image: data.secure_url || "",
            email: loginData.username,
          },
        },
      });

      if (res?.data?.shopRechargeBalanceWithInactiveStatus.success) {
        setIsTopup(true);
        successMessage({
          message: "Recharge successfull!",
          duration: 3000,
        });
      } else {
        errorMessage({
          message:
            res?.data?.shopRechargeBalanceWithInactiveStatus?.error?.details,
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

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="h-screen w-full flex items-center justify-between">
          <div className="w-2/4 h-screen hidden sm:flex items-center justify-center px-6">
            <div className="w-4/5">
              <GlobalSlider
                images={sliderImages}
                height="h-[70vh]"
                slidePerview={1}
                text={sliderTexts}
                hasText={true}
                pagination={true}
              />
            </div>
          </div>
          <div className="w-full sm:w-2/4 bg-black text-black h-screen p-0 sm:p-6 flex items-center justify-center flex-col gap-6">
            <h1 className="text-white text-title-xl2">{t("_sign_in")}</h1>
            <form action="" className="w-4/5" onSubmit={handleSubmitForm}>
              <Textfield
                placeholder={t("_username_email_placeholder")}
                title={t("_username_email")}
                name="username"
                type="text"
                id="email"
                required
                onChange={handleLogin}
              />
              <Password
                placeholder={t("_password_placeholder")}
                title={t("_password")}
                name="password"
                id="password"
                required
                onChange={handleLogin}
              />
              <Link
                href="/forgot-password"
                className="flex items-center justify-end w-full mt-2"
              >
                <i className="text-xs text-white cursor-pointer hover:text-base hover:underline hover:text-xs">
                  {t("_forgot_password")}
                </i>
              </Link>
              <IconButton
                className="rounded text-white p-2 bg-neon_pink w-full mt-4 text-xs"
                icon={isLoading ? "" : <NextIcon size={22} />}
                isFront={isLoading ? true : false}
                title={isLoading ? t("_loging_in_button") : t("_log_in_button")}
                type="submit"
              />
              <div className="flex items-center justify-center gap-4 mt-4">
                <p className="text-white text-sm italic">{t("_not_account")}</p>
                <Link
                  href="/signup"
                  className="font-bold underline text-neon_pink text-sm italic"
                >
                  {t("_sign_up_button")}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <MyModal
        isOpen={isOpenModal}
        onClose={() => {}}
        className="border fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-2/4 md:inset-0 h-auto shadow"
      >
        <div className="w-full rounded bg-white w-full text-gray-500">
          {isTopup && (
            <form
              className="w-full bg-white rounded flex items-start justify-start flex-col p-4"
              onSubmit={handleRecharge}
            >
              <p className="text-md font-medium">
                Your account has been Banned to continue please:{" "}
                {m("_top_up_title")}:
              </p>
              <div className="w-full rounded-md border-gray-200 flex items-start justify-start flex-col gap-2 py-2 px-2">
                <div className="flex items-center justify-center gap-2 py-2">
                  <p className="text-sm">{m("_select_type")}wwww:</p>
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
                <div className="w-full flex items-center justify-between gap-4">
                  <p className="text-sm w-auto">{m("_amount")}:</p>
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
                      <span className="font-medium">Error!</span>{" "}
                      {errorMessages}!
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
                    <p className="text-black text-sm">1.00</p>
                  </div>
                  <p className="text-xs mt-4">{m("_account_address")}:</p>
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
                  className="rounded border border-neon_pink text-neon_pink p-2 w-auto mt-4 text-sm hover:bg-neon_pink hover:text-white"
                  title={
                    isLoading ? m("_submiting_button") : m("_recharge_button")
                  }
                  icon={isLoading ? <Loading /> : <DepositIcon size={18} />}
                  isFront={true}
                  type="submit"
                />
              </div>
            </form>
          )}

          <div className="border w-full p-0 rounded mt-4">
            <a
              href="https://t.me/Tiktokshop24h_online"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center flex-col rounded py-2 text-gray-500 mt-2 cursor-pointer"
            >
              <h3 className="font-large text-black">{c("_contact_us")}</h3>
              <div className="rounded-md bg-white flex items-start justify-between px-6 py-2">
                <div className="bg-blue-500 p-3 rounded-full">
                  <TelegramIcon size={28} className="text-white" />
                </div>
                <div className="flex flex-col items-start justify-center ml-2 gap-2">
                  <p className="text-md text-black">Telegram</p>
                  <p className="text-xs">{c("_description")}</p>
                </div>
              </div>
            </a>
            <div className="flex items-center justify-center flex-col text-gray-500 cursor-pointer">
              <div className="w-auto sm:w-2/5 bg-white text-center px-4 pb-4 rounded">
                <p className="text-sm text-gray-500">
                  Email:&nbsp;
                  <Link
                    href="mailto:info@tiktokshop.online"
                    className="underline hover:text-neon_pink"
                  >
                    info@tiktokshop.online
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </MyModal>
    </>
  );
}
