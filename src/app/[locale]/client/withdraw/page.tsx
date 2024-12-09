"use client";

import { postAPI, queryData } from "@/api/api";
import BalanceCard from "@/components/balanceCard";
import Breadcrumb from "@/components/breadCrumb";
import IconButton from "@/components/iconButton";
import MessageHandler from "@/components/messageHandler";
import Select from "@/components/select";
import Textfield from "@/components/textField";
import { useFetchBankByUserId } from "@/lib/bank/useFetchBank";
import useFilter from "@/lib/useFilter";
import { login } from "@/redux/slice/authSlice";
import { prices } from "@/utils/option";
import { useToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// In your Withdraw component:
export default function Withdraw() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState<number>(0);
  const [response, setResponse] = React.useState<any>(null);
  const { errorMessage } = useToast();
  const [formattedAmount, setFormattedAmount] = React.useState<string>("");
  const { state: filter } = useFilter();
  const { data } = useFetchBankByUserId(filter);
  const [bankId, setBankId] = React.useState<string>("");

  // Create options from fetched data
  const options = data?.map((account: any) => ({
    label: account.accountName,
    value: account.id,
  }));

  // Set the first bank as the default bank when data is available
  useEffect(() => {
    if (data && data.length > 0 && data[0]?.id) {
      setBankId(data[0].id); // Only set if data[0].id is defined
    }
  }, [data]);

  const [paymentResult, setPaymentResult] = React.useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const numericValue = Number(value);

    if (!isNaN(numericValue)) {
      setAmount(numericValue);
      setFormattedAmount(new Intl.NumberFormat().format(numericValue));
    }
  };

  const handlePriceClick = (value: string) => {
    const numericValue = Number(value);
    if (!isNaN(numericValue)) {
      setAmount(numericValue);
      setFormattedAmount(new Intl.NumberFormat().format(numericValue));
    }
  };

  const queryUserData = async () => {
    try {
      const res = await queryData({ url: "/patients/me" });
      if (res?.status === 200) {
        const data = res.data;
        dispatch(
          login({
            address: data?.address,
            balance: data?.balance,
            email: data?.email,
            firstName: data?.firstName,
            gender: data?.gender,
            id: data?.id,
            lastName: data?.lastName,
            password: data?.password,
            phone: data?.phone,
            profile: data?.profile,
            status: data?.status,
            createdAt: data?.createdAt,
            createdBy: data?.createdBy,
            updatedAt: data?.updatedAt,
            dob: data?.dob,
          })
        );
      } else {
        errorMessage({ message: "Something went wrong", duration: 3000 });
      }
    } catch (error) {
      errorMessage({ message: "Something went wrong", duration: 3000 });
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await postAPI({
        url: "/withdraws",
        body: {
          bankId: bankId,
          amount: amount.toString(),
        },
      });
      // setPaymentResult("success");
      setPaymentResult((prev) => (prev === "success" ? "null" : "success"));
      setResponse(res);
      queryUserData();
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };

  return (
    <div className="flex items-start justify-center flex-col gap-4">
      {/* <Breadcrumb path="Payment/withdraw" /> */}
      <div className="py-6 px-4 shadow-md w-full text-b_text bg-white">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Looking to add funds to your account:
        </h4>
        <div className="flex items-start justify-between gap-4">
          <div className="w-full md:w-3/5">
            <div id="default-tab-content">
              <form
                action=""
                className="flex items-start justify-start flex-col gap-4"
                onSubmit={handleSubmitForm}
              >
                <Select
                  name="accountNumber"
                  title="Select account"
                  option={options}
                  value={bankId}
                  onChange={(e) => setBankId(e.target.value)} // User can still select a different bank
                  required
                  className="h-7.5"
                />
                <Textfield
                  name="deposit_amount"
                  placeholder="Enter amount...."
                  id="firstName"
                  title="Deposit amount"
                  required
                  color="text-b_text"
                  type="text"
                  value={formattedAmount}
                  onChange={handleAmountChange}
                />
                <div className="flex flex-wrap items-start justify-start gap-4 overflow-auto cursor-pointer">
                  {prices.map((price: any) => (
                    <p
                      key={price?.value}
                      id="badge-dismiss-default"
                      className="inline-flex items-center px-2 py-1 me-2 text-xs font-medium text-b_text rounded-lg border border-base"
                      onClick={() => handlePriceClick(price?.value)}
                    >
                      {price?.label}
                    </p>
                  ))}
                </div>

                <div className="flex items-start justify-start gap-4 w-full">
                  <IconButton
                    className="rounded text-white p-2 bg-base w-full md:w-1/4 mt-4 text-sm"
                    isFront={true}
                    title="Withdraw now"
                    type="submit"
                  />
                  <IconButton
                    className="rounded text-white p-2 bg-gray-400 w-full md:w-1/4 mt-4 text-sm"
                    isFront={true}
                    title="Cancel"
                  />
                </div>
              </form>
              {response && <MessageHandler response={response} />}
            </div>
          </div>
          <div className="hidden md:block w-2/5 p-3">
            <BalanceCard refresh={paymentResult} />
          </div>
        </div>
      </div>
    </div>
  );
}
