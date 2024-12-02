"use client";

import React from "react";
import Breadcrumb from "@/components/breadCrumb";
import Textfield from "@/components/textField";
import { IBankTypes } from "@/types/bank";
import { postAPI } from "@/api/api";
import { useToast } from "@/utils/toast";
import IconButton from "@/components/iconButton";
import { BackIcon, PlusIcon } from "@/icons/page";
import { useRouter } from "next/navigation";
import MessageHandler from "@/components/messageHandler";

export default function CreateBankAccount() {
  const router = useRouter();
  const { errorMessage } = useToast();
  const [response, setResponse] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [createData, setCreateData] = React.useState<IBankTypes>({
    name: "",
    accountName: "",
    accountNumber: "",
  });

  const handleCreateBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateData({ ...createData, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await postAPI({
        url: "/banks",
        body: {
          name: createData?.name,
          accountName: createData?.accountName,
          accountNumber: createData?.accountNumber,
        },
      });
      setResponse(res);
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    } finally {
      setIsLoading(false);
      router.push("/client/bank");
    }
  };

  return (
    <div className="flex items-start justify-start flex-col gap-4">
      <Breadcrumb path="Bank-accounts/create" />
      <div className="rounded shadow-md bg-white w-full p-4">
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Add new bank account:
        </h4>
        <form
          action=""
          className="w-full flex items-start justify-start flex-col gap-4"
          onSubmit={handleSubmitForm}
        >
          <Textfield
            name="name"
            placeholder="Enter name...."
            id="name"
            title="Bank name"
            required
            color="text-b_text"
            type="text"
            onChange={handleCreateBank}
          />
          <Textfield
            name="accountName"
            placeholder="Enter account name...."
            id="account_name"
            title="Account name"
            required
            color="text-b_text"
            type="text"
            onChange={handleCreateBank}
          />
          <Textfield
            name="accountNumber"
            placeholder="Enter account number...."
            id="account"
            title="Account number"
            required
            color="text-b_text"
            type="number"
            onChange={handleCreateBank}
          />
          <div className="w-full sm:w-1/2 flex items-center justify-start gap-4">
            <IconButton
              className="rounded text-base p-2 w-full mt-4 border text-xs"
              icon={<BackIcon />}
              isFront={true}
              type="button"
              title="Go back"
              onClick={() => router.back()}
            />
            <IconButton
              className="rounded text-white p-2 bg-base w-full mt-4 text-xs"
              icon={<PlusIcon size={20} />}
              isFront={true}
              title={isLoading ? "Creating..." : "Create"}
              type="submit"
            />
          </div>
        </form>
        {response && <MessageHandler response={response} />}
      </div>
    </div>
  );
}
