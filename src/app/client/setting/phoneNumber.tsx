import { updateAPI } from "@/api/api";
import IconButton from "@/components/iconButton";
import Textfield from "@/components/textField";
import { IPhoneNumber } from "@/types/profile";
import { useToast } from "@/utils/toast";
import React from "react";

export default function ChangePhoneNumber() {
  const { errorMessage, successMessage } = useToast();
  const [phoneData, setPhoneData] = React.useState<IPhoneNumber>({
    currentPhone: "",
    newPhone: "",
  });
  const handleChangePhoneNumber = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const res = await updateAPI({
        url: "/patients/change-phone",
        body: phoneData,
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
        onSubmit={handleChangePhoneNumber}
      >
        <h4 className="text-b_text text-sm mb-3 font-bold">
          Change phone number:
        </h4>
        <p className="text-b_text text-xs mb-3">
          To ensure your accounts security, please use your current phone number
          address when updating to a new one.
        </p>
        <div className="w-full flex items-center jutify-start gap-4 flex-col">
          <Textfield
            name="currentPhoneNumber"
            placeholder="Enter current phone number...."
            id="current_phone_number"
            title="Current phone number"
            required
            type="number"
            color="text-b_text"
            onChange={(e) =>
              setPhoneData({
                ...phoneData,
                currentPhone: e.target.value,
              })
            }
          />
          <Textfield
            name="newPhoneNumber"
            placeholder="Enter new phone number...."
            id="new_phone_number"
            title="New phone number"
            required
            type="number"
            color="text-b_text"
            onChange={(e) =>
              setPhoneData({
                ...phoneData,
                newPhone: e.target.value,
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
