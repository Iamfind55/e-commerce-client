"use client";

import React from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function SignUp() {
  const router = useRouter();
  const { successMessage, errorMessage } = useToast();
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
        document.cookie = `auth_token=${data.shopRegister.data.token}; path=/; max-age=3600`;
        router.push("/client");
      } else {
        errorMessage({
          message: data.shopRegister.error?.message || "Signup failed!",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      errorMessage({
        message: "An unexpected error occurred during signup.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-t from-gray-300 to-gray-100">
      <div className="h-screen w-full flex flex-col sm:flex-row items-center justify-center">
        <div className="w-full sm:w-2/4 bg-white text-black h-screen py-4 sm:p-6 flex items-center justify-center flex-col gap-6">
          <h1 className="text-black text-lg sm:text-title-xl2 font-normal sm:font-bold">
            Sign up
          </h1>
          <form className="w-4/5" onSubmit={handleSubmitForm}>
            <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-1">
              <Textfield
                placeholder="Enter your full name...."
                title="Full name"
                name="fullname"
                id="fullname"
                type="text"
                required
                onChange={handleChangeSignUpData}
              />
              <Textfield
                placeholder="Enter username...."
                title="Username"
                name="username"
                id="username"
                type="text"
                required
                onChange={handleChangeSignUpData}
              />
              <Textfield
                placeholder="Enter email address...."
                title="Email"
                name="email"
                type="email"
                id="email"
                required
                onChange={handleChangeSignUpData}
              />
              <Password
                placeholder="strongPassword1@"
                title="Password"
                name="password"
                id="password"
                required
                onChange={handleChangeSignUpData}
              />
              <Password
                placeholder="strongPassword1@"
                title="Confirm password"
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
                />
                <label
                  htmlFor="link-checkbox"
                  className="ms-2 text-sm text-gray-500"
                >
                  By registering, you agree to our&nbsp;&nbsp;
                  <Link
                    href="/terms-condition"
                    className="text-neon_pink underline"
                  >
                    Terms and conditions
                  </Link>
                </label>
              </div>
            </div>
            <br />
            <IconButton
              className={`rounded p-2 text-xs w-full mt-2 text-xs bg-neon_pink text-white cursor-pointer`}
              icon={<NextIcon size={22} />}
              title="REGISTER"
              type="submit"
            />
            <div className="flex items-center justify-center gap-4 mt-4">
              <p className="text-b_text text-sm italic">
                Already have an account?
              </p>
              <Link
                href="/signin"
                className="font-bold underline text-neon_pink text-sm italic"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
        <div className="h-auto sm:h-screen w-full sm:w-2/4 hidden sm:flex items-center justify-center flex-col gap-4 bg-black px-2 sm:px-6 py-4">
          <div className="w-4/5 flex items-start justify-center gap-4 sm:gap-6 flex-col">
            <h1 className="text-lg sm:text-title-medium font-bold">
              Drive more sales and
            </h1>
            <h1 className="text-lg sm:text-title-medium text-neon_pink font-bold">
              grow with TikTok Shop.
            </h1>
            <p className="text-md text-white">
              TikTok Shop is a one-stop e-commerce solution for <br /> driving
              brand growth and sales directly on TikTok, where <br />
              entertainment becomes shoppable.
            </p>
            <p className="text-sm text-neon_blue">
              70% of TikTok users discover new brands and products on TikTok.*
            </p>
            <p className="text-gray-300 text-xs">
              *Source: TikTok Marketing Science Global Retail Path to Purchase
              (US Results) conducted by <br />
              Material August 2020.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
