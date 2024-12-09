"use client";

import React from "react";
import BcelonePaymentMethod from "./bcelone";
import StripePaymentMethod from "./strip";
import BalanceCard from "@/components/balanceCard";
import Breadcrumb from "@/components/breadCrumb";
import { queryData } from "@/api/api";
import { login } from "@/redux/slice/authSlice";
import { useToast } from "@/utils/toast";
import { useDispatch } from "react-redux";

export default function Deposit() {
  const [tab, setTab] = React.useState<number>(1);
  const dispatch = useDispatch();
  const { errorMessage } = useToast();
  const [paymentResult, setPaymentResult] = React.useState<string | null>(null);

  const queryUserData = async () => {
    try {
      const res = await queryData({ url: "/patients/me" });
      console.log(res);
      if (res?.status === 200) {
        const data = res.data;
        console.log(data);
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
  const handlePaymentResult = (result: string) => {
    if (result === "success") {
      queryUserData();
      setPaymentResult((prev) => (prev === "success" ? "null" : "success"));
    } else {
      setPaymentResult("failed");
    }
  };
  return (
    <div className="flex items-start justify-center flex-col gap-4">
      {/* <Breadcrumb path="Payment/deposit" /> */}
      <div className="py-6 px-4 shadow-md w-full text-b_text bg-white">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Looking to add funds to your account:
        </h4>
        <div className="flex items-start justify-between gap-4">
          <div className="w-full md:w-3/5">
            <div className="mb-4 border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                      tab === 1
                        ? "text-base text-sm border-b border-base"
                        : "text-b_text"
                    }`}
                    onClick={() => setTab(1)}
                  >
                    <span>Bcelone</span>
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-3 rounded-t-lg flex items-start justify-start gap-2 ${
                      tab === 2
                        ? "text-base text-sm border-b border-base"
                        : "text-b_text"
                    }`}
                    onClick={() => setTab(2)}
                  >
                    Stripe
                  </button>
                </li>
              </ul>
            </div>
            <div id="default-tab-content">
              {tab === 1 && (
                <BcelonePaymentMethod onPaymentSuccess={handlePaymentResult} />
              )}
              {tab === 2 && <StripePaymentMethod />}
            </div>
          </div>
          <div className="hidden md:block w-2/5 p-3">
            <div>
              <BalanceCard refresh={paymentResult} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
