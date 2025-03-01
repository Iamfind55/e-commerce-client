import React from "react";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";

// components and icons
import { BackIcon } from "@/icons/page";
import IconButton from "@/components/iconButton";
import {
  setShippingType,
  clearShippingType,
} from "@/redux/slice/shippingSlice";

interface PropsDetails {
  tab: number;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function DeliveryDetails({ tab, setTab }: PropsDetails) {
  const t = useTranslations("myCartPage");
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const deliveryType = useSelector(
    (state: RootState) => state.shipping.shippingType
  );

  const handleSelectDeliveryType = (type: string) => {
    if (deliveryType === type) {
      dispatch(clearShippingType()); // Uncheck by clearing shipping type
    } else {
      dispatch(setShippingType(type)); // Set the selected type
    }
  };

  const handleNext = () => {
    setTab(tab + 1);
  };

  const handlePrevious = () => {
    setTab(tab - 1);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="container w-full border-b">
          <h1 className="border-b py-2">{t("_product_list")}:</h1>
          {cartItems?.map((product) => (
            <div
              key={product?.id}
              className="flex items-start justify-start gap-2 p-4"
            >
              <Image
                className="rounded"
                src={
                  product?.cover_image
                    ? product?.cover_image
                    : "https://res.cloudinary.com/dvh8zf1nm/image/upload/v1738860062/category01_kdftfe.png"
                }
                alt={product?.name}
                width={60}
                height={60}
              />
              <div className="text-gray-500 flex items-start justify-start flex-col">
                <p className="text-sm">{product?.name}.</p>
                <p className="text-xs">
                  ${product?.price.toFixed(2)}&nbsp;&nbsp;({product?.quantity}{" "}
                  items)
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-between px-4">
          <p className="text-sm">{t("_delivery_type")}:</p>
          <div
            className="flex items-center justify-center gap-2 p-2 rounded border border-gray-200 cursor-pointer"
            onClick={() => handleSelectDeliveryType("DOOR_TO_DOOR")}
          >
            <input
              type="radio"
              name="delivery"
              checked={deliveryType === "DOOR_TO_DOOR"}
              readOnly
            />
            <p className="text-xs">{t("_door_to_door")}</p>
          </div>
        </div>
      </div>

      <div
        className={`w-full flex items-start justify-between sm:justify-end px-4 gap-4`}
      >
        <IconButton
          className="rounded text-gray-500 p-2 w-auto mt-4 text-xs italic border border-gray-200"
          icon={<BackIcon />}
          isFront={true}
          type="button"
          title={t("_back_button")}
          onClick={handlePrevious}
        />
        <IconButton
          className={`rounded p-2 w-auto mt-4 text-xs ${
            !deliveryType
              ? "bg-gray-100 text-gray-500"
              : "bg-neon_pink text-white"
          }`}
          title={t("_continue_button")}
          type="button"
          onClick={handleNext}
        />
      </div>
    </>
  );
}
