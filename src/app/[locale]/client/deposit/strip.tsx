"use client";

import React from "react";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import { prices } from "@/utils/option";

export default function StripePaymentMethod() {
  const [amount, setAmount] = React.useState<number>(0);
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
    console.log(amount);
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
            title="Stripe pay"
            type="submit"
          />
          <IconButton
            className="rounded text-white p-2 bg-gray-400 w-full md:w-1/4 mt-4 text-sm"
            isFront={true}
            title="Cancel"
          />
        </div>
      </form>
    </div>
  );
}
