"use client";

import { updateAPI } from "@/api/api";
import IconButton from "@/components/iconButton";
import Password from "@/components/passwordTextField";
import { CheckCircleIcon, CircleIcon } from "@/icons/page";
import { IPassword, IPasswordValidationResult } from "@/types/profile";
import { useToast } from "@/utils/toast";
import { validatePassword } from "@/utils/validatePassword";
import React from "react";

export default function ChangePassword() {
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
    <div className="flex items-start justify-center gap-4 sm:flex-row flex-col">
      <div className="w-full rounded bg-white p-4 shadow-md">
        <h4 className="text-b_text text-sm mb-3">Reset your password</h4>
        <form
          className="w-full py-6 flex items-start justify-start flex-col gap-4"
          onSubmit={handleChangePassword}
        >
          <div className="w-full">
            <Password
              name="oldPassword"
              id="old_password"
              title="Current password"
              required
              color="text-b_text"
              placeholder="Your current email"
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-2 lg:grid-cols-2">
            <Password
              name="newPassword"
              id="new_password"
              title="New password"
              required
              color="text-b_text"
              onChange={handleNewPasswordChange}
              placeholder="strongPassword1@"
            />
            <Password
              name="confirm_password"
              id="confirm_password"
              title="Confirm password"
              required
              color="text-b_text"
              onChange={handleConfirmPasswordChange}
              placeholder="strongPassword1@"
            />
          </div>
          <h4 className="text-b_text text-sm font-medium">
            Password requirements:
          </h4>
          <div className="flex items-start justify-center flex-col gap-2 text-b_text">
            <div className="flex items-center justify-start gap-2">
              {validationResult.isLongEnough ? (
                <CheckCircleIcon size={16} className="text-base" />
              ) : (
                <CircleIcon size={16} className="text-b_text" />
              )}
              <p className="text-b_text text-xs">
                Minimum 8 character long-the more, the better
              </p>
            </div>
            <div className="flex items-center justify-start gap-2">
              {validationResult.hasUppercase ? (
                <CheckCircleIcon size={16} className="text-base" />
              ) : (
                <CircleIcon size={16} className="text-b_text" />
              )}
              <p className="text-b_text text-xs">
                At least one lowercase character
              </p>
            </div>
            <div className="flex items-center justify-start gap-2">
              {validationResult.hasNumberSymbolOrWhitespace ? (
                <CheckCircleIcon size={16} className="text-base" />
              ) : (
                <CircleIcon size={16} className="text-b_text" />
              )}
              <p className="text-b_text text-xs">
                At least one number, symbol, or whitespace character
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 mt-4">
            <IconButton
              className={`rounded p-2 text-xs ${
                !validationResult.isValid ||
                passwordData.newPassword !== confirmPassword
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-base text-white cursor-pointer"
              }`}
              title="Save Change"
              isFront={true}
              type="submit"
              disabled={
                !validationResult.isValid ||
                passwordData.newPassword !== confirmPassword
              }
            />
            <IconButton
              className="rounded text-base p-2 border bg-white text-xs"
              title="Cancel"
              isFront={true}
              type="button"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
