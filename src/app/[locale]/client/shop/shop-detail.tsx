"use client";

import { updateAPI } from "@/api/api";
import IconButton from "@/components/iconButton";
import Password from "@/components/passwordTextField";
import Textfield from "@/components/textField";
import { BackIcon, CheckCircleIcon, CircleIcon } from "@/icons/page";
import { IPassword, IPasswordValidationResult } from "@/types/profile";
import { useToast } from "@/utils/toast";
import { validatePassword } from "@/utils/validatePassword";
import React from "react";

export default function ShopDetails() {
  const { errorMessage, successMessage } = useToast();

  // State to hold the password data
  const [passwordData, setPasswordData] = React.useState<IPassword>({
    currentPassword: "",
    newPassword: "",
  });

  // State to hold confirm password value
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  // State to hold validation results for the new password
  const [validationResult, setValidationResult] =
    React.useState<IPasswordValidationResult>({
      isValid: false,
      hasUppercase: false,
      hasNumberSymbolOrWhitespace: false,
      isLongEnough: false,
    });

  // Handle new password change and validate
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPasswordData({ ...passwordData, newPassword });

    // Validate the new password on change
    const result = validatePassword(newPassword);
    setValidationResult(result);
  };

  // Handle confirm password change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if passwords match
    if (passwordData.newPassword !== confirmPassword) {
      errorMessage({ message: "Passwords do not match!", duration: 1000 });
      return;
    }

    // If validation for newPassword fails, stop form submission
    if (!validationResult.isValid) {
      errorMessage({
        message: "Password does not meet requirements!",
        duration: 3000,
      });
      return;
    }

    try {
      const res = await updateAPI({
        url: "/patients/change-password",
        body: passwordData,
      });

      if (res?.errors) {
        errorMessage({ message: res?.errors[0]?.msg, duration: 3000 });
        return;
      }

      if (res?.status === 400) {
        errorMessage({ message: res?.message, duration: 3000 });
        return;
      }

      if (res?.status === 200) {
        successMessage({ message: res?.message, duration: 3000 });
        return;
      }

      errorMessage({
        message: "Unexpected response from the server",
        duration: 3000,
      });
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };

  return (
    <div className="w-full flex items-start justify-center gap-2 sm:flex-row flex-col">
      <div className="w-full rounded bg-white p-4 shadow-md">
        <form
          className="w-full py-2 flex items-start justify-start flex-col gap-4"
          onSubmit={handleChangePassword}
        >
          <div className="w-full flex items-start justify-start flex-col gap-4">
            <div className="w-full border-b py-1">
              <p className="text-sm text-gray-500">Basic information:</p>
            </div>
            <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Textfield
                placeholder="Enter shop name...."
                title="Shop name"
                name="shop_name"
                id="shop_name"
                type="text"
                required
              />
              <Textfield
                placeholder="Enter username...."
                title="Username"
                name="username"
                id="username"
                type="text"
                required
              />
              <Textfield
                placeholder="Enter phone number...."
                title="Phone number"
                name="phone_number"
                id="phone_number"
                type="text"
                required
              />
              <Textfield
                placeholder="Enter shop email...."
                title="Shop email"
                name="shop_email"
                id="shop_email"
                type="text"
                required
              />
              <Textfield
                placeholder="Enter shop name...."
                title="Shop name"
                name="shop_name"
                id="shop_name"
                type="text"
                required
              />
              <Textfield
                placeholder="Enter shop name...."
                title="Shop name"
                name="shop_name"
                id="shop_name"
                type="text"
                required
              />
              <Password
                placeholder="Enter password...."
                title="Password"
                name="password"
                id="password"
                required
              />
              <Textfield
                placeholder="Active"
                title="Status"
                name="status"
                id="status"
                type="text"
                required
                readOnly
              />
              <Textfield
                placeholder="Enter shop remark...."
                title="Shop remark"
                name="shop_remark"
                id="shop_remark"
                type="text"
                multiline
                rows={3}
                required
              />
            </div>

            <div className="w-full border-b py-1">
              <p className="text-sm text-gray-500">Set default language:</p>
            </div>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded sm:flex">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="english-language"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2"
                  />
                  <label
                    htmlFor="english-language"
                    className="w-full py-3 ms-2 text-xs text-gray-500"
                  >
                    English
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="thai-language"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                  />
                  <label
                    htmlFor="thai-language"
                    className="w-full py-3 ms-2 text-xs text-gray-500"
                  >
                    Thai
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                <div className="flex items-center ps-3">
                  <input
                    id="vietnam-language"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2"
                  />
                  <label
                    htmlFor="vietnam-language"
                    className="w-full py-3 ms-2 text-xs text-gray-500"
                  >
                    Vietnam
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center ps-3">
                  <input
                    id="chines-language"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2"
                  />
                  <label
                    htmlFor="chines-language"
                    className="w-full py-3 ms-2 text-xs text-gray-500"
                  >
                    Chines
                  </label>
                </div>
              </li>
              <li className="w-full">
                <div className="flex items-center ps-3">
                  <input
                    id="malaysia-language"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-2"
                  />
                  <label
                    htmlFor="malaysia-language"
                    className="w-full py-3 ms-2 text-xs text-gray-500"
                  >
                    Malaysia
                  </label>
                </div>
              </li>
            </ul>

            <div className="w-full border-b py-1">
              <p className="text-sm text-gray-500">Social medias:</p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-4 mt-4">
            <IconButton
              className="rounded text-neon_pink p-2 border bg-white text-xs"
              title="Back"
              icon={<BackIcon size={18} className="text-pink" />}
              isFront={true}
              type="button"
            />
            <IconButton
              className={`rounded p-2 text-xs bg-neon_blue text-white cursor-not-allowed`}
              title="Save Change"
              isFront={true}
              type="submit"
              disabled={
                !validationResult.isValid ||
                passwordData.newPassword !== confirmPassword
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
