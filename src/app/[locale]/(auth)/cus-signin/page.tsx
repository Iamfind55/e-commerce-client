"use client";

import React from "react";
import { useDispatch } from "react-redux";

// components
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import { CircleUser, NextIcon } from "@/icons/page";
import Password from "@/components/passwordTextField";
import { signIn } from "@/redux/slice/customerAuthSlice";

// utils, hooks and APIs
import { useToast } from "@/utils/toast";
import { useMutation } from "@apollo/client";
import { Link, useRouter } from "@/navigation";
import { ICustomerLogin } from "@/types/customer-auth";
import { MUTATION_CUSTOMER_LOGIN } from "@/api/customer-auth";
import Loading from "@/components/loading";
import { useTranslations } from "next-intl";

export default function CustomerLogin() {
  const s = useTranslations("shop_sign_in");
  const t = useTranslations("customer_auth");
  const router = useRouter();
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useToast();
  const [customerLogin] = useMutation(MUTATION_CUSTOMER_LOGIN);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginData, setLoginData] = React.useState<ICustomerLogin>({
    username: "",
    password: "",
  });
  const handleCustomerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = [
      { value: loginData.username, message: "Username or email is required!" },
      { value: loginData.password, message: "Password is required!" },
    ];

    for (const field of requiredFields) {
      if (!field.value) {
        errorMessage({ message: field.message, duration: 2000 });
        setIsLoading(false);
        return;
      }
    }

    try {
      const { data } = await customerLogin({
        variables: {
          where: {
            username: loginData?.username,
            password: loginData?.password,
          },
        },
      });

      if (data?.customerLogin?.success) {
        successMessage({
          message: "Login successful!",
          duration: 3000,
        });
        const res = data.customerLogin.data;
        dispatch(
          signIn({
            id: res.data.id || "",
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            username: res.data.username || "",
            email: res.data.email || "",
            phone_number: res.data.phone_number || "",
            dob: res.data.dob || "",
            image: res.data.image || "",
            status: res.data.status || "",
            created_at: res.data.created || "",
          })
        );

        document.cookie = `auth_token=${data?.customerLogin?.data?.token}; path=/; max-age=3600`;
        router.push("/customer");
      } else {
        errorMessage({
          message: data?.customerLogin?.error?.message,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "An unexpected error occurred during login.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #ffffff 50%)",
        }}
        className="h-screen bg-bg_color flex items-center justify-center"
      >
        <div className="rounded text-gray-500 w-11/12 sm:w-2/5 bg-white flex items-center justify-center flex-col gap-2 py-6 shadow-md">
          <CircleUser
            size={32}
            onClick={() => router.push("/")}
            className="cursor-pointer"
          />
          <div className="flex items-center justify-center flex-col">
            <p className="text-lg">{t("_welcome")}</p>
            <p className="text-sm">{t("_welcome_des")}</p>
          </div>
          <form action="" className="w-11/12 mt-2" onSubmit={handleSubmitForm}>
            <Textfield
              placeholder={s("_username_email_placeholder")}
              title={s("_username_email")}
              name="username"
              type="text"
              id="email"
              required
              onChange={handleCustomerLogin}
            />
            <Password
              placeholder={s("_password_placeholder")}
              title={s("_password")}
              name="password"
              id="password"
              required
              onChange={handleCustomerLogin}
            />
            <Link
              href="/cus-forgot-password"
              className="flex items-center justify-end w-full mt-2"
            >
              <i className="text-xs text-b_text cursor-pointer hover:text-base hover:underline hover:text-xs">
                {s("_forgot_password")}
              </i>
            </Link>
            <IconButton
              className="rounded text-white p-2 bg-neon_pink w-full mt-4 text-xs"
              icon={isLoading ? <Loading /> : <NextIcon size={22} />}
              isFront={isLoading ? true : false}
              title={isLoading ? s("_loging_in_button") : s("_log_in_button")}
              type="submit"
            />
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-b_text text-sm italic">{s("_not_account")}</p>
              <Link
                href="/cus-signup"
                className="font-bold underline text-neon_pink text-sm italic"
              >
                {s("_sign_up_button")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
