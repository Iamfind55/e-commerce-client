"use client";

import Image from "next/image";
import Logo from "../../../../../public/images/tiktokshop-logo.webp";
import { Link } from "@/navigation";
import {
  AppleIcon,
  CircleIcon,
  CircleUser,
  FacebookIcon,
  GoogleIcon,
  NextIcon,
} from "@/icons/page";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import Password from "@/components/passwordTextField";
import React from "react";
import { ILogins } from "@/types/login";
import { useToast } from "@/utils/toast";
import backgroundImage from "../../../../../public/images/background-image.png";

export default function CustomerLogin() {
  const [loginData, setLoginData] = React.useState<ILogins>({
    username: "",
    password: "",
  });
  const { successMessage, errorMessage } = useToast();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen bg-bg_color flex items-center justify-center"
      >
        <div className="rounded text-gray-500 w-11/12 sm:w-1/4 bg-white flex items-center justify-center flex-col gap-2 py-6">
          <CircleUser size={32} />
          <div className="flex items-center justify-center flex-col">
            <p className="text-lg">WELCOME</p>
            <p className="text-sm">Login to your account</p>
          </div>
          <form action="" className="w-11/12 mt-2" onSubmit={handleSubmitForm}>
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
                <FacebookIcon size={14} />
              </div>
              <div className="border rounded-full p-2 cursor-pointer hover:border-neon_pink text-b_text hover:text-neon_pink">
                <GoogleIcon size={18} />
              </div>
              <div className="border rounded-full p-2 cursor-pointer hover:border-neon_pink text-b_text hover:text-neon_pink">
                <AppleIcon size={16} />
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
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
