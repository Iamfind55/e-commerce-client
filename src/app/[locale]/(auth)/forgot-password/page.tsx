"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@apollo/client";

// APIs
import { MUTATION_FORGOT_PASSWORD } from "@/api/auth";

// components and untils
import { BackIcon, CheckCircleIcon } from "@/icons/page";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";

export default function ForgotPasword() {
  const router = useRouter();
  const g = useTranslations("global");
  const t = useTranslations("customer_auth");
  const { successMessage, errorMessage } = useToast();
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const [forgotPassword] = useMutation(MUTATION_FORGOT_PASSWORD);

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
      if (data?.shopForgotPassword?.success) {
        setIsSuccess(true);
        successMessage({
          message: "Please check your email for reset password!!",
          duration: 3000,
        });
      } else {
        errorMessage({
          message: data?.shopForgotPassword?.error.message,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Sorry, Unexpected error happen!",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-t from-gray-300 to-gray-100">
      <div className="h-[80vh] w-full flex items-center justify-center">
        {isSuccess ? (
          <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto flex items-center justify-center flex-col gap-3 p-4 sm:p-10 rounded">
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
              title={"GO TO RESET"}
              onClick={() => router.push("/reset-password")}
              className="rounded text-white bg-neon_pink p-2 w-auto mt-4 text-sm border"
            />
          </div>
        ) : (
          <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto flex items-center justify-start flex-col gap-3 p-4 sm:p-10 rounded">
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
            <form action="" className="w-full" onSubmit={handleSubmitForm}>
              <Textfield
                name="email"
                placeholder={g("_email_placeholder")}
                id="email"
                title={g("_email")}
                required
                color="text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex items-start justify-between gap-2">
                <IconButton
                  type="button"
                  isFront={true}
                  title={t("_back_signin")}
                  icon={<BackIcon />}
                  onClick={() => router.push("/signin")}
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
