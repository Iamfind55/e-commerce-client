"use client";

import React from "react";
import Image from "next/image";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

// components
import Loading from "@/components/loading";
import Textfield from "@/components/textField";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import Password from "@/components/passwordTextField";

// utils
import { useToast } from "@/utils/toast";
import { signIn } from "@/redux/slice/customerAuthSlice";

// images and icons
import { SaveIcon } from "@/icons/page";
import DefaultImage from "/public/images/default-image.webp";
import { ICustomers, IPaymentMethod } from "@/types/customer-auth";

// APIs
import {
  MUTATION_UPDATE_CUSTOMER_PROFILE,
  MUTATION_UPDATE_PAYMENT_METHOD,
  QUERY_CUSTOMER_PAYMENT_METHOD,
} from "@/api/customer";
import { GetPaymentResponse } from "@/types/paymentMethod";

interface CloudinaryResponse {
  secure_url?: string;
}

export default function ProfileManagement() {
  const dispatch = useDispatch();
  const { errorMessage, successMessage } = useToast();
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [errorMessages, setErrorMessages] = React.useState<string | null>(null);

  const { customer } = useSelector((state: any) => state.customerAuth);
  const [customerProfile] = useMutation(MUTATION_UPDATE_CUSTOMER_PROFILE);
  const [paymentMethod] = useMutation(MUTATION_UPDATE_PAYMENT_METHOD);

  const [usdtPaymentData, setUsdtPaymentData] = React.useState<IPaymentMethod>({
    id: "",
    code: "",
    bank_name: "",
    bank_account_name: "",
    bank_account_number: "",
  });

  const [bankPaymentData, setBankPaymentData] = React.useState<IPaymentMethod>({
    id: "",
    code: "",
    bank_name: "",
    bank_account_name: "",
    bank_account_number: "",
  });

  const [profileData, setProfileData] = React.useState<ICustomers>({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phone_number: "",
    dob: "",
    image: "",
    status: "",
    created_at: "",
  });

  const [getPayment, { data: paymentMethodData, refetch }] =
    useLazyQuery<GetPaymentResponse>(QUERY_CUSTOMER_PAYMENT_METHOD, {
      fetchPolicy: "no-cache",
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSizeInBytes = 800 * 1024;

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
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let data: CloudinaryResponse = {};
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
        data = (await response.json()) as CloudinaryResponse; // Type assertion
      }

      const res = await customerProfile({
        variables: {
          data: {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            username: profileData.username,
            ...(profileData.password && { password: profileData.password }), // Conditionally include password
            email: profileData.email,
            phone_number: profileData.phone_number,
            dob: profileData.dob,
            image: data.secure_url || profileData.image,
          },
        },
      });

      const result = res?.data?.updateCustomerInformation;
      if (result?.success) {
        const updatedData = result?.data || {};
        successMessage({
          message: "Update shop profile successful!",
          duration: 3000,
        });

        dispatch(
          signIn({
            ...updatedData,
            image: data.secure_url,
            created_at: updatedData.created || "",
          })
        );
      } else {
        errorMessage({
          message: result?.error?.details || "An error occurred",
          duration: 3000,
        });
      }
    } catch (error) {
      errorMessage({
        message: "Failed to update profile. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const paymentMethods = [usdtPaymentData, bankPaymentData];

      // Process all payment methods concurrently
      const results = await Promise.all(
        paymentMethods.map(async (paymentData) => {
          const res = await paymentMethod({
            variables: {
              data: {
                payment_method: [
                  {
                    id: paymentData.id,
                    code: paymentData.code,
                    bank_name: paymentData.bank_name,
                    bank_account_name: paymentData.bank_account_name,
                    bank_account_number: paymentData.bank_account_number,
                  },
                ],
              },
            },
          });

          return {
            success: res?.data?.updateCustomerInformation?.success,
            error: res?.data?.updateCustomerInformation?.error?.details,
            code: paymentData.code,
          };
        })
      );

      // Check if all requests were successful
      const allSuccess = results.every((result) => result.success);
      if (allSuccess) {
        successMessage({
          message: "All payment methods updated successfully!",
          duration: 3000,
        });
      } else {
        errorMessage({
          message: "Update payment method fails",
          duration: 3000,
        });
      }

      refetch();
    } catch (err) {
      errorMessage({
        message: "Unexpected error! Try again later!",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getPayment();
  }, [getPayment]);

  React.useEffect(() => {
    if (paymentMethodData?.getCustomerInformation?.data?.payment_method) {
      const paymentMethods =
        paymentMethodData.getCustomerInformation.data.payment_method;

      // Set the first record (USDT) to usdtPaymentData
      if (paymentMethods[0]?.code === "USDT") {
        setUsdtPaymentData(paymentMethods[0]);
      }

      // Set the second record (BANK) to bankPaymentData
      if (paymentMethods[1]?.code === "BANK") {
        setBankPaymentData(paymentMethods[1]);
      }
    }
  }, [paymentMethodData]);

  React.useEffect(() => {
    if (customer) {
      setProfileData({
        id: customer.id || null,
        firstName: customer.firstName || null,
        lastName: customer.lastName || null,
        username: customer.username || null,
        password: customer.password || null,
        email: customer.email || null,
        phone_number: customer.phone_number || null,
        dob: customer.dob || null,
        image: customer.image || null,
        status: customer.status || null,
        created_at: customer.created_at || null,
      });
    }
  }, [customer]);

  return (
    <>
      <div className="w-full flex items-start justify-start flex-col gap-2">
        <Breadcrumb
          items={[
            { label: "Customer", value: "/customer" },
            { label: "Purchase history", value: "/purchase-history" },
          ]}
        />
        <div className="w-full flex items-start justify-start flex-col gap-4">
          <form
            onSubmit={handleSubmitForm}
            className="w-full flex items-start justify-start flex-col gap-4 bg-white rounded p-4"
          >
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
                ) : profileData.image ? (
                  <Image
                    src={profileData.image}
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
                placeholder="Enter first name...."
                title="First name"
                name="firstName"
                id="firstName"
                type="text"
                required
                value={profileData.firstName || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    firstName: e.target.value,
                  })
                }
              />
              <Textfield
                placeholder="Enter lastname...."
                title="Last name"
                name="lastName"
                id="lastName"
                type="text"
                required
                value={profileData.lastName || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    lastName: e.target.value,
                  })
                }
              />
              <Textfield
                placeholder="Enter phone number...."
                title="Phone number"
                name="phone_number"
                id="phone_number"
                type="text"
                required
                value={profileData.phone_number || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone_number: e.target.value,
                  })
                }
              />
              <Textfield
                placeholder="Enter your email...."
                title="Email address"
                name="email"
                id="email"
                type="text"
                required
                value={profileData.email || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    email: e.target.value,
                  })
                }
              />
              <Textfield
                placeholder="Enter your username...."
                title="Username"
                name="username"
                id="username"
                type="text"
                required
                value={profileData.username || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    username: e.target.value,
                  })
                }
              />
              <Password
                placeholder="Enter password...."
                title="Password"
                name="password"
                id="password"
                value={profileData.password || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    password: e.target.value,
                  })
                }
              />
              <Password
                placeholder="Confirm password...."
                title="Confirm password"
                name="confirm_password"
                id="confirm_password"
                value={profileData.password || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    password: e.target.value,
                  })
                }
              />
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

          <form
            onSubmit={handleSubmitPayment}
            className="w-full flex items-start justify-start flex-col gap-4 bg-white rounded p-4"
          >
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
                value={usdtPaymentData.bank_account_number}
                onChange={(e) =>
                  setUsdtPaymentData({
                    ...usdtPaymentData,
                    bank_account_number: e.target.value,
                  })
                }
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
                value={bankPaymentData.bank_name}
                onChange={(e) =>
                  setBankPaymentData({
                    ...bankPaymentData,
                    bank_name: e.target.value,
                  })
                }
              />
              <Textfield
                placeholder="Enter back account name...."
                title="Bank account name"
                name="bank_account_name"
                id="bank_account_name"
                type="text"
                value={bankPaymentData.bank_account_name || ""}
                onChange={(e) =>
                  setBankPaymentData({
                    ...bankPaymentData,
                    bank_account_name: e.target.value,
                  })
                }
              />
              <Textfield
                placeholder="Enter bank account number...."
                title="Bank account number"
                name="bank_account_number"
                id="bank_account_number"
                type="number"
                value={bankPaymentData.bank_account_number}
                onChange={(e) =>
                  setBankPaymentData({
                    ...bankPaymentData,
                    bank_account_number: e.target.value,
                  })
                }
              />
            </div>

            <div className="w-full flex items-end justify-end px-4 sm:px-0">
              <IconButton
                className={`w-full sm:w-auto rounded p-2 text-xs bg-neon_pink text-white`}
                title={isLoading ? "Submiting...." : "Update"}
                icon={isLoading ? <Loading /> : <SaveIcon size={18} />}
                isFront={true}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
