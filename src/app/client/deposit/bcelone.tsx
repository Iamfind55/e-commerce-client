"use client";

import React from "react";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import { postAPI } from "@/api/api";
import { useToast } from "@/utils/toast";
import MessageHandler from "@/components/messageHandler";
import { prices } from "@/utils/option";

interface BcelonePaymentMethodProps {
  onPaymentSuccess?: (response: any) => void; // Callback function to send data back to parent
}

export default function BcelonePaymentMethod({
  onPaymentSuccess,
}: BcelonePaymentMethodProps) {
  const [amount, setAmount] = React.useState<number>(0);
  const [response, setResponse] = React.useState<any>(null);
  const { errorMessage } = useToast();
  const [formattedAmount, setFormattedAmount] = React.useState<string>("");

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

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (amount <= 0) {
      errorMessage({
        message: "Amount must be greater than zero",
        duration: 3000,
      });
      return;
    }

    try {
      const res = await postAPI({
        url: "/deposits",
        body: {
          amount: amount.toString(),
        },
      });
      setResponse(res);
      if (onPaymentSuccess) {
        onPaymentSuccess("success");
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };

  const handleCancel = () => {
    setAmount(0);
    setFormattedAmount("");
    setResponse(null);
  };

  return (
    <div>
      <form
        action=""
        className="flex items-start justify-start flex-col gap-4"
        onSubmit={handleSubmitForm}
      >
        <Textfield
          name="deposit_amount"
          placeholder="Enter amount...."
          id="depositAmount"
          title="Deposit amount"
          required
          color="text-b_text"
          type="text"
          value={formattedAmount}
          onChange={handleAmountChange}
        />
        <div className="flex flex-wrap items-start justify-start gap-4 overflow-auto cursor-pointer">
          {prices.map((price: { label: string; value: string }) => (
            <p
              key={price?.value}
              id="badge-dismiss-default"
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-b_text rounded-lg border border-base"
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
            title="Bcelone Pay"
            type="submit"
          />
          <IconButton
            className="rounded text-white p-2 bg-gray-400 w-full md:w-1/4 mt-4 text-sm"
            isFront={true}
            title="Cancel"
            onClick={handleCancel}
          />
        </div>
      </form>

      {response && <MessageHandler response={response} />}
    </div>
  );
}
