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
import GlobalSlider from "../../(pages)/home/slider";
import sliderImage01 from "/public/images/login-image-01.webp";
import sliderImage02 from "/public/images/login-image-02.webp";
import sliderImage03 from "/public/images/login-image-03.webp";

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

  const sliderImages = [
    { src: sliderImage01, alt: "Slider Image 1" },
    { src: sliderImage02, alt: "Slider Image 2" },
    { src: sliderImage03, alt: "Slider Image 3" },
  ];

  const sliderTexts = [
    {
      title: "Tap into a massive buyer network",
      description:
        "Develop a lasting relationship with an exploding community of users already talking about your products on TikTok.",
    },
    {
      title: "Access to scaleable ecosystems",
      description:
        "Support your business no matter the size. From product upload, logistics to post-sale management, you'll find the tools you need to grow.",
    },
    {
      title: "Discover real-time insights",
      description:
        "Get instant access to real-time insights into your store's performance, including sales data, customer behavior, and more.",
    },
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-t from-gray-300 to-gray-100">
      <div className="h-screen w-full flex items-center justify-between">
        <div className="w-2/4 h-screen hidden sm:flex items-center justify-center px-6">
          <div className="w-4/5">
            <GlobalSlider
              images={sliderImages}
              height="h-[50vh]"
              slidePerview={1}
              text={sliderTexts}
              hasText={true}
              pagination={true}
            />
          </div>
        </div>
        <div className="w-full sm:w-2/4 bg-white text-black h-screen p-0 sm:p-6 flex items-center justify-center flex-col gap-6">
          <h1 className="text-black text-title-xl2">Sign in</h1>
          <form action="" className="w-4/5" onSubmit={handleSubmitForm}>
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
              className="rounded text-white p-2 bg-neon_pink w-full mt-4 text-xs"
              icon={isLoading ? "" : <NextIcon size={22} />}
              isFront={isLoading ? true : false}
              title={isLoading ? "LOGING...." : "LOG IN"}
              type="submit"
            />
            <div className="text-gray_color text-sm flex items-center justify-center gap-4 mt-4 italic">
              ----- OR -----
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 mb-6">
              <div className="border rounded-full p-2 cursor-pointer hover:border-neon_pink text-b_text hover:text-neon_pink">
                <FacebookIcon size={18} />
              </div>
              <div className="border rounded-full p-2 cursor-pointer hover:border-neon_pink text-b_text hover:text-neon_pink">
                <GoogleIcon size={22} />
              </div>
              <div className="border rounded-full p-2 cursor-pointer hover:border-neon_pink text-b_text hover:text-neon_pink">
                <AppleIcon size={18} />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-b_text text-sm italic">
                Do not have an account yet?
              </p>
              <Link
                href="/signup"
                className="font-bold underline text-neon_pink text-sm italic"
              >
                Sign up now
              </Link>
            </div>
          </form>
          {response && <MessageHandler response={response} />}
        </div>
      </div>
    </div>
  );
}
