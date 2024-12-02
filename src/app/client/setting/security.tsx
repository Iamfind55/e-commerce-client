"use client";
import { updateAPI } from "@/api/api";
import IconButton from "@/components/iconButton";
import Password from "@/components/passwordTextField";
import Textfield from "@/components/textField";
import { CallIcon, CircleIcon, EmailIcon, TrashIcon } from "@/icons/page";
import { IEmail, IPassword, IPhoneNumber } from "@/types/profile";
import { useToast } from "@/utils/toast";
import React from "react";

export default function Security() {
  const { errorMessage, successMessage } = useToast();
  const [passwordData, setPasswordData] = React.useState<IPassword>({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [emailData, setEmailData] = React.useState<IEmail>({
    currentEmail: "",
    newEmail: "",
  });

  const [phoneData, setPhoneData] = React.useState<IPhoneNumber>({
    currentPhone: "",
    newPhone: "",
  });

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordData.newPassword !== confirmPassword) {
      errorMessage({ message: "Passwords do not match!", duration: 1000 });
      return;
    }
    try {
      const res = await updateAPI({
        url: "/patients/change-password",
        body: passwordData,
      });
      if (res?.errors) {
        errorMessage({ message: res?.errors[0]?.msg, duration: 3000 });
      }
      if (res?.status == 400) {
        errorMessage({ message: res?.message, duration: 3000 });
      }
      if (res?.status == 200) {
        successMessage({ message: res?.message, duration: 3000 });
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

  const handleChangePhoneNumber = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const res = await updateAPI({
        url: "/patients/change-phone",
        body: phoneData,
      });
      if (res?.errors) {
        errorMessage({ message: res?.errors[0]?.msg, duration: 3000 });
      }
      if (res?.status == 400) {
        errorMessage({ message: res?.message, duration: 3000 });
      }
      if (res?.status == 200) {
        successMessage({ message: res?.message, duration: 3000 });
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };

  const handleChangeEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await updateAPI({
        url: "/patients/change-email",
        body: emailData,
      });
      if (res?.errors) {
        errorMessage({ message: res?.errors[0]?.msg, duration: 3000 });
      }
      if (res?.status == 400) {
        errorMessage({ message: res?.message, duration: 3000 });
      }
      if (res?.status == 200) {
        successMessage({ message: res?.message, duration: 3000 });
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };

  return (
    <div className="flex items-start justify-center flex-col gap-6">
      <div className="flex items-start justify-center gap-4 sm:flex-row flex-col">
        <div className="w-full sm:w-1/2 rounded bg-white p-4 shadow-md">
          <h4 className="text-b_text text-sm mb-3">Reset your password</h4>
          <form
            action=""
            className="w-full py-6 flex items-start justify-start flex-col gap-4"
            onSubmit={handleChangePassword}
          >
            <div className="w-full">
              <Password
                name="oldPassword"
                id="old_assword"
                title="Current password"
                required
                color="text-b_text"
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
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
              <Password
                name="confirm_password"
                id="confirm_password"
                title="Confirm password"
                required
                color="text-b_text"
                onChange={handleConfirmPassword}
              />
            </div>
            <h4 className="text-b_text text-sm font-medium">
              Password requirements:
            </h4>
            <div className="flex items-start justify-center flex-col gap-2">
              <div className="flex items-center justify-start gap-2">
                <CircleIcon size={16} className="text-b_text" />
                <p className="text-b_text text-xs">
                  Minimum 8 character long-the more, the better
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <CircleIcon size={16} className="text-b_text" />
                <p className="text-b_text text-xs">
                  At least one lowercase character
                </p>
              </div>
              <div className="flex items-center justify-start gap-2">
                <CircleIcon size={16} className="text-b_text" />
                <p className="text-b_text text-xs">
                  At least one number, symbol, or whitespace character
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start gap-4 mt-4">
              <IconButton
                className="rounded bg-primary text-white p-2 bg-base text-xs"
                title="Save Change"
                isFront={true}
                type="submit"
              />
              <IconButton
                className="rounded text-base p-2 border bg-white text-xs"
                title="Cancel"
                isFront={true}
              />
            </div>
          </form>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-start flex-col gap-3">
          <div className="w-full rounded bg-white p-4 shadow-md">
            <h4 className="text-b_text text-sm mb-3">Two-steps verification</h4>
            <h4 className="text-b_text text-sm mb-3">
              Two-factor authentication is not enabled yet.
            </h4>
            <p className="text-b_text text-xs">
              Two-factor authentication adds a layer of security to your account
              by requiring more than just a password to log in.
            </p>
            <IconButton
              className="rounded bg-primary text-white p-2 bg-base text-xs mt-4"
              title="Enable two-factor authentication"
              isFront={true}
              type="submit"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-start justify-center gap-4 sm:flex-row flex-col">
        <form
          action=""
          className="w-full rounded bg-white p-4 shadow-md"
          onSubmit={handleChangeEmail}
        >
          <h4 className="text-b_text text-sm mb-3 flex items-start justify-start gap-2">
            <EmailIcon size={20} />
            Change email address
          </h4>
          <p className="text-b_text text-xs mb-3">
            Please user your current email address to change the new one for
            security reason.
          </p>
          <Textfield
            name="currentEmail"
            placeholder="Current email...."
            id="current_email"
            title="Current email"
            required
            type="email"
            color="text-b_text"
            onChange={(e) =>
              setEmailData({
                ...emailData,
                currentEmail: e.target.value,
              })
            }
          />
          <Textfield
            name="newEmail"
            placeholder="New email...."
            id="new_email"
            title="New email"
            required
            type="email"
            color="text-b_text"
            onChange={(e) =>
              setEmailData({
                ...emailData,
                newEmail: e.target.value,
              })
            }
          />
          <div className="flex items-center justify-start gap-4 mt-4">
            <IconButton
              className="rounded bg-primary text-white p-2 bg-base text-xs"
              title="Save Change"
              isFront={true}
              type="submit"
            />
          </div>
        </form>
        <form
          action=""
          className="w-full rounded bg-white p-4 shadow-md"
          onSubmit={handleChangePhoneNumber}
        >
          <h4 className="text-b_text text-sm mb-3 flex items-start justify-start gap-2">
            <CallIcon size={20} />
            Change phone number
          </h4>
          <p className="text-b_text text-xs mb-3">
            Please user your current phone address to change the new one for
            security reason.
          </p>
          <Textfield
            name="currentPhoneNumber"
            placeholder="Current phone number...."
            id="current_phone_number"
            title="Current phone number"
            required
            type="number"
            color="text-b_text"
            onChange={(e) =>
              setPhoneData({
                ...phoneData,
                currentPhone: e.target.value,
              })
            }
          />
          <Textfield
            name="newPhoneNumber"
            placeholder="New phone number...."
            id="new_phone_number"
            title="New phone number"
            required
            type="number"
            color="text-b_text"
            onChange={(e) =>
              setPhoneData({
                ...phoneData,
                newPhone: e.target.value,
              })
            }
          />
          <div className="flex items-center justify-start gap-4 mt-4">
            <IconButton
              className="rounded bg-primary text-white p-2 bg-base text-xs"
              title="Save Change"
              isFront={true}
              type="submit"
            />
          </div>
        </form>
      </div>
      <div className="w-full rounded bg-white p-4 shadow-md">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  BROWSER
                </th>
                <th scope="col" className="px-6 py-3">
                  DEVICES
                </th>
                <th scope="col" className="px-6 py-3">
                  LOCATION
                </th>
                <th scope="col" className="px-6 py-3">
                  RECENT ACTIVITIES
                </th>
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4">
                  1
                </th>
                <td className="px-6 py-4">Google chrome</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Vientine of Laos</td>
                <td className="px-6 py-4">06-09-2024 11:23:07</td>
                <td className="px-6 py-4">
                  <TrashIcon size={20} className="cursor-pointer" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4">
                  1
                </th>
                <td className="px-6 py-4">Google chrome</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Vientine of Laos</td>
                <td className="px-6 py-4">06-09-2024 11:23:07</td>
                <td className="px-6 py-4">
                  <TrashIcon size={20} className="cursor-pointer" />
                </td>
              </tr>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4">
                  1
                </th>
                <td className="px-6 py-4">Google chrome</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">Vientine of Laos</td>
                <td className="px-6 py-4">06-09-2024 11:23:07</td>
                <td className="px-6 py-4">
                  <TrashIcon size={20} className="cursor-pointer" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
