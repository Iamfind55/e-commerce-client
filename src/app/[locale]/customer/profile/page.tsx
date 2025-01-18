"use client";

import Breadcrumb from "@/components/breadCrumb";
import Image from "next/image";
import React from "react";

import DefaultImage from "/public/images/default-image.webp";
import Textfield from "@/components/textField";
import Password from "@/components/passwordTextField";
import IconButton from "@/components/iconButton";
import Loading from "@/components/loading";
import { SaveIcon } from "@/icons/page";

export default function ProfileManagement() {
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 800 * 1024; // 800KB in bytes

    if (selectedFile) {
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessages("Only JPG, JPEG, and PNG files are allowed.");
        setFile(null);
        setPreview(null);
        return;
      }

      if (selectedFile.size > maxSizeInBytes) {
        setErrorMessages("File size exceeds 800KB.");
        setFile(null);
        setPreview(null);
        return;
      }

      setErrorMessages(null);
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  return (
    <>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <Breadcrumb
          items={[
            { label: "Customer", value: "/customer" },
            { label: "Purchase history", value: "/purchase-history" },
          ]}
        />
        <form
          className="w-full flex items-start justify-start flex-col gap-4"
          //   onSubmit={handleSubmitForm}
        >
          <div className="w-full flex items-start justify-start flex-col gap-4 bg-white rounded p-4">
            <div className="w-2/4 flex items-start justify-start gap-4">
              <div>
                {preview ? (
                  <Image
                    src={preview}
                    width={100}
                    height={100}
                    alt="Image preview"
                    className="max-w-full h-auto border rounded"
                  />
                ) : (
                  <Image
                    src={DefaultImage}
                    width={100}
                    height={100}
                    alt="Image preview"
                    className="max-w-full h-auto border rounded"
                  />
                )}
              </div>
              <div className="flex items-start justify-start flex-col gap-3">
                <label className="block text-gray-500 text-xs">
                  Upload shop logo
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="block w-full hidden"
                />
                {errorMessages && (
                  <p className="text-red-500 text-xs">{errorMessages}</p>
                )}
                <div className="flex items-start justify-start gap-4">
                  <label
                    htmlFor="file-upload"
                    className="text-xs border p-2 rounded flex items-center justify-center cursor-pointer bg-neon_pink text-white"
                  >
                    Select new
                  </label>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2">
              <Textfield
                placeholder="Enter fullname...."
                title="Fullname"
                name="fullname"
                id="fullname"
                type="text"
                required
                // value={shopData.fullname || ""}
                // onChange={(e) =>
                //   setShopData({
                //     ...shopData,
                //     fullname: e.target.value,
                //   })
                // }
              />
              <Textfield
                placeholder="Enter phone number...."
                title="Phone number"
                name="phone_number"
                id="phone_number"
                type="text"
                required
                // value={shopData.phone_number || ""}
                // onChange={(e) =>
                //   setShopData({
                //     ...shopData,
                //     phone_number: e.target.value,
                //   })
                // }
              />
              <Textfield
                placeholder="Enter your email...."
                title="Email address"
                name="email"
                id="email"
                type="text"
                required
                // value={shopData.email || ""}
                // onChange={(e) =>
                //   setShopData({
                //     ...shopData,
                //     email: e.target.value,
                //   })
                // }
              />
              <Textfield
                placeholder="Enter your username...."
                title="Username"
                name="username"
                id="username"
                type="text"
                required
                // value={shopData.email || ""}
                // onChange={(e) =>
                //   setShopData({
                //     ...shopData,
                //     email: e.target.value,
                //   })
                // }
              />
              <Password
                placeholder="Enter password...."
                title="Password"
                name="password"
                id="password"
                required
                // value={shopData.password || ""}
                // onChange={(e) =>
                //   setShopData({
                //     ...shopData,
                //     password: e.target.value,
                //   })
                // }
              />
              <Password
                placeholder="Confirm password...."
                title="Confirm password"
                name="confirm_password"
                id="confirm_password"
                required
                // value={shopData.password || ""}
                // onChange={(e) =>
                //   setShopData({
                //     ...shopData,
                //     password: e.target.value,
                //   })
                // }
              />
            </div>
          </div>

          <div className="w-full flex items-start justify-start flex-col gap-4 bg-white rounded p-4">
            <div className="w-full border-b py-1">
              <p className="text-sm text-gray-500">Payment setting:</p>
            </div>
            <div className="w-full flex items-start justify-start flex-col gap-4">
              <p className="text-sm">Virtual currency payment method:</p>
              <Textfield
                placeholder="Enter your wallet address...."
                title="Wallet address USDT"
                name="wallet_address"
                id="wallet_address"
                type="text"
              />
            </div>

            <div className="w-full flex items-start justify-start flex-col gap-2">
              <p className="text-sm">Bank payment method:</p>
              <Textfield
                placeholder="Enter bank name...."
                title="Banck name"
                name="bank_name"
                id="bank_name"
                type="text"
              />
              <Textfield
                placeholder="Enter back account name...."
                title="Bank account name"
                name="bank_account_name"
                id="bank_account_name"
                type="text"
              />
              <Textfield
                placeholder="Enter bank account number...."
                title="Bank account number"
                name="bank_account_number"
                id="bank_account_number"
                type="text"
              />
            </div>
          </div>

          <div className="w-full flex items-end justify-end px-4 sm:px-0">
            <IconButton
              className={`w-full sm:w-auto rounded p-2 text-xs bg-neon_pink text-white`}
              title={isLoading ? "Submiting...." : "Update profile"}
              icon={isLoading ? <Loading /> : <SaveIcon size={18} />}
              isFront={true}
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
