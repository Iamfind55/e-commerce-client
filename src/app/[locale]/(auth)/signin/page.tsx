"use client";

import React from "react";
import { useRouter } from "next/navigation";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import { AppleIcon, FacebookIcon, GoogleIcon, NextIcon } from "@/icons/page";
import Link from "next/link";
import { ILogins, ITokens } from "@/types/login";
import { ActionLogin } from "@/api/auth";
import { useToast } from "@/utils/toast";
import { queryData } from "@/api/api";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slice/authSlice";
import Password from "@/components/passwordTextField";
import MessageHandler from "@/components/messageHandler";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { errorMessage } = useToast();
  const [response, setResponse] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginData, setLoginData] = React.useState<ILogins>({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const queryUserData = async () => {
    try {
      const res = await queryData({ url: "/patients/me" });
      if (res?.status === 200) {
        const data = res?.data;
        dispatch(
          login({
            address: data?.address,
            balance: data?.balance,
            email: data?.email,
            firstName: data?.firstName,
            gender: data?.gender,
            id: data?.id,
            lastName: data?.lastName,
            password: data?.password,
            phone: data?.phone,
            profile: data?.profile,
            status: data?.status,
            createdAt: data?.createdAt,
            createdBy: data?.createdBy,
            updatedAt: data?.updatedAt,
            dob: data?.dob,
          })
        );
      } else {
        errorMessage({ message: "Something went wrong", duration: 3000 });
      }
    } catch (error) {
      errorMessage({ message: "Something went wrong", duration: 3000 });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!loginData.email) {
      errorMessage({
        message: "Email is required!",
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
      const res: ITokens = await ActionLogin(loginData);
      setResponse(res);
      if (res.status === 200) {
        queryUserData();
        router.push("/client");
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
        <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto sm:h-full flex items-center justify-center flex-col gap-3 p-4 sm:p-10 rounded">
          <Link href="/">
            <Image
              className="rounded-full cursor-pointer"
              src="/images/okardcare-hori-logo.png"
              alt=""
              width={200}
              height={250}
              onClick={() => router.push("/")}
            />
          </Link>
          <form action="" className="w-full" onSubmit={handleSubmitForm}>
            <Textfield
              name="email"
              placeholder="Email...."
              id="email"
              title="Email"
              required
              color="text-b_text"
              type="text"
              onChange={handleLogin}
            />
            <Password
              name="password"
              id="password"
              title="Password"
              placeholder="Enter password...."
              required
              color="text-b_text"
              onChange={handleLogin}
            />
            <Link
              href="/forgot-password"
              className="flex items-center justify-end w-full mt-2"
            >
              <i className="text-xs text-b_text cursor-pointer hover:text-base hover:underline hover:text-xs">
                Forgot password?
              </i>
            </Link>
            <IconButton
              className="rounded text-white p-2 bg-base w-full mt-4 text-xs"
              icon={isLoading ? "" : <NextIcon size={22} />}
              isFront={isLoading ? true : false}
              title={isLoading ? "LOGING...." : "LOG IN"}
              type="submit"
            />
            <div className="text-gray_color text-sm flex items-center justify-center gap-4 mt-4 italic">
              ----- OR -----
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 mb-6">
              <div className="border rounded-full p-2 cursor-pointer hover:border-base text-b_text hover:text-base">
                <FacebookIcon size={18} />
              </div>
              <div className="border rounded-full p-2 cursor-pointer hover:border-base text-b_text hover:text-base">
                <GoogleIcon size={22} />
              </div>
              <div className="border rounded-full p-2 cursor-pointer hover:border-base text-b_text hover:text-base">
                <AppleIcon size={18} />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-b_text text-sm italic">
                Do not have an account yet?
              </p>
              <Link
                href="/signup"
                className="font-bold underline text-base text-sm italic"
              >
                Sign Up
              </Link>
            </div>
          </form>
          {response && <MessageHandler response={response} />}
        </div>
      </div>
    </div>
  );
}
