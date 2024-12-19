"use client";

import React from "react";
import Image from "next/image";

// components
import IconButton from "@/components/iconButton";
import Password from "@/components/passwordTextField";
import Textfield from "@/components/textField";

// utils and icons
import { BackIcon, PlusIcon, TrashIcon } from "@/icons/page";
import { useToast } from "@/utils/toast";

// images
// import ThaiFlag from "/public/images/thai-flag.webp";
// import ChinesFlag from "/public/images/chines-flag.webp";
// import EnglishFlag from "/public/images/english-flag.webp";
// import VietnamFlag from "/public/images/vietnam-flag.webp";
// import MalaysiaFlag from "/public/images/malaysia-flag.webp";
import DefaultImage from "/public/images/default-image.webp";
import { useMutation } from "@apollo/client";
import { UPDATE_SHOP_PROFILE } from "@/api/shop";

type Record = {
  name: string;
  link: string;
};

export default function ShopDetails() {
  const [shopSignIn] = useMutation(UPDATE_SHOP_PROFILE);
  const { errorMessage, successMessage } = useToast();
  const [file, setFile] = React.useState<File | null>(null);
  const [cover, setCover] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [preview1, setPreview1] = React.useState<string | null>(null);
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

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile1 = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 1024 * 1024;

    if (selectedFile1) {
      if (!allowedTypes.includes(selectedFile1.type)) {
        setErrorMessages("Only JPG, JPEG, and PNG files are allowed.");
        setCover(null);
        setPreview1(null);
        return;
      }

      if (selectedFile1.size > maxSizeInBytes) {
        setErrorMessages("File size exceeds 1MB.");
        setCover(null);
        setPreview1(null);
        return;
      }

      setErrorMessages(null);
      setCover(selectedFile1);
      setPreview1(URL.createObjectURL(selectedFile1)); // Generate preview URL
    }
  };

  const [records, setRecords] = React.useState<Record[]>([]);
  const [currentRecord, setCurrentRecord] = React.useState<Record>({
    name: "",
    link: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = () => {
    if (currentRecord.name && currentRecord.link) {
      setRecords((prev) => [...prev, currentRecord]);
      setCurrentRecord({ name: "", link: "" });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex items-start justify-center gap-2 sm:flex-row flex-col">
      <div className="w-full rounded bg-white p-4 shadow-md">
        <form
          className="w-full py-2 flex items-start justify-start flex-col gap-4"
          onSubmit={handleSubmitForm}
        >
          <div className="w-full flex items-start justify-start flex-col gap-4">
            <div className="w-full border-b py-1">
              <p className="text-sm text-gray-500">Basic information:</p>
            </div>

            <div className="w-full flex items-start justify-start gap-6 my-4">
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
                      className="text-xs border p-2 rounded flex items-center justify-center cursor-pointer bg-neon_pink"
                    >
                      Select new
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-2/4 flex items-start justify-start gap-4">
                <div>
                  {preview1 ? (
                    <Image
                      src={preview1}
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
                    Cover image
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="file-upload"
                    onChange={handleChangeCover}
                    className="block w-full hidden"
                  />
                  {errorMessages && (
                    <p className="text-red-500 text-xs">{errorMessages}</p>
                  )}
                  <div className="flex items-start justify-start gap-4">
                    <label
                      htmlFor="file-upload"
                      className="text-xs border p-2 rounded flex items-center justify-center cursor-pointer bg-neon_pink"
                    >
                      Select new
                    </label>
                  </div>
                </div>
              </div>
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
                rows={1}
                required
              />
            </div>

            {/* <div className="w-full border-b py-1">
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
                    className="w-full py-3 ms-2 text-xs text-gray-500 flex items-center justify-start gap-2"
                  >
                    <Image
                      src={EnglishFlag}
                      alt="english"
                      height={20}
                      width={20}
                    />
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
                    className="w-full py-3 ms-2 text-xs text-gray-500 flex items-center justify-start gap-2"
                  >
                    <Image
                      src={ThaiFlag}
                      alt="english"
                      height={20}
                      width={20}
                    />
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
                    className="w-full py-3 ms-2 text-xs text-gray-500 flex items-center justify-start gap-2"
                  >
                    <Image
                      src={VietnamFlag}
                      alt="vietnam"
                      height={20}
                      width={20}
                    />
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
                    className="w-full py-3 ms-2 text-xs text-gray-500 flex items-center justify-start gap-2"
                  >
                    <Image
                      src={ChinesFlag}
                      alt="chines"
                      height={20}
                      width={20}
                    />
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
                    className="w-full py-3 ms-2 text-xs text-gray-500 flex items-center justify-start gap-2"
                  >
                    <Image
                      src={MalaysiaFlag}
                      alt="chines"
                      height={20}
                      width={20}
                    />
                    Malaysia
                  </label>
                </div>
              </li>
            </ul> */}

            <div className="w-full border-b py-1">
              <p className="text-sm text-gray-500">Social media:</p>
            </div>
            <div className="w-full flex item-start justify-start gap-2">
              <div className="w-4/5 flex item-start justify-start gap-2">
                <Textfield
                  placeholder="Enter name...."
                  title="Name"
                  name="name"
                  id="name"
                  type="text"
                  value={currentRecord.name}
                  onChange={handleInputChange}
                  required
                />
                <Textfield
                  placeholder="Enter link...."
                  title="Link"
                  name="link"
                  id="link"
                  type="text"
                  value={currentRecord.link}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="text-1/5 flex items-center justify-start">
                <IconButton
                  className="rounded bg-neon_blue border text-white text-xs mt-4"
                  title="Add"
                  icon={<PlusIcon size={18} className="text-pink" />}
                  isFront={true}
                  type="button"
                  onClick={handleAddRecord}
                />
              </div>
            </div>

            {records.length > 0 && (
              <div className="w-4/5 text-gray-500 p-2 rounded flex items-start justify-start gap-2 flex-col">
                {records.map((record, index) => (
                  <div
                    key={index}
                    className=" w-full p-2 rounded flex items-center justify-between gap-4 border"
                  >
                    <div className="flex gap-4">
                      <span className="text-xs">
                        {index + 1}. {record.name}
                      </span>
                      <span className="text-xs">{record.link}</span>
                    </div>
                    <TrashIcon
                      size={18}
                      className="text-gray-500 hover:text-neon_pink cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
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
            />
          </div>
        </form>
      </div>
    </div>
  );
}
