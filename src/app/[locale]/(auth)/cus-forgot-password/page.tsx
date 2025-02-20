"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@apollo/client";

// APIs
import { MUTATION_CUSTOMER_FORGOT_PASSWORD } from "@/api/customer-auth";

// components and untils
import { BackIcon, CheckCircleIcon } from "@/icons/page";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";

export default function CustomerForgotPasword() {
  const router = useRouter();
  const t = useTranslations("customer_auth");
  const g = useTranslations("global");
  const { successMessage, errorMessage } = useToast();
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [forgotPassword] = useMutation(MUTATION_CUSTOMER_FORGOT_PASSWORD);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      errorMessage({ message: "Email is required", duration: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await forgotPassword({
        variables: {
          email: email,
        },
      });
      if (data?.customerForgotPassword?.success) {
        setIsSuccess(true);
        successMessage({
          message: "Please check your email for reset password!!",
          duration: 3000,
        });
      } else {
        errorMessage({
          message: data?.customerForgotPassword?.error?.details,
          duration: 3000,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-t from-gray-300 to-gray-100">
      <div className="h-auto w-full flex items-center justify-center">
        {isSuccess ? (
          <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto sm:h-full flex items-center justify-center flex-col gap-3 p-4 sm:p-10 rounded">
            <div className="p-2 rounded-full bg-green-300 border border-gray-200">
              <CheckCircleIcon size={32} className="text-white" />
            </div>
            <div className="flex items-center justify-center flex-col gap-2 w-full">
              <h4 className="text-gray-500 font-bold text-md">
                {t("_success")}
              </h4>
              <p className="text-gray-500 text-sm">
                {t("_forgot_success_title")}
              </p>
              <p className="text-gray-500 text-sm">{t("_warm_message")}</p>
            </div>
            <IconButton
              type="button"
              title={t("_back_signin")}
              onClick={() => router.push("/cus-signin")}
              className="rounded text-gray-500 p-2 w-full mt-4 italic text-sm border"
            />
          </div>
        ) : (
          <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto sm:h-full flex items-center justify-start flex-col gap-3 p-4 rounded">
            <Link href="/">
              <Image
                className="rounded-full"
                src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/forgot-password_qszlno.svg"
                alt=""
                width={120}
                height={120}
              />
            </Link>
            <div className="flex items-start justify-start flex-col gap-2 w-full">
              <h4 className="text-gray-500 font-bold">
                {t("_forgot_password")}
              </h4>
              <p className="text-gray-500 text-xs">{t("_forgot_des1")}</p>
              <p className="text-gray-500 text-xs">{t("_forgot_des2")}</p>
            </div>
            <form
              action=""
              className="w-full mb-2 sm:mb-8"
              onSubmit={handleSubmitForm}
            >
              <Textfield
                required
                id="email"
                name="email"
                title={g("_email")}
                color="text-gray-500"
                placeholder={g("_email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex items-start justify-between gap-2">
                <IconButton
                  type="button"
                  isFront={true}
                  title={t("_back_signin")}
                  icon={<BackIcon />}
                  onClick={() => router.push("/cus-signin")}
                  className="rounded bg-gray-200 text-black p-2 w-full mt-4 italic text-xs uppercase"
                />
                <IconButton
                  type="submit"
                  icon={isLoading ? <Loading /> : ""}
                  isFront={true}
                  title={isLoading ? t("_submiting_btn") : t("_reset_link_btn")}
                  className="rounded text-white p-2 bg-neon_pink w-full mt-4 text-xs"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
