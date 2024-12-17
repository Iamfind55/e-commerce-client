"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "@apollo/client";

// APIs
import { FORGOT_PASSWORD } from "@/api/auth";

// components and untils
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import { BackIcon, NextIcon, RefreshIcon } from "@/icons/page";
import ForgotImage from "../../../../../public/images/forgot-password.svg";

export default function ForgotPasword() {
  const router = useRouter();
  const { successMessage, errorMessage } = useToast();
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);
  const [email, setEmail] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

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
        successMessage({
          message: "Please check your email for reset password!!",
          duration: 3000,
        });
        router.push("/reset-password");
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
        <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto sm:h-full flex items-center justify-start flex-col gap-3 p-4 sm:p-10 rounded">
          <Link href="/">
            <Image
              className="rounded-full"
              src={ForgotImage}
              alt=""
              width={200}
              height={200}
            />
          </Link>
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <h4 className="text-gray-500 font-bold">Forgot Password?</h4>
            <p className="text-gray-500 text-xs">
              Enter you email, and we will send you instructions to reset your
              password.
            </p>
            <p className="text-gray-500 text-xs">
              Enter email account registered on tiktokshop.online
            </p>
            <p className="text-gray-500 text-xs">
              Check message on your email account.
            </p>
          </div>
          <form action="" className="w-full" onSubmit={handleSubmitForm}>
            <Textfield
              name="email"
              placeholder="Email...."
              id="email"
              title="Email"
              required
              color="text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IconButton
              className="rounded text-white p-2 bg-neon_blue w-full mt-4 text-xs"
              title={isLoading ? "SUBMITING...." : "GET RESET LINK"}
              type="submit"
            />
            <IconButton
              className="rounded text-neon_pink p-2 w-full mt-4 italic text-sm"
              icon={<BackIcon />}
              isFront={true}
              type="button"
              title="Sign In"
              onClick={() => router.push("/signin")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
