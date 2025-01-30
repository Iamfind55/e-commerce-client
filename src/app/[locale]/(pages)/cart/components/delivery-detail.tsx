import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useTranslations } from "next-intl";

export default function DeliveryDetails() {
  const t = useTranslations("myCartPage");
  const cartItems = useSelector((state: RootState) => state.cart.items);

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
                    : "/images/category01.webp"
                }
                alt={product?.name}
                width={60}
                height={60}
              />
              <div className="text-gray-500 flex items-start justify-start flex-col">
                <p className="text-sm">{product?.name}.</p>
                <p className="text-xs">
                  ${product?.price.toFixed(2)}&nbsp;&nbsp;({product?.quantity} items)
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-sm">{t("_delivery_type")}:</p>
          <div className="flex items-center justify-center gap-2 p-2 rounded border border-neon_blue">
            <input type="radio" name="address" defaultChecked />
            <p className="text-xs">{t("_door_to_door")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
