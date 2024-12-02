"use client";

import { postAPI } from "@/api/api";
import IconButton from "@/components/iconButton";
import MessageHandler from "@/components/messageHandler";
import Textfield from "@/components/textField";
import { BackIcon, NextIcon, RefreshIcon } from "@/icons/page";
import { useToast } from "@/utils/toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ForgotPasword() {
  const router = useRouter();
  const [response, setResponse] = React.useState<any>(null);
  const { errorMessage } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      errorMessage({ message: "Email is required", duration: 3000 });
      return;
    }
    setIsLoading(true);
    try {
      const res = await postAPI({
        url: "/patients/forgot-password",
        body: { email: email },
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
            <h4 className="text-b_text font-bold">Forgot Password?</h4>
            <p className="text-b_text text-xs">
              Enter you email, and we will send you instructions to reset your
              password.
            </p>
            <p className="text-b_text text-xs">
              Enter email account registered on okardcare.com.
            </p>
            <p className="text-b_text text-xs">
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
              color="text-b_text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IconButton
              className="rounded text-white p-2 bg-base w-full mt-4 text-xs"
              icon={
                isLoading ? <RefreshIcon size={18} /> : <NextIcon size={22} />
              }
              isFront={isLoading ? true : false}
              title={isLoading ? "SUBMITING...." : "GET RESET LINK"}
              type="submit"
            />
            <IconButton
              className="rounded text-base p-2 w-full mt-4 italic text-sm"
              icon={<BackIcon />}
              isFront={true}
              type="button"
              title="Back to Log in"
              onClick={() => router.push("/signin")}
            />
          </form>
          {response && <MessageHandler response={response} />}
        </div>
      </div>
    </div>
  );
}
