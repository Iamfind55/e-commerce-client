"use client";

import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

// components
import { AppleIcon, FacebookIcon, GoogleIcon, NextIcon } from "@/icons/page";
import Password from "@/components/passwordTextField";
import GlobalSlider from "../../(pages)/home/slider";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";

// types and untils
import { login } from "@/redux/slice/authSlice";
import { MUTATION_SHOP_SIGN_IN } from "@/api/auth";
import { useToast } from "@/utils/toast";
import { ILogins } from "@/types/login";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
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
            image: {
              logo: res.data.image?.logo || "",
              cover: res.data.image?.cover || "",
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
    { id: "1", image: "/images/login-image-01.webp", name: "Slider Image 1" },
    { id: "2", image: "/images/login-image-02.webp", name: "Slider Image 2" },
    { id: "3", image: "/images/login-image-03.webp", name: "Slider Image 3" },
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
              height="h-[70vh]"
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
              placeholder="Enter username or email...."
              title="Username or email"
              name="username"
              type="text"
              id="email"
              required
              onChange={handleLogin}
            />
            <Password
              placeholder="Enter password...."
              title="Password"
              name="password"
              id="password"
              required
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
            <div className="text-gray-500 text-sm flex items-center justify-center gap-4 mt-4 italic">
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
        </div>
      </div>
    </div>
  );
}
