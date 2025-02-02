"use client";

import React from "react";
import { useTranslations } from "next-intl";

// icons
import {
  CartIcon,
  CheckCircleIcon,
  DeliveryIcon,
  DollarIcon,
  LocationIcon,
  NextIcon,
} from "@/icons/page";

// components
import Confirmation from "./components/confirmation";
import MyCartDetails from "./components/cart-detail";
import PaymentDetails from "./components/pyment-detail";
import DeliveryDetails from "./components/delivery-detail";
import ShippingInformation from "./components/shipping-detail";

export default function MyCart() {
  const t = useTranslations("myCartPage");
  const u = useTranslations("homePage");
  const [tab, setTab] = React.useState<number>(1);

  return (
    <div className="flex items-center justify-center bg-bg_color">
      <div className="container px-4 py-6 flex items-start justify-start flex-col gap-4">
        <div className="w-full">
          <div className="mb-b">
            <ul className="flex flex-wrap items-center justify-center -mb-px text-sm font-medium text-center gap-0 sm:gap-4 rounded">
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 1 ? "text-neon_pink" : "cursor-not-allowed"
                    }`}
                  >
                    <CartIcon size={26} />
                    <p className="hidden sm:block text-sm">{u("_my_cart")}</p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 2 ? "text-neon_pink" : "cursor-not-allowed"
                    }`}
                  >
                    <LocationIcon size={26} />
                    <p className="hidden sm:block text-sm">
                      {t("_shipping_information")}
                    </p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 3 ? "text-neon_pink" : "cursor-not-allowed"
                    }`}
                  >
                    <DeliveryIcon size={26} />
                    <p className="hidden sm:block text-sm">
                      {t("_delivery_information")}
                    </p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 4 ? "text-neon_pink" : "cursor-not-allowed"
                    }`}
                  >
                    <DollarIcon size={26} />
                    <p className="hidden sm:block text-sm">{t("_payment")}</p>
                  </div>
                </button>
              </li>
              <NextIcon className="text-gray-300 text-xl" />
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-0 sm:p-3 rounded-t-lg flex items-start justify-start gap-2`}
                >
                  <div
                    className={`flex items-center justify-start gap-1 flex-col text-gray-500 ${
                      tab === 5 ? "text-neon_pink" : "cursor-not-allowed"
                    }`}
                  >
                    <CheckCircleIcon size={26} />
                    <p className="hidden sm:block text-sm">
                      {t("_confirmation")}
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div
            id="default-tab-content"
            className="p-2 p-3 bg-white text-second_black mt-6 flex items-start justify-start flex-col gap-6"
          >
            <div className="w-full">
              {tab === 1 && <MyCartDetails tab={tab} setTab={setTab} />}
              {tab === 2 && <ShippingInformation tab={tab} setTab={setTab} />}
              {tab === 3 && <DeliveryDetails tab={tab} setTab={setTab} />}
              {tab === 4 && <PaymentDetails tab={tab} setTab={setTab} />}
              {tab === 5 && <Confirmation />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
