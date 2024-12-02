"use client";

import React from "react";
import { updateAPI } from "@/api/api";
import { useToast } from "@/utils/toast";
import Textfield from "@/components/textField";
import IconButton from "@/components/iconButton";
import { IEmail } from "@/types/profile";

export default function ChangeEmail() {
  const { errorMessage, successMessage } = useToast();
  const [emailData, setEmailData] = React.useState<IEmail>({
    currentEmail: "",
    newEmail: "",
  });
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
      if (res?.status == 408) {
        errorMessage({ message: res?.message, duration: 3000 });
      }
      if (res?.status == 500) {
        errorMessage({ message: "Something wrong!", duration: 3000 });
      }
    } catch (error) {
      if (error instanceof Error) {
        errorMessage({ message: error.message, duration: 3000 });
      }
    }
  };
  return (
    <div className="w-full flex items-start justify-center gap-4 sm:flex-row flex-col">
      <form
        action=""
        className="w-full rounded bg-white p-4 shadow-md"
        onSubmit={handleChangeEmail}
      >
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Change email address:
        </h4>
        <p className="text-b_text text-xs mb-3">
          To ensure your accounts security, please use your current email
          address when updating to a new one.
        </p>
        <div className="w-full flex items-center jutify-start gap-4 flex-col">
          <Textfield
            name="currentEmail"
            placeholder="Enter current email...."
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
            placeholder="Enter new email...."
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
        </div>
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
  );
}
