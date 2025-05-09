"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client";

// components
import Password from "@/components/passwordTextField";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import { NextIcon } from "@/icons/page";

// type and untils
import { ISignups } from "@/types/signup";
import { useToast } from "@/utils/toast";

// graphql API
import { MUTATION_SHOP_REGISTER } from "@/api/auth";
import Loading from "@/components/loading";

export default function SignUp() {
  const router = useRouter();
  const t = useTranslations("shop_sign_up");
  const c = useTranslations("customer_auth");
  const { successMessage, errorMessage } = useToast();
  const [isAgree, setIsAgree] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [registerShop] = useMutation(MUTATION_SHOP_REGISTER);
  const [signupData, setSignupData] = React.useState<ISignups>({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const handleChangeSignUpData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupData.password !== confirmPassword) {
      errorMessage({ message: "Passwords do not match!", duration: 3000 });
      return;
    }
    if (!isAgree) {
      errorMessage({
        message: "Please check Agree out terms & condition!",
        duration: 3000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await registerShop({
        variables: {
          data: {
            username: signupData.username,
            fullname: signupData.fullname,
            email: signupData.email,
            password: signupData.password,
          },
        },
      });

      if (data.shopRegister.success) {
        successMessage({
          message: "Signup successful!",
          duration: 3000,
        });

        // Store the token in cookies
        // document.cookie = `auth_token=${data.shopRegister.data.token}; path=/; max-age=3600`;
        router.push("/signin");
      } else {
        errorMessage({
          message: data.shopRegister.error?.message || "Signup failed!",
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "An unexpected error occurred during signup.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setIsAgree(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-t from-gray-300 to-gray-100">
      <div className="h-screen w-full flex flex-col sm:flex-row items-center justify-center">
        <div className="w-full sm:w-2/4 bg-white text-black h-screen p-2 sm:p-6 flex items-center justify-center flex-col gap-4">
          <h1 className="text-black text-lg sm:text-title-xl2 font-normal sm:font-bold">
            {t("_sign_up")}
          </h1>
          <p className="block sm:hidden text-sm text-gray-500">
            Join TikTok Shop to get new seller perks
          </p>
          <form
            className="w-full border px-2 py-4 rounded"
            onSubmit={handleSubmitForm}
          >
            <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-1">
              <Textfield
                placeholder={t("_full_name_placeholder")}
                title={t("_full_name")}
                name="fullname"
                id="fullname"
                type="text"
                required
                onChange={handleChangeSignUpData}
              />
              <Textfield
                placeholder={t("_username_placeholder")}
                title={t("_username")}
                name="username"
                id="username"
                type="text"
                required
                onChange={handleChangeSignUpData}
              />
              <Textfield
                placeholder={t("_email_placeholder")}
                title={t("_email")}
                name="email"
                type="email"
                id="email"
                required
                onChange={handleChangeSignUpData}
              />
              <Password
                placeholder="strongPassword1@"
                title={t("_password")}
                name="password"
                id="password"
                required
                onChange={handleChangeSignUpData}
              />
              <Password
                placeholder="strongPassword1@"
                title={t("_confirm_password")}
                name="confirm_password"
                id="confirm_password"
                required
                onChange={handleConfirmPassword}
              />
              <div className="flex items-center mt-2">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2"
                  onChange={() => setIsAgree(true)}
                />
                <label
                  htmlFor="link-checkbox"
                  className="ms-2 text-sm text-gray-500"
                >
                  {t("_condition_title")}&nbsp;&nbsp;
                  <Link
                    href="/terms-condition"
                    className="text-neon_pink underline"
                  >
                    {t("_terms_and_conditions")}
                  </Link>
                </label>
              </div>
            </div>
            <br />
            <IconButton
              className={`rounded p-2 text-xs w-full mt-2 text-xs bg-neon_pink text-white cursor-pointer`}
              icon={isLoading ? <Loading /> : <NextIcon size={22} />}
              title={isLoading ? c("_submiting_btn") : t("_register_button")}
              isFront={isLoading ? true : false}
              type="submit"
              // disabled
            />
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-b_text text-sm italic">
                {t("_already_have_account")}
              </p>
              <Link
                href="/signin"
                className="font-bold underline text-neon_pink text-sm italic"
              >
                {t("_sign_in_button")}
              </Link>
            </div>
          </form>
        </div>
        <div className="h-auto sm:h-screen w-full sm:w-2/4 hidden sm:flex items-center justify-center flex-col gap-4 bg-black px-2 sm:px-6 py-4">
          <div className="w-4/5 flex items-start justify-center gap-4 sm:gap-6 flex-col">
            <h1 className="text-lg sm:text-title-medium font-bold">
              {t("_tittle1")}
            </h1>
            <h1 className="text-lg sm:text-title-medium text-neon_pink font-bold">
              {t("_tittle2")}
            </h1>
            <p className="text-md text-white">
              {t("_des1")} <br />
              {t("_des2")} <br />
              {t("_des3")}
            </p>
            <p className="text-sm text-neon_blue">{t("_des4")}</p>
            <p className="text-gray-300 text-xs">
              {t("_des5")} <br />
              {t("_des6")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
