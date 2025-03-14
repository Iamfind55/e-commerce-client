"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

// components
import { BackIcon } from "@/icons/page";
import { useToast } from "@/utils/toast";
import Loading from "@/components/loading";
import IconButton from "@/components/iconButton";
import { MUTATION_RESET_PASSWORD } from "@/api/auth";
import Password from "@/components/passwordTextField";
import { IPasswordWithConfirm } from "@/types/login";

export default function ResetPassword() {
  const router = useRouter();
  const t = useTranslations("customer_auth");
  const { successMessage, errorMessage } = useToast();
  const [forgotPassword] = useMutation(MUTATION_RESET_PASSWORD);
  const [token, setToken] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [passwordData, setPasswordData] = React.useState<IPasswordWithConfirm>({
    newPassword: "",
    confirmPassword: "",
  });

  const handleResetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryToken = params.get("token");
    setToken(queryToken);
  }, []);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      errorMessage({ message: "Passwords do not match!", duration: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await forgotPassword({
        variables: {
          data: {
            token: token,
            new_password: passwordData?.newPassword,
          },
        },
      });
      if (data?.shopResetPassword?.success) {
        successMessage({
          message: "Your password has been changed!",
          duration: 3000,
        });
        router.push("/signin");
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
      <div className="h-[80vh] w-full flex items-center justify-center">
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
            <h4 className="text-gray-500 font-bold">{t("_reset_password")}</h4>
          </div>
          <form action="" className="w-full pb-6" onSubmit={handleSubmitForm}>
            <Password
              required
              name="newPassword"
              id="new_password"
              color="text-gray-500"
              title={t("_new_password")}
              onChange={handleResetPassword}
              placeholder={t("_new_password_placeholder")}
            />
            <div className="w-full mt-4">
              <Password
                required
                id="confirm_assword"
                name="confirmPassword"
                color="text-gray-500 w-full"
                title={t("_confirm_password")}
                onChange={handleResetPassword}
                placeholder={t("_confirm_password_placeholder")}
              />
            </div>
            <div className="flex items-start justify-between gap-2">
              <IconButton
                className="rounded bg-gray-200 text-black p-2 w-full mt-4 text-xs italic uppercase"
                icon={<BackIcon />}
                isFront={true}
                type="button"
                title={t("_back_signin")}
                onClick={() => router.push("/signin")}
              />
              <IconButton
                className="rounded text-white text-xs p-2 bg-neon_pink w-full mt-4 italic text-xs"
                icon={isLoading ? <Loading /> : ""}
                isFront={true}
                title={isLoading ? t("_submiting_btn") : t("_new_pass_btn")}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
