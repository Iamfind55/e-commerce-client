"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useRouter } from "@/navigation";
import { CircleUser, NextIcon } from "@/icons/page";

// Components
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import DatePicker from "@/components/datePicker";
import Password from "@/components/passwordTextField";

// utils, hook and APIs
import { useToast } from "@/utils/toast";
import { useMutation } from "@apollo/client";
import { ICustomerSignup } from "@/types/customer-auth";
import { MUTATION_CUSTOMER_REGISTER } from "@/api/customer-auth";

// images
import { signIn } from "@/redux/slice/customerAuthSlice";

export default function CustomerRegister() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [customerRegister] = useMutation(MUTATION_CUSTOMER_REGISTER);
  const [registerData, setRegisterData] = React.useState<ICustomerSignup>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone_number: "",
    dob: "",
    image: "",
  });

  const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (registerData.password !== confirmPassword) {
      errorMessage({
        message: "Password do not match!",
        duration: 2000,
      });
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await customerRegister({
        variables: {
          data: {
            firstName: registerData.firstName,
            ...(registerData.lastName && { lastName: registerData.lastName }),
            username: registerData.username,
            password: registerData.password,
            ...(registerData.email && { email: registerData.email }),
            ...(registerData.phone_number && {
              phone_number: registerData.phone_number,
            }),
            ...(registerData.phone_number && {
              phone_number: registerData.phone_number,
            }),
            ...(registerData.dob && { dob: registerData.dob }),
          },
        },
      });

      if (data?.customerRegister?.success) {
        successMessage({
          message: "Register successful!",
          duration: 3000,
        });

        const res = data.customerRegister.data;
        dispatch(
          signIn({
            id: res.data.id || "",
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            username: res.data.username || "",
            email: res.data.email || "",
            phone_number: res.data.phone_number || "",
            dob: res.data.dob || "",
            image: res.data.image || "",
            status: res.data.status || "",
            created_at: res.data.created || "",
          })
        );

        document.cookie = `auth_token=${data?.customerRegister?.data?.token}; path=/; max-age=3600`;
        router.push("/customer");
      } else {
        errorMessage({
          message: data.shopRegister.error?.message || "Signup failed!",
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "An unexpected error occurred during signup.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url("/images/background-image.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-screen bg-bg_color flex items-center justify-center"
      >
        <div className="rounded text-gray-500 w-11/12 sm:w-2/4 bg-white flex items-center justify-center flex-col gap-2 py-6">
          <CircleUser size={32} className="hidden sm:block" />
          <div className="flex items-center justify-start sm:justify-center flex-col">
            <p className="hidden sm:block text-lg">WELCOME TO TIKTOKSHOP</p>
            <p className="text-sm">Create your account</p>
          </div>
          <form
            action=""
            className="w-11/12 mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2"
            onSubmit={handleSubmitForm}
          >
            <Textfield
              placeholder="Enter your firstname...."
              title="First name"
              name="firstName"
              type="text"
              id="firstName"
              required
              onChange={handleRegister}
            />
            <Textfield
              placeholder="Enter lastName...."
              title="Last name"
              name="lastName"
              type="text"
              id="lastName"
              onChange={handleRegister}
            />
            <Textfield
              placeholder="Enter your email...."
              title="Email address"
              name="email"
              type="text"
              id="email"
              onChange={handleRegister}
            />
            <Textfield
              placeholder="Enter your phone number...."
              title="Phone number"
              name="phone_number"
              type="text"
              id="phone_number"
              onChange={handleRegister}
            />
            <Textfield
              placeholder="Enter username...."
              title="Username"
              name="username"
              type="text"
              id="username"
              required
              onChange={handleRegister}
            />
            <DatePicker
              name="dob"
              onChange={handleRegister}
              title="Date of birth"
              className="h-8"
            />
            <Password
              placeholder="Enter password...."
              title="Password"
              name="password"
              id="password"
              required
              onChange={handleRegister}
            />
            <Password
              placeholder="Confirm password...."
              title="Confirm password"
              name="confirm_password"
              id="confirm_password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              //   onChange={handleRegister}
            />
            <IconButton
              className="rounded text-white p-2 bg-neon_pink w-full mt-4 text-xs"
              icon={isLoading ? "" : <NextIcon size={22} />}
              isFront={isLoading ? true : false}
              title={isLoading ? "Submiting...." : "Create Account"}
              type="submit"
            />
            <div className="flex items-center justify-center gap-4 mt-2 sm:mt-4">
              <p className="text-b_text text-sm italic">
                Already have an account?
              </p>
              <Link
                href="/cus-signin"
                className="font-bold underline text-neon_pink text-sm italic"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
