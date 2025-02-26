"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

// components
import { NextIcon } from "@/icons/page";
import Password from "@/components/passwordTextField";
import GlobalSlider from "../../(pages)/home/slider";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";

// types and untils
import { login } from "@/redux/slice/authSlice";
import { MUTATION_SHOP_SIGN_IN } from "@/api/auth";
import { useToast } from "@/utils/toast";
import { ILogins } from "@/types/login";
import { useTranslations } from "next-intl";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("shop_sign_in");
  const { successMessage, errorMessage } = useToast();
  const [shopSignIn] = useMutation(MUTATION_SHOP_SIGN_IN);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginData, setLoginData] = React.useState<ILogins>({
    username: "",
    password: "",
  });

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
            shop_vip: res.data.shop_vip ?? false, // Fallbacks to `false` if `shop_vip` is null/undefined
            created_at: res.data.created_at || "",
          })
        );

        document.cookie = `auth_token=${data.shopLogin.data.token}; path=/; max-age=3600`;
        router.push("/client");
      } else {
        errorMessage({
          message: data.shopLogin.error?.message || "SignIn failed!",
          duration: 3000,
        });
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

  return (
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
  );
}
