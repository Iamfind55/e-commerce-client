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

export default function CustomerForgotPasword() {
  const router = useRouter();
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
      <div className="h-[80vh] w-full flex items-center justify-center">
        {isSuccess ? (
          <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto sm:h-full flex items-center justify-center flex-col gap-3 p-4 sm:p-10 rounded">
            <div className="p-2 rounded-full bg-green-300 border border-gray-200">
              <CheckCircleIcon size={32} className="text-white" />
            </div>
            <div className="flex items-center justify-center flex-col gap-2 w-full">
              <h4 className="text-gray-500 font-bold text-md">Success!</h4>
              <p className="text-gray-500 text-sm">
                A reset password link has been sent to your email address
              </p>
              <p className="text-gray-500 text-sm">
                Please check your inbox to proceed.
              </p>
            </div>
            <IconButton
              type="button"
              title="Back Sign In"
              onClick={() => router.push("/customer-signin")}
              className="rounded text-gray-500 p-2 w-full mt-4 italic text-sm border"
            />
          </div>
        ) : (
          <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto sm:h-full flex items-center justify-start flex-col gap-3 p-4 sm:p-10 rounded">
            <Link href="/">
              <Image
                className="rounded-full"
                src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/forgot-password_qszlno.svg"
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
            </div>
            <form action="" className="w-full" onSubmit={handleSubmitForm}>
              <Textfield
                required
                id="email"
                name="email"
                title="Email"
                color="text-gray-500"
                placeholder="Enter your email...."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <IconButton
                type="submit"
                title={isLoading ? "SUBMITING...." : "GET RESET LINK"}
                className="rounded text-white p-2 bg-neon_blue w-full mt-4 text-xs"
              />
              <IconButton
                type="button"
                isFront={true}
                title="Sign In"
                icon={<BackIcon />}
                onClick={() => router.push("/customer-signin")}
                className="rounded text-neon_pink p-2 w-full mt-4 italic text-sm"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
