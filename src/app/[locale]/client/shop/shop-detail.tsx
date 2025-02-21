"use client";

import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

// graphql
import { useLazyQuery, useMutation } from "@apollo/client";
import { login } from "@/redux/slice/authSlice";

// components
import Loading from "@/components/loading";
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import Password from "@/components/passwordTextField";

// utils and icons
import { useToast } from "@/utils/toast";
import { BackIcon, PlusIcon, TrashIcon } from "@/icons/page";

// API
import {
  MUTATION_CREATE_SHOP_SOCIAL,
  MUTATION_DELETE_SHOP_SOCIAL,
  MUTATION_UPDATE_SHOP_PROFILE,
  QUERY_SHOP_SOCIALS,
} from "@/api/shop";

// images
import { IShopSocial, IUserData } from "@/types/user";
import DeleteModal from "@/components/deleteModal";
import { useTranslations } from "next-intl";

interface CloudinaryResponse {
  secure_url?: string;
}

export default function ShopDetails() {
  const dispatch = useDispatch();
  const t = useTranslations("shop_management");
  const { errorMessage, successMessage } = useToast();
  const { user } = useSelector((state: any) => state.auth);

  const [file, setFile] = React.useState<File | null>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [cover, setCover] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [preview1, setPreview1] = React.useState<string | null>(null);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);
  const [errorMessages1, setErrorMessages1] = React.useState<string | null>(
    null
  );
  const [shopData, setShopData] = React.useState<IUserData>({
    id: "",
    fullname: "",
    username: "",
    password: "",
    email: "",
    phone_number: "",
    dob: "",
    remark: "",
    image: {
      logo: "",
      cover: "",
    },
    payment_method: [],
  });
  const [records, setRecords] = React.useState<IShopSocial[]>([]);
  const [socials, setSocials] = React.useState<IShopSocial[]>([]);
  const [socialId, setSocialId] = React.useState<string>("");
  const [currentRecord, setCurrentRecord] = React.useState<IShopSocial>({
    name: "",
    link: "",
    image: "",
    status: "",
    created_at: "",
  });

  const [queryShopSocials, { refetch }] = useLazyQuery(QUERY_SHOP_SOCIALS, {
    fetchPolicy: "no-cache",
  });
  const [updateShopInfo] = useMutation(MUTATION_UPDATE_SHOP_PROFILE);
  const [createShopSocial] = useMutation(MUTATION_CREATE_SHOP_SOCIAL);
  const [deleteShopSocial] = useMutation(MUTATION_DELETE_SHOP_SOCIAL);

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

    if (selectedFile1) {
      if (!allowedTypes.includes(selectedFile1.type)) {
        setErrorMessages1("Only JPG, JPEG, and PNG files are allowed.");
        setCover(null);
        setPreview1(null);
        return;
      }

      setErrorMessages(null);
      setCover(selectedFile1);
      setPreview1(URL.createObjectURL(selectedFile1)); // Generate preview URL
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRecord = () => {
    if (currentRecord.name && currentRecord.link) {
      setRecords((prev) => [...prev, currentRecord]);
      setCurrentRecord({
        name: "",
        link: "",
        image: "",
        status: "",
        created_at: "",
      });
    }
  };

  const handleDeleteRecord = (index: number) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleOpenDeleteModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteShopSocial = async () => {
    try {
      if (socialId) {
        const { data } = await deleteShopSocial({
          variables: {
            deleteShopSocialId: socialId,
          },
        });
        if (data.deleteShopSocial.success) {
          refetch();
          console.log("I refetch");
        } else {
          errorMessage({ message: "Something went wrong!", duration: 3000 });
        }
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let shopLogo: CloudinaryResponse = {};
      let shopCover: CloudinaryResponse = {};
      if (file) {
        const _formData = new FormData();
        _formData.append("file", file);
        _formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""
        );

        const response = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",
          {
            method: "POST",
            body: _formData,
          }
        );
        shopLogo = (await response.json()) as CloudinaryResponse; // Type assertion
      }

      if (cover) {
        const _formData = new FormData();
        _formData.append("file", cover);
        _formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_PRESET || ""
        );

        const response = await fetch(
          process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",
          {
            method: "POST",
            body: _formData,
          }
        );
        shopCover = (await response.json()) as CloudinaryResponse; // Type assertion
      }

      console.log("Cover", shopCover.secure_url);
      console.log("Profile", shopLogo.secure_url);

      const { data } = await updateShopInfo({
        variables: {
          data: {
            fullname: shopData.fullname,
            username: shopData.username,
            password: shopData.password,
            email: shopData.email,
            phone_number: shopData.phone_number,
            remark: shopData.remark,
            image: {
              cover: shopCover.secure_url || shopData.image?.cover,
              logo: shopLogo.secure_url || shopData.image?.logo,
            },
          },
        },
      });

      if (data.updateShopInformation.success) {
        successMessage({
          message: "Update shop profile successful!",
          duration: 3000,
        });
        const res = data.updateShopInformation.data;
        dispatch(
          login({
            fullname: res.fullname,
            username: res.username,
            email: res.email,
            dob: res.dob,
            remark: res.remark,
            image: {
              logo: res.image.logo,
              cover: res.image.cover,
            },
            status: res.status,
            shop_vip: res.shop_vip ?? false,
          })
        );

        if (records.length > 0) {
          for (const record of records) {
            await createShopSocial({
              variables: {
                data: {
                  image: record.image,
                  name: record.name,
                  link: record.link,
                  shop_id: user?.id,
                },
              },
            });
          }

          refetch();
        }
      } else {
        errorMessage({
          message: data.updateShopInformation.error.details,
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Unexpected happen! Please wait.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      setFile(null);
      setCover(null);
    }
  };

  React.useEffect(() => {
    if (user) {
      setShopData({
        id: user.id || null,
        fullname: user.fullname || null,
        username: user.username || null,
        password: user.password || null,
        email: user.email || null,
        phone_number: user.phone_number || null,
        dob: user.dob || null,
        remark: user.remark || null,
        image: user.image || {
          logo: null,
          cover: null,
        },
        payment_method: user.payment_method || [],
        status: user.status || null,
        shop_vip: user.shop_vip || null,
        created_at: user.created_at || null,
      });
    }
  }, [user]);

  const handleQueryShopSocials = React.useCallback(async () => {
    try {
      const { data } = await queryShopSocials({
        variables: {
          where: {
            status: "ACTIVE",
          },
        },
      });
      setSocials(data.getShopSocials.data);
    } catch (e) {
      console.error(e);
    }
  }, [queryShopSocials]);

  React.useEffect(() => {
    handleQueryShopSocials();
  }, [handleQueryShopSocials]);

  return (
    <>
      <div className="w-full flex items-start justify-center gap-2 sm:flex-row flex-col">
        <div className="w-full rounded bg-white p-4 shadow-md">
          <form
            className="w-full py-2 flex items-start justify-start flex-col gap-4"
            onSubmit={handleSubmitForm}
          >
            <div className="w-full flex items-start justify-start flex-col gap-4">
              <div className="w-full border-b py-1">
                <p className="text-sm text-gray-500">{t("_title")}:</p>
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
                    ) : shopData?.image?.logo ? (
                      <Image
                        src={shopData?.image?.logo}
                        width={100}
                        height={100}
                        alt="Image preview"
                        className="max-w-full h-auto border rounded"
                      />
                    ) : (
                      <Image
                        src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/default-image_uwedsh.webp"
                        width={100}
                        height={100}
                        alt="Image preview"
                        className="max-w-full h-auto border rounded"
                      />
                    )}
                  </div>
                  <div className="flex items-start justify-start flex-col gap-2">
                    <label className="block text-gray-500 text-xs">
                      {t("_upload_logo")}
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
                        {t("_select_new")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-2/4 flex items-start justify-center flex-col gap-2">
                  <div className="flex items-center justify-start gap-6">
                    <label className="block text-gray-500 text-sm">
                      {t("_upload_cover")}
                    </label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="cover-upload"
                      onChange={handleChangeCover}
                      className="block w-full hidden"
                    />
                    {errorMessages1 && (
                      <p className="text-red-500 text-xs">{errorMessages1}</p>
                    )}
                    <div className="flex items-start justify-start gap-4 border rounded py-1 px-4 cursor-pointer">
                      <label
                        htmlFor="cover-upload"
                        className="text-xs text-gray-500 rounded flex items-center justify-center cursor-pointer"
                      >
                        {t("_select_new")}
                      </label>
                    </div>
                  </div>
                  {shopData?.image?.cover ? (
                    <div className="w-full">
                      {preview1 ? (
                        <Image
                          src={preview1}
                          width={600}
                          height={400}
                          alt="Image preview"
                          className="w-full h-32 object-cover border rounded"
                        />
                      ) : shopData?.image?.cover ? (
                        <Image
                          src={shopData?.image?.cover}
                          width={600}
                          height={400}
                          alt="Image preview"
                          className="w-full h-32 object-cover border rounded"
                        />
                      ) : (
                        <Image
                          src="https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860057/default-image_uwedsh.webp"
                          width={600}
                          height={400}
                          alt="Image preview"
                          className="w-full h-32 object-cover border rounded"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-full flex items-center justify-center py-4 rounded-md flex-col gap-3  border border-dotted border-gray-500">
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        id="cover-upload"
                        onChange={handleChangeCover}
                        className="block w-full hidden"
                      />
                      {errorMessages && (
                        <p className="text-red-500 text-xs">{errorMessages}</p>
                      )}
                      <div className="flex items-start justify-start gap-4 border rounded p-4 cursor-pointer">
                        <label
                          htmlFor="cover-upload"
                          className="text-sm rounded flex items-center justify-center cursor-pointer"
                        >
                          <PlusIcon className="text-gray-500" />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full grid grid-cols-1 gap-2 lg:grid-cols-2">
                <Textfield
                  placeholder={t("_shop_name_placeholder")}
                  title={t("_shop_name")}
                  name="fullname"
                  id="fullname"
                  type="text"
                  required
                  value={shopData.fullname || ""}
                  onChange={(e) =>
                    setShopData({
                      ...shopData,
                      fullname: e.target.value,
                    })
                  }
                />
                <Textfield
                  placeholder={t("_username_placeholder")}
                  title={t("_username")}
                  name="username"
                  id="username"
                  type="text"
                  required
                  value={shopData.username || ""}
                  onChange={(e) =>
                    setShopData({
                      ...shopData,
                      username: e.target.value,
                    })
                  }
                />
                <Textfield
                  placeholder={t("_phone_number_placeholder")}
                  title={t("_phone_number")}
                  name="phone_number"
                  id="phone_number"
                  type="text"
                  required
                  value={shopData.phone_number || ""}
                  onChange={(e) =>
                    setShopData({
                      ...shopData,
                      phone_number: e.target.value,
                    })
                  }
                />
                <Textfield
                  placeholder={t("_email_placeholder")}
                  title={t("_email")}
                  name="email"
                  id="email"
                  type="text"
                  required
                  value={shopData.email || ""}
                  onChange={(e) =>
                    setShopData({
                      ...shopData,
                      email: e.target.value,
                    })
                  }
                />
                <Password
                  title={t("_password")}
                  name="password"
                  id="password"
                  required
                  value={shopData.password || "************"}
                  onChange={(e) =>
                    setShopData({
                      ...shopData,
                      password: e.target.value,
                    })
                  }
                />
                <Textfield
                  title={t("_status")}
                  name="status"
                  id="status"
                  type="text"
                  required
                  readOnly
                />
              </div>
              <Textfield
                placeholder={t("_remark_placeholder")}
                title={t("_remark")}
                name="remark"
                id="remark"
                type="text"
                multiline
                rows={2}
                required
                value={shopData.remark || ""}
                onChange={(e) =>
                  setShopData({
                    ...shopData,
                    remark: e.target.value,
                  })
                }
              />

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
                <p className="text-sm text-gray-500">
                  {t("_social_media_detail")}:
                </p>
              </div>
              <div className="w-full flex item-start justify-start gap-2">
                <div className="w-4/5 flex item-start justify-start gap-2">
                  <Textfield
                    placeholder={t("_name_placeholder")}
                    title={t("_name")}
                    name="name"
                    id="name"
                    type="text"
                    value={currentRecord.name}
                    onChange={handleInputChange}
                  />
                  <Textfield
                    placeholder={t("_link_placeholder")}
                    title={t("_link")}
                    name="link"
                    id="link"
                    type="text"
                    value={currentRecord.link}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-1/5 flex items-center justify-start">
                  <IconButton
                    className="rounded bg-neon_blue border text-white text-xs mt-4"
                    title={t("_add_button")}
                    icon={<PlusIcon size={18} className="text-pink" />}
                    isFront={true}
                    type="button"
                    onClick={handleAddRecord}
                  />
                </div>
              </div>

              {records.length > 0 && (
                <div className="w-4/5 text-gray-500 p-2 rounded flex items-start justify-start gap-2 flex-col">
                  <p className="text-xs text-gray-500">
                    {t("_social_media_detail")}:
                  </p>
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
                        onClick={() => handleDeleteRecord(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
              {socials.length > 0 && (
                <div className="w-4/5 text-gray-500 p-2 rounded flex items-start justify-start gap-2 flex-col">
                  <p className="text-xs text-gray-500">
                    {t("_social_media_detail")}:
                  </p>
                  {socials.map((social, index) => (
                    <div
                      key={index}
                      className=" w-full p-2 rounded flex items-center justify-between gap-4 border"
                    >
                      <div className="flex gap-4">
                        <span className="text-xs">
                          {index + 1}. {social.name}
                        </span>
                        <span className="text-xs">{social.link}</span>
                      </div>
                      <TrashIcon
                        size={18}
                        className="text-gray-500 hover:text-neon_pink cursor-pointer"
                        onClick={() => {
                          handleOpenDeleteModal();
                          setSocialId(social.id ?? "");
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-start gap-4 mt-4">
              <IconButton
                className="rounded text-neon_pink p-2 border bg-white text-xs"
                title={t("_back_button")}
                icon={<BackIcon size={18} className="text-pink" />}
                isFront={true}
                type="button"
              />
              <IconButton
                className={`rounded p-2 text-xs bg-neon_blue text-white`}
                title={isLoading ? t("_saving_button") : t("_save_button")}
                icon={isLoading ? <Loading /> : ""}
                isFront={true}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        onClose={handleOpenDeleteModal}
        onConfirm={() => handleDeleteShopSocial()}
      />
    </>
  );
}
