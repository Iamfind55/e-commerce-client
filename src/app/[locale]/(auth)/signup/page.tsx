"use client";

import { useRouter } from "next/navigation";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import {
  AppleIcon,
  CheckCircleIcon,
  CircleIcon,
  FacebookIcon,
  GoogleIcon,
  NextIcon,
} from "@/icons/page";
import Link from "next/link";
import React from "react";
import { ISignups } from "@/types/signup";
import { ActionSignUp } from "@/api/auth";
import { ITokens } from "@/types/login";
import { useToast } from "@/utils/toast";
import { validatePassword } from "@/utils/validatePassword";
import Password from "@/components/passwordTextField";
import Image from "next/image";

export default function SignUp() {
  const router = useRouter();
  const { successMessage, errorMessage } = useToast();
  const [signupData, setSignupData] = React.useState<ISignups>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const [validationResult, setValidationResult] = React.useState({
    isValid: false,
    hasUppercase: false,
    hasNumberSymbolOrWhitespace: false,
    isLongEnough: false,
  });

  const handleSignUp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      const result = validatePassword(e.target.value);
      setValidationResult(result);
    }
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

    if (!validationResult.isValid) {
      errorMessage({
        message: "Password does not meet the requirements!",
        duration: 3000,
      });
      return;
    }

    ActionSignUp(signupData).then((res: ITokens) => {
      try {
        if (res.status === 400) {
          errorMessage({ message: res?.message, duration: 2000 });
        }
        if (res.status === 408) {
          errorMessage({ message: res?.message, duration: 2000 });
        }
        if (res.status === 201) {
          successMessage({ message: "Register successful!", duration: 500 });
          router.push("/signin");
        }
      } catch (error) {
        if (error instanceof Error) {
          errorMessage({ message: error.message, duration: 3000 });
        }
      }
    });
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-t from-gray-300 to-gray-100"
      // style={{ backgroundImage: "url('/images/auth-bg.png')" }}
    >
      <div className="h-[90vh] w-full flex items-center justify-center">
        <div className="bg-white w-11/12 sm:w-2/5 md:w-4/5 lg:w-2/5 h-auto flex items-center justify-center flex-col gap-3 border p-2 sm:p-6 rounded overflow-y-scroll max-h-screen">
          <Link href="/">
            <Image
              className="rounded-full cursor-pointer"
              src="/images/okardcare-hori-logo.png"
              alt=""
              width={150}
              height={200}
              onClick={() => router.push("/")}
            />
          </Link>
          <form className="w-full" onSubmit={handleSubmitForm}>
            <div className="w-full grid grid-cols-2 gap-2 lg:grid-cols-2">
              <Textfield
                name="firstName"
                placeholder="Enter first name...."
                id="firstName"
                title="First name"
                required
                color="text-b_text"
                onChange={handleSignUp}
              />
              <Textfield
                name="lastName"
                placeholder="Enter last name...."
                id="lastName"
                title="Last name"
                required
                color="text-b_text"
                onChange={handleSignUp}
              />
              <Textfield
                name="phone"
                placeholder="Enter phone number...."
                id="phone"
                title="Phone number"
                required
                color="text-b_text"
                onChange={handleSignUp}
              />
              <Textfield
                name="email"
                placeholder="Enter email...."
                id="email"
                title="Email"
                required
                color="text-b_text"
                onChange={handleSignUp}
              />
              <Password
                name="password"
                id="password"
                title="Password"
                required
                color="text-b_text"
                onChange={handleSignUp}
                placeholder="strongPassword1@"
              />
              <Password
                name="confirm_password"
                placeholder="strongPassword1@"
                id="confirm_password"
                title="Confirm password"
                required
                color="text-b_text"
                onChange={handleConfirmPassword}
              />
            </div>
            <div className="flex items-start justify-between flex-col gap-2 text-b_text mt-4">
              <div className="flex items-start justify-start gap-2">
                {validationResult.isLongEnough ? (
                  <CheckCircleIcon size={14} className="text-base" />
                ) : (
                  <CircleIcon size={14} className="text-b_text" />
                )}
                <p className="text-gray_color text-xs">Minimum 8 characters</p>
              </div>
              <div className="flex items-start justify-start gap-2">
                {validationResult.hasUppercase ? (
                  <CheckCircleIcon size={14} className="text-base" />
                ) : (
                  <CircleIcon size={14} className="text-b_text" />
                )}
                <p className="text-gray_color text-xs">
                  At least one lowercase
                </p>
              </div>
              <div className="flex items-start justify-start gap-2">
                {validationResult.hasNumberSymbolOrWhitespace ? (
                  <CheckCircleIcon size={14} className="text-base" />
                ) : (
                  <CircleIcon size={14} className="text-b_text" />
                )}
                <p className="text-gray_color text-xs">
                  Include a number, symbol, or space
                </p>
              </div>
            </div>
            <br />
            <Textfield
              name="address"
              placeholder="Enter address...."
              id="address"
              title="Address"
              required
              color="text-b_text"
              multiline={true}
              rows={2}
              onChange={handleSignUp}
            />
            <IconButton
              className={`rounded p-2 text-xs w-full mt-2 text-xs ${
                !validationResult.isValid ||
                signupData.password !== confirmPassword
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-base text-white cursor-pointer"
              }`}
              icon={<NextIcon size={22} />}
              title="REGISTER"
              type="submit"
              disabled={
                !validationResult.isValid ||
                signupData.password !== confirmPassword
              }
            />
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
                Already have an account?
              </p>
              <Link
                href="/signin"
                className="font-bold underline text-base text-sm italic"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
