"use client";

import { updateAPI } from "@/api/api";
import IconButton from "@/components/iconButton";
import MessageHandler from "@/components/messageHandler";
import Password from "@/components/passwordTextField";
import {
  BackIcon,
  CheckCircleIcon,
  CircleIcon,
  NextIcon,
  RefreshIcon,
} from "@/icons/page";
import { IPasswordWithConfirm } from "@/types/profile";
import { useToast } from "@/utils/toast";
import { validatePassword } from "@/utils/validatePassword";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ResetPassword() {
  const router = useRouter();
  const [response, setResponse] = React.useState<any>(null);
  const { errorMessage } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [passwordData, setPasswordData] = React.useState<IPasswordWithConfirm>({
    newPassword: "",
    confirmPassword: "",
  });

  const [validationResult, setValidationResult] = React.useState({
    isValid: false,
    hasUppercase: false,
    hasNumberSymbolOrWhitespace: false,
    isLongEnough: false,
  });

  const handleResetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    if (e.target.name === "newPassword") {
      const result = validatePassword(e.target.value);
      setValidationResult(result);
    }
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
    if (!validationResult.isValid) {
      errorMessage({
        message: "Password does not meet the requirements!",
        duration: 3000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const res = await updateAPI({
        url: "/patients/" + token + "/reset-password",
        body: { newPassword: passwordData?.newPassword },
      });
      setResponse(res);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-t from-gray-300 to-gray-100"
      // style={{ backgroundImage: "url('/images/auth-bg.png')" }}
    >
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto sm:h-full flex items-center justify-start flex-col gap-3 p-4 sm:p-10 rounded">
          <Link href="/">
            <Image
              className="rounded-full"
              src="/images/okardcare-hori-logo.png"
              alt=""
              width={200}
              height={250}
            />
          </Link>
          <div className="flex items-start justify-start flex-col gap-2 w-full">
            <h4 className="text-b_text font-bold">Reset Password?</h4>
          </div>
          <form action="" className="w-full" onSubmit={handleSubmitForm}>
            <Password
              name="newPassword"
              id="new_password"
              title="New Password"
              required
              color="text-b_text"
              onChange={handleResetPassword}
            />
            <br />
            <Password
              name="confirmPassword"
              id="confirm_assword"
              title="Confirm Password"
              required
              color="text-b_text w-full"
              onChange={handleResetPassword}
            />
            <div className="flex items-start justify-center flex-col gap-2 my-4">
              <div className="flex items-center justify-start gap-2">
                {validationResult.isLongEnough ? (
                  <CheckCircleIcon size={16} className="text-base" />
                ) : (
                  <CircleIcon size={14} className="text-b_text" />
                )}
                <p className="text-b_text text-xs">
                  Minimum 8 character long-the more, the better
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                {validationResult.hasUppercase ? (
                  <CheckCircleIcon size={16} className="text-base" />
                ) : (
                  <CircleIcon size={14} className="text-b_text" />
                )}
                <p className="text-b_text text-xs">
                  At least one upper character
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                {validationResult.hasNumberSymbolOrWhitespace ? (
                  <CheckCircleIcon size={16} className="text-base" />
                ) : (
                  <CircleIcon size={14} className="text-b_text" />
                )}
                <p className="text-b_text text-xs">
                  At least one number, symbol, or whitespace character
                </p>
              </div>
            </div>
            <IconButton
              className="rounded text-white text-xs p-2 bg-base w-full mt-4 italic text-xs"
              icon={
                isLoading ? <RefreshIcon size={18} /> : <NextIcon size={22} />
              }
              isFront={isLoading ? true : false}
              title={isLoading ? "SUBMITING...." : "SET NEW PASSWORD"}
              type="submit"
            />
            <IconButton
              className="rounded text-base p-2 w-full mt-4 text-sm italic"
              icon={<BackIcon />}
              isFront={true}
              type="button"
              title="Back to Sign In"
              onClick={() => router.push("/signin")}
            />
          </form>
          {response && <MessageHandler response={response} />}
        </div>
      </div>
    </div>
  );
}
